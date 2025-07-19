// pages/daily.js

import { useEffect, useState } from 'react';

export default function Daily() {
  const [questionText, setQuestionText] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/daily-question')
      .then(res => res.json())
      .then(data => {
        setQuestionText(data.question);
      });
  }, []);

  const handleSelect = (choice) => {
    setSelected(choice);
    console.log('選択された構造タイプ:', choice);
  };

  const renderChoices = () => {
    const matches = questionText.match(/A\d:\s.*?\（.）/g);
    if (!matches) return null;

    return matches.map((choice, index) => {
      const type = choice.match(/\（(.)）/)?.[1]; // 構造タイプ抽出（E/V/Λ/Ǝ）
      return (
        <button
          key={index}
          onClick={() => handleSelect(type)}
          style={{
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.8rem',
            borderRadius: '8px',
            background: '#0c0f3a',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {choice}
        </button>
      );
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌙 今日のソウルレイヤー診断</h1>
      <div style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>{questionText}</div>

      {!selected && renderChoices()}
      {selected && (
        <p>あなたが選んだのは：<strong>{selected}</strong> タイプです。</p>
      )}
    </div>
  );
}
