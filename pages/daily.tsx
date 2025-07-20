// pages/daily.tsx

export default function Daily() {
  return (
    <div className="min-h-screen bg-[#f7f7f9] flex flex-col justify-center items-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-[#0c0f3a] mb-4">
          🌌 今日の問い
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          あなたが今、一番引かれる言葉はどれですか？
        </p>

        <div className="space-y-4">
          <button className="w-full py-3 px-6 rounded-lg border border-evæ-e text-evæ-e bg-white hover:bg-evæ-e hover:text-white transition-colors">
            静寂
          </button>
          <button className="w-full py-3 px-6 rounded-lg border border-evæ-v text-evæ-v bg-white hover:bg-evæ-v hover:text-white transition-colors">
            衝動
          </button>
        </div>

        <div className="mt-8 text-right text-sm text-gray-500 italic">
          ルネア：「どちらを選んでも、構造は響く。」
        </div>
      </div>
    </div>
  );
}
