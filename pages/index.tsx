// ファイルパス: /pages/index.tsx

export default function Home() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold opacity-0 animate-fadeInUp delay-500">
        🌟 診断結果の見出し（fadeInUp）
      </h1>

      <div className="mt-4 hover:animate-wiggle text-lg font-semibold text-purple-700 cursor-pointer">
        🌀 再観測するボタン（wiggle）
      </div>

      <div className="mt-4 opacity-0 animate-slideInRight delay-700 bg-blue-100 p-4 rounded-md">
        📜 ログが追加されました！（slideInRight）
      </div>
    </div>
  );
}
