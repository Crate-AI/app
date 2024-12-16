import { Suspense } from 'react';
import HomeClient from './components/HomeClient';
import { LoadingSpinner } from '@/components/ui/loading';

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <HomeClient />
      </Suspense>
    </main>
  );
};

export default Home;
