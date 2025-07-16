import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const { E, V, L, R } = router.query;

    const allDefined = [E, V, L, R].every((v) => v !== undefined && !isNaN(parseInt(v)));
    if (!allDefined) return;

    const parsed = {
      E: parseInt(E),
      V: parseInt(V),
      Λ: parseInt(L),
      Ǝ: parseInt(R),
    };

    setScore(parsed);
    console.log('✅ スコア取得:', parsed);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!score) return;

    const allZero = Object.values(score).every((v) => v === 0);
    if (allZero) {
      setComment('スコアがすべて0のため、コメントを生成できません。');
      return;
    }

    const fetchComment = async () => {
      try {
        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score }),
        });

        const data = await res.json();
        console.log('🧠 GPTレスポンス:', data);
        setComment(data.comment || 'コメントが取得できませんでした');
      } catch (err) {
        setComment('エラーによりコメント生成に失敗しました');
      }
    };

    fetchComment();
  }, [score]);

  if (!score) return <p>スコアの読込中...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧭 あなたのソウルレイヤー診断</h2>
      <ul>
        {Object.entries(score).map(([layer, value]) => (
          <li key={layer}>
            {layer}：{value}
          </li>
        ))}
      </ul>

      <hr />

      <h3>GPT診断コメント</h3>
      <p>{comment || 'コメント生成中...'}</p>
    </div>
  );
}
