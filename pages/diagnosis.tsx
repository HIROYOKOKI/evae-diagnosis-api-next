import { useState } from 'react';
import { questions } from '../data/questions';
import DiagnosisResult from '../components/DiagnosisResult'; // ← 追加

export default function DiagnosisPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState({ E: 0, V: 0, Λ: 0, Ǝ: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (structure) => {
    const updated = { ...score, [structure]: score[structure] + 1 };
    setScore(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return <DiagnosisResult score={score} />;
  }

  const q = questions[current];

  return (
    <div
      className="min-h-screen relative flex justify-center bg-gradient-to-b from-white to-gray-50 px-4"
      style={{ paddingTop: '50vh', transform: 'translateY(-25%)' }}
    >
      {/* 背景アニメーション */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 animate-pulse opacity-40 blur-2xl" />
      </div>

      <div className="w-full max-w-lg mx-auto space-y-12 gap-8">
        <h2 className="text-center text-[20px] md:text-2xl font-semibold tracking-tight text-gray-800 leading-snug px-4 mb-6">
          Q{q.id}. {q.text}
        </h2>

        <div className="space-y-4">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt.structure)}
              className="block w-2/3 max-w-sm mx-auto px-5 py-5 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.01] active:scale-95 text-[16px] text-gray-800 text-left leading-snug"
            >
              <span className="inline-block mr-2">◉</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400 text-right">
          {current + 1} / {questions.length}
        </div>

        <footer className="mt-16 text-center text-xs text-gray-400 tracking-wide font-mono opacity-70">
          EVΛƎ構造観測プロトコル  |  E / V / Λ / Ǝ STRUCTURAL FIELD OBSERVATION
        </footer>
      </div>
    </div>
  );
}
