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
以下のスコアをもとに、次の3つを出力してください：

1. 構造名：その人の構造傾向を象徴する名称（6文字以内）
2. 今月のテーマ：構造が向かう意識の方向性（詩的になりすぎないよに）（10〜20文字）
3. アドバイスコメント：
　- 200文字以内で、やさしく話しかけるような文体で書いてください。
　- たとえば「〜だね」「〜かも！」など、親しみのある語尾を使ってください。
　- 抽象的すぎず、具体的な行動や気づきを含めてください。
　- 一文でも二文でもOKですが、全体で200文字以内に収めてください。

出力形式（例）：
構造名：静かな灯火
テーマ：思考の輪郭をなぞる
アドバイス：今月は焦らず丁寧に。静けさの中にあなたらしさがあるはずだよ。言葉をひとつずつ、ゆっくりと並べてみて。

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
