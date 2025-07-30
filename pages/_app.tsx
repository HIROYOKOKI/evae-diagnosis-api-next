// pages/_app.tsx
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
