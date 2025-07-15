// pages/api/gpt.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { score } = req.body;

  const prompt = `
あなたは「EVΛƎソウルレイヤー診断」のAI観測者です。
以下のスコアに基づいて、魂の構造的傾向とバランスについて詩的かつ洞察的なコメントを200文字以内で返答してください。

スコア:
E: ${score.E}, V: ${score.V}, Λ: ${score['Λ']}, Ǝ: ${score['Ǝ']}

▼ 出力形式：
- コメント本文のみ（余計な説明なし）
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "コメント生成に失敗しました";

  res.status(200).json({ comment: content });
}
