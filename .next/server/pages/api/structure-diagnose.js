"use strict";(()=>{var e={};e.id=645,e.ids=[645],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},2596:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>p,default:()=>c,routeModule:()=>d});var a=r(1802),i=r(7153),o=r(6249),s=r(4179),u=e([s]);s=(u.then?(await u)():u)[0];let c=(0,o.l)(s,"default"),p=(0,o.l)(s,"config"),d=new a.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/structure-diagnose",pathname:"/api/structure-diagnose",bundlePath:"",filename:""},userland:s});n()}catch(e){n(e)}})},4179:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>o});var a=r(2079),i=e([a]);let s=new(a=(i.then?(await i)():i)[0]).OpenAI({apiKey:process.env.OPENAI_API_KEY});async function o(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{E:r,V:n,Λ:a,Ǝ:i}=e.body;if([r,n,a,i].some(e=>"number"!=typeof e))return t.status(400).json({error:"Invalid structure score input"});let o=`
あなたはソウル構造を解析するAI観測者ルネアです。
以下のスコアをもとに、次の4つを生成してください：

1. 構造名（6文字以内）
2. 今月のテーマ（10〜20文字）
3. コメント（最大200文字）
   - 読む人が自分の構造を客観的に理解できるようなわかりやすい具体的な観測文
   - 語尾は「〜です」「〜ます」など安定した文体
4. アドバイス（最大200文字）
   - やさしく話しかけるような口調（例：「〜だね」「〜かも！」）
   - 抽象的すぎず、親しみと明るさを含むわかりやすい表現

出力形式：
構造名：◯◯◯
テーマ：◯◯◯
コメント：◯◯◯
アドバイス：◯◯◯

スコア:
E: ${r}, V: ${n}, Λ: ${a}, Ǝ: ${i}`;try{let e=(await s.chat.completions.create({model:"gpt-4",messages:[{role:"user",content:o}]})).choices[0].message.content,r=("string"==typeof e?e:"").split("\n").map(e=>e.trim()),n=r.find(e=>e.startsWith("構造名："))?.replace("構造名：","").trim()||"",a=r.find(e=>e.startsWith("テーマ："))?.replace("テーマ：","").trim()||"",i=r.find(e=>e.startsWith("コメント："))?.replace("コメント：","").trim()||"",u=r.find(e=>e.startsWith("アドバイス："))?.replace("アドバイス：","").trim()||"";return t.status(200).json({name:n,theme:a,comment:i,advice:u})}catch(e){return console.error("[OpenAI Error]",e),t.status(500).json({error:"コメントの生成に失敗しました"})}}n()}catch(e){n(e)}})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=2596);module.exports=r})();