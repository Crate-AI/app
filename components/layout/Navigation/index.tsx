'use client';

import { useAuthStore } from '@/stores';
import Banner from './Banner';
import SignInButton from '@/components/signIn';

export default function Navigation() {
  const { userIdentity } = useAuthStore();

  return (
    <Banner
      username={userIdentity?.username || 'Guest'}
      avatarUrl={userIdentity?.avatarUrl || '/default-avatar.png'}
      authElement={!userIdentity ? <SignInButton /> : null}
    />
  );
}
