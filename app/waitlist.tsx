import { createFileRoute } from '@tanstack/react-router';
import { Waitlist } from '@/features/waitlist';

export const Route = createFileRoute('/waitlist')({
  component: WaitlistPage,
  head: () => ({
    meta: [
      { title: 'Crate' },
      { name: 'description', content: 'Smart digging 💿' },
    ],
  }),
});

function WaitlistPage() {
  return (
    <div>
      <main>
        <Waitlist />
      </main>
    </div>
  );
}
