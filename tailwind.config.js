// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  safelist: [
  { pattern: /text-cyan-.*/ },
  { pattern: /bg-cyan-.*/ },
  { pattern: /hover:bg-cyan-.*/ },
  { pattern: /border-cyan-.*/ },
  { pattern: /rounded-.*/ },
  { pattern: /text-.*/ },
  { pattern: /bg-.*/ },
  { pattern: /opacity-.*/ },         // 追加
  { pattern: /transition.*/ },       // 追加
  { pattern: /duration-.*/ },        // 追加
  'text-center',
  'font-sans',
  'font-bold',
  'tracking-wide',
  'drop-shadow-md',
  'shadow-md',
  'relative',
  'z-10',
  'w-full',
  'max-w-md',
  'space-y-10',
  'absolute',                       // 追加
  'inset-0',                        // 追加
  'object-cover',                   // 追加
  'bg-black',                       // 追加
  'text-white',                     // 安全のため追加
]
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
        cyan: {
          100: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          800: '#155e75',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        trackingInExpand: {
          '0%': { letterSpacing: '-0.5em', opacity: '0' },
          '40%': { opacity: '0.6' },
          '100%': { letterSpacing: 'normal', opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        wiggle: 'wiggle 0.4s ease-in-out infinite',
        slideInRight: 'slideInRight 0.6s ease-out forwards',
        'tracking-in-expand': 'trackingInExpand 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
