import { Suspense } from 'react';
import UserProfile from './userProfile';
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
        <UserProfile username={username} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
