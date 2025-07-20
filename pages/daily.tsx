// pages/daily.tsx

export default function Daily() {
  return (
    <div className="min-h-screen bg-[#f7f7f9] px-6 py-12 text-center font-sans text-[#0c0f3a]">
      <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
        <span role="img" aria-label="icon">🧭</span> 今日の問い
      </h1>
      <p className="text-sm text-gray-600 mb-10">
        あなたが今、一番引かれる言葉はどれですか？
      </p>

      <div className="space-y-4 max-w-sm w-full mx-auto">
        <button className="w-full py-3 px-6 rounded-lg border border-evæ-e text-evæ-e bg-white hover:bg-evæ-e hover:text-white transition">
          静寂
        </button>
        <button className="w-full py-3 px-6 rounded-lg border border-evæ-v text-evæ-v bg-white hover:bg-evæ-v hover:text-white transition">
          衝動
        </button>
      </div>

      {/* ルネアのセリフ */}
      <div className="mt-16 text-sm text-gray-500 italic text-right max-w-sm mx-auto">
        ルネア：「どちらを選んでも、構造は響く。」
      </div>
    </div>
  );
}
