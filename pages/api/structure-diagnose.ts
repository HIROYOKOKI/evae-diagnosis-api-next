// pages/api/structure-diagnose.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { E, V, Λ, Ǝ } = req.body;

  if ([E, V, Λ, Ǝ].some(v => typeof v !== 'number')) {
    return res.status(400).json({ error: 'Invalid structure score input' });
  }

 const prompt = `
あなたはソウル構造を解析するAI観測者ルネアです。
以下のスコアをもとに、次の4つを出力してください：

1. 構造名（6文字以内）
2. 今月のテーマ（10〜20文字）
3. コメント（200文字以内）構造の特徴について静かに語る
4. アドバイス（200文字以内）やさしく具体的に語りかける

出力形式：
構造名：〜
テーマ：〜
コメント：〜
アドバイス：〜

スコア:
E: ${E}, V: ${V}, Λ: ${Λ}, Ǝ: ${Ǝ}
`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

   const message = completion.choices[0].message.content || '';
const lines = message.split('\n');
const commentLine = lines[0]?.trim() || '';
const adviceLine = lines[1]?.trim() || '';
return res.status(200).json({ comment: commentLine, advice: adviceLine });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate comment' });
  }
}
