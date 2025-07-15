'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { LoadingSpinner } from '@/components/ui/loading';
import SignInButton from '@/components/signIn';
import Image from 'next/image';
import { useEffect } from 'react';

interface HomeClientProps {}

const HomeClient = ({}: HomeClientProps) => {
  const { userIdentity, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (userIdentity?.username) {
      router.replace(`/${userIdentity.username}`);
    }
  }, [userIdentity, router]);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is authenticated, show loading while redirecting
  if (userIdentity?.username) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Show landing page for non-authenticated users
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white text-black p-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Crate Logo"
            width={64}
            height={64}
            priority
            className="w-16 h-16"
          />
        </div>
        <div className="flex items-center space-x-4">
          <SignInButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Welcome to Crate
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-8">
            Your AI-powered music collection analyzer
          </p>
          <p className="text-base text-muted-foreground mb-8">
            Connect your Discogs collection and discover insights about your
            music with AI-powered analysis.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🎵 Collection Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get insights into your music collection, including BPM analysis,
                genre distribution, and more.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🤖 AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Chat with AI about your music and get personalized
                recommendations.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🎧 Smart Playlists</h3>
              <p className="text-sm text-muted-foreground">
                Create playlists based on BPM, genre, and other characteristics.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center space-y-4">
            <SignInButton />
            <p className="text-sm text-muted-foreground">
              Sign in with your Discogs account to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
