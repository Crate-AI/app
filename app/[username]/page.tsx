'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import Banner from '@/components/Banner';

export default function UserPage({ params }: { params: { username: string } }) {
  const userIdentity = useUserStore((state) => state.userIdentity);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!userIdentity || userIdentity.username.toLowerCase() !== params.username.toLowerCase())) {
      router.replace('/');
    }
  }, [isHydrated, userIdentity, params.username, router]);

  // Show nothing until hydration is complete
  if (!isHydrated) {
    return null;
  }

  // After hydration, check if we have valid user data
  if (!userIdentity || userIdentity.username.toLowerCase() !== params.username.toLowerCase()) {
    return null;
  }

  return (
    <div>
      <main>
        <Banner
          username={userIdentity.username}
          avatarUrl={userIdentity.avatar_url}
        />
      </main>
    </div>
  );
}