// tailwind.config.js
module.exports = {
content: [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
  './styles/**/*.{css}', // ← ✅ コメントアウトを外して有効に！
],
  safelist: [
    // 既存のsafelist
    'text-cyan-100',
    'text-cyan-300',
    'text-cyan-400',
    'text-lg',
    'text-base',
    'text-sm',
    'font-bold',
    'font-semibold',
    'font-sans',
    'text-left',
    'text-center',
    'w-full',
    'max-w-md',
    'px-6',
    'py-4',
    'py-5',
    'space-y-4',
    'space-y-10',
    'rounded-xl',
    'rounded-2xl',
    'border',
    'border-2',
    'border-cyan-300',
    'border-cyan-400',
    'bg-transparent',
    'bg-cyan-900/30',
    'bg-cyan-900/50',
    'hover:bg-cyan-800/20',
    'transition',
    'duration-200',
    'drop-shadow-md',
    'shadow-md',
    'tracking-wide',

    // 追加するクラス (カスタムラジオボタンと送信ボタン関連)
    'w-5', 'h-5', 'rounded-full', 'border-2', // カスタムラジオボタンのサイズとボーダー
    'w-2.5', 'h-2.5', 'bg-black', // カスタムラジオボタンの内部の丸
    'bg-cyan-500', 'border-cyan-500', // カスタムラジオボタンの選択時
    'border-cyan-600', 'hover:border-cyan-400', // カスタムラジオボタンの未選択時とホバー
    'flex', 'items-center', 'justify-center', 'space-x-2', 'cursor-pointer', // ラジオボタンのレイアウト
    'hidden', // デフォルトのラジオボタンを隠すため

    'py-3', 'bg-cyan-600', 'hover:bg-cyan-700', // 送信ボタンの背景色
    'rounded-full', 'text-white', 'font-bold', 'text-lg', // 送信ボタンのテキストと形状
    'shadow-lg', 'shadow-cyan-500/30', // 送信ボタンのシャドウ
    'mt-6', // 送信ボタンのマージン

    // フォーム入力フィールドのスタイル
    'border-b-2', 'focus:outline-none', 'focus:border-cyan-400',
    'placeholder-cyan-400/70', 'text-cyan-100', 'rounded-md',

    // その他のレイアウト関連
    'min-h-screen', 'flex', 'items-center', 'justify-center', 'px-4', 'py-8', 'overflow-hidden',
    'relative', 'z-10', 'max-w-lg', 'bg-black/40', 'border-cyan-700', 'rounded-3xl', 'p-8', 'md:p-10', 'space-y-8',
    'text-center', 'mb-6', 'text-4xl', 'font-extrabold', 'tracking-widest',
    'text-lg', 'tracking-wide', 'font-mono', 'opacity-80', 'mt-2', 'space-y-6',
    'block', 'text-sm', 'mb-2', 'flex-wrap', 'gap-4', 'flex-shrink-0', 'group', 'flex-grow', 'text-left',
    'absolute', 'inset-0', '-z-10', 'w-full', 'h-full', 'object-cover', 'opacity-60',
    'bg-gradient-to-t', 'from-transparent', 'via-transparent', 'to-cyan-900/10',
  ],
  safelistPatterns: [
    /^bg-cyan-/,
    /^border-cyan-/,
    /^text-cyan-/,
    /^rounded/,
    /^w-/, /^h-/,
    /^py-/, /^px-/,
    /^mt-/, /^mb-/, /^space-y-/,
    /^shadow/,
    /^opacity/,
    /^transition/,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      colors: {
        evae: {
          e: '#e94e77',
          v: '#3490dc',
          lambda: '#38a169',
          eMirror: '#9f7aea',
        },
      },
    },
  },
  plugins: [],
};
