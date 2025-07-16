// pages/api/gpt.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { score } = req.body;

    if (!score) {
      return res.status(400).json({ error: 'スコアが送られていません' });
    }

    const prompt = `
const prompt = `
あなたはソウルレイヤー構造診断AIです。

以下の構造スコアをもとに、その人の傾向や個性を【わかりやすく・やさしい日本語】で解説してください。
たとえば、どんな考え方をする人か・どんな行動傾向か・どこに強みがあるかを自然に伝えてください。
占いや心理テストのように、少し励ます雰囲気も加えてください。

文体は：
- 詩的すぎず
- 120文字以内
- 抽象ではなく“伝わる言葉”で

スコア:
E: ${E}, V: ${V}, Λ: ${Λ}, Ǝ: ${Ǝ}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ comment: `OpenAI APIエラー: ${errorData.error?.message || '不明なエラー'}` });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "コメント生成に失敗しました";

    res.status(200).json({ comment: content });

  } catch (err) {
    console.error("API処理中のエラー:", err);
    res.status(500).json({ comment: `サーバーエラー: ${err.message}` });
  }
}
