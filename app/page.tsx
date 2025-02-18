import { Suspense } from 'react';
//::TODO: we need to find a way to get HomeClient architecture to not have to be in the root folder
import HomeClient from '@/app/home';
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
