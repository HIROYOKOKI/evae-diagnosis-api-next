// ファイル: pages/index.tsx

export default function Home() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold animate-fadeInUp opacity-0 delay-500">
        🌟 診断結果の見出し（fadeInUp）
      </h1>
      <button className="hover:animate-wiggle text-lg font-semibold text-purple-700 cursor-pointer">
        🌀 再観測するボタン（wiggle）
      </button>
      <div className="animate-slideInRight opacity-0 delay-700 bg-blue-100 p-4 rounded-md">
        📜 ログが追加されました！（slideInRight）
      </div>
    </div>
  );
}
