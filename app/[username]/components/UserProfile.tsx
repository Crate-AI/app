'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { LoadingSpinner } from '@/components/ui/loading';

interface UserProfileClientProps {
  username: string;
}

const UserProfileClient = ({ username }: UserProfileClientProps) => {
  const { userIdentity } = useAuthStore();
  const router = useRouter();

    const isValidUser = userIdentity?.username && 
      userIdentity.username.toLowerCase() === username.toLowerCase();

    if (!isValidUser) {
      router.replace('/');
    }


  return (
    <div>
      <h1>Welcome, {userIdentity?.username}!</h1>
    </div>
  );
};

export default UserProfileClient;
