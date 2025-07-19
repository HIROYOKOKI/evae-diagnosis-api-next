// pages/api/daily-question.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `
あなたは「ソウルレイヤー診断用の1問だけのデイリー設問」を生成するAIです。
以下の形式で問いを作ってください。

Q: 今日のあなたは、どんな感覚に近いですか？
A1: 落ち着いていて、すぐ動けそう（E）
A2: 誰かとつながりたい気分（V）
A3: 考え事を整理したい（Λ）
A4: 何か新しい刺激に触れたい（Ǝ）

出力形式は上記のように
Q:（設問）＋ A1〜A4を返してください。
今日の日付：${today}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const question = data.choices?.[0]?.message?.content;

    res.status(200).json({ question });
  } catch (error) {
    console.error('Error fetching daily question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
}
