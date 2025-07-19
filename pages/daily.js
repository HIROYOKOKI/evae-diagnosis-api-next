// pages/daily.js

import { useEffect, useState } from 'react';

export default function Daily() {
  const [questionText, setQuestionText] = useState('');
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const today = new Date().toISOString().slice(0, 10); // "2025-07-19"

  // 設問取得関数
  const fetchQuestion = async () => {
    const res = await fetch('/api/daily-question');
    const data = await res.json();
    setQuestionText(data.question);
  };

  // 初回チェック：診断済みならロック、それ以外は設問取得
  useEffect(() => {
    const answered = localStorage.getItem(`evae-daily-${today}`);
    if (answered) {
      setIsAnswered(true);
      setSelected(answered); // 前回選んだタイプも表示
    } else {
      fetchQuestion();
    }
  }, []);

  // 回答選択処理
  const handleSelect = async (type) => {
    setSelected(type);
    setComment('');

    // 保存
    localStorage.setItem(`evae-daily-${today}`, type);
    setIsAnswered(true); // ロックON

    try {
      const res = await fetch('/api/gpt-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // 設問再取得
  const handleReobserve = () => {
    if (isAnswered) return; // ロック中は再観測不可
    setSelected(null);
    setComment('');
    setQuestionText('');
    fetchQuestion();
  };

  // 選択肢表示
  const renderChoices = () => {
    const matches = questionText.match(/A\d:\s.*?\（.）/g);
    if (!matches) return null;

    return matches.map((choice, index) => {
      const type = choice.match(/\（(.)）/)?.[1];
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

      {isAnswered ? (
        <div>
          <p>✅ 今日はすでに診断済みです。</p>
          <p>あなたの選んだタイプ：<strong>{selected}</strong></p>
        </div>
      ) : (
        <>
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
        </>
      )}

      <button
        onClick={handleReobserve}
        disabled={isAnswered}
        style={{
          marginTop: '2.5rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          border: '1px solid #0c0f3a',
          background: isAnswered ? '#ccc' : 'transparent',
          color: isAnswered ? '#777' : '#0c0f3a',
          cursor: isAnswered ? 'not-allowed' : 'pointer',
        }}
      >
        🔁 再観測して別の設問を見る
      </button>
    </div>
  );
}
