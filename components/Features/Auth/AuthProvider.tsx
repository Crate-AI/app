'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCurrentUserIdentity } from '@/app/actions/auth/discogs';

const ERROR_MESSAGES = {
  auth_denied: 'Authentication was cancelled.',
  auth_failed: 'Authentication failed. Please try again.',
  missing_verifier: 'Invalid authentication response.',
  missing_oauth: 'Authentication parameters are missing.',
} as const;

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserIdentity, setError } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUserIdentity();
        if (user) {
          setUserIdentity(user);
        }

        const error = searchParams.get('error');
        if (error && ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES]) {
          setError(ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES]);

          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('error');
          router.replace(newUrl.pathname);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to initialize auth',
        );
      }
    };

    initAuth();
  }, [setUserIdentity, setError, searchParams, router]);

  return (
    <>
      {searchParams.get('error') && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {ERROR_MESSAGES[
              searchParams.get('error') as keyof typeof ERROR_MESSAGES
            ] || 'An error occurred during authentication'}
          </AlertDescription>
        </Alert>
      )}
      {children}
    </>
  );
};

export default AuthProvider;
