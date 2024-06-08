import type { NextPage } from 'next';
import Head from 'next/head';
import HeroSection from '@/components/hero';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Your Product Name</title>
        <meta name="description" content="Start building with the best tools." />
      </Head>
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;

