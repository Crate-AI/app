import type { Metadata } from 'next';
import Waitlist from '@/components/Features/Waitlist';

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
