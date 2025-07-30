import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "物事を始めるとき、あなたの優先はどちらですか？",
    options: [
      { text: "気持ちや感覚を大事にする", structure: "E" },
      { text: "明確な目標や計画を重視する", structure: "V" },
    ],
  },
  // ...（他の質問は省略）
];

const DiagnosisResult = ({ score }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-cyan-100 bg-gray-900 p-4">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-lg">診断結果</h1>
    <p className="text-xl md:text-2xl mb-4 text-center">あなたのソウルレイヤーは...</p>
    <div className="bg-cyan-900/30 border border-cyan-700 rounded-xl p-6 shadow-xl w-full max-w-sm">
      <ul className="space-y-3">
        {Object.entries(score).map(([key, value]) => (
          <li key={key as string} className="text-lg flex justify-between items-center">
            <span className="font-semibold">{key}</span>
            <span className="text-xl text-cyan-300">{value}</span>
          </li>
        ))}
      </ul>
    </div>
    <p className="mt-8 text-center text-lg max-w-md">
      ここに、あなたのソウルレイヤーに関する詳細な解説と、パーソナライズされたアドバイスが表示されます。
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-10 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 rounded-full text-white font-bold text-lg shadow-lg"
    >
      もう一度診断する
    </button>
  </div>
);

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
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-6 pb-8 text-cyan-100 font-sans px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.png"
          alt="背景"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-900/10" />
      </div>

      <div className="relative z-20 w-full max-w-md flex justify-between items-center mb-10 px-4">
        <button className="p-2 rounded-full hover:bg-cyan-800/20 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-cyan-300">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lg font-bold text-cyan-200">Q.{q.id}</span>
        <button className="p-2 rounded-full hover:bg-cyan-800/20 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-cyan-300">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md text-center space-y-8 flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 drop-shadow-lg tracking-wide leading-relaxed px-4">
          {q.text}
        </h2>

        <div className="w-full space-y-5 px-4">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt.structure)}
              className="relative w-full py-6 border-2 border-cyan-500 rounded-xl bg-transparent
                         hover:bg-cyan-800/20 transition-all duration-300 text-center text-cyan-100 text-xl font-bold
                         shadow-lg shadow-cyan-500/20
                         flex items-center justify-start space-x-4 px-6 group"
            >
              <span className="w-6 h-6 border-2 border-cyan-400 rounded-full flex-shrink-0
                               group-hover:border-cyan-200 transition-colors duration-300" />
              <span className="flex-grow text-left text-base md:text-lg">{opt.text}</span>
            </button>
          ))}
        </div>

        <div className="text-sm tracking-wide text-cyan-300 opacity-80 mt-8">
          {current + 1} / {questions.length}
        </div>
      </div>

      <footer className="relative z-10 pt-12 text-center">
        <h1 className="text-3xl font-extrabold text-cyan-300 tracking-widest drop-shadow-lg">EVΛƎ</h1>
        <p className="text-sm text-cyan-400 tracking-wide font-mono opacity-80 mt-1">SOUL LAYER 診断</p>
      </footer>
    </div>
  );
}
