// pages/profile.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  birthdate: string;
  bloodType: string;
  gender: string;
  romanticPref: string;
}

export default function SoulProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthdate: '',
    bloodType: '',
    gender: '',
    romanticPref: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl = `${window.location.origin}/api/profile-diagnose`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API response not OK: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log('プロフィール診断結果:', data.comment);
      alert('プロフィールが保存されました！');
    } catch (error: any) {
      console.error('プロフィール診断エラー:', error);
      alert(`プロフィールの保存に失敗しました。詳細: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="birthdate" value={formData.birthdate} onChange={handleChange} />
      {/* ここに他のフィールドを追加 */}
      <button type="submit">送信</button>
    </form>
  );
}
