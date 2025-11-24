import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import HomeClient from '@/features/home/HomeClient';
import { LoadingSpinner } from '@/components/ui/loading';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <HomeClient />
      </Suspense>
    </main>
  );
}
