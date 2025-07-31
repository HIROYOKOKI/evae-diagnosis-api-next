import Head from 'next/head';
import SoulProfileForm from '@/components/SoulProfileForm';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>EVΛƎ | SOUL LAYER プロフィール診断</title>
        <meta name="description" content="あなたの魂の傾向を可視化するプロフィール診断フォーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <SoulProfileForm />
      </main>
    </>
  );
}
