// pages/daily.js

import { useEffect, useState } from 'react';

export default function Daily() {
  const [questionText, setQuestionText] = useState('');
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/api/daily-question')
      .then(res => res.json())
      .then(data => {
        setQuestionText(data.question);
      });
  }, []);

  const handleSelect = async (type) => {
    setSelected(type);
    setComment(''); // 既存コメントクリア

    try {
      const res = await fetch('/api/gpt-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      if (data.comment) {
        setComment(data.comment);
      } else {
        setComment('コメントの取得に失敗しました。');
      }
    } catch (error) {
      console.error('GPT fetch error:', error);
      setComment('コメント取得エラー');
    }
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
        <>
          <p>あなたが選んだのは：<strong>{selected}</strong> タイプです。</p>
          {comment && (
            <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#444' }}>
              🪞 {comment}
            </p>
          )}
        </>
      )}
    </div>
  );
}
