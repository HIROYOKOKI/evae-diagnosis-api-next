export default function Home() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold text-blue-600 animate-fadeInUp mb-4">
        🎬 アニメーションテスト
      </h1>

      <p className="text-lg text-gray-700 animate-fadeInUp delay-200">
        このテキストはふわっと上に現れます（fadeInUp）
      </p>

      <div className="mt-8 animate-slideInRight bg-white inline-block px-6 py-3 rounded shadow delay-400">
        👈 スライドインしてくるボックス（slideInRight）
      </div>

      <button className="mt-8 block mx-auto px-6 py-3 bg-indigo-500 text-white rounded hover:animate-wiggle">
        🌀 ボタン（hoverでwiggle）
      </button>
    </div>
  );
}
