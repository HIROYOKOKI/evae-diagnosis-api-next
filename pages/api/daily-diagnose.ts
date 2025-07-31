export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { structure } = req.body;

  if (!structure || !['E', 'V', 'Λ', 'Ǝ'].includes(structure)) {
    return res.status(400).json({ error: 'Invalid structure code' });
  }

  const commentPrompt = `
あなたは「ソウルレイヤー診断の診断コメント」を生み出すAIです。

以下の構造コード（E, V, Λ, Ǝ）に応じて、
ユーザーの状態を優しくポジティブに説明する診断コメントを日本語で1文だけ出力してください。

● 構造: ${structure}
● 文体:  少し具体化して、共感しやすやさしく、前向きに
● 文字数: 120文字以内
`;

  const response1 = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: commentPrompt }],
      temperature: 0.7,
    }),
  });

  const comment = (await response1.json()).choices?.[0]?.message?.content?.trim();

  const proverbPrompt = `
以下の診断コメントに合った格言（アドバイス）を日本語で1文だけ作ってください。

● 診断コメント: 「${comment}」

【条件】
- 30文字以内
- 文末に「。」をつける
- 静かな励まし、気づき、余韻のある言葉で
- 現実的・励まし寄りの語り口に調整
`;

  const response2 = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: proverbPrompt }],
      temperature: 0.7,
    }),
  });

  const proverb = (await response2.json()).choices?.[0]?.message?.content?.trim();

  return res.status(200).json({ comment, proverb });
}
