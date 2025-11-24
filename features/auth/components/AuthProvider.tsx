'use client';

import { useEffect, useState, Suspense } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useAuthStore } from '@/stores';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { initializeAuth } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

const ERROR_MESSAGES = {
  auth_denied: 'Authentication was cancelled.',
  auth_failed: 'Authentication failed. Please try again.',
  missing_verifier: 'Invalid authentication response.',
  missing_oauth: 'Authentication parameters are missing.',
} as const;

type AuthError = keyof typeof ERROR_MESSAGES;

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProviderContent({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { setUserIdentity, setSupabaseUser, setIsLoading } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const handleAuthError = (error: unknown) => {
    console.error('AuthProvider: Error initializing auth:', error);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('error');
    navigate({ to: newUrl.pathname + newUrl.search, replace: true });

    // Handle both string errors and Error objects
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An error occurred during authentication';

    setError(
      ERROR_MESSAGES[errorMessage as AuthError] ||
        (process.env.NODE_ENV === 'development'
          ? errorMessage
          : 'An error occurred during authentication'),
    );
  };

  const handleAuthStateChange = (event: string, session: Session | null) => {
    if (event === 'SIGNED_OUT') {
      setUserIdentity(null);
      setSupabaseUser(null);
      navigate({ to: '/', replace: true });
    } else if (event === 'SIGNED_IN' && session?.user) {
      setSupabaseUser(session.user);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const supabaseUser = await initializeAuth();
        if (supabaseUser) {
          setSupabaseUser(supabaseUser);
        }

        const userResponse = await fetch('/api/auth/user');
        if (userResponse.ok) {
          const { user } = await userResponse.json();
          if (user) {
            setUserIdentity(user);
          }
        }

        const error = searchParams.get('error');
        if (error) throw error;
      } catch (error) {
        handleAuthError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Wrap initAuth in a promise catch to prevent unhandled rejections
    initAuth().catch((error) => {
      console.error('Unhandled auth initialization error:', error);
      handleAuthError(error);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {children}
    </>
  );
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Suspense fallback={null}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}
