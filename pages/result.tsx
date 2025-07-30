// pages/result.tsx

import { useRouter } from 'next/router'; // Next.jsのルーターフックをインポート (nextパッケージが正しくインストールされていることを確認してください)
import { useEffect, useState } from 'react'; // Reactのフックをインポート

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
            <li key={key} className="lg flex justify-between items-center">
              <span className="font-semibold">{key}</span>
              <span className="text-xl text-cyan-300">{value}</span>
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
  // scoreの初期値をnullではなくオブジェクトに設定し、型推論を助ける
  const [score, setScore] = useState<{ E: number; V: number; Λ: number; Ǝ: number } | null>(null);
  const [loading, setLoading] = useState(true); // ロード状態を管理するステート

  useEffect(() => {
    // router.isReady が true になるまで待つ (クエリパラメータが利用可能になるまで)
    if (!router.isReady) return;

    // router.query から値を取得し、型を安全に扱う
    // 値が string[] の場合は最初の要素を、undefined の場合は undefined を使う
    // Λ (ラムダ) と Ǝ (イプシロン) は特殊文字なので、クエリパラメータ名が正しく渡されているか確認が必要です。
    // 例: router.query.Lambda や router.query.Epsilon など、Next.jsがURLエンコードされた文字を
    // どのようにデコードするかによって変わる可能性があります。
    // 今回はクエリパラメータ名が 'L' と 'R' で渡されることを想定して修正します。
    const E = Array.isArray(router.query.E) ? router.query.E[0] : router.query.E;
    const V = Array.isArray(router.query.V) ? router.query.V[0] : router.query.V;
    const L = Array.isArray(router.query.L) ? router.query.L[0] : router.query.L; // クエリパラメータ名を 'L' に修正
    const R = Array.isArray(router.query.R) ? router.query.R[0] : router.query.R; // クエリパラメータ名を 'R' に修正


    // すべてのクエリパラメータが定義されており、かつ数値に変換可能かチェック
    const allDefinedAndParsable = [E, V, L, R].every((val) => {
      // val が undefined でなく、かつ数値に変換できる文字列であること
      return val !== undefined && !isNaN(parseInt(val as string));
    });

    if (allDefinedAndParsable) {
      setScore({
        E: parseInt(E as string),
        V: parseInt(V as string),
        Λ: parseInt(L as string), // クエリパラメータ名 'L' を Λ にマッピング
        Ǝ: parseInt(R as string), // クエリパラメータ名 'R' を Ǝ にマッピング
      });
      setLoading(false); // ロード完了
    } else {
      // パラメータが不正な場合は、エラー表示またはリダイレクト
      console.error("Invalid or missing query parameters for score.");
      // 例: トップページにリダイレクト
      // router.push('/');
      setLoading(false); // エラーの場合もロードを終了
    }
  }, [router.isReady, router.query]); // router.isReady と router.query の変更を監視

  // スコアのロード中、またはエラーの場合の表示
  if (loading || !score) { // scoreがnullの場合もロード中として扱う
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-cyan-100">
        <p>診断結果を読み込み中...</p>
      </div>
    );
  }

  // score state が設定されたら結果を表示
  return <DiagnosisResult score={score} />;
}
