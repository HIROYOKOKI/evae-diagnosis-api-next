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
以下のスコアをもとに、次の4つを生成してください：

1. 構造名（6文字以内）
2. 今月のテーマ（10〜20文字）
3. コメント（最大200文字）
   - 読む人が自分の構造を客観的に理解できるようなわかりやすい具体的な観測文
   - 語尾は「〜です」「〜ます」など安定した文体
4. アドバイス（最大200文字）
   - やさしく話しかけるような口調（例：「〜だね」「〜かも！」）
   - 抽象的すぎず、親しみと明るさを含むわかりやすい表現

出力形式：
構造名：◯◯◯
テーマ：◯◯◯
コメント：◯◯◯
アドバイス：◯◯◯

スコア:
E: ${E}, V: ${V}, Λ: ${Λ}, Ǝ: ${Ǝ}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0].message.content;
const message = typeof raw === 'string' ? raw : '';
const [commentLine, adviceLine] = message.split('\n').map((s: string) => s.trim());

    const name = lines.find(l => l.startsWith('構造名：'))?.replace('構造名：', '').trim() || '';
    const theme = lines.find(l => l.startsWith('テーマ：'))?.replace('テーマ：', '').trim() || '';
    const comment = lines.find(l => l.startsWith('コメント：'))?.replace('コメント：', '').trim() || '';
    const advice = lines.find(l => l.startsWith('アドバイス：'))?.replace('アドバイス：', '').trim() || '';

    return res.status(200).json({ name, theme, comment, advice });
  } catch (error) {
    return res.status(500).json({ error: 'コメントの生成に失敗しました' });
  }
}
