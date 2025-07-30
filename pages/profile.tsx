    import { useState, ChangeEvent, FormEvent } from 'react';

    // フォームデータの型定義
    interface FormData {
      name: string;
      birthdate: string;
      bloodType: string;
      gender: string;
      romanticPref: string;
    }

    export default function SoulProfileForm() {
      // フォームデータの状態管理
      const [formData, setFormData] = useState<FormData>({
        name: "",
        birthdate: "",
        bloodType: "",
        gender: "",
        romanticPref: "",
      });

      // フォーム入力値の変更をハンドル
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      // フォーム送信をハンドル
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // APIルートへのデータ送信
          const res = await fetch("/api/profile-diagnose", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          // レスポンスの処理
          const data = await res.json();
          // 実際はここで結果画面への遷移や、ユーザーへのフィードバック表示を行う
          console.log("プロフィール診断結果:", data.comment);
          // 例: 成功メッセージをユーザーに表示
          alert("プロフィールが保存されました！"); // 開発用のアラート。本番ではモーダル等に置き換える
        } catch (error) {
          console.error("プロフィール診断エラー:", error);
          // 例: エラーメッセージをユーザーに表示
          alert("プロフィールの保存に失敗しました。もう一度お試しください。"); // 開発用のアラート
        }
      };

      return (
        <div className="relative min-h-screen flex items-center justify-center text-cyan-100 font-sans px-4 py-8 overflow-hidden">
          {/* 背景要素 */}
          <div className="absolute inset-0 -z-10">
            {/* 背景画像 (placeholderを使用) */}
            <img
              src="https://placehold.co/1920x1080/0A0A2A/E0FFFF?text=Space+Background"
              alt="背景"
              className="w-full h-full object-cover"
            />
            {/* 背景を暗くし、微妙な光沢を加えるためのオーバーレイ */}
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-900/10" />
          </div>

          {/* メインコンテンツエリア */}
          <div className="relative z-10 w-full max-w-lg bg-black/40 border border-cyan-700 rounded-3xl p-8 md:p-10 shadow-xl shadow-cyan-500/20 space-y-8">
            {/* ロゴエリア */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-cyan-300 tracking-widest drop-shadow-lg">
                EVΛƎ
              </h1>
              <p className="text-lg text-cyan-400 tracking-wide font-mono opacity-80 mt-2">
                SOUL LAYER プロフィール
              </p>
            </div>

            {/* プロフィール入力フォーム */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 仮名 */}
              <div>
                <label htmlFor="name" className="block text-cyan-200 text-sm font-bold mb-2">
                  仮名：
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-cyan-600 text-cyan-100 placeholder-cyan-400/70 focus:outline-none focus:border-cyan-400 transition-colors duration-300 rounded-md"
                  placeholder="あなたの仮名"
                />
              </div>

              {/* 生年月日 */}
              <div>
                <label htmlFor="birthdate" className="block text-cyan-200 text-sm font-bold mb-2">
                  生年月日：
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-cyan-600 text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors duration-300 rounded-md"
                />
              </div>

              {/* 血液型 */}
              <div>
                <label className="block text-cyan-200 text-sm font-bold mb-2">
                  血液型：
                </label>
                <div className="flex flex-wrap gap-4">
                  {["A", "B", "O", "AB"].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bloodType"
                        value={type}
                        onChange={handleChange}
                        required
                        className="hidden" // デフォルトのラジオボタンを非表示に
                      />
                      {/* カスタムラジオボタン */}
                      <span className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                       ${formData.bloodType === type ? 'bg-cyan-500 border-cyan-500' : 'border-cyan-600 hover:border-cyan-400'}`}>
                        {formData.bloodType === type && (
                          <span className="w-2.5 h-2.5 bg-black rounded-full" />
                        )}
                      </span>
                      <span className="text-cyan-100 text-base">{type}型</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 性別 */}
              <div>
                <label className="block text-cyan-200 text-sm font-bold mb-2">
                  性別：
                </label>
                <div className="flex flex-wrap gap-4">
                  {["男性", "女性", "その他"].map((g) => (
                    <label key={g} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        onChange={handleChange}
                        required
                        className="hidden"
                      />
                      <span className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                       ${formData.gender === g ? 'bg-cyan-500 border-cyan-500' : 'border-cyan-600 hover:border-cyan-400'}`}>
                        {formData.gender === g && (
                          <span className="w-2.5 h-2.5 bg-black rounded-full" />
                        )}
                      </span>
                      <span className="text-cyan-100 text-base">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 恋愛対象 */}
              <div>
                <label className="block text-cyan-200 text-sm font-bold mb-2">
                  恋愛対象：
                </label>
                <div className="flex flex-wrap gap-4">
                  {["異性", "同性", "すべての性", "無性愛"].map((r) => (
                    <label key={r} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="romanticPref"
                        value={r}
                        onChange={handleChange}
                        required
                        className="hidden"
                      />
                      <span className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                       ${formData.romanticPref === r ? 'bg-cyan-500 border-cyan-500' : 'border-cyan-600 hover:border-cyan-400'}`}>
                        {formData.romanticPref === r && (
                          <span className="w-2.5 h-2.5 bg-black rounded-full" />
                        )}
                      </span>
                      <span className="text-cyan-100 text-base">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 rounded-full text-white font-bold text-lg shadow-lg shadow-cyan-500/30 mt-6"
              >
                プロフィールを保存
              </button>
            </form>
          </div>
        </div>
      );
    }
    
