"use strict";(()=>{var e={};e.id=974,e.ids=[974],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5529:(e,t,r)=>{r.r(t),r.d(t,{config:()=>d,default:()=>u,routeModule:()=>l});var n={};r.r(n),r.d(n,{default:()=>i});var o=r(1802),s=r(7153),a=r(6249);async function i(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{name:r,birthdate:n,bloodType:o,gender:s,romanticPref:a}=e.body;if(!r||!n||!o||!s||!a)return t.status(400).json({error:"全ての項目を入力してください。"});let i=`
あなたは性格と恋愛傾向を診断するAIです。
以下のプロフィール情報をもとに、相手が元気になれるコメントを120文字以内で出してください。

▼ 入力：
- 名前（仮名）：${r}
- 生年月日：${n}
- 血液型：${o}
- 性別：${s}
- 恋愛対象：${a}

▼ 生年月日の扱いについて：
・誕生日から星座を推定してもかまいません（例：6月12日 → 双子座）  
・数秘術的に数字の傾向（例：2+0+0+2+0+6+1+2 = 13 → 1+3 = 4）も参考にしてOK  
・年齢の印象（若い／成熟／中庸など）もイメージに含めてもOK

▼ 出力条件：
- 120文字以内
- 文体はやさしく、話しかけるように（例：「〜だね」「〜かも！」）
- 抽象的すぎず、親しみと明るさをもたせる
- 占い的な言葉を含んでもよいが、スピリチュアルすぎないように
`;try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:"gpt-4",messages:[{role:"user",content:i}],max_tokens:200})});if(!e.ok){let r=await e.json();return t.status(500).json({error:`OpenAI APIエラー: ${r.error?.message||"不明なエラー"}`})}let r=await e.json(),n=r.choices?.[0]?.message?.content?.trim()||"診断コメントが生成できませんでした。";return t.status(200).json({comment:n})}catch(e){return console.error("GPT API呼び出しエラー:",e),t.status(500).json({error:`サーバーエラー: ${e.message}`})}}let u=(0,a.l)(n,"default"),d=(0,a.l)(n,"config"),l=new o.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/profile-diagnose",pathname:"/api/profile-diagnose",bundlePath:"",filename:""},userland:n})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=5529);module.exports=r})();