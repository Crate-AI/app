import type { Metadata } from 'next';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import {
  UserDetails,
  DiscogsCollectionResponse,
  Release,
  MasterRelease,
} from '@/types/discogs';
import Waitlist from '@/components/Waitlist';

export const metadata: Metadata = {
  title: 'Crate',
  description: 'Smart digging 💿',
};

export default async function WaitlistPage() {
  return (
    <div>
      <main>
        <Waitlist />
      </main>
    </div>
  );
}
