import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: '何かを決めるとき、あなたは？',
      options: [
        { label: 'まず動いてみる', layer: 'E' },
        { label: '感情を感じて選ぶ', layer: 'V' },
        { label: '情報を整理してから決める', layer: 'Λ' },
        { label: 'ふと降りてきた直感で選ぶ', layer: 'Ǝ' },
      ],
    },
    {
      id: 2,
      question: '今の自分に一番近いのは？',
      options: [
        { label: '突き動かされて動いている感じ', layer: 'E' },
        { label: '人の気持ちに敏感になっている感じ', layer: 'V' },
        { label: '頭で整理して進もうとしている感じ', layer: 'Λ' },
        { label: 'なぜか意味もなくわかる気がする', layer: 'Ǝ' },
      ],
    },
  ];

  const handleAnswer = (layer) => {
    const newAnswers = { ...answers, [questions[step].id]: layer };
    setAnswers(newAnswers);

    if (step + 1 >= questions.length) {
      const score = { E: 0, V: 0, Λ: 0, Ǝ: 0 };
      Object.values(newAnswers).forEach((layer) => {
        score[layer] = (score[layer] || 0) + 1;
      });

      const query = new URLSearchParams({
        E: score.E,
        V: score.V,
        L: score['Λ'], // Λ → L
        R: score['Ǝ'], // Ǝ → R
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
