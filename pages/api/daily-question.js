export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `
あなたは「ソウルレイヤー診断用の1問だけのデイリー設問」を生成するAIです。
以下の形式で、JSONとして問いを1つ生成してください。

出力形式:
{
  "question": "今日のあなたは、どんな感覚に近いですか？",
  "choices": [
    { "label": "A1", "text": "落ち着いていて、すぐ動けそう", "structure": "E" },
    { "label": "A2", "text": "誰かとつながりたい気分", "structure": "V" },
    { "label": "A3", "text": "考え事を整理したい", "structure": "Λ" },
    { "label": "A4", "text": "何か新しい刺激に触れたい", "structure": "Ǝ" }
  ]
}

必ず上記の形式で返してください（ダブルクォート付きのJSON）。
今日の日付：${today}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const content = response.status === 200 ? (await response.json()).choices?.[0]?.message?.content : null;

    if (!content) throw new Error('Empty response');

    const parsed = JSON.parse(content);
    res.status(200).json(parsed);
  } catch (error) {
    console.error('Error fetching daily question:', error);
    res.status(500).json({ error: 'Failed to fetch structured question' });
  }
}
