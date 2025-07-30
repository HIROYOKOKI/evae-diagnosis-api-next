// pages/_app.tsx
import '../styles/globals.css'; // ここでglobals.cssをインポート

import type { AppProps } from 'next/app'; // AppPropsの型定義をインポート

// アプリケーションのルートコンポーネント
// export default はこの関数に対して一度だけ記述します。
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; // MyAppをデフォルトエクスポート
