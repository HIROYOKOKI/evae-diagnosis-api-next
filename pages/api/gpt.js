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
あなたは「EVΛƎソウルレイヤー診断」のAI観測者です。
以下のスコアに基づいて、魂の構造的傾向とバランスについて詩的かつ洞察的なコメントを200文字以内で返答してください。

スコア:
E: ${score.E}, V: ${score.V}, Λ: ${score['L']}, Ǝ: ${score['R']}

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
