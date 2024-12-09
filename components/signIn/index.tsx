'use client';

import { useState, useEffect } from 'react';
import { fetchRequestToken } from './serverActions'; // adjust the path as needed
import { Button } from '@/components/ui/button'; // Update this import path as per your project structure

export default function SignInButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data === 'oauth_verifier_saved') {
        alert('OAuth verifier has been saved.');
        // Additional logic if needed
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestToken();
      if (data.authUrl) {
        const popupFeatures = 'width=600,height=400,left=100,top=100,noopener';
        const popup = window.open(data.authUrl, 'DiscogsAuth', popupFeatures);
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
    <Button
      onClick={handleSignIn}
      disabled={loading}
      variant="default" // You can customize this as per your design
      size="default" // Change size if needed (e.g., 'lg' or 'sm')
    >
      {loading ? 'Signing In...' : 'Sign In with Discogs'}
    </Button>
  );
}
