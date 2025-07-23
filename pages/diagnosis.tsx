import { useState } from 'react';
import { questions } from '../data/questions';
import DiagnosisResult from '../components/DiagnosisResult';

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
    <div className="min-h-screen relative flex justify-center items-center text-cyan-100 px-4 font-sans">
      {/* 背景画像 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 質問セクション */}
      <div className="w-full max-w-md text-center space-y-10">
        <h2 className="text-lg md:text-xl tracking-wide font-semibold drop-shadow-md">
          Q{q.id}. {q.text}
        </h2>

        <div className="space-y-4">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt.structure)}
              className="w-full px-6 py-4 border border-cyan-300 rounded-xl bg-transparent hover:bg-cyan-800/20 transition-all duration-200 text-left text-cyan-100 text-sm md:text-base tracking-wide"
            >
              ◉ {opt.text}
            </button>
          ))}
        </div>

        <div className="text-xs tracking-wider text-cyan-300 opacity-80">
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
