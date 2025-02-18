import { Suspense } from 'react';
import UserProfile from './userProfile';
import { LoadingSpinner } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  const { username } = params;
  return (
    <main>
      <div className="flex gap-4 mb-6 justify-center">
        <Link href={`/${username}/collection`}>
          <Button variant="default">Collection View</Button>
        </Link>
        <Link href={`/${username}/tracks`}>
          <Button variant="default">DJ View</Button>
        </Link>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfile username={username} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
