// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  safelist: [
    'text-cyan-100',
    'text-cyan-300',
    'text-cyan-400',
    'bg-transparent',
    'drop-shadow-md',
    'shadow-md',
    'tracking-wide',
    'font-bold',
    'text-left',
    'rounded-xl',
    'transition',
    'duration-200',
    'w-full',
    'max-w-md',
    'space-y-10',
    'text-sm',
    'text-base',
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
