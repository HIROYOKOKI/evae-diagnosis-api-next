"use strict";(()=>{var e={};e.id=384,e.ids=[384],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},3817:(e,t,n)=>{n.r(t),n.d(t,{config:()=>d,default:()=>u,routeModule:()=>l});var o={};n.r(o),n.d(o,{default:()=>s});var r=n(1802),i=n(7153),a=n(6249);async function s(e,t){if("GET"!==e.method)return t.status(405).json({error:"Method not allowed"});let n=new Date().toISOString().slice(0,10),o=`
あなたは「ソウルレイヤー診断用の1問だけのデイリー設問」を生成するAIです。
以下の形式で問いを作ってください。

Q: 今日のあなたは、どんな感覚に近いですか？
A1: 落ち着いていて、すぐ動けそう（E）
A2: 誰かとつながりたい気分（V）
A3: 考え事を整理したい（Λ）
A4: 何か新しい刺激に触れたい（Ǝ）

出力形式は上記のように
Q:（設問）＋ A1〜A4を返してください。
今日の日付：${n}
`;try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4",messages:[{role:"user",content:o}]})}),n=await e.json(),r=n.choices?.[0]?.message?.content;t.status(200).json({question:r})}catch(e){console.error("Error fetching daily question:",e),t.status(500).json({error:"Failed to fetch question"})}}let u=(0,a.l)(o,"default"),d=(0,a.l)(o,"config"),l=new r.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/daily-question",pathname:"/api/daily-question",bundlePath:"",filename:""},userland:o})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=3817);module.exports=n})();