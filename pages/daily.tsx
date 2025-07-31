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
  const [loading, setLoading] = useState(false);

  // 設問を取得
  useEffect(() => {
    fetch('/api/daily-question')
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setChoices(data.choices);
      })
      .catch((err) => console.error('質問取得失敗:', err));
  }, []);

  // 診断実行
  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-wider text-cyan-300">デイリー診断</h1>

      {question && (
        <div className="mb-6">
          <p className="text-lg mb-4">{question}</p>
          <div className="space-y-2">
            {choices.map((choice) => (
              <button
                key={choice.label}
                className={`w-full text-left p-4 rounded-lg border ${
                  selected === choice.structure ? 'bg-cyan-600 border-cyan-300' : 'border-cyan-700 hover:border-cyan-400'
                } transition duration-200`}
                onClick={() => setSelected(choice.structure)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selected || loading}
        className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30"
      >
        {loading ? '診断中...' : '診断する'}
      </button>

      {result && (
        <div className="mt-10 border-t border-cyan-700 pt-6 animate-fadeInUp">
          <h2 className="text-xl font-bold text-cyan-200 mb-2">診断コメント</h2>
          <p className="text-base text-cyan-100 mb-6">{result.comment}</p>

          <h2 className="text-xl font-bold text-cyan-300 mb-2">今日の格言</h2>
          <p className="text-lg italic text-cyan-400">「{result.proverb}」</p>
        </div>
      )}
    </div>
  );
}
