export default function Log() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold animate-fadeInUp text-blue-600 mb-6">
        📝 ログ一覧（fadeInUp）
      </h1>

      <ul className="space-y-4">
        <li className="p-4 bg-white rounded shadow animate-slideInRight">
          ✅ ユーザーが診断を開始しました。
        </li>
        <li className="p-4 bg-white rounded shadow animate-slideInRight delay-200">
          📦 結果が保存されました。
        </li>
        <li className="p-4 bg-white rounded shadow animate-slideInRight delay-400">
          📤 サーバーに送信されました。
        </li>
      </ul>
    </div>
  );
}
