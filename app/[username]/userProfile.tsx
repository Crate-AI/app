'use client';

import { useAuthStore } from '@/lib/store/authStore';
import CrateExplorer from '@/components/Features/CrateExplorer/CrateExplorer';
import { redirect } from 'next/navigation';

interface UserProfileProps {
  username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  const { userIdentity } = useAuthStore();

  if (!userIdentity) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CrateExplorer />
    </div>
  );
};

export default UserProfile;
