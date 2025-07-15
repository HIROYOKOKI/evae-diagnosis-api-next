import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState("");

  // クエリパラメータからスコアを取得
  useEffect(() => {
    if (!router.isReady) return;

    const { E, V, Λ, Ǝ } = router.query;

    // すべてのレイヤーが揃っているか確認
    if (E && V && Λ && Ǝ) {
      const parsedScore = {
        E: parseInt(E),
        V: parseInt(V),
        Λ: parseInt(Λ),
        Ǝ: parseInt(Ǝ),
      };
      setScore(parsedScore);
    }
  }, [router.isReady]);

  // GPT診断コメントを取得
  useEffect(() => {
    if (!score) return;

    const fetchComment = async () => {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      const data = await res.json();
      setComment(data.comment);
    };

    fetchComment();
  }, [score]);

  if (!score) return <p>スコアを読み込み中…</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🌀 あなたのソウルレイヤー診断</h2>
      <ul>
        {Object.entries(score).map(([layer, value]) => (
          <li key={layer}>
            {layer}：{value}
          </li>
        ))}
      </ul>

      <hr />

      <h3>GPT診断コメント</h3>
      <p>{comment || "コメント生成中..."}</p>
    </div>
  );
}
