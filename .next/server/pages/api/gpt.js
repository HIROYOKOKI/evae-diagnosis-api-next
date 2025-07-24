"use strict";(()=>{var e={};e.id=207,e.ids=[207],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},4869:(e,t,r)=>{r.r(t),r.d(t,{config:()=>l,default:()=>u,routeModule:()=>c});var n={};r.r(n),r.d(n,{default:()=>a});var o=r(1802),s=r(7153),i=r(6249);async function a(e,t){if("POST"!==e.method)return t.status(405).json({error:"メソッドは許可されていません"});let{score:r}=e.body;if(!r)return t.status(400).json({error:"スコアが送られていない"});let n=`
あなたはリトルポジティブな性格診断AIです。

以下のスコア（E, V, Λ, Ǝ）からその人の気質や傾向を想像し、
本人が「なるほど」「当たってるかも」と思えるようなコメントを
やさしい日本語で返してください。

▼ 出力条件：
- わかりやすく、日常語で
- 少し励ますトーン
- 占い風だが詩的すぎない
- 文章は120文字以内に収めてください

スコア:
E: ${r.E}, V: ${r.V}, Λ: ${r["Λ"]}, Ǝ: ${r["Ǝ"]}
`;try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer sk-あなたのキーをここに`},body:JSON.stringify({model:"gpt-4",messages:[{role:"user",content:n}],max_tokens:150})}),r=await e.json();console.log("\uD83E\uDDE0 OpenAI API Response:",JSON.stringify(r,null,2));let o=r?.choices?.[0]?.message?.content?.trim();if(!o)return console.error("⚠️ GPTからコメントが返ってこなかったデータ:",r),t.status(500).json({error:"コメントが取得できませんでした。"});return t.status(200).json({comment:o})}catch(e){return console.error("属性診断エラー:",e),t.status(500).json({error:`サーバーエラー: ${e.message}`})}}let u=(0,i.l)(n,"default"),l=(0,i.l)(n,"config"),c=new o.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/gpt",pathname:"/api/gpt",bundlePath:"",filename:""},userland:n})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=4869);module.exports=r})();