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
あなたは自己理解のための「性格・恋愛傾向診断」を行うAIです。
以下の5つの情報をもとに、相手が前向きな気持ちになれるようなコメントを
「やさしい」「わかりやすい」「ちょっと嬉しくなる」感じで書いてください。

▼ 入力データ：
- 名前（仮名）：${name}
- 生年月日：${birthdate}
- 血液型：${bloodType}
- 性別：${gender}
- 恋愛対象：${romanticPref}

▼ 出力条件：
- 文体は敬語ではなく、親しみのある口調（例：「〜だね」「〜かも」）
- 長すぎない（120文字以内）
- 抽象的すぎず、伝わる具体的な言葉で
- 少し明るく、励ますような雰囲気で
- 占いと診断の中間のような軽やかさで
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
