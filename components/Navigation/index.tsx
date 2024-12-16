'use client';

import { useAuthStore } from '@/lib/store/authStore';
import Banner from './Banner';
import SignInButton from '@/components/SignIn';

export default function Navigation() {
  // Changed to default export
  const { userIdentity, isAuthenticated } = useAuthStore();

  return (
    <Banner
      username={userIdentity?.username || 'Guest'}
      avatarUrl={userIdentity?.avatar_url || '/default-avatar.png'}
      authElement={!isAuthenticated ? <SignInButton /> : null}
    />
  );
}
