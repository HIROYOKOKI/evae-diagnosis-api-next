/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
  colors: {
    evae: {
      e: '#e94e77',
      v: '#3490dc',
      lambda: '#38a169',
      eMirror: '#9f7aea',
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
}

    },
  },
  future: {
    respectDefaultRingColorOpacity: false,
    respectDefaultOpacity: false,
  },
  plugins: [],
};
// tailwind.config.js のルート階層に追記
safelist: [
  'animate-fadeInUp',
  'animate-wiggle',
  'animate-slideInRight',
  'animate-tracking-in-expand',
  'hover:animate-wiggle',
],
