// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  safelist: [
    // テキストカラー
    'text-cyan-100',
    'text-cyan-300',
    'text-cyan-400',
    'text-lg',
    'text-base',
    'text-sm',

    // フォント
    'font-bold',
    'font-semibold',
    'font-sans',

    // 配置・余白・レイアウト
    'text-left',
    'text-center',
    'w-full',
    'max-w-md',
    'px-6',
    'py-4',
    'py-5',
    'space-y-4',
    'space-y-10',

    // ボタンデザイン・エフェクト
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

    // トランジション
    'transition',
    'duration-200',

    // シャドウ・効果
    'drop-shadow-md',
    'shadow-md',
    'tracking-wide',
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
