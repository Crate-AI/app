'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import Banner from '@/components/Banner';

const Home = () => {
  const userIdentity = useUserStore((state) => state.userIdentity);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && userIdentity?.username) {
      router.replace(`/${userIdentity.username}`);
    }
  }, [isHydrated, userIdentity, router]);

  if (!isHydrated) {
    return null;
  }

  return (
    <main>
      <Banner 
        username={userIdentity?.username || 'Guest'} 
        avatarUrl={userIdentity?.avatar_url || '/default-avatar.png'} 
      />
    </main>
  );
};

export default Home;