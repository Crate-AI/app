'use client';

import { Suspense, useEffect, useState } from 'react';
import {
  useAuthStore,
  useTracksStore,
  usePlaylistStore,
  usePlayerStore,
  useFavoritesStore,
} from '@/stores';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Music,
  Play,
  Pause,
  TrendingUp,
  Shuffle,
  Heart,
  Search,
  Plus,
  Headphones,
} from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { CrateTrack } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/loading';
import { toast } from 'sonner';

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const DashboardStats = ({ tracks }: { tracks: CrateTrack[] }) => {
  const stats = {
    totalTracks: tracks.length,
    totalGenres: new Set(tracks.flatMap((t) => t.genres || [])).size,
    avgBpm:
      tracks.filter((t) => t.bpm).length > 0
        ? Math.round(
            tracks
              .filter((t) => t.bpm)
              .reduce((acc, t) => acc + (t.bpm || 0), 0) /
              tracks.filter((t) => t.bpm).length,
          )
        : 0,
    totalArtists: new Set(tracks.map((t) => t.artist)).size,
  };

  const statItems = [
    {
      label: 'Total Tracks',
      value: stats.totalTracks,
      icon: Music,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Artists',
      value: stats.totalArtists,
      icon: Headphones,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Genres',
      value: stats.totalGenres,
      icon: Heart,
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statItems.map((stat) => (
        <Card key={stat.label} variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={cn('p-2 rounded-base', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FavoritesSection = ({ allTracks }: { allTracks: CrateTrack[] }) => {
  const { togglePlayPause, playingTrackId, isPlaying, setQueue, isReady, initializePlayer } =
    usePlayerStore();
  const { getFavoriteTracksFromAllTracks, toggleFavorite, isFavorite, isLoading, loadFavorites } =
    useFavoritesStore();
  const favoriteTracks = getFavoriteTracksFromAllTracks(allTracks).slice(0, 6);

  // Initialize player and load favorites when component mounts
  useEffect(() => {
    initializePlayer();
    loadFavorites();
  }, [initializePlayer, loadFavorites]);

  const handlePlayTrack = (track: CrateTrack) => {
    if (!track.youtube_video_id) {
      toast.error('No audio available for this track');
      return;
    }

    if (!isReady) {
      toast.error('Player is still loading...');
      return;
    }

    try {
      // Set up the queue with favorite tracks, but use all tracks for context
      const trackIndex = allTracks.findIndex((t) => t.id === track.id);
      setQueue(allTracks, trackIndex);
      togglePlayPause(track);
    } catch (error) {
      console.error('Error playing track:', error);
      toast.error('Failed to play track');
    }
  };

  const handleToggleFavorite = async (trackId: string) => {
    const wasFavorite = isFavorite(trackId);
    
    try {
      await toggleFavorite(trackId);
      
      if (wasFavorite) {
        toast.success('Removed from favorites');
      } else {
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader className="border-b-2 border-black bg-bg">
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>Favourite list</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center text-gray-500 py-8">
              <div className="animate-spin w-8 h-8 border-2 border-mainAccent border-t-transparent rounded-full mx-auto mb-2" />
              <p>Loading favorites...</p>
            </div>
          ) : favoriteTracks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Heart className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No favorite tracks yet</p>
              <p className="text-sm">
                Use the heart icon in the player to add favorites
              </p>
            </div>
          ) : (
            favoriteTracks.map((track: CrateTrack) => (
              <div
                key={track.id}
                className="flex items-center space-x-3 p-3 rounded-base hover:bg-mainAccent/10 transition-colors group cursor-pointer active:bg-mainAccent/20 active:scale-[0.98]"
                onClick={() => handlePlayTrack(track)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayTrack(track);
                  }}
                  disabled={!track.youtube_video_id || !isReady}
                  className={cn(
                    'h-8 w-8 p-0 border border-black rounded-base',
                    playingTrackId === track.id && isPlaying
                      ? 'bg-main/20 hover:bg-main/30'
                      : 'bg-main hover:bg-mainAccent',
                  )}
                >
                  {playingTrackId === track.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 text-black" />
                      <span className="absolute inset-0 rounded-full animate-pulse-light bg-main/30" />
                    </>
                  ) : (
                    <Play className="w-4 h-4 text-black" />
                  )}
                </Button>

                {track.artwork ? (
                  <Image
                    src={track.artwork}
                    alt={track.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-base object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center">
                    <Music className="w-5 h-5 text-black" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate text-text">
                    {track.title}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {track.artist}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(track.id);
                  }}
                  className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-600 border border-black rounded-base"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-black">
          <Link
            href={`/${useAuthStore.getState().userIdentity?.username}/tracks`}
          >
            <Button variant="outline" className="w-full">
              View All Tracks
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActionsSection = ({ username }: { username: string }) => {
  const actions = [
    {
      title: 'Explore Collection',
      description: 'Browse your Discogs collection',
      icon: Search,
      href: `/${username}/collection`,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Create Playlist',
      description: 'Organize your favorite tracks',
      icon: Plus,
      href: `/${username}/playlists`,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Shuffle Play',
      description: 'Start a random mix',
      icon: Shuffle,
      href: '#',
      color: 'bg-orange-500 hover:bg-orange-600',
      action: 'shuffle',
    },
  ];

  const { toggleShuffle, setQueue } = usePlayerStore();
  const { allTracks } = useTracksStore();

  const handleAction = (action: string) => {
    if (action === 'shuffle') {
      if (allTracks.length > 0) {
        setQueue(allTracks, 0);
        toggleShuffle();
        toast.success('Shuffle mode enabled! Playing your collection.');
      } else {
        toast.error('No tracks available to shuffle');
      }
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader className="border-b-2 border-black bg-bg">
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <div key={action.title}>
              {action.href === '#' ? (
                <Button
                  variant="ghost"
                  onClick={() => handleAction(action.action!)}
                  className="h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        'p-2 rounded-base text-white',
                        action.color,
                      )}
                    >
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-600">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ) : (
                <Link href={action.href}>
                  <Button
                    variant="ghost"
                    className="h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'p-2 rounded-base text-white',
                          action.color,
                        )}
                      >
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {action.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const WelcomeSection = ({ username }: { username: string }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-text mb-2">
        {getGreeting()}, {username}!
      </h1>
      <p className="text-gray-600">
        Ready to explore your music collection? Here&apos;s what&apos;s
        happening with your tracks.
      </p>
    </div>
  );
};

const DashboardContent = ({ username }: { username: string }) => {
  const { allTracks, setAllTracks } = useTracksStore();
  const { fetchPlaylists } = usePlaylistStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tracks
        const tracksRes = await fetch('/api/music/tracks', {
          credentials: 'include',
        });
        if (tracksRes.ok) {
          const tracksData = await tracksRes.json();
          if (tracksData.tracks) {
            setAllTracks(tracksData.tracks);
          }
        }

        // Fetch playlists
        await fetchPlaylists();
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setAllTracks, fetchPlaylists]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeSection username={username} />

      <DashboardStats tracks={allTracks} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FavoritesSection allTracks={allTracks} />
        <QuickActionsSection username={username} />
      </div>
    </div>
  );
};

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  const { username } = params;
  const { userIdentity } = useAuthStore();

  if (!userIdentity) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardContent username={username} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
