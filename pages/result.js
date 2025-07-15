import { useEffect, useState } from 'react';

export default function Result() {
  const [comment, setComment] = useState("");
  const [score] = useState({
    E: 3,
    V: 2,
    Λ: 1,
    Ǝ: 2,
  }); // ← 実際はdiagnosis.jsから受け渡す

  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      const data = await res.json();
      setComment(data.comment);
    };

    fetchComment();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>診断コメント</h2>
      <p>{comment || "診断中…"}</p>
    </div>
  );
}

