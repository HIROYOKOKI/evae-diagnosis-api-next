// ルネア診断コメントの表示を含む診断結果パート（diagnosis.tsx内のfinished部分）

import { useState, useEffect } from 'react';

export default function DiagnosisResult({ score }: { score: { E: number, V: number, Λ: number, Ǝ: number } }) {
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
        const data = await res.json();
setComment(data.comment || data.message?.split('
')?.[2]?.replace('コメント：', '').trim() || '構造のコメントが取得できませんでした。');
setAdvice(data.advice || data.message?.split('
')?.[3]?.replace('アドバイス：', '').trim() || '今月はあまり無理せず、ひと呼吸置いてから動いてみようか。');
      }
    };
    fetchComment();
  }, [score]);

  return (
    <div className="min-h-screen relative flex justify-center bg-gradient-to-b from-white to-gray-50 px-4" style={{ paddingTop: '50vh', transform: 'translateY(-25%)' }}>
      <div className="max-w-xl w-full text-center space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">診断結果</h2>

{(() => {
  const entries = Object.entries(score);
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0];
  const isFuture = top1[0] === 'E' || top1[0] === 'V';
  return (
    <p className="text-sm text-gray-500">
      {isFuture ? 'あなたの構造は「EVΛƎ」：未確定の未来の構造傾向 に傾いています。' : 'あなたの構造は「EΛVƎ」：確定した現実の構造重心 に傾いています。'}
    </p>
  );
})()}

        <div className="text-left bg-indigo-50 text-gray-800 px-6 py-4 rounded-xl shadow-inner leading-relaxed">
          <p className="mb-2 font-semibold text-sm text-indigo-700">ルネアより構造観測メッセージ：</p>
          {loading ? (
            <p className="italic text-gray-400">観測中…</p>
          ) : (
            <>
              <p className="mb-2">{comment}</p>
              <p className="text-sm text-indigo-700">{advice}</p>
            </>
          )}
        </div>

        
      </div>
    </div>
  );
}
