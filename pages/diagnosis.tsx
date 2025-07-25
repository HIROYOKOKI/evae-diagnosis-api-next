// pages/diagnosis.tsx

import { useState } from 'react';
import { questions } from '../data/questions';
import DiagnosisResult from '../components/DiagnosisResult';

export default function DiagnosisPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState({ E: 0, V: 0, Λ: 0, Ǝ: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (structure: keyof typeof score) => {
    const updated = { ...score, [structure]: score[structure] + 1 };
    setScore(updated);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) return <DiagnosisResult score={score} />;

  const q = questions[current];

  return (
    <div className="relative min-h-screen flex items-center justify-center text-cyan-100 font-sans px-4">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <img src="/background.png" alt="背景" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      {/* 質問 UI */}
      <div className="relative z-10 w-full max-w-md text-center space-y-10">
        <h2 className="text-lg md:text-xl font-bold text-cyan-100 drop-shadow-md tracking-wide w-fit mx-auto leading-relaxed">
          Q{q.id}. {q.text}
        </h2>

        <div className="space-y-4">
  {q.options.map((opt, index) => (
    <button
  key={index}
  onClick={() => handleSelect(opt.structure)}
  className="w-[320px] max-w-[80%] mx-auto px-20 py-18 border border-cyan-400 rounded-2xl bg-transparent hover:bg-cyan-800/30 transition-all duration-300 text-cyan-100 text-lg font-semibold tracking-wide shadow-md flex justify-center items-center gap-2"
    >
  ◉ {opt.text}
</button>
  ))}
</div>

        <div className="text-xs tracking-wide text-cyan-300 opacity-80">
          {current + 1} / {questions.length}
        </div>

        <footer className="pt-12 text-[10px] text-cyan-400 tracking-wide font-mono opacity-60">
          EVΛƎ構造観測プロトコル<br />
          E / V / Λ / Ǝ STRUCTURAL FIELD OBSERVATION
        </footer>
      </div>
    </div>
  );
}
