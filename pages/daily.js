// pages/daily.js

import { useEffect, useState } from 'react';

export default function Daily() {
  const [questionText, setQuestionText] = useState('');
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const fetchQuestion = async () => {
    const res = await fetch('/api/daily-question');
    const data = await res.json();
    setQuestionText(data.question);
  };

  useEffect(() => {
    const answered = localStorage.getItem(`evae-daily-${today}`);
    if (answered) {
      setIsAnswered(true);
      setSelected(answered);
    } else {
      fetchQuestion();
    }
  }, []);

  const handleSelect = async (type) => {
    setSelected(type);
    setComment('');
    localStorage.setItem(`evae-daily-${today}`, type);
    setIsAnswered(true);

    try {
      const res = await fetch('/api/gpt-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      setComment(data.comment || 'コメントの取得に失敗しました。');
    } catch (error) {
      console.error('GPT fetch error:', error);
      setComment('コメント取得エラー');
    }
  };

  const handleReobserve = () => {
    if (isAnswered) return;
    setSelected(null);
    setComment('');
    setQuestionText('');
    fetchQuestion();
  };

  const renderChoices = () => {
    const matches = questionText.match(/A\d:\s.*?\（.）/g);
    if (!matches) return null;

    return matches.map((choice, index) => {
      const type = choice.match(/\（(.)）/)?.[1];
      return (
        <button
          key={index}
          onClick={() => handleSelect(type)}
          className="block w-full py-3 px-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {choice}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-10 font-sans">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">
          🌙 今日のソウルレイヤー診断
        </h1>

        {isAnswered ? (
          <div className="text-center space-y-2">
            <p className="text-green-600 font-semibold">✅ 今日はすでに診断済みです。</p>
            <p>あなたの選んだタイプ：<strong>{selected}</strong></p>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-line mb-4 text-gray-800">{questionText}</p>

            {!selected && (
              <div className="space-y-3">
                {renderChoices()}
              </div>
            )}

            {selected && (
              <div className="text-center mt-6 space-y-2">
                <p>あなたが選んだのは：<strong>{selected}</strong> タイプです。</p>
                {comment && (
                  <p className="italic text-indigo-700">🪞 {comment}</p>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleReobserve}
            disabled={isAnswered}
            className={`px-4 py-2 rounded-lg border transition
              ${isAnswered
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-indigo-700 border-indigo-500 hover:bg-indigo-50'}
            `}
          >
            🔁 再観測して別の設問を見る
          </button>
        </div>
      </div>
    </div>
  );
}
