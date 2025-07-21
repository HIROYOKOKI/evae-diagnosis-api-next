// pages/diagnosis.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-12">
      <div className="max-w-2xl w-full space-y-10">
        <div>
          <h2 className="text-2xl font-bold leading-relaxed tracking-tight mb-6">
            Q{q.id}. {q.text}
          </h2>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {q.options.map((opt, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelect(opt.structure)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'brightness(1.3)' }}
                  transition={{ duration: 0.3 }}
                  className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-lg text-gray-700 text-left"
                >
                  {opt.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-sm text-gray-400 text-right">
          {current + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
}
