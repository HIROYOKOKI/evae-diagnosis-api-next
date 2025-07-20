// pages/daily.tsx

export default function Daily() {
  return (
    <div className="p-8 bg-[#f7f7f9] min-h-screen text-center">
      <h1 className="text-2xl font-bold text-[#0c0f3a] mb-6">
        今日の問い
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        あなたが今、一番引かれる言葉はどれですか？
      </p>

      <div className="space-y-4 max-w-md mx-auto">
        <button className="block w-full border border-gray-300 bg-white py-3 px-6 rounded-lg shadow-sm">
          静寂
        </button>
        <button className="block w-full border border-gray-300 bg-white py-3 px-6 rounded-lg shadow-sm">
          衝動
        </button>
      </div>

      <div className="mt-8 text-gray-500 text-sm italic">
        ルネア：「どちらを選んでも、構造は響く。」
      </div>
    </div>
  );
}
