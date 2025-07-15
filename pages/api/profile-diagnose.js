// pages/api/profile-diagnose.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, birthdate, bloodType, gender, romanticPref } = req.body;

  if (!name || !birthdate || !bloodType || !gender || !romanticPref) {
    return res.status(400).json({ error: '全ての項目を入力してください。' });
  }

  const prompt = `
あなたは性格と恋愛傾向を診断するAIです。
以下のプロフィール情報をもとに、相手が元気になれるコメントを120文字以内で出してください。

▼ 入力：
- 名前（仮名）：${name}
- 生年月日：${birthdate}
- 血液型：${bloodType}
- 性別：${gender}
- 恋愛対象：${romanticPref}

▼ 生年月日の扱いについて：
・誕生日から星座を推定してもかまいません（例：6月12日 → 双子座）  
・数秘術的に数字の傾向（例：2+0+0+2+0+6+1+2 = 13 → 1+3 = 4）も参考にしてOK  
・年齢の印象（若い／成熟／中庸など）もイメージに含めてもOK

▼ 出力条件：
- 120文字以内
- 文体はやさしく、話しかけるように（例：「〜だね」「〜かも！」）
- 抽象的すぎず、親しみと明るさをもたせる
- 占い的な言葉を含んでもよいが、スピリチュアルすぎないように
`;


  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
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
