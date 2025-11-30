import { createFileRoute, Navigate } from '@tanstack/react-router';
import SignInButton from '@/components/signIn';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { LoadingSpinner } from '@/components/ui/loading';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export const Route = createFileRoute('/auth/')({
  component: AuthPage,
});

function AuthPage() {
  return (
    <>
      <AuthLoading>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </AuthLoading>

      <Authenticated>
        <AuthenticatedRedirect />
      </Authenticated>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </>
  );
}

function AuthenticatedRedirect() {
  const user = useQuery(api.users.getCurrentUser);
  
  if (user) {
    const email = user.email as string | undefined;
    const username = email?.split('@')[0] || user._id;
    return <Navigate to={`/${username}`} replace />;
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}

function SignInForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg border-2 border-gray-800 shadow-light">
        <h1 className="text-2xl font-bold mb-2">Sign In to Crate</h1>
        <p className="text-gray-600 mb-6">
          Enter your email to receive a verification code
        </p>
        <SignInButton />
      </div>
    </div>
  );
}
