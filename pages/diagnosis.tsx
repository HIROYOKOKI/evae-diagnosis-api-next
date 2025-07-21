// pages/diagnosis.tsx

import { useState } from 'react';
import { questions } from '../data/questions';

import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">診断結果</h2>
          <pre className="bg-gray-100 p-6 rounded-xl text-left text-sm font-mono shadow-inner">
            {JSON.stringify(score, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-white to-gray-50 px-4 pt-52 pb-16">
      <div className="w-full max-w-lg mx-auto space-y-12">
        <div>
          <h2 className="text-center text-[20px] md:text-2xl font-semibold tracking-tight text-gray-800 leading-snug px-4">
            Q{q.id}. {q.text}
          </h2>
        </div>
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {q.options.map((opt, index) => (
              <motion.button$1>
  <span className=\"inline-block mr-2\">🔘</span>
  <span>$3</span>
</motion.button>
            ))}
          </AnimatePresence>
        </div>
        <div className="text-sm text-gray-400 text-right">
          {current + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
}
