export default function DiagnosisPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-cyan-100 font-sans">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.png"
          alt="背景画像"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" /> {/* ← 黒半透明フィルター */}
      </div>

      {/* 表示レイヤー（テキストなど） */}
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">背景テスト中</h1>
        <p>背景画像が表示されていますか？</p>
      </div>
    </div>
  );
}
