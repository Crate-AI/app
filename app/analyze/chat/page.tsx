'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { LoadingSpinner } from '@/components/ui/loading';

export default function ChatPage() {
  const router = useRouter();
  const { userIdentity } = useAuthStore();

  useEffect(() => {
    if (userIdentity?.username) {
      router.replace(`/${userIdentity.username}`);
    } else {
      router.replace('/');
    }
  }, [userIdentity, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
