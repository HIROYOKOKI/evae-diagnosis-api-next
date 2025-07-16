export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'メソッドは許可されていません' });
  }

  const { score } = req.body;

  if (!score) {
    return res.status(400).json({ error: 'スコアが送られていない' });
  }

  // ★ ここに一時的なAPIキーを直接書く（絶対にGitにPushしないでください）
  const OPENAI_API_KEY = 'sk-あなたのキーをここに';

  const prompt = `
あなたはリトルポジティブな性格診断AIです。

以下のスコア（E, V, Λ, Ǝ）からその人の気質や傾向を想像し、
本人が「なるほど」「当たってるかも」と思えるようなコメントを
やさしい日本語で返してください。

▼ 出力条件：
- わかりやすく、日常語で
- 少し励ますトーン
- 占い風だが詩的すぎない
- 文章は120文字以内に収めてください

スコア:
E: ${score.E}, V: ${score.V}, Λ: ${score["Λ"]}, Ǝ: ${score["Ǝ"]}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  }),
});

const data = await response.json();
console.log("🧠 OpenAI API Response:", JSON.stringify(data, null, 2));

const comment = data?.choices?.[0]?.message?.content?.trim();

if (!comment) {
  console.error("⚠️ GPTからコメントが返ってこなかったデータ:", data);
  return res.status(500).json({ error: 'コメントが取得できませんでした。' });
}

return res.status(200).json({ comment });

  } catch (err) {
    console.error('属性診断エラー:', err);
    return res.status(500).json({ error: `サーバーエラー: ${err.message}` });
  }
}
