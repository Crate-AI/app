import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { Suspense, useState, useEffect } from 'react';
import {
  R as Route,
  u as useAuthStore,
  L as LoadingSpinner,
  a as useTracksStore,
  b as usePlaylistStore,
  C as Card,
  d as CardContent,
  c as cn,
  e as usePlayerStore,
  f as useFavoritesStore,
  g as CardHeader,
  h as CardTitle,
  B as Button,
} from './router-1d_kQrZ6.js';
import {
  Music,
  Headphones,
  Heart,
  Pause,
  Play,
  TrendingUp,
  Search,
  Plus,
  Shuffle,
} from 'lucide-react';
import { Image } from '@unpic/react';
import { toast } from 'sonner';
import 'zustand';
import 'zustand/middleware';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@supabase/supabase-js';
import '@radix-ui/react-avatar';
import '@radix-ui/react-slot';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-icons';
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
const DashboardStats = ({ tracks }) => {
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
      color: 'bg-main border-2 border-gray-800',
    },
    {
      label: 'Artists',
      value: stats.totalArtists,
      icon: Headphones,
      color: 'bg-main border-2 border-gray-800',
    },
    {
      label: 'Genres',
      value: stats.totalGenres,
      icon: Heart,
      color: 'bg-main border-2 border-gray-800',
    },
  ];
  return /* @__PURE__ */ jsx('div', {
    className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-8',
    children: statItems.map((stat) =>
      /* @__PURE__ */ jsx(
        Card,
        {
          variant: 'elevated',
          children: /* @__PURE__ */ jsx(CardContent, {
            className: 'p-4',
            children: /* @__PURE__ */ jsxs('div', {
              className: 'flex items-center space-x-3',
              children: [
                /* @__PURE__ */ jsx('div', {
                  className: cn(
                    'p-2 rounded-base flex items-center justify-center',
                    stat.color,
                  ),
                  children: /* @__PURE__ */ jsx(stat.icon, {
                    className: 'w-5 h-5 text-black',
                  }),
                }),
                /* @__PURE__ */ jsxs('div', {
                  children: [
                    /* @__PURE__ */ jsx('p', {
                      className: 'text-2xl font-semibold text-text',
                      children: stat.value,
                    }),
                    /* @__PURE__ */ jsx('p', {
                      className: 'text-sm text-gray-600',
                      children: stat.label,
                    }),
                  ],
                }),
              ],
            }),
          }),
        },
        stat.label,
      ),
    ),
  });
};
const FavoritesSection = ({ allTracks }) => {
  const {
    togglePlayPause,
    playingTrackId,
    isPlaying,
    setQueue,
    isReady,
    initializePlayer,
  } = usePlayerStore();
  const {
    getFavoriteTracksFromAllTracks,
    toggleFavorite,
    isFavorite,
    isLoading,
    loadFavorites,
  } = useFavoritesStore();
  const favoriteTracks = getFavoriteTracksFromAllTracks(allTracks).slice(0, 6);
  useEffect(() => {
    initializePlayer();
    loadFavorites();
  }, [initializePlayer, loadFavorites]);
  const handlePlayTrack = (track) => {
    if (!track.youtube_video_id) {
      toast.error('No audio available for this track');
      return;
    }
    if (!isReady) {
      toast.error('Player is still loading...');
      return;
    }
    try {
      const trackIndex = allTracks.findIndex((t) => t.id === track.id);
      setQueue(allTracks, trackIndex);
      togglePlayPause(track);
    } catch (error) {
      console.error('Error playing track:', error);
      toast.error('Failed to play track');
    }
  };
  const handleToggleFavorite = async (trackId) => {
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
  return /* @__PURE__ */ jsxs(Card, {
    variant: 'elevated',
    children: [
      /* @__PURE__ */ jsx(CardHeader, {
        className: 'border-b-2 border-gray-800 bg-bg',
        children: /* @__PURE__ */ jsxs(CardTitle, {
          className: 'flex items-center space-x-2',
          children: [
            /* @__PURE__ */ jsx(Heart, { className: 'w-5 h-5' }),
            /* @__PURE__ */ jsx('span', { children: 'Favourite list' }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxs(CardContent, {
        className: 'p-4',
        children: [
          /* @__PURE__ */ jsx('div', {
            className: 'space-y-3',
            children: isLoading
              ? /* @__PURE__ */ jsxs('div', {
                  className: 'text-center text-gray-500 py-8',
                  children: [
                    /* @__PURE__ */ jsx('div', {
                      className:
                        'animate-spin w-8 h-8 border-2 border-mainAccent border-t-transparent rounded-full mx-auto mb-2',
                    }),
                    /* @__PURE__ */ jsx('p', {
                      children: 'Loading favorites...',
                    }),
                  ],
                })
              : favoriteTracks.length === 0
                ? /* @__PURE__ */ jsxs('div', {
                    className: 'text-center text-gray-500 py-8',
                    children: [
                      /* @__PURE__ */ jsx(Heart, {
                        className: 'w-8 h-8 mx-auto mb-2 text-gray-400',
                      }),
                      /* @__PURE__ */ jsx('p', {
                        children: 'No favorite tracks yet',
                      }),
                      /* @__PURE__ */ jsx('p', {
                        className: 'text-sm',
                        children:
                          'Use the heart icon in the player to add favorites',
                      }),
                    ],
                  })
                : favoriteTracks.map((track) =>
                    /* @__PURE__ */ jsxs(
                      'div',
                      {
                        className:
                          'flex items-center space-x-3 p-3 rounded-base hover:bg-mainAccent/10 transition-colors group cursor-pointer active:bg-mainAccent/20 active:scale-[0.98]',
                        onClick: () => handlePlayTrack(track),
                        children: [
                          /* @__PURE__ */ jsx(Button, {
                            variant: 'ghost',
                            size: 'sm',
                            onClick: (e) => {
                              e.stopPropagation();
                              handlePlayTrack(track);
                            },
                            disabled: !track.youtube_video_id || !isReady,
                            className: cn(
                              'h-8 w-8 p-0 border border-gray-800 rounded-base',
                              playingTrackId === track.id && isPlaying
                                ? 'bg-main/20 hover:bg-main/30'
                                : 'bg-main hover:bg-mainAccent',
                            ),
                            children:
                              playingTrackId === track.id && isPlaying
                                ? /* @__PURE__ */ jsxs(Fragment, {
                                    children: [
                                      /* @__PURE__ */ jsx(Pause, {
                                        className: 'w-4 h-4 text-black',
                                      }),
                                      /* @__PURE__ */ jsx('span', {
                                        className:
                                          'absolute inset-0 rounded-full animate-pulse-light bg-main/30',
                                      }),
                                    ],
                                  })
                                : /* @__PURE__ */ jsx(Play, {
                                    className: 'w-4 h-4 text-black',
                                  }),
                          }),
                          track.artwork
                            ? /* @__PURE__ */ jsx(Image, {
                                src: track.artwork,
                                alt: track.title,
                                width: 40,
                                height: 40,
                                className:
                                  'w-10 h-10 rounded-base object-cover',
                              })
                            : /* @__PURE__ */ jsx('div', {
                                className:
                                  'w-10 h-10 bg-mainAccent border-2 border-gray-800 rounded-base flex items-center justify-center',
                                children: /* @__PURE__ */ jsx(Music, {
                                  className: 'w-5 h-5 text-black',
                                }),
                              }),
                          /* @__PURE__ */ jsxs('div', {
                            className: 'flex-1 min-w-0',
                            children: [
                              /* @__PURE__ */ jsx('div', {
                                className:
                                  'font-medium text-sm truncate text-text',
                                children: track.title,
                              }),
                              /* @__PURE__ */ jsx('div', {
                                className: 'text-xs text-gray-600 truncate',
                                children: track.artist,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsx(Button, {
                            variant: 'ghost',
                            size: 'sm',
                            onClick: (e) => {
                              e.stopPropagation();
                              handleToggleFavorite(track.id);
                            },
                            className:
                              'h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-600 border border-gray-800 rounded-base',
                            children: /* @__PURE__ */ jsx(Heart, {
                              className: 'w-4 h-4 fill-current',
                            }),
                          }),
                        ],
                      },
                      track.id,
                    ),
                  ),
          }),
          /* @__PURE__ */ jsx('div', {
            className: 'mt-4 pt-4 border-t-2 border-gray-800',
            children: /* @__PURE__ */ jsx(Link, {
              to: '/$username/tracks',
              params: {
                username: useAuthStore.getState().userIdentity?.username || '',
              },
              children: /* @__PURE__ */ jsx(Button, {
                variant: 'outline',
                className: 'w-full',
                children: 'View All Tracks',
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
const QuickActionsSection = ({ username }) => {
  const actions = [
    {
      title: 'Explore Collection',
      description: 'Browse your Discogs collection',
      icon: Search,
      href: `/${username}/collection`,
      color: 'bg-main border-2 border-gray-800',
    },
    {
      title: 'Create Playlist',
      description: 'Organize your favorite tracks',
      icon: Plus,
      href: `/${username}/playlists`,
      color: 'bg-main border-2 border-gray-800',
    },
    {
      title: 'Shuffle Play',
      description: 'Start a random mix',
      icon: Shuffle,
      href: '#',
      color: 'bg-main border-2 border-gray-800',
      action: 'shuffle',
    },
  ];
  const { toggleShuffle, setQueue } = usePlayerStore();
  const { allTracks } = useTracksStore();
  const handleAction = (action) => {
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
  return /* @__PURE__ */ jsxs(Card, {
    variant: 'elevated',
    children: [
      /* @__PURE__ */ jsx(CardHeader, {
        className: 'border-b-2 border-gray-800 bg-bg',
        children: /* @__PURE__ */ jsxs(CardTitle, {
          className: 'flex items-center space-x-2',
          children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: 'w-5 h-5' }),
            /* @__PURE__ */ jsx('span', { children: 'Quick Actions' }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(CardContent, {
        className: 'p-4',
        children: /* @__PURE__ */ jsx('div', {
          className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
          children: actions.map((action) =>
            /* @__PURE__ */ jsx(
              'div',
              {
                children:
                  action.href === '#'
                    ? /* @__PURE__ */ jsx(Button, {
                        variant: 'ghost',
                        onClick: () => handleAction(action.action),
                        className:
                          'h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-gray-800 rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]',
                        children: /* @__PURE__ */ jsxs('div', {
                          className: 'flex items-center space-x-3',
                          children: [
                            /* @__PURE__ */ jsx('div', {
                              className: cn(
                                'p-2 rounded-base text-black flex items-center justify-center',
                                action.color,
                              ),
                              children: /* @__PURE__ */ jsx(action.icon, {
                                className: 'w-5 h-5',
                              }),
                            }),
                            /* @__PURE__ */ jsxs('div', {
                              children: [
                                /* @__PURE__ */ jsx('div', {
                                  className: 'font-medium text-sm',
                                  children: action.title,
                                }),
                                /* @__PURE__ */ jsx('div', {
                                  className: 'text-xs text-gray-600',
                                  children: action.description,
                                }),
                              ],
                            }),
                          ],
                        }),
                      })
                    : /* @__PURE__ */ jsx(Link, {
                        to: action.href,
                        children: /* @__PURE__ */ jsx(Button, {
                          variant: 'ghost',
                          className:
                            'h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-gray-800 rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]',
                          children: /* @__PURE__ */ jsxs('div', {
                            className: 'flex items-center space-x-3',
                            children: [
                              /* @__PURE__ */ jsx('div', {
                                className: cn(
                                  'p-2 rounded-base text-black flex items-center justify-center',
                                  action.color,
                                ),
                                children: /* @__PURE__ */ jsx(action.icon, {
                                  className: 'w-5 h-5',
                                }),
                              }),
                              /* @__PURE__ */ jsxs('div', {
                                children: [
                                  /* @__PURE__ */ jsx('div', {
                                    className: 'font-medium text-sm',
                                    children: action.title,
                                  }),
                                  /* @__PURE__ */ jsx('div', {
                                    className: 'text-xs text-gray-600',
                                    children: action.description,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      }),
              },
              action.title,
            ),
          ),
        }),
      }),
    ],
  });
};
const WelcomeSection = ({ username }) => {
  const currentHour = /* @__PURE__ */ new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  return /* @__PURE__ */ jsxs('div', {
    className: 'mb-8',
    children: [
      /* @__PURE__ */ jsxs('h1', {
        className: 'text-3xl font-semibold text-text mb-2',
        children: [getGreeting(), ', ', username, '!'],
      }),
      /* @__PURE__ */ jsx('p', {
        className: 'text-gray-600',
        children:
          "Ready to explore your music collection? Here's what's happening with your tracks.",
      }),
    ],
  });
};
const DashboardContent = ({ username }) => {
  const { allTracks, setAllTracks } = useTracksStore();
  const { fetchPlaylists } = usePlaylistStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksRes = await fetch('/api/music/tracks', {
          credentials: 'include',
        });
        if (tracksRes.ok) {
          const tracksData = await tracksRes.json();
          if (tracksData.tracks) {
            setAllTracks(tracksData.tracks);
          }
        }
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
    return /* @__PURE__ */ jsx('div', {
      className: 'flex items-center justify-center min-h-[400px]',
      children: /* @__PURE__ */ jsx(LoadingSpinner, {}),
    });
  }
  return /* @__PURE__ */ jsxs('div', {
    className: 'space-y-8',
    children: [
      /* @__PURE__ */ jsx(WelcomeSection, { username }),
      /* @__PURE__ */ jsx(DashboardStats, { tracks: allTracks }),
      /* @__PURE__ */ jsxs('div', {
        className: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
        children: [
          /* @__PURE__ */ jsx(FavoritesSection, { allTracks }),
          /* @__PURE__ */ jsx(QuickActionsSection, { username }),
        ],
      }),
    ],
  });
};
function UserProfilePage() {
  const { username } = Route.useParams();
  const { userIdentity } = useAuthStore();
  if (!userIdentity) {
    return /* @__PURE__ */ jsx('div', {
      className: 'flex items-center justify-center min-h-[400px]',
      children: /* @__PURE__ */ jsx(LoadingSpinner, {}),
    });
  }
  return /* @__PURE__ */ jsx('main', {
    className: 'container mx-auto px-4 py-8',
    children: /* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(LoadingSpinner, {}),
      children: /* @__PURE__ */ jsx(DashboardContent, { username }),
    }),
  });
}
export { UserProfilePage as component };
