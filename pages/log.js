// pages/log.js

import { useEffect, useState } from 'react';

export default function LogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const allLogs = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('evae-daily-')) {
        const date = key.replace('evae-daily-', '');
        const value = localStorage.getItem(key);
        allLogs.push({ date, value });
      }
    }

    allLogs.sort((a, b) => (a.date < b.date ? 1 : -1));
    setLogs(allLogs);
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10 font-sans">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">
          📋 ソウルレイヤー診断ログ
        </h1>

        {logs.length === 0 ? (
          <p className="text-gray-500 text-center">ログがまだありません。</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log.date}
                className="flex justify-between items-center px-4 py-3 bg-indigo-100 rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">{log.date}</span>
                <span className="font-bold text-indigo-800 text-lg">
                  タイプ {log.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
