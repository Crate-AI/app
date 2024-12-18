'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { LoadingSpinner } from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import TrackList from '@/components/Features/TrackList/TrackList';

interface UserProfileProps {
  username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  const { userIdentity } = useAuthStore();
  const router = useRouter();

  if (!userIdentity || userIdentity.username !== username) {
    router.replace('/');
    return !userIdentity ? <LoadingSpinner /> : null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TrackList />
    </div>
  );
};

export default UserProfile;
