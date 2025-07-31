import Head from 'next/head';
import SoulProfileForm from '../components/SoulProfileForm'; // ← ここを修正！

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>EVΛƎ | SOUL LAYER プロフィール診断</title>
      </Head>
      <main>
        <SoulProfileForm />
      </main>
    </>
  );
}
