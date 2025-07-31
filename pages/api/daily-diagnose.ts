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
以下の診断コメントに合わせて、${structure}タイプに対応した著名人の名言を1つ出力してください。

【条件】
- 日本語訳で30文字以内
- 文末は「。」で終える
- 最後に「（人物名）」をつける

【診断コメント】
「${comment}」

【著名人リスト】
${structure === 'E' ? 'スティーブ・ジョブズ、宮沢賢治、岡本太郎' :
  structure === 'V' ? 'アインシュタイン、ユング、ウォルト・ディズニー' :
  structure === 'Λ' ? '夏目漱石、フロイト、老子' :
  'カール・セーガン、道元、芥川龍之介'}
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
