'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/authStore';
import { requestDiscogsAuth } from '@/app/actions/auth/discogs';
import { LoaderCircle } from 'lucide-react';

interface SignInButtonProps {}

const SignInButton = ({}: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useAuthStore();

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUrl = window.location.pathname;
      if (redirectUrl !== '/') {
        await fetch('/api/auth/set-redirect', {
          method: 'POST',
          body: JSON.stringify({ redirectUrl }),
        });
      }

      const { authorizationUrl } = await requestDiscogsAuth();

      window.location.href = authorizationUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to start authentication',
      );
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full sm:w-auto flex items-center gap-2"
    >
      {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {isLoading ? 'Connecting to Discogs...' : 'Sign In with Discogs'}
    </Button>
  );
};

export default SignInButton;
