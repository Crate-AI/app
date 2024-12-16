'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { LoadingSpinner } from '@/components/ui/loading';

interface UserProfileClientProps {
  username: string;
}

const UserProfileClient = ({ username }: UserProfileClientProps) => {
  const { userIdentity, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const isValidUser =
      isAuthenticated &&
      userIdentity?.username &&
      userIdentity.username.toLowerCase() === username.toLowerCase();

    if (!isValidUser) {
      router.replace('/');
    }
  }, [isAuthenticated, userIdentity, username, router]);

  if (!isAuthenticated || !userIdentity) {
    return <LoadingSpinner />;
  }

  const isValidUser =
    userIdentity.username.toLowerCase() === username.toLowerCase();
  if (!isValidUser) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {userIdentity.username}!</h1>
    </div>
  );
};

export default UserProfileClient;
