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
    },
  },
  future: {
    respectDefaultRingColorOpacity: false,
    respectDefaultOpacity: false,
  },
  plugins: [],
};
