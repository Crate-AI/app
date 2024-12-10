'use client';

import { useEffect, useState } from 'react';
import { fetchRequestToken } from './serverActions';
import { Button } from '@/components/ui/button';

export default function SignInButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      if (event.data.type === 'LOGIN_SUCCESS') {
        console.log(`User logged in as ${event.data.username}`);
        window.location.href = `/${event.data.username}`;
      }
    };

    window.addEventListener('message', handleLoginSuccess);

    return () => {
      window.removeEventListener('message', handleLoginSuccess);
    };
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestToken();
      if (data.authUrl) {
        const popup = window.open(data.authUrl, 'DiscogsAuth', 'width=600,height=400');
        if (!popup) {
          alert('Popup blocked! Please allow popups and try again.');
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={loading}>
      {loading ? 'Signing In...' : 'Sign In with Discogs'}
    </Button>
  );
}
