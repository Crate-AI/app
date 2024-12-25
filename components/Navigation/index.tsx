'use client';

import { useAuthStore } from '@/lib/store/authStore';
import Banner from './Banner';
import SignInButton from '@/components/signIn';

export default function Navigation() {
  // Changed to default export
  const { userIdentity } = useAuthStore();

  return (
    <Banner
      username={userIdentity?.username || 'Guest'}
      avatarUrl={userIdentity?.avatarUrl || '/default-avatar.png'}
      authElement={!userIdentity ? <SignInButton /> : null}
    />
  );
}
