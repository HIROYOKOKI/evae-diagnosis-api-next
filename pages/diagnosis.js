import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    // ...（省略）同じでOK
  ];

  const handleAnswer = (layer) => {
    const newAnswers = { ...answers, [questions[step].id]: layer };
    setAnswers(newAnswers);

    if (step + 1 >= questions.length) {
      // 🔽 スコア計算してリダイレクト
      const score = { E: 0, V: 0, Λ: 0, Ǝ: 0 };
      Object.values(newAnswers).forEach((layer) => {
        score[layer] = (score[layer] || 0) + 1;
      });

      const query = new URLSearchParams({
        E: score.E,
        V: score.V,
        L: score['Λ'],
        R: score['Ǝ'],
      }).toString();

      router.push(`/result?${query}`);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ソウルレイヤー診断</h1>
      <p>{questions[step].question}</p>
      <div style={{ marginTop: '1rem' }}>
        {questions[step].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.layer)}
            style={{
              margin: '0.5rem',
              padding: '1rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
