'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

interface SignInButtonProps {}

const SignInButton = ({}: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const redirectUrl = window.location.pathname;
      if (redirectUrl !== '/') {
        await fetch('/api/auth/set-redirect', {
          method: 'POST',
          body: JSON.stringify({ redirectUrl }),
        });
      }

      const response = await fetch('/api/auth/discogs/request-token');
      if (!response.ok) {
        throw new Error('Failed to get authorization URL');
      }
      const { authUrl } = await response.json();

      window.location.href = authUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoading(false);
      throw error instanceof Error
        ? error.message
        : 'Failed to start authentication';
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
