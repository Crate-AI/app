'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from '@tanstack/react-router';
import { useRef } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface SignInButtonProps { }

const SignInButton = ({ }: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const currentUser = useQuery(api.users.getCurrentUser);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('resend-otp', { email });
      setVerificationSent(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      setError(error instanceof Error ? error.message : 'Failed to send verification code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleVerifyCode called with code:', code);

    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Calling signIn with email and code');
      const result = await signIn('resend-otp', { email, code });
      console.log('signIn result:', result);
      
      // Wait a moment for the user query to update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);

      // Use the Convex user ID as the username
      if (currentUser?._id) {
        // Redirect to user area using the Convex user ID
        await router.navigate({ to: `/${currentUser._id}` });
      } else {
        setError('Failed to retrieve user information. Please try again.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError(error instanceof Error ? error.message : 'Invalid verification code. Please try again.');
      setIsLoading(false);
      setCode('');
    }
  };

  if (verificationSent) {
    return (
      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-2">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 8-digit code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          type="submit"
          className="w-full sm:w-auto flex items-center gap-2"
        >
          {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendCode} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          ref={emailInputRef}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        className="w-full sm:w-auto flex items-center gap-2"
      >
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {isLoading ? 'Sending code...' : 'Sign In with Email'}
      </Button>
    </form>
  );
};

export default SignInButton;
