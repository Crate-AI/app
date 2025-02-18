'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCurrentUserIdentity } from '@/app/actions/auth/discogs';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    setUserIdentity, 
    setSupabaseUser,
    setIsLoading 
  } = useAuthStore();
  
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = (error: unknown) => {
    console.error('AuthProvider: Error initializing auth:', error);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('error');
    router.replace(newUrl.pathname);
    
    // Handle both string errors and Error objects
    const errorMessage = error instanceof Error ? error.message : 
      typeof error === 'string' ? error : 'An error occurred during authentication';
    
    setError(
      ERROR_MESSAGES[errorMessage as AuthError] || 
      (process.env.NODE_ENV === 'development' ? errorMessage : 'An error occurred during authentication')
    );
  };

  const handleAuthStateChange = (event: string, session: Session | null) => {
    if (event === 'SIGNED_OUT') {
      setUserIdentity(null);
      setSupabaseUser(null);
      router.replace('/');
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

        const user = await getCurrentUserIdentity();
        if (user) {
          setUserIdentity(user);
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    initAuth();

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