// pages/profile.js
import { useState } from "react";

export default function SoulProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    bloodType: "",
    gender: "",
    romanticPref: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/profile-diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.comment); // 実際は結果画面に遷移して表示
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>仮名：</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br />

      <label>生年月日：</label>
      <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required /><br />

      <label>血液型：</label><br />
      {["A", "B", "O", "AB"].map((type) => (
        <label key={type}>
          <input type="radio" name="bloodType" value={type} onChange={handleChange} required />
          {type}型
        </label>
      ))}<br />

      <label>性別：</label><br />
      {["男性", "女性", "その他"].map((g) => (
        <label key={g}>
          <input type="radio" name="gender" value={g} onChange={handleChange} required />
          {g}
        </label>
      ))}<br />

      <label>恋愛対象：</label><br />
      {["異性", "同性", "すべての性", "無性愛"].map((r) => (
        <label key={r}>
          <input type="radio" name="romanticPref" value={r} onChange={handleChange} required />
          {r}
        </label>
      ))}<br /><br />

      <button type="submit">診断する</button>
    </form>
  );
}
