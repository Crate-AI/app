import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  b as usePlaylistStore,
  e as usePlayerStore,
  C as Card,
  c as cn,
  B as Button,
  g as CardHeader,
  d as CardContent,
  h as CardTitle,
} from './router-1d_kQrZ6.js';
import { Pause, Play, Trash2, Globe, Lock } from 'lucide-react';
import { Image } from '@unpic/react';
import { toast } from 'sonner';
import * as SwitchPrimitives from '@radix-ui/react-switch';
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
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
const PlaylistCard = ({ playlist, handleClick, onExpand }) => {
  const { deletePlaylist, togglePlaylistPublic } = usePlaylistStore();
  const { playingTrackId, isPlaying, togglePlayPause } = usePlayerStore();
  const isPlayingThisPlaylist = playlist.tracks?.some(
    (track) => track.id === playingTrackId,
  );
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (playlist.tracks?.length > 0) {
      togglePlayPause(playlist.tracks[0]);
      onExpand();
    }
  };
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deletePlaylist(playlist.id);
      toast.success('Playlist deleted');
    } catch (error) {
      toast.error('Failed to delete playlist');
    }
  };
  return /* @__PURE__ */ jsxs(Card, {
    className: cn(
      'group relative overflow-hidden transition-all hover:shadow-light cursor-pointer border-none',
      isPlayingThisPlaylist && 'ring-2 ring-mainAccent',
    ),
    onClick: handleClick,
    children: [
      /* @__PURE__ */ jsx('div', {
        className:
          'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity',
      }),
      /* @__PURE__ */ jsxs('div', {
        className: 'absolute right-4 top-4 flex gap-2',
        children: [
          /* @__PURE__ */ jsx('button', {
            className: cn(
              'p-3 rounded-full bg-mainAccent text-text',
              isPlayingThisPlaylist
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100',
              'transition-all hover:scale-105',
            ),
            onClick: handlePlayPause,
            children:
              isPlayingThisPlaylist && isPlaying
                ? /* @__PURE__ */ jsx(Pause, { size: 24 })
                : /* @__PURE__ */ jsx(Play, { size: 24 }),
          }),
          !playlist.is_favorites &&
            /* @__PURE__ */ jsx(Button, {
              variant: 'destructive',
              size: 'icon',
              className: 'opacity-0 group-hover:opacity-100 transition-opacity',
              onClick: handleDelete,
              children: /* @__PURE__ */ jsx(Trash2, { className: 'h-4 w-4' }),
            }),
        ],
      }),
      /* @__PURE__ */ jsx(CardHeader, {
        className: 'h-48 bg-gray-100',
        children:
          playlist.tracks?.length > 0 && playlist.tracks[0].artwork
            ? /* @__PURE__ */ jsx(Image, {
                src: decodeURIComponent(
                  playlist.tracks[0].artwork.replace(/^"(.*)"$/, '$1'),
                ),
                alt: playlist.tracks[0].artist ?? '',
                className: 'w-full h-full object-cover',
                width: 400,
                height: 400,
              })
            : /* @__PURE__ */ jsx('div', {
                className:
                  'w-full h-full bg-gray-100 flex items-center justify-center',
                children: /* @__PURE__ */ jsx(Play, {
                  size: 48,
                  className: 'text-gray-400',
                }),
              }),
      }),
      /* @__PURE__ */ jsxs(CardContent, {
        className: 'p-4 bg-bg space-y-3',
        children: [
          /* @__PURE__ */ jsx(CardTitle, {
            className: 'text-lg font-heading font-medium text-text mb-1',
            children: playlist?.title,
          }),
          /* @__PURE__ */ jsxs('p', {
            className: 'text-small-subtitle text-text/70',
            children: [playlist?.tracks?.length, ' tracks'],
          }),
          /* @__PURE__ */ jsx('div', {
            className:
              'flex items-center justify-between pt-3 border-t border-border/50',
            children: /* @__PURE__ */ jsx('div', {
              className: 'flex items-center gap-2',
              children: /* @__PURE__ */ jsx('label', {
                htmlFor: `public-${playlist.id}`,
                className:
                  'text-xs font-medium cursor-pointer flex items-center gap-1.5',
                onClick: (e) => e.stopPropagation(),
                children: playlist.is_public
                  ? /* @__PURE__ */ jsxs(Fragment, {
                      children: [
                        /* @__PURE__ */ jsx(Globe, { className: 'h-3 w-3' }),
                        'Public',
                      ],
                    })
                  : /* @__PURE__ */ jsxs(Fragment, {
                      children: [
                        /* @__PURE__ */ jsx(Lock, { className: 'h-3 w-3' }),
                        'Private',
                      ],
                    }),
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
const formatDuration = (duration) => {
  if (!duration || duration === 'EMPTY') {
    return '-';
  }
  if (typeof duration === 'string' && duration.includes(':')) {
    return duration;
  }
  if (typeof duration === 'string') {
    duration = parseInt(duration);
  }
  if (isNaN(duration)) {
    return '-';
  }
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = Math.floor(duration % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
const Switch = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
    className: cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-mainAccent data-[state=unchecked]:bg-input',
      className,
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, {
      className: cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      ),
    }),
  }),
);
Switch.displayName = SwitchPrimitives.Root.displayName;
const Playlist = ({ activePlaylistId }) => {
  const { playlists, removeTrackFromPlaylist, togglePlaylistPublic } =
    usePlaylistStore();
  const { initializePlayer, playingTrackId, isPlaying, togglePlayPause } =
    usePlayerStore();
  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);
  if (!activePlaylist) {
    return null;
  }
  const handleRemoveTrack = async (trackId) => {
    try {
      await removeTrackFromPlaylist(activePlaylistId, trackId);
    } catch (error) {
      console.error('Error removing track:', error);
    }
  };
  return /* @__PURE__ */ jsxs('div', {
    className: 'relative overflow-x-auto',
    children: [
      /* @__PURE__ */ jsxs('div', {
        className: 'mb-6 space-y-4',
        children: [
          /* @__PURE__ */ jsx('div', {
            className: 'flex items-center justify-between',
            children: /* @__PURE__ */ jsx('h2', {
              className: 'text-medium-title font-heading font-bold text-text',
              children: activePlaylist.title,
            }),
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-3 pb-4 border-b border-border',
            children: [
              /* @__PURE__ */ jsx(Switch, {
                id: `public-${activePlaylist.id}`,
                checked: activePlaylist.is_public ?? false,
                onCheckedChange: (checked) => {
                  togglePlaylistPublic(activePlaylist.id, checked);
                },
              }),
              /* @__PURE__ */ jsx('label', {
                htmlFor: `public-${activePlaylist.id}`,
                className:
                  'text-sm font-medium cursor-pointer flex items-center gap-2',
                children: activePlaylist.is_public
                  ? /* @__PURE__ */ jsxs(Fragment, {
                      children: [
                        /* @__PURE__ */ jsx(Globe, { className: 'h-4 w-4' }),
                        'Public Playlist',
                      ],
                    })
                  : /* @__PURE__ */ jsxs(Fragment, {
                      children: [
                        /* @__PURE__ */ jsx(Lock, { className: 'h-4 w-4' }),
                        'Private Playlist',
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs('table', {
        className: 'min-w-full divide-y divide-border',
        children: [
          /* @__PURE__ */ jsx('thead', {
            className: 'bg-bg',
            children: /* @__PURE__ */ jsxs('tr', {
              children: [
                /* @__PURE__ */ jsx('th', {
                  className:
                    'w-16 px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Play',
                }),
                /* @__PURE__ */ jsx('th', {
                  className:
                    'px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Track',
                }),
                /* @__PURE__ */ jsx('th', {
                  className:
                    'w-24 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Duration',
                }),
                /* @__PURE__ */ jsx('th', {
                  className:
                    'w-16 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Actions',
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx('tbody', {
            className: 'bg-bg divide-y divide-border',
            children: activePlaylist.tracks?.map((track) => {
              const isPlayingThisTrack = playingTrackId === track.id;
              return /* @__PURE__ */ jsxs(
                'tr',
                {
                  className: 'hover:bg-bg/50',
                  children: [
                    /* @__PURE__ */ jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap',
                      children: /* @__PURE__ */ jsx('button', {
                        onClick: () => togglePlayPause(track),
                        className: 'p-2 rounded-full hover:bg-bg/50',
                        children:
                          isPlayingThisTrack && isPlaying
                            ? /* @__PURE__ */ jsx(Pause, {
                                className: 'h-4 w-4',
                              })
                            : /* @__PURE__ */ jsx(Play, {
                                className: 'h-4 w-4',
                              }),
                      }),
                    }),
                    /* @__PURE__ */ jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap',
                      children: /* @__PURE__ */ jsx('div', {
                        className: 'flex items-center',
                        children: /* @__PURE__ */ jsx('div', {
                          className: 'text-sm font-medium text-text',
                          children: track.title,
                        }),
                      }),
                    }),
                    /* @__PURE__ */ jsx('td', {
                      className:
                        'px-4 py-3 whitespace-nowrap text-right text-sm text-text/70',
                      children: formatDuration(track.duration),
                    }),
                    /* @__PURE__ */ jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap text-right',
                      children: /* @__PURE__ */ jsx(Button, {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => handleRemoveTrack(track.id),
                        children: /* @__PURE__ */ jsx(Trash2, {
                          className: 'h-4 w-4',
                        }),
                      }),
                    }),
                  ],
                },
                track.id,
              );
            }),
          }),
        ],
      }),
    ],
  });
};
function PlaylistPage() {
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);
  const { playlists, fetchPlaylists } = usePlaylistStore();
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);
  const handlePlaylistClick = (playlist) => {
    setExpandedPlaylistId((currentId) =>
      currentId === playlist.id ? null : playlist.id,
    );
  };
  const handlePlaylistExpand = (playlistId) => {
    setExpandedPlaylistId(playlistId);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(PageHeader, {
        title: 'Playlists',
        description: 'Create and manage your music playlists',
      }),
      /* @__PURE__ */ jsx('div', {
        className: 'min-h-screen py-8',
        children: /* @__PURE__ */ jsxs('div', {
          className: 'container mx-auto px-4',
          children: [
            /* @__PURE__ */ jsx('div', {
              className:
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12',
              children: playlists.map((playlist) =>
                /* @__PURE__ */ jsx(
                  PlaylistCard,
                  {
                    playlist,
                    handleClick: () => handlePlaylistClick(playlist),
                    onExpand: () => handlePlaylistExpand(playlist.id),
                  },
                  playlist.id,
                ),
              ),
            }),
            expandedPlaylistId &&
              /* @__PURE__ */ jsx('div', {
                className: 'mt-12',
                children: /* @__PURE__ */ jsx(Playlist, {
                  activePlaylistId: expandedPlaylistId,
                }),
              }),
          ],
        }),
      }),
    ],
  });
}
export { PlaylistPage as component };
