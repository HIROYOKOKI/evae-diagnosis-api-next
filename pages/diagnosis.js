// pages/diagnosis.js
import { useState } from 'react';

const questions = [
  {
    text: 'Q1. あなたが何かを理解したいとき、まずどんな行動をとりますか？',
    options: [
      { label: 'A', text: '実際に見たり、体験して確かめる', structure: 'E' },
      { label: 'B', text: '他の人の気持ちや空気を感じ取る', structure: 'V' },
      { label: 'C', text: '背景や仕組みを論理的に整理する', structure: 'Λ' },
      { label: 'D', text: '常識を逆から見て、新しい視点を考える', structure: 'Ǝ' },
    ],
  },
  {
    text: 'Q2. 人との関わりで「大事にしたい」と感じることは？',
    options: [
      { label: 'A', text: '物事がスムーズに運ぶ仕組みやバランス', structure: 'E' },
      { label: 'B', text: '相手の感情や空気を感じ取ること', structure: 'V' },
      { label: 'C', text: '相手が本当に言いたいことの“構造”を掴むこと', structure: 'Λ' },
      { label: 'D', text: '言葉では表せないけれど“ひらめき”でつながること', structure: 'Ǝ' },
    ],
  },
  {
    text: 'Q3. あなたが「これは自分らしい考え方だ」と感じるのは？',
    options: [
      { label: 'A', text: '目の前にあることを理論的に整理して理解する', structure: 'E' },
      { label: 'B', text: '感覚的に「合う／合わない」で判断する', structure: 'V' },
      { label: 'C', text: 'なぜそれが正しいのか、自分の中で深く定義してみる', structure: 'Λ' },
      { label: 'D', text: '一度すべてを壊してから、ゼロから再構築する', structure: 'Ǝ' },
    ],
  },
  {
    text: 'Q4. あなたが一番“ワクワクする瞬間”はどんなときですか？',
    options: [
      { label: 'A', text: '現実の中に新しい法則や秩序を見つけたとき', structure: 'E' },
      { label: 'B', text: '誰かと気持ちが通じたとき', structure: 'V' },
      { label: 'C', text: '考え方や概念が深くつながったとき', structure: 'Λ' },
      { label: 'D', text: '世界の見え方が一気に変わるような発見をしたとき', structure: 'Ǝ' },
    ],
  },
  {
    text: 'Q5. あなたが「自分らしさ」を感じるのは、どんな状態にいるときですか？',
    options: [
      { label: 'A', text: '落ち着いて周囲を観察し、秩序を保っているとき', structure: 'E' },
      { label: 'B', text: '感情の動きや他人とのつながりを感じているとき', structure: 'V' },
      { label: 'C', text: '物事の意味や構造に自分の意志を通しているとき', structure: 'Λ' },
      { label: 'D', text: '常識がくつがえされて、新しい視点が開けるとき', structure: 'Ǝ' },
    ],
  },
];

export default function Diagnosis() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ E: 0, V: 0, Λ: 0, Ǝ: 0 });
  const [finished, setFinished] = useState(false);
  const [comment, setComment] = useState('');

  const handleSelect = async (structure) => {
    const newScores = { ...scores, [structure]: scores[structure] + 1 };
    setScores(newScores);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      const res = await fetch('/api/structure-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScores),
      });
      const data = await res.json();
      setComment(data.comment);
    }
  };

  if (finished) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">あなたのソウルレイヤー診断結果</h2>
        <p className="bg-gray-100 p-4 rounded shadow">{comment}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
  <div className="p-6 max-w-xl mx-auto">
    <h1 className="text-red-500 bg-white text-2xl p-4">
  ✅ Tailwind 反映チェック
</h1>
    <h2 className="text-red-500 font-bold text-2xl mb-6">これはテスト表示です</h2>
    <ul className="space-y-4">
      {q.options.map((opt) => (
        <li key={opt.label}>
          <button
            className="w-full text-left border p-4 rounded hover:bg-gray-100"
            onClick={() => handleSelect(opt.structure)}
          >
            <strong>{opt.label}.</strong> {opt.text}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
