// pages/api/structure-diagnose.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST only.' });
  }

  const { E, V, Λ, Ǝ } = req.body;

  if (
    typeof E !== 'number' ||
    typeof V !== 'number' ||
    typeof Λ !== 'number' ||
    typeof Ǝ !== 'number'
  ) {
    return res.status(400).json({ error: 'スコアが不正です' });
  }

  const prompt = `
あなたはソウルレイヤー構造診断AIです。
以下の構造スコアをもとに、その人の魂の傾向をやさしく・わかりやすく診断してください。
リトルポジティブ（少し詩的で明るい）文体で120文字以内に収めてください。

スコア:
E: ${E}, V: ${V}, Λ: ${Λ}, Ǝ: ${Ǝ}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: `OpenAI APIエラー: ${errorData.error?.message}` });
    }

    const data = await response.json();
    const comment = data?.choices?.[0]?.message?.content?.trim();

    if (!comment) {
      return res.status(500).json({ error: '診断コメントが取得できませんでした。' });
    }

    return res.status(200).json({ comment });
  } catch (err) {
    console.error('構造診断エラー:', err);
    return res.status(500).json({ error: `サーバーエラー: ${err.message}` });
  }
}
