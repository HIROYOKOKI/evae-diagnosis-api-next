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
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">診断結果</h2>
          <pre className="bg-gray-100 p-6 rounded-xl text-left text-sm font-mono shadow-inner">
            {JSON.stringify(score, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 leading-relaxed tracking-tight">
            Q{q.id}. {q.text}
          </h2>
          <div className="space-y-4">
            {q.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleSelect(opt.structure)}
                className="block w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl text-left shadow-sm hover:bg-gray-50 transition font-medium"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-400 text-right">
          {current + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
}
