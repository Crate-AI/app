import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, createContext, useContext } from 'react';
import {
  B as Button,
  L as LoadingSpinner,
  e as usePlayerStore,
  b as usePlaylistStore,
  D as DropdownMenu,
  k as DropdownMenuTrigger,
  l as DropdownMenuContent,
  m as DropdownMenuItem,
  n as convertSearchResultToTrack,
  o as createTemporaryTrackForPlayback,
  E as ErrorBoundary,
} from './router-1d_kQrZ6.js';
import {
  List,
  Grid,
  Filter,
  Search,
  Disc,
  Clock,
  Pause,
  Play,
  Loader2,
  ChevronUp,
  ChevronDown,
  ListPlus,
  Plus,
  Heart,
  MoreHorizontal,
  ListMusic,
} from 'lucide-react';
import { I as Input } from './input-BtHci9LN.js';
import { toast } from 'sonner';
import { P as PageHeader } from './Breadcrumbs-DHSwSLRQ.js';
import '@tanstack/react-router';
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
import '@unpic/react';
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
const MIN_SEARCH_LENGTH = 3;
const useDiscogsSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedQuery = useDebounce(query, 300);
  const isQueryValid = debouncedQuery.length >= MIN_SEARCH_LENGTH;
  useEffect(() => {
    const searchDiscogs = async () => {
      if (!isQueryValid) {
        setResults([]);
        setError(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/external/discogs/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: debouncedQuery }),
        });
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred during search',
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    searchDiscogs();
  }, [debouncedQuery, isQueryValid]);
  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    isQueryValid,
  };
};
function useDiscogsCollection() {
  const [collectionData, setCollectionData] = useState({
    collection: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchCollection = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/external/discogs/collection');
      if (!response.ok) throw new Error('Failed to fetch collection');
      const data = await response.json();
      setCollectionData({
        collection: data.releases,
        pagination: data.pagination,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCollection();
  }, []);
  return {
    collection: collectionData.collection,
    pagination: collectionData.pagination,
    loading,
    error,
    refetch: fetchCollection,
  };
}
const ViewToggle = ({ viewMode, onViewModeChange }) => {
  return /* @__PURE__ */ jsxs('div', {
    className: 'flex justify-between items-center mb-4',
    children: [
      /* @__PURE__ */ jsxs('div', {
        className: 'flex gap-2',
        children: [
          /* @__PURE__ */ jsxs(Button, {
            variant: viewMode === 'list' ? 'default' : 'noShadow',
            onClick: () => onViewModeChange('list'),
            children: [
              /* @__PURE__ */ jsx(List, { className: 'w-4 h-4 mr-2' }),
              'List',
            ],
          }),
          /* @__PURE__ */ jsxs(Button, {
            variant: viewMode === 'grid' ? 'default' : 'noShadow',
            onClick: () => onViewModeChange('grid'),
            children: [
              /* @__PURE__ */ jsx(Grid, { className: 'w-4 h-4 mr-2' }),
              'Grid',
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Button, {
        variant: 'noShadow',
        size: 'icon',
        children: /* @__PURE__ */ jsx(Filter, { className: 'w-4 h-4' }),
      }),
    ],
  });
};
const ViewToggleButtons = ({ view, onViewChange, collectionCount }) => {
  const buttonClass = (buttonView) => `
    px-4 py-2 rounded transition-colors flex items-center gap-2
    ${view === buttonView ? 'bg-main text-black' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}
  `;
  return /* @__PURE__ */ jsxs('div', {
    className: 'flex gap-4',
    children: [
      /* @__PURE__ */ jsxs(Button, {
        onClick: () => onViewChange('search'),
        className: buttonClass('search'),
        children: [/* @__PURE__ */ jsx(Search, { size: 18 }), 'Search'],
      }),
      /* @__PURE__ */ jsxs(Button, {
        onClick: () => onViewChange('collection'),
        className: buttonClass('collection'),
        children: [
          /* @__PURE__ */ jsx(Disc, { size: 18 }),
          'Collection ',
          collectionCount ? `(${collectionCount})` : '',
        ],
      }),
    ],
  });
};
const SearchBar = ({ query, isLoading, onQueryChange }) => {
  return /* @__PURE__ */ jsxs('div', {
    className: 'flex gap-3 mb-6',
    children: [
      /* @__PURE__ */ jsx(Input, {
        type: 'text',
        placeholder: 'Search vinyl records...',
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
        className: 'flex-1',
      }),
      /* @__PURE__ */ jsxs(Button, {
        type: 'button',
        disabled: isLoading,
        variant: 'default',
        children: [
          isLoading
            ? /* @__PURE__ */ jsx(LoadingSpinner, { className: 'w-4 h-4' })
            : /* @__PURE__ */ jsx(Search, { className: 'w-4 h-4' }),
          /* @__PURE__ */ jsx('span', {
            className: 'ml-2',
            children: 'Search',
          }),
        ],
      }),
    ],
  });
};
const TrackListItem = ({ track, isPlaying, onPlayToggle, isPlayerReady }) => {
  return /* @__PURE__ */ jsxs(
    'div',
    {
      className:
        'grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center hover:bg-border/10',
      children: [
        /* @__PURE__ */ jsx('div', {
          className: 'w-8 flex items-center justify-center',
          children: /* @__PURE__ */ jsx(Button, {
            variant: 'noShadow',
            size: 'icon',
            className: 'w-8 h-8',
            onClick: onPlayToggle,
            disabled: !track.youtube_video_id || !isPlayerReady,
            children: isPlaying
              ? /* @__PURE__ */ jsx(Pause, { className: 'w-4 h-4' })
              : /* @__PURE__ */ jsx(Play, { className: 'w-4 h-4' }),
          }),
        }),
        /* @__PURE__ */ jsxs('div', {
          children: [
            /* @__PURE__ */ jsx('div', {
              className: 'font-medium text-text dark:text-darkText',
              children: track.title,
            }),
            track.extra_artists &&
              /* @__PURE__ */ jsx('div', {
                className: 'text-sm text-text/60 dark:text-darkText/60',
                children: track.extra_artists,
              }),
          ],
        }),
        /* @__PURE__ */ jsx('div', {
          className: 'text-text/60 dark:text-darkText/60',
          children: track.duration,
        }),
      ],
    },
    track.position,
  );
};
function TrackList({ tracks, playingTrackId, onPlayToggle, isPlayerReady }) {
  return /* @__PURE__ */ jsxs('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ jsxs('div', {
        className:
          'grid grid-cols-[auto_1fr_auto] gap-4 p-2 text-sm text-text/60 dark:text-darkText/60',
        children: [
          /* @__PURE__ */ jsx('div', { className: 'w-8', children: '#' }),
          /* @__PURE__ */ jsx('div', { children: 'TITLE' }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              /* @__PURE__ */ jsx(Clock, { className: 'w-4 h-4' }),
              /* @__PURE__ */ jsx('span', { children: 'TIME' }),
            ],
          }),
        ],
      }),
      tracks.map((track) =>
        /* @__PURE__ */ jsx(
          TrackListItem,
          {
            track,
            isPlaying: playingTrackId === track.position,
            onPlayToggle: () => onPlayToggle(track),
            isPlayerReady,
          },
          track.position,
        ),
      ),
    ],
  });
}
const ReleaseTracks = ({ releaseId }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    player,
    isReady,
    playingTrackId,
    setPlayingTrackId,
    initializePlayer,
  } = usePlayerStore();
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);
  const handlePlayToggle = async (track) => {
    if (!track.youtube_video_id || !player || !isReady) {
      const reason = !track.youtube_video_id
        ? 'No video ID available'
        : !player
          ? 'YouTube player not initialized'
          : 'Player not ready';
      setError({
        message: 'Cannot play track',
        details: reason,
        trackPosition: track.position,
      });
      return;
    }
    try {
      if (playingTrackId === track.position) {
        player.pauseVideo();
        setPlayingTrackId(null);
      } else {
        if (playingTrackId) {
          player.stopVideo();
        }
        player.loadVideoById({
          videoId: track.youtube_video_id,
          suggestedQuality: 'small',
        });
        player.playVideo();
        setPlayingTrackId(track.position);
      }
    } catch (err) {
      setError({
        message: 'Failed to play track',
        details: err instanceof Error ? err.message : 'Unknown error',
        trackPosition: track.position,
      });
    }
  };
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/music/tracks/${releaseId}`);
        if (!response.ok) throw new Error('Failed to fetch release');
        const tracksWithMetadata = await response.json();
        setTracks(tracksWithMetadata);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'Failed to load tracks',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [releaseId]);
  if (loading) {
    return /* @__PURE__ */ jsx('div', {
      className: 'animate-pulse space-y-2',
      children: Array.from({ length: 4 }).map((_, i) =>
        /* @__PURE__ */ jsx(
          'div',
          { className: 'h-16 bg-border/10 rounded-base' },
          i,
        ),
      ),
    });
  }
  if (error) {
    return /* @__PURE__ */ jsxs('div', {
      className: 'text-red-500 dark:text-red-400 p-4 text-center',
      children: [
        /* @__PURE__ */ jsx('p', {
          className: 'font-semibold',
          children: error.message,
        }),
        error.details &&
          /* @__PURE__ */ jsxs('p', {
            className: 'text-sm mt-1 text-red-400 dark:text-red-300',
            children: [
              error.details,
              error.trackPosition && ` (Track ${error.trackPosition})`,
            ],
          }),
      ],
    });
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(TrackList, {
      tracks,
      playingTrackId,
      onPlayToggle: handlePlayToggle,
      isPlayerReady: isReady,
    }),
  });
};
const TrackDisplayList = () => {
  const {
    result: trackResult,
    isPlaying: trackIsPlaying,
    isLoading: trackIsLoading,
    onPlayToggle: trackOnPlayToggle,
    dateAdded,
  } = useTrackContext();
  const [showTracks, setShowTracks] = useState(false);
  const { playlists, addExternalTrackToPlaylist, fetchPlaylists } =
    usePlaylistStore();
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);
  const handleAddToPlaylist = async (playlistId) => {
    if (!trackResult) return;
    try {
      const track = convertSearchResultToTrack(trackResult);
      await addExternalTrackToPlaylist(playlistId, track);
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };
  if (!trackResult) return null;
  return /* @__PURE__ */ jsxs('div', {
    className: 'space-y-2',
    children: [
      /* @__PURE__ */ jsxs('div', {
        className:
          'grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'relative',
                children: [
                  /* @__PURE__ */ jsx('img', {
                    src: trackResult.thumb || '/api/placeholder/50/50',
                    alt: trackResult.title,
                    className: 'w-12 h-12 rounded-base object-cover',
                  }),
                  /* @__PURE__ */ jsx('button', {
                    onClick: trackOnPlayToggle,
                    disabled: trackIsLoading,
                    className:
                      'absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-base disabled:opacity-100',
                    children: trackIsLoading
                      ? /* @__PURE__ */ jsx(Loader2, {
                          className: 'w-5 h-5 text-white animate-spin',
                        })
                      : trackIsPlaying
                        ? /* @__PURE__ */ jsx(Pause, {
                            className: 'w-5 h-5 text-white',
                          })
                        : /* @__PURE__ */ jsx(Play, {
                            className: 'w-5 h-5 text-white',
                          }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs('div', {
                children: [
                  /* @__PURE__ */ jsx('div', {
                    className: 'font-medium text-text dark:text-darkText',
                    children: trackResult.title,
                  }),
                  /* @__PURE__ */ jsxs('div', {
                    className: 'text-sm text-text/60 dark:text-darkText/60',
                    children: [
                      trackResult.year,
                      ' · ',
                      trackResult.country || 'Unknown',
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'text-sm text-text/60 dark:text-darkText/60',
            children: [
              /* @__PURE__ */ jsx('div', {
                children: trackResult.genre?.join(', ') || 'No Genre',
              }),
              /* @__PURE__ */ jsx('div', {
                children: trackResult.style?.join(', ') || 'No Style',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-2',
            children: [
              /* @__PURE__ */ jsx(Button, {
                variant: 'noShadow',
                size: 'icon',
                onClick: () => setShowTracks(!showTracks),
                children: showTracks
                  ? /* @__PURE__ */ jsx(ChevronUp, { className: 'w-4 h-4' })
                  : /* @__PURE__ */ jsx(ChevronDown, { className: 'w-4 h-4' }),
              }),
              /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Button, {
                      variant: 'noShadow',
                      size: 'icon',
                      title: 'Add to Playlist',
                      children: /* @__PURE__ */ jsx(ListPlus, {
                        className: 'w-4 h-4',
                      }),
                    }),
                  }),
                  /* @__PURE__ */ jsx(DropdownMenuContent, {
                    align: 'end',
                    children:
                      playlists && playlists.length > 0
                        ? playlists.map((playlist) =>
                            /* @__PURE__ */ jsxs(
                              DropdownMenuItem,
                              {
                                onClick: () => handleAddToPlaylist(playlist.id),
                                children: [
                                  /* @__PURE__ */ jsx(Plus, {
                                    className: 'mr-2 h-4 w-4',
                                  }),
                                  playlist.title,
                                ],
                              },
                              playlist.id,
                            ),
                          )
                        : /* @__PURE__ */ jsx(DropdownMenuItem, {
                            disabled: true,
                            children: 'No playlists found',
                          }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: 'noShadow',
                size: 'icon',
                children: /* @__PURE__ */ jsx(Heart, { className: 'w-4 h-4' }),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: 'noShadow',
                size: 'icon',
                children: /* @__PURE__ */ jsx(MoreHorizontal, {
                  className: 'w-4 h-4',
                }),
              }),
            ],
          }),
        ],
      }),
      showTracks &&
        /* @__PURE__ */ jsx('div', {
          className: 'ml-16',
          children: /* @__PURE__ */ jsx(ReleaseTracks, {
            releaseId: trackResult.id,
          }),
        }),
    ],
  });
};
const TrackDisplayGrid = () => {
  const {
    result: trackResult,
    isPlaying: trackIsPlaying,
    isLoading: trackIsLoading,
    onPlayToggle: trackOnPlayToggle,
    dateAdded,
  } = useTrackContext();
  const [showTracks, setShowTracks] = useState(false);
  const { playlists, addExternalTrackToPlaylist, fetchPlaylists } =
    usePlaylistStore();
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);
  const handleAddToPlaylist = async (playlistId) => {
    if (!trackResult) return;
    try {
      const track = convertSearchResultToTrack(trackResult);
      await addExternalTrackToPlaylist(playlistId, track);
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };
  if (!trackResult) return null;
  return /* @__PURE__ */ jsxs('div', {
    className:
      'relative border-2 border-border dark:border-darkBorder rounded-base p-3',
    children: [
      showTracks &&
        /* @__PURE__ */ jsx('div', {
          className:
            'absolute inset-0 z-10 bg-background/95 dark:bg-darkBg/95 backdrop-blur-sm rounded-base overflow-y-auto',
          children: /* @__PURE__ */ jsxs('div', {
            className: 'p-4',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'flex justify-between items-center mb-4',
                children: [
                  /* @__PURE__ */ jsx('h3', {
                    className: 'font-medium text-text dark:text-darkText',
                    children: trackResult.title,
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'noShadow',
                    size: 'icon',
                    onClick: () => setShowTracks(false),
                    children: /* @__PURE__ */ jsx(ChevronDown, {
                      className: 'w-4 h-4',
                    }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(ReleaseTracks, { releaseId: trackResult.id }),
            ],
          }),
        }),
      /* @__PURE__ */ jsxs('div', {
        className: 'relative group mb-3',
        children: [
          /* @__PURE__ */ jsx('img', {
            src: trackResult.cover_image || '/api/placeholder/300/300',
            alt: trackResult.title,
            className: 'w-full aspect-square object-cover rounded-base',
          }),
          /* @__PURE__ */ jsx('div', {
            className:
              'absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-base',
            children: /* @__PURE__ */ jsxs('div', {
              className: 'flex gap-2',
              children: [
                /* @__PURE__ */ jsx('button', {
                  onClick: trackOnPlayToggle,
                  disabled: trackIsLoading,
                  className:
                    'p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors disabled:opacity-80',
                  children: trackIsLoading
                    ? /* @__PURE__ */ jsx(Loader2, {
                        className: 'w-8 h-8 text-white animate-spin',
                      })
                    : trackIsPlaying
                      ? /* @__PURE__ */ jsx(Pause, {
                          className: 'w-8 h-8 text-white',
                        })
                      : /* @__PURE__ */ jsx(Play, {
                          className: 'w-8 h-8 text-white',
                        }),
                }),
                /* @__PURE__ */ jsx('button', {
                  onClick: () => setShowTracks(true),
                  className:
                    'p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors',
                  children: /* @__PURE__ */ jsx(ListMusic, {
                    className: 'w-8 h-8 text-white',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex justify-between items-start',
        children: [
          /* @__PURE__ */ jsxs('div', {
            children: [
              /* @__PURE__ */ jsx('h3', {
                className: 'font-medium text-text dark:text-darkText mb-1',
                children: trackResult.title,
              }),
              /* @__PURE__ */ jsxs('div', {
                className: 'text-sm text-text/60 dark:text-darkText/60 mb-2',
                children: [
                  trackResult.year,
                  ' · ',
                  trackResult.country || 'Unknown',
                ],
              }),
              /* @__PURE__ */ jsx('div', {
                className: 'text-sm text-text/60 dark:text-darkText/60',
                children: trackResult.genre?.join(', ') || 'No Genre',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex gap-2',
            children: [
              /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Button, {
                      variant: 'noShadow',
                      size: 'icon',
                      title: 'Add to Playlist',
                      children: /* @__PURE__ */ jsx(ListPlus, {
                        className: 'w-4 h-4',
                      }),
                    }),
                  }),
                  /* @__PURE__ */ jsx(DropdownMenuContent, {
                    align: 'end',
                    children:
                      playlists && playlists.length > 0
                        ? playlists.map((playlist) =>
                            /* @__PURE__ */ jsxs(
                              DropdownMenuItem,
                              {
                                onClick: () => handleAddToPlaylist(playlist.id),
                                children: [
                                  /* @__PURE__ */ jsx(Plus, {
                                    className: 'mr-2 h-4 w-4',
                                  }),
                                  playlist.title,
                                ],
                              },
                              playlist.id,
                            ),
                          )
                        : /* @__PURE__ */ jsx(DropdownMenuItem, {
                            disabled: true,
                            children: 'No playlists found',
                          }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: 'noShadow',
                size: 'icon',
                children: /* @__PURE__ */ jsx(Heart, { className: 'w-4 h-4' }),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: 'noShadow',
                size: 'icon',
                children: /* @__PURE__ */ jsx(MoreHorizontal, {
                  className: 'w-4 h-4',
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
const TrackContext = createContext(null);
const useTrackContext = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error(
      'useTrackContext must be used within a TrackContextProvider',
    );
  }
  return context;
};
const TrackDisplay = ({
  result,
  isPlaying,
  isLoading,
  onPlayToggle,
  viewMode,
  dateAdded,
}) => {
  if (!result) return null;
  return /* @__PURE__ */ jsx(TrackContext.Provider, {
    value: { result, isPlaying, isLoading, onPlayToggle, dateAdded },
    children:
      viewMode === 'list'
        ? /* @__PURE__ */ jsx(TrackDisplayList, {})
        : /* @__PURE__ */ jsx(TrackDisplayGrid, {}),
  });
};
const TrackGrid = ({ viewMode, items }) => {
  const { playingTrackId, isPlaying, togglePlayPause, isReady, setQueue } =
    usePlayerStore();
  const [loadingTrackId, setLoadingTrackId] = useState(null);
  const searchYouTubeForTrack = async (result) => {
    try {
      const titleParts = result.title.split(' - ');
      const artist = titleParts.length > 1 ? titleParts[0] : '';
      const title =
        titleParts.length > 1 ? titleParts.slice(1).join(' - ') : result.title;
      const searchQuery = `${artist} ${title}`.trim();
      const response = await fetch(
        `/api/external/youtube/search?q=${encodeURIComponent(searchQuery)}`,
      );
      if (!response.ok) {
        throw new Error('YouTube search failed');
      }
      const data = await response.json();
      return data.videoId || null;
    } catch (error) {
      console.error('YouTube search error:', error);
      return null;
    }
  };
  const handlePlayToggle = async (result) => {
    if (!isReady) {
      toast.error('Player is still loading...');
      return;
    }
    try {
      const tempTrack = createTemporaryTrackForPlayback(result);
      setLoadingTrackId(tempTrack.id);
      if (!tempTrack.youtube_video_id) {
        toast.loading('Finding audio for this track...', {
          id: 'youtube-search',
        });
        const videoId = await searchYouTubeForTrack(result);
        if (!videoId) {
          toast.error('No audio found for this track', {
            id: 'youtube-search',
          });
          setLoadingTrackId(null);
          return;
        }
        tempTrack.youtube_video_id = videoId;
        toast.success('Audio found! Starting playback...', {
          id: 'youtube-search',
        });
      }
      const searchTracks = items.map((item) =>
        createTemporaryTrackForPlayback(item),
      );
      const trackIndex = searchTracks.findIndex(
        (track) => track.id === tempTrack.id,
      );
      if (trackIndex !== -1) {
        searchTracks[trackIndex] = tempTrack;
      }
      setQueue(searchTracks, trackIndex);
      togglePlayPause(tempTrack);
    } catch (error) {
      console.error('Error playing track:', error);
      toast.error('Failed to play track');
    } finally {
      setLoadingTrackId(null);
    }
  };
  return /* @__PURE__ */ jsx('div', {
    className:
      viewMode === 'list'
        ? 'space-y-2'
        : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
    children: items.map((item) => {
      const tempTrack = createTemporaryTrackForPlayback(item);
      const isLoading = loadingTrackId === tempTrack.id;
      return /* @__PURE__ */ jsx(
        TrackDisplay,
        {
          result: item,
          viewMode,
          isPlaying: playingTrackId === tempTrack.id,
          isLoading,
          onPlayToggle: () => handlePlayToggle(item),
          dateAdded: item.date_added || '',
        },
        item.id,
      );
    }),
  });
};
const SearchView = ({
  query,
  isLoading,
  error,
  results,
  onQueryChange,
  viewMode,
}) => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(SearchBar, {
        query,
        isLoading,
        onQueryChange,
      }),
      error &&
        /* @__PURE__ */ jsx('div', {
          className: 'text-red-500 dark:text-red-400 text-center py-4',
          children: error,
        }),
      !error &&
        /* @__PURE__ */ jsx(TrackGrid, {
          viewMode,
          items: results,
        }),
    ],
  });
};
const CollectionView = ({ isLoading, error, collection, viewMode }) => {
  if (isLoading)
    return /* @__PURE__ */ jsx('div', { children: 'Loading collection...' });
  if (error)
    return /* @__PURE__ */ jsx('div', {
      className: 'text-red-500',
      children: error,
    });
  return /* @__PURE__ */ jsx(TrackGrid, {
    viewMode,
    items: collection.map((release) => ({
      id: release.basic_information.id,
      title: `${release.basic_information.artists.map((a) => a.name).join(', ')} - ${release.basic_information.title}`,
      thumb: release.basic_information.thumb,
      cover_image: release.basic_information.cover_image,
      year: String(release.basic_information.year),
      label: [release.basic_information.labels.map((l) => l.name).join(', ')],
      genre: release.basic_information.genres,
      style: release.basic_information.styles,
      format: [release.basic_information.formats.map((f) => f.name).join(', ')],
      type: 'release',
      uri: `https://www.discogs.com/release/${release.basic_information.id}`,
      resource_url: `https://api.discogs.com/releases/${release.basic_information.id}`,
      date_added: release.date_added,
    })),
  });
};
const CrateExplorer = ({}) => {
  const {
    query,
    setQuery,
    results,
    isLoading: searchLoading,
    error: searchError,
  } = useDiscogsSearch();
  const {
    collection,
    pagination,
    loading: collectionLoading,
    error: collectionError,
  } = useDiscogsCollection();
  const [viewMode, setViewMode] = useState('list');
  const [view, setView] = useState('search');
  const { initializePlayer } = usePlayerStore();
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);
  const [collectionStats, setCollectionStats] = useState({
    total: 0,
    loaded: 0,
  });
  useEffect(() => {
    if (pagination) {
      setCollectionStats({
        total: pagination.items,
        loaded: collection.length,
      });
    }
  }, [collection, pagination]);
  return /* @__PURE__ */ jsxs('div', {
    className: 'w-full max-w-6xl mx-auto p-6',
    children: [
      /* @__PURE__ */ jsxs('div', {
        className: 'flex justify-between items-center mb-6',
        children: [
          /* @__PURE__ */ jsx(ViewToggleButtons, {
            view,
            onViewChange: setView,
            collectionCount: collectionStats.total,
          }),
          /* @__PURE__ */ jsx(ViewToggle, {
            viewMode,
            onViewModeChange: setViewMode,
          }),
        ],
      }),
      view === 'search'
        ? /* @__PURE__ */ jsx(SearchView, {
            query,
            isLoading: searchLoading,
            error: searchError,
            results,
            onQueryChange: setQuery,
            viewMode,
          })
        : /* @__PURE__ */ jsx(CollectionView, {
            isLoading: collectionLoading,
            error: collectionError,
            collection,
            viewMode,
          }),
    ],
  });
};
function CollectionPage() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(PageHeader, {
        title: 'Collection Explorer',
        description: 'Browse your Discogs collection and discover new music',
      }),
      /* @__PURE__ */ jsx(ErrorBoundary, {
        children: /* @__PURE__ */ jsx(CrateExplorer, {}),
      }),
    ],
  });
}
export { CollectionPage as component };
