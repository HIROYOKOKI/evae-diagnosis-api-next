export type Question = {
  id: number;
  category: '外側' | '内側';
  text: string;
  options: {
    text: string;
    structure: 'E' | 'V' | 'Λ' | 'Ǝ';
  }[];
};

export const questions: Question[] = [
  {
    id: 1,
    category: '外側',
    text: '物事を始めるとき、あなたの優先はどちらですか？',
    options: [
      { text: '気持ちや感覚を大事にする', structure: 'E' },
      { text: '明確な目標や計画を重視する', structure: 'Λ' }
    ]
  },
  {
    id: 2,
    category: '外側',
    text: '他者と話す場面で、あなたは？',
    options: [
      { text: '感情や共感でつながろうとする', structure: 'E' },
      { text: '話の筋道や構造を考えながら話す', structure: 'Λ' }
    ]
  },
  {
    id: 3,
    category: '内側',
    text: '情報を集めるとき、どちらに惹かれますか？',
    options: [
      { text: '新しいアイデアや可能性', structure: 'V' },
      { text: '信頼できる理論や根拠', structure: 'Λ' }
    ]
  },
  {
    id: 4,
    category: '内側',
    text: '何かを表現するとき、あなたは？',
    options: [
      { text: 'イメージや感覚に従って自由に表す', structure: 'V' },
      { text: '相手に伝わるよう構造的に整理する', structure: 'Ǝ' }
    ]
  },
  {
    id: 5,
    category: '内側',
    text: '迷いや不安を感じる状況で、あなたは？',
    options: [
      { text: '気持ちを頼りに方向を決める', structure: 'E' },
      { text: '情報や前提を再確認して判断する', structure: 'Λ' }
    ]
  },
  {
    id: 6,
    category: '外側',
    text: '新しいことを始めるとき、あなたは？',
    options: [
      { text: 'ワクワクする未来を描く', structure: 'V' },
      { text: '今ある現実との整合性を考える', structure: 'Ǝ' }
    ]
  },
  {
    id: 7,
    category: '外側',
    text: '仕事に取り組む際、あなたは？',
    options: [
      { text: 'チームの雰囲気や感情の流れを重視する', structure: 'E' },
      { text: '役割や仕組みに注目する', structure: 'Ǝ' }
    ]
  },
  {
    id: 8,
    category: '内側',
    text: '創造的な活動をするとき、あなたの動機は？',
    options: [
      { text: '新しいものを発見する喜び', structure: 'V' },
      { text: '何かを伝えるための手段として', structure: 'Ǝ' }
    ]
  },
  {
    id: 9,
    category: '外側',
    text: '誰かに何かを言われたとき、あなたは？',
    options: [
      { text: '言葉の裏にある気持ちを感じる', structure: 'E' },
      { text: '言葉の意味や文脈を理解する', structure: 'Λ' }
    ]
  },
  {
    id: 10,
    category: '外側',
    text: '時間に追われているとき、あなたは？',
    options: [
      { text: '流れに身を任せて対応する', structure: 'E' },
      { text: '優先順位をつけて計画的に処理する', structure: 'Ǝ' }
    ]
  },
  {
    id: 11,
    category: '内側',
    text: '考えが煮詰まったとき、どうしますか？',
    options: [
      { text: '新しい視点や刺激を求める', structure: 'V' },
      { text: '一度整理して道筋を探す', structure: 'Λ' }
    ]
  },
  {
    id: 12,
    category: '外側',
    text: '他者との関係の中で、あなたは？',
    options: [
      { text: '相手の変化に敏感で共感的', structure: 'E' },
      { text: '距離や関係性の構造に着目する', structure: 'Ǝ' }
    ]
  },
  {
    id: 13,
    category: '内側',
    text: '発想のための準備として、あなたは？',
    options: [
      { text: 'とにかく試しながら考える', structure: 'V' },
      { text: '情報を集め、整理してから進める', structure: 'Λ' }
    ]
  },
  {
    id: 14,
    category: '内側',
    text: '日常生活で選択をするとき、あなたは？',
    options: [
      { text: '気分や感性に従って決める', structure: 'E' },
      { text: '意図や意味を意識して行動する', structure: 'Ǝ' }
    ]
  },
  {
    id: 15,
    category: '内側',
    text: '失敗したとき、あなたは？',
    options: [
      { text: '自分の気持ちに寄り添う', structure: 'E' },
      { text: '原因や仕組みを分析する', structure: 'Λ' }
    ]
  },
  {
    id: 16,
    category: '外側',
    text: '集団の中にいるとき、あなたは？',
    options: [
      { text: '流れや雰囲気を感じて動く', structure: 'E' },
      { text: '自分の立ち位置や役割を意識する', structure: 'Ǝ' }
    ]
  }
];
