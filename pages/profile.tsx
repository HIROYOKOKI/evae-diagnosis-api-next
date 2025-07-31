<input
  type="text"
  name="name"
  placeholder="あなたの名前"
  value={formData.name}
  onChange={handleChange}
/>

<input
  type="date"
  name="birthdate"
  value={formData.birthdate}
  onChange={handleChange}
/>

<select name="bloodType" value={formData.bloodType} onChange={handleChange}>
  <option value="">血液型を選択</option>
  <option value="A">A型</option>
  <option value="B">B型</option>
  <option value="O">O型</option>
  <option value="AB">AB型</option>
</select>

{/* 他の項目も同様に */ }

<button type="submit" className="bg-blue-500 text-white p-2 rounded">
  プロフィールを送信
</button>
