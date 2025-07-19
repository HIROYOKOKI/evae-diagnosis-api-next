// pages/api/gpt-comment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type } = req.body;

  if (!['E', 'V', 'Λ', 'Ǝ'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const prompt = `
あなたはソウルレイヤー診断AIです。
選ばれた構造タイプ「${type}」に対して、以下のルールでコメントを返してください：

・その日、そのタイプを選んだ傾向をやさしく読み解く
・詩的すぎず、リトルポジティブで明るい励ましを含む
・全体で80〜120文字程度
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    res.status(200).json({ comment: message });
  } catch (error) {
    console.error('GPT fetch error:', error);
    res.status(500).json({ error: 'GPT comment fetch failed' });
  }
}
