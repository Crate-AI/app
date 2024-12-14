'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/userStore';

export default function SignInButton() {
  const [loading, setLoading] = useState(false);
  const setUserIdentity = useUserStore((state) => state.setUserIdentity);

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      if (event.data?.type === 'LOGIN_SUCCESS') {
        setUserIdentity({
          username: event.data.username,
          avatar_url: event.data.avatar_url
        });
        window.location.href = `/${event.data.username}`;
      }
    };

    window.addEventListener('message', handleLoginSuccess);
    return () => window.removeEventListener('message', handleLoginSuccess);
  }, [setUserIdentity]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/discogs/request-token');
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      const popup = window.open(data.authUrl, 'DiscogsAuth', 'width=600,height=400');
      if (!popup) {
        throw new Error('Popup blocked! Please allow popups and try again.');
      }
    } catch (error: any) {
      console.error('Error during authentication:', error);
      alert(error.message || 'Authentication failed. Please try again.');
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
