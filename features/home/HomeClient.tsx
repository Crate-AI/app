import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores';
import { LoadingSpinner } from '@/components/ui/loading';
import SignInButton from '@/components/signIn';
import { useEffect } from 'react';

interface HomeClientProps {}

const HomeClient = ({}: HomeClientProps) => {
  const { userIdentity, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIdentity?.username) {
      navigate({ to: `/${userIdentity.username}`, replace: true });
    }
  }, [userIdentity, navigate]);

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
      <header className="bg-transparent text-black p-6 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Crate Logo"
            width={64}
            height={64}
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
            Discover, Curate, Share Your Music
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-8">
            Connect your Discogs and Spotify collections. Create playlists and
            share them with the world.
          </p>
          <p className="text-base text-muted-foreground mb-8">
            Sync your libraries in one place. Browse, search, and organize your
            music effortlessly.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🎵 Collection Management</h3>
              <p className="text-sm text-muted-foreground">
                Sync your Discogs and Spotify libraries in one place. Browse,
                search, and organize your music.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🎧 Smart Playlists</h3>
              <p className="text-sm text-muted-foreground">
                Create custom playlists from your collection. Add favorites and
                organize tracks your way.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">🌍 Share & Discover</h3>
              <p className="text-sm text-muted-foreground">
                Make your playlists public and share them with friends. Discover
                what others are listening to.
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
