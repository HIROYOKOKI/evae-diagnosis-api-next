export default function handler(req, res) {
  if (req.method === 'POST') {
    const { answer } = req.body;

    const result = answer === 'yes'
      ? 'あなたはEVΛƎ構造に共鳴しています'
      : '非共鳴です';

    return res.status(200).json({ result });
  } else {
    return res.status(200).json({ message: "診断APIは正常に動作しています" });
  }
}
