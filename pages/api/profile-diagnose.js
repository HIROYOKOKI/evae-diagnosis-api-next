// pages/api/profile-diagnose.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, birthdate, bloodType, gender, romanticPref } = req.body;

  // 入力バリデーション
  if (!name || !birthdate || !bloodType || !gender || !romanticPref) {
    return res.status(400).json({ error: '全ての項目を入力してください。' });
  }

  // GPTプロンプト生成
  const prompt = `
あなたは魂と心の傾向を診断するAIです。
以下の個人情報をもとに、その人の性格・恋愛傾向・心のバランスについて、
やさしく、わかりやすく、120文字以内でコメントしてください。

▼ 入力データ：
- 名前（仮名）：${name}
- 生年月日：${birthdate}
- 血液型：${bloodType}
- 性別：${gender}
- 恋愛対象：${romanticPref}

※占いや診断のような口調で、ポジティブに表現してください。
※専門用語や難しい言い回しは避け、詩的すぎず、伝わる言葉で。
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // 必要に応じて gpt-3.5-turbo などに変更可
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: `OpenAI APIエラー: ${err.error?.message || '不明なエラー'}` });
    }

    const data = await response.json();
    const comment = data.choices?.[0]?.message?.content?.trim() || "診断コメントが生成できませんでした。";

    return res.status(200).json({ comment });

  } catch (error) {
    console.error("GPT API呼び出しエラー:", error);
    return res.status(500).json({ error: `サーバーエラー: ${error.message}` });
  }
}
