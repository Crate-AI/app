import type { NextPage, Metadata } from 'next';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import { UserDetails, DiscogsCollectionResponse, Release, MasterRelease } from '@/types/discogs';
import Waitlist from '@/components/Waitlist';

export const metadata: Metadata = {
  title: 'Crate',
  description: 'Smart digging 💿',
};


const Home: NextPage = async () => {

  return (
    <div>
      <main>
        <Waitlist />
      </main>
    </div>
  );
};

export default Home;