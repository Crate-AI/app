import type { NextPage } from 'next';
import Head from 'next/head';
import HeroSection from '@/components/hero';
import Banner from '@/components/banner';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY as string,
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET as string,
});

StorageService.storagePath = process.env.NEXT_PUBLIC_STORAGE_PATH as string;

const Home: NextPage = async () => {
  const identity = await discogs.auth.getUserIdentity({});

  const profile = await fetch(`https://api.discogs.com/users/${identity.username}`);
  const data = await profile.json();


  return (
    <div>
      <Head>
        <title>Your Product Name</title>
        <meta name="description" content="Start building with the best tools." />
      </Head>
      <main>
        {identity ? (
          <Banner avatarUrl={data.avatar_url} username={data.username} />
        ) : (
          <Banner avatarUrl="/default-avatar.png" username="Guest" />
        )}
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;
