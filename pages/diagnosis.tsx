// pages/diagnosis.tsx

import { useState } from 'react';
import { questions } from '../data/questions';

type ScoreMap = {
  E: number;
  V: number;
  Λ: number;
  Ǝ: number;
};

export default function DiagnosisPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState<ScoreMap>({ E: 0, V: 0, Λ: 0, Ǝ: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (structure: keyof ScoreMap) => {
    const updated = { ...score, [structure]: score[structure] + 1 };
    setScore(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">診断結果</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(score, null, 2)}</pre>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-500">{q.category}</p>
        <h2 className="text-lg font-semibold mb-4">Q{q.id}. {q.text}</h2>
        <div className="space-y-3">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt.structure)}
              className="block w-full px-4 py-3 border rounded-lg text-left hover:bg-gray-50 transition"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-400 text-right">{current + 1} / {questions.length}</p>
    </div>
  );
}
