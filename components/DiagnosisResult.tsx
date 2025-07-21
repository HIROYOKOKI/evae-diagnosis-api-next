import { useState, useEffect } from 'react';

export default function DiagnosisResult({ score }: { score: { E: number, V: number, Λ: number, Ǝ: number } }) {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [comment, setComment] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch('/api/structure-diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(score),
        });

        const resData = await res.json();
        const lines = (resData.message || '').split('\n');

        setName(resData.name || lines.find(l => l.startsWith('構造名：'))?.replace('構造名：', '').trim() || '');
        setTheme(resData.theme || lines.find(l => l.startsWith('テーマ：'))?.replace('テーマ：', '').trim() || '');
        setComment(
          resData.comment ||
            lines.find(l => l.startsWith('コメント：'))?.replace('コメント：', '').trim() ||
            '構造のコメントが取得できませんでした。'
        );
        setAdvice(
          resData.advice ||
            lines.find(l => l.startsWith('アドバイス：'))?.replace('アドバイス：', '').trim() ||
            '今月はあまり無理せず、ひと呼吸置いてから動いてみようか。'
        );
      } catch (err) {
        setComment('構造のコメント取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };
    fetchComment();
  }, [score]);

  return (
    <div
      className="min-h-screen relative flex justify-center bg-gradient-to-b from-white to-gray-50 px-4"
      style={{ paddingTop: '50vh', transform: 'translateY(-25%)' }}
    >
      <div className="max-w-xl w-full text-center space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">診断結果</h2>

        {/* 表示内容 */}
        <p className="text-sm text-gray-500">
          あなたの構造は「{score.Λ > score.E && score.Λ > score.V ? 'EΛVƎ' : 'EVΛƎ'}」：
          {score.Λ > score.E && score.Λ > score.V ? '確定した現実の構造重心' : '未確定の未来の構造傾向'} に傾いています。
        </p>

        <div className="text-left bg-indigo-50 text-gray-800 px-6 py-4 rounded-xl shadow-inner leading-relaxed space-y-3">
          <p className="font-semibold text-sm text-indigo-700">ルネアより構造観測メッセージ：</p>
          {loading ? (
            <p className="italic text-gray-400">観測中…</p>
          ) : (
            <>
              <p><strong>構造名：</strong>{name}</p>
              <p><strong>今月のテーマ：</strong>{theme}</p>
              <p><strong>コメント：</strong>{comment}</p>
              <p><strong>アドバイス：</strong>{advice}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
