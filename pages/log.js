// pages/log.js

import { useEffect, useState } from 'react';

export default function LogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const allLogs = [];

    // localStorage から evae-daily-* を抽出
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('evae-daily-')) {
        const date = key.replace('evae-daily-', '');
        const value = localStorage.getItem(key);
        allLogs.push({ date, value });
      }
    }

    // 日付でソート（降順）
    allLogs.sort((a, b) => (a.date < b.date ? 1 : -1));

    setLogs(allLogs);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📋 ソウルレイヤー診断ログ</h1>

      {logs.length === 0 ? (
        <p>ログがまだありません。</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.date} style={{ margin: '0.5rem 0' }}>
              <strong>{log.date}</strong> → タイプ <strong>{log.value}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
