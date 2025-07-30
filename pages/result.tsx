// pages/result.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// DiagnosisResult コンポーネントのダミー定義
// 実際のアプリケーションでは、これは別のファイルからインポートされます。
const DiagnosisResult = ({ score }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-cyan-100 bg-gray-900 p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-lg">
        診断結果
      </h1>
      <p className="text-xl md:text-2xl mb-4 text-center">
        あなたのソウルレイヤーは...
      </p>
      <div className="bg-cyan-900/30 border border-cyan-700 rounded-xl p-6 shadow-xl w-full max-w-sm">
        <ul className="space-y-3">
          {Object.entries(score).map(([key, value]) => (
            // ここを修正: value を明示的に string または number にキャスト
            <li key={key} className="lg flex justify-between items-center">
              <span className="font-semibold">{key}</span>
              <span className="text-xl text-cyan-300">{value as string | number}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center text-lg max-w-md">
        ここに、あなたのソウルレイヤーに関する詳細な解説と、パーソナライズされたアドバイスが表示されます。
      </p>
      <button
        onClick={() => window.location.reload()} // 簡易的なリロードで最初に戻る
        className="mt-10 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 rounded-full text-white font-bold text-lg shadow-lg"
      >
        もう一度診断する
      </button>
    </div>
  );
};


export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState<{ E: number; V: number; Λ: number; Ǝ: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const E = Array.isArray(router.query.E) ? router.query.E[0] : router.query.E;
    const V = Array.isArray(router.query.V) ? router.query.V[0] : router.query.V;
    const L = Array.isArray(router.query.L) ? router.query.L[0] : router.query.L;
    const R = Array.isArray(router.query.R) ? router.query.R[0] : router.query.R;

    const allDefinedAndParsable = [E, V, L, R].every((val) => {
      return val !== undefined && !isNaN(parseInt(val as string));
    });

    if (allDefinedAndParsable) {
      setScore({
        E: parseInt(E as string),
        V: parseInt(V as string),
        Λ: parseInt(L as string),
        Ǝ: parseInt(R as string),
      });
      setLoading(false);
    } else {
      console.error("Invalid or missing query parameters for score.");
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  if (loading || !score) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-cyan-100">
        <p>診断結果を読み込み中...</p>
      </div>
    );
  }

  return <DiagnosisResult score={score} />;
}
