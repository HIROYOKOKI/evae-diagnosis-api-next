import { useEffect, useState } from 'react';

interface Choice {
  label: string;
  text: string;
  structure: string;
}

export default function DailyDiagnosis() {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ comment: string; proverb: string } | null>(null);

  // 1. 質問データを取得
  useEffect(() => {
    fetch('/api/daily-question')
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setChoices(data.choices);
      })
      .catch((err) => console.error('質問取得失敗:', err));
  }, []);

  // 2. 回答送信
  const handleSubmit = async () => {
    if (!selected) return;
    try {
      const res = await fetch('/api/daily-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structure: selected }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('診断失敗:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">デイリー診断</h1>
      {question && (
        <div className="mb-4">
          <p className="text-lg mb-4">{question}</p>
          <div className="space-y-2">
            {choices.map((choice) => (
              <button
                key={choice.label}
                className={`w-full text-left p-3 border rounded ${
                  selected === choice.structure ? 'bg-cyan-600' : 'border-cyan-500'
                }`}
                onClick={() => setSelected(choice.structure)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded"
        onClick={handleSubmit}
        disabled={!selected}
      >
        診断する
      </button>

      {result && (
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-xl font-semibold mb-2">診断コメント：</p>
          <p className="mb-4">{result.comment}</p>
          <p className="text-lg text-cyan-300 font-mono">「{result.proverb}」</p>
        </div>
      )}
    </div>
  );
}
