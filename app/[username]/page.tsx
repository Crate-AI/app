import { Suspense } from 'react';
import UserProfileClient from './components/UserProfileClient';
import { LoadingSpinner } from '@/components/ui/loading';

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  const { username } = params;

  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfileClient username={username} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
