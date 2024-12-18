'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { LoadingSpinner } from '@/components/ui/loading';
import DiscogsSearch from '@/components/Features/Search/DiscogsSearch';

interface UserProfileProps {
  username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  const { userIdentity } = useAuthStore();

  if (!userIdentity) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DiscogsSearch />
    </div>
  );
};

export default UserProfile;
