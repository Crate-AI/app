import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import {
  c as cn,
  a as useTracksStore,
  b as usePlaylistStore,
  e as usePlayerStore,
  B as Button,
  C as Card,
  d as CardContent,
  u as useAuthStore,
  A as Avatar,
  i as AvatarImage,
  j as AvatarFallback,
  D as DropdownMenu,
  k as DropdownMenuTrigger,
  l as DropdownMenuContent,
  m as DropdownMenuItem,
  E as ErrorBoundary,
} from './router-1d_kQrZ6.js';
import * as React from 'react';
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  Search,
  X,
  Heart,
  Pause,
  Play,
  ListPlus,
  PlusCircle,
  ArrowUpDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  Music,
  Bot,
  MoreVertical,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { I as Input } from './input-BtHci9LN.js';
import { Image } from '@unpic/react';
import {
  createColumnHelper,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  S as Select,
  a as SelectTrigger,
  b as SelectValue,
  c as SelectContent,
  d as SelectItem,
  L as Label,
} from './select-CScHJYD6.js';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useChat } from 'ai/react';
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
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
import '@radix-ui/react-label';
import '@radix-ui/react-select';
const SearchInput = forwardRef(
  ({ value, onChange, placeholder = 'Search tracks...' }, ref) => {
    return /* @__PURE__ */ jsxs('div', {
      className: 'relative w-full p-[4px]',
      children: [
        /* @__PURE__ */ jsx(Search, {
          className:
            'absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10',
        }),
        /* @__PURE__ */ jsx(Input, {
          ref,
          type: 'text',
          placeholder,
          value,
          onChange: (e) => onChange(e.target.value),
          className: cn(
            'w-full pl-12 pr-8',
            'transition-shadow duration-300',
            'hover:shadow-hover',
            'focus:shadow-focus',
          ),
        }),
        value &&
          /* @__PURE__ */ jsx('button', {
            onClick: () => onChange(''),
            className:
              'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
            children: /* @__PURE__ */ jsx(X, { className: 'h-4 w-4' }),
          }),
      ],
    });
  },
);
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
    ref,
    className: cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    ),
    ...props,
  }),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) =>
    /* @__PURE__ */ jsxs(DialogPortal, {
      children: [
        /* @__PURE__ */ jsx(DialogOverlay, {}),
        /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
          ref,
          className: cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            className,
          ),
          ...props,
          children: [
            children,
            /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
              className:
                'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
              children: [
                /* @__PURE__ */ jsx(Cross2Icon, { className: 'h-4 w-4' }),
                /* @__PURE__ */ jsx('span', {
                  className: 'sr-only',
                  children: 'Close',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) =>
  /* @__PURE__ */ jsx('div', {
    className: cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    ),
    ...props,
  });
DialogHeader.displayName = 'DialogHeader';
const DialogFooter = ({ className, ...props }) =>
  /* @__PURE__ */ jsx('div', {
    className: cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    ),
    ...props,
  });
DialogFooter.displayName = 'DialogFooter';
const DialogTitle = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(DialogPrimitive.Title, {
    ref,
    className: cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    ),
    ...props,
  }),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(DialogPrimitive.Description, {
    ref,
    className: cn('text-sm text-muted-foreground', className),
    ...props,
  }),
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function TracksTable() {
  const { allTracks, suggestedTrackIds } = useTracksStore();
  const { createPlaylist, addTrackToPlaylist, fetchPlaylists } =
    usePlaylistStore();
  const {
    playingTrackId,
    isReady,
    isPlaying,
    togglePlayPause,
    initializePlayer,
    addToQueue,
  } = usePlayerStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchInputRef = useRef(null);
  const [rowHover, setRowHover] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlaylistOptions, setShowPlaylistOptions] = useState(null);
  const [playbackProgress, setPlaybackProgress] = useState({});
  const [actionHistory, setActionHistory] = useState([]);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState(
    /* @__PURE__ */ new Set(),
  );
  const [favoritesPlaylistId, setFavoritesPlaylistId] = useState(null);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(null);
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/music/favorites');
        if (response.ok) {
          const data = await response.json();
          setFavoriteTrackIds(new Set(data.favoriteTrackIds || []));
        }
      } catch (error2) {
        console.error('Error fetching favorites:', error2);
      }
    };
    fetchFavorites();
  }, []);
  const handlePlayToggle = async (track) => {
    if (!track.youtube_video_id) {
      toast.error('No audio available for this track');
      return;
    }
    if (!isReady) {
      toast.error('Player is still loading...');
      return;
    }
    try {
      const { queue, setQueue } = usePlayerStore.getState();
      if (queue.length === 0) {
        const trackIndex = allTracks.findIndex((t) => t.id === track.id);
        setQueue(allTracks, trackIndex);
        toast.success(`Added ${allTracks.length} tracks to queue`);
      }
      togglePlayPause(track);
    } catch (error2) {
      console.error('Error playing track:', error2);
      toast.error('Failed to play track');
    }
  };
  const handleAddToQueue = (track) => {
    addToQueue(track);
    toast.success(`Added "${track.title}" to queue`);
  };
  const handleToggleFavorite = async (track) => {
    if (!favoritesPlaylistId) {
      toast.error('Favorites playlist not found');
      return;
    }
    setIsTogglingFavorite(track.id);
    try {
      const isFavorite = favoriteTrackIds.has(track.id);
      if (isFavorite) {
        const response = await fetch('/api/music/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackId: track.id }),
        });
        if (response.ok) {
          setFavoriteTrackIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(track.id);
            return newSet;
          });
          toast.success('Removed from favorites');
        } else {
          toast.error('Failed to remove from favorites');
        }
      } else {
        const response = await fetch('/api/music/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackId: track.id }),
        });
        if (response.ok) {
          setFavoriteTrackIds(
            (prev) => /* @__PURE__ */ new Set([...prev, track.id]),
          );
          toast.success('Added to favorites');
        } else {
          toast.error('Failed to add to favorites');
        }
      }
    } catch (error2) {
      console.error('Error toggling favorite:', error2);
      toast.error('Failed to update favorite');
    } finally {
      setIsTogglingFavorite(null);
    }
  };
  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const fetchedPlaylists = await fetchPlaylists();
        const favPlaylist = fetchedPlaylists.find((p) => p.is_favorites);
        if (favPlaylist) {
          setFavoritesPlaylistId(favPlaylist.id);
        }
        setPlaylists(fetchedPlaylists);
      } catch (error2) {
        console.error('Error fetching playlists:', error2);
        setError('Failed to fetch playlists');
      }
    };
    getPlaylists();
  }, [fetchPlaylists]);
  const handleAddToPlaylist = async (playlistId, trackId) => {
    try {
      const actionId = Date.now();
      const action = {
        type: 'addToPlaylist',
        data: { playlistId, trackId },
        timestamp: actionId,
      };
      setActionHistory((prev) => [...prev, action]);
      await addTrackToPlaylist(playlistId, trackId);
      const playlistName =
        playlists.find((p) => p.id === playlistId)?.name || 'playlist';
      toast.success(`Added to ${playlistName}`, {
        duration: 5e3,
        action: {
          label: 'Undo',
          onClick: () => {
            toast.info(`Removed from ${playlistName}`);
            setActionHistory((prev) =>
              prev.filter((a) => a.timestamp !== actionId),
            );
          },
        },
      });
    } catch (error2) {
      toast.error('Failed to add to playlist');
    }
  };
  const handleCreateNewPlaylist = async () => {
    if (!newPlaylistName.trim() || isLoading || !selectedTrack) return;
    setIsLoading(true);
    try {
      const playlistId = await createPlaylist(newPlaylistName);
      const actionId = Date.now();
      const action = {
        type: 'createPlaylist',
        data: { playlistId, name: newPlaylistName, trackId: selectedTrack.id },
        timestamp: actionId,
      };
      setActionHistory((prev) => [...prev, action]);
      await addTrackToPlaylist(playlistId, selectedTrack.id);
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
      toast.success(`Created playlist "${newPlaylistName}"`, {
        duration: 5e3,
        action: {
          label: 'Undo',
          onClick: () => {
            toast.info(`Deleted playlist "${newPlaylistName}"`);
            setActionHistory((prev) =>
              prev.filter((a) => a.timestamp !== actionId),
            );
          },
        },
      });
    } catch (error2) {
      toast.error('Failed to create playlist');
    } finally {
      setIsLoading(false);
      setSelectedTrack(null);
    }
  };
  useEffect(() => {
    if (allTracks.length > 0) {
      setLoading(false);
    }
  }, [allTracks]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const formatArtists = (artist, extraArtists) => {
    if (!extraArtists) return artist;
    return `${artist}, ${extraArtists}`;
  };
  const formatList = (list) => {
    if (!list) return '-';
    return list.split(',').join(', ');
  };
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      // Favorites column
      columnHelper.display({
        id: 'favorite',
        header: '',
        cell: ({ row }) => {
          const track = row.original;
          const isFavorite = favoriteTrackIds.has(track.id);
          const isToggling = isTogglingFavorite === track.id;
          return /* @__PURE__ */ jsx(Button, {
            variant: 'noShadow',
            size: 'icon',
            className: 'h-8 w-8',
            onClick: () => handleToggleFavorite(track),
            disabled: isToggling,
            children: /* @__PURE__ */ jsx(Heart, {
              className: cn(
                'h-4 w-4 transition-colors',
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 hover:text-red-500',
              ),
            }),
          });
        },
      }),
      // Combined Play/Position column with contextual actions
      columnHelper.display({
        id: 'playActions',
        header: 'Track',
        cell: ({ row }) => {
          const track = row.original;
          const isHovering = rowHover === track.id;
          return /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'relative',
                children: [
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'noShadow',
                    size: 'icon',
                    className: cn(
                      'h-8 w-8 relative z-10',
                      playingTrackId === track.id && 'bg-main/20',
                    ),
                    onClick: () => handlePlayToggle(track),
                    disabled: !track.youtube_video_id || !isReady,
                    children:
                      playingTrackId === track.id && isPlaying
                        ? /* @__PURE__ */ jsxs(Fragment, {
                            children: [
                              /* @__PURE__ */ jsx(Pause, {
                                className: 'h-4 w-4',
                              }),
                              /* @__PURE__ */ jsx('span', {
                                className:
                                  'absolute inset-0 rounded-full animate-pulse-light bg-main/30',
                              }),
                            ],
                          })
                        : /* @__PURE__ */ jsx(Play, { className: 'h-4 w-4' }),
                  }),
                  playingTrackId === track.id &&
                    /* @__PURE__ */ jsx('div', {
                      className:
                        'absolute -bottom-1 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden',
                      children: /* @__PURE__ */ jsx('div', {
                        className:
                          'h-full bg-main transition-all duration-300 ease-linear',
                        style: { width: `${playbackProgress[track.id] || 0}%` },
                      }),
                    }),
                  track.position &&
                    /* @__PURE__ */ jsx('span', {
                      className:
                        'absolute -top-2 -right-2 text-xs px-1 bg-gray-100 rounded-full text-gray-500',
                      children: track.position,
                    }),
                ],
              }),
              track.artwork
                ? /* @__PURE__ */ jsx('div', {
                    className: 'h-10 w-10 flex-shrink-0',
                    children: /* @__PURE__ */ jsx(Image, {
                      src: track.artwork,
                      alt: track.title,
                      width: 40,
                      height: 40,
                      className: 'h-10 w-10 rounded-sm object-cover',
                    }),
                  })
                : /* @__PURE__ */ jsx('div', {
                    className: 'h-10 w-10 flex-shrink-0 bg-gray-100 rounded-sm',
                  }),
              /* @__PURE__ */ jsx('div', {
                className:
                  'text-sm font-medium text-gray-900 max-w-[16rem] relative overflow-hidden',
                children: /* @__PURE__ */ jsx('div', {
                  className: cn(
                    'whitespace-nowrap',
                    isHovering && track.title.length > 30 && 'hover-marquee',
                  ),
                  children: track.title,
                }),
              }),
              isHovering &&
                /* @__PURE__ */ jsxs('div', {
                  className: 'flex items-center ml-2 animate-fadeIn space-x-1',
                  children: [
                    /* @__PURE__ */ jsx(Button, {
                      variant: 'ghost',
                      size: 'sm',
                      className: 'h-8 w-8 p-0',
                      onClick: (e) => {
                        e.stopPropagation();
                        handleAddToQueue(track);
                      },
                      title: 'Add to queue',
                      children: /* @__PURE__ */ jsx(ListPlus, {
                        className: 'h-4 w-4',
                      }),
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      variant: 'ghost',
                      size: 'sm',
                      className: 'h-8 w-8 p-0',
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedTrack(track);
                        setShowPlaylistOptions(track.id);
                      },
                      title: 'Add to playlist',
                      children: /* @__PURE__ */ jsx(PlusCircle, {
                        className: 'h-4 w-4',
                      }),
                    }),
                  ],
                }),
            ],
          });
        },
      }),
      columnHelper.accessor((row) => row.artist, {
        id: 'artist',
        header: ({ column }) =>
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center cursor-pointer',
            onClick: () => column.toggleSorting(),
            children: [
              /* @__PURE__ */ jsx('span', { children: 'Artist' }),
              /* @__PURE__ */ jsx(ArrowUpDown, { className: 'ml-2 h-4 w-4' }),
            ],
          }),
        cell: ({ row }) => {
          const track = row.original;
          const isHovering = rowHover === track.id;
          const artist = formatArtists(track.artist, track.extra_artists);
          return /* @__PURE__ */ jsx('div', {
            className: 'text-sm text-gray-500 max-w-[18rem] overflow-hidden',
            children: /* @__PURE__ */ jsx('div', {
              className: cn(
                'whitespace-nowrap',
                isHovering && artist.length > 15 && 'marquee-text',
              ),
              children: /* @__PURE__ */ jsx(ArtistPreview, {
                artist: track.artist,
                children: artist,
              }),
            }),
          });
        },
      }),
      columnHelper.accessor((row) => row.genres, {
        id: 'genre_style',
        header: ({ column }) =>
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center cursor-pointer',
            onClick: () => column.toggleSorting(),
            children: [
              /* @__PURE__ */ jsx('span', { children: 'Genre/Style' }),
              /* @__PURE__ */ jsx(ArrowUpDown, { className: 'ml-2 h-4 w-4' }),
            ],
          }),
        cell: ({ row }) => {
          const track = row.original;
          const isHovering = rowHover === track.id;
          const genreStyle = [
            track.genres && formatList(track.genres),
            track.styles && formatList(track.styles),
          ]
            .filter(Boolean)
            .join(' / ');
          return /* @__PURE__ */ jsx('div', {
            className:
              'text-sm text-gray-500 max-w-[18rem] relative overflow-hidden',
            children: /* @__PURE__ */ jsx('div', {
              className: cn(
                'whitespace-nowrap',
                isHovering && genreStyle.length > 20 && 'hover-marquee',
              ),
              children: genreStyle,
            }),
          });
        },
      }),
      columnHelper.accessor((row) => row.duration, {
        id: 'duration',
        header: ({ column }) =>
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center cursor-pointer',
            onClick: () => column.toggleSorting(),
            children: [
              /* @__PURE__ */ jsx('span', { children: 'Duration' }),
              /* @__PURE__ */ jsx(ArrowUpDown, { className: 'ml-2 h-4 w-4' }),
            ],
          }),
        cell: ({ getValue }) =>
          /* @__PURE__ */ jsx('div', {
            className: 'text-sm text-gray-500',
            children: getValue() || '-',
          }),
      }),
    ],
    [
      playingTrackId,
      isReady,
      isPlaying,
      rowHover,
      handlePlayToggle,
      handleAddToPlaylist,
      playlists,
      favoriteTrackIds,
      isTogglingFavorite,
    ],
  );
  const globalFilter = (row, columnId, value) => {
    const searchLower = value.toLowerCase();
    const track = row.original;
    return (
      track.title.toLowerCase().includes(searchLower) ||
      track.artist.toLowerCase().includes(searchLower) ||
      (track.genres?.toLowerCase() || '').includes(searchLower) ||
      (track.styles?.toLowerCase() || '').includes(searchLower)
    );
  };
  const table = useReactTable({
    data: allTracks,
    columns,
    state: {
      sorting,
      globalFilter: searchQuery,
      pagination,
    },
    globalFilterFn: globalFilter,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchQuery,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    debugTable: process.env.NODE_ENV === 'development',
  });
  useEffect(() => {
    if (!playingTrackId) return;
    if (!playbackProgress[playingTrackId]) {
      setPlaybackProgress((prev) => ({ ...prev, [playingTrackId]: 0 }));
    }
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        const currentProgress = prev[playingTrackId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [playingTrackId]: currentProgress + 1 };
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [playingTrackId]);
  if (loading && allTracks.length === 0) {
    return /* @__PURE__ */ jsxs('div', {
      className: 'space-y-4 ml-8',
      children: [
        /* @__PURE__ */ jsxs('div', {
          className: 'flex justify-between items-center mb-4',
          children: [
            /* @__PURE__ */ jsx('div', {
              className: 'w-40 h-9 bg-gray-200 animate-pulse rounded-md',
            }),
            /* @__PURE__ */ jsx('div', {
              className: 'w-64 h-9 bg-gray-200 animate-pulse rounded-md',
            }),
          ],
        }),
        /* @__PURE__ */ jsx('div', {
          className: 'relative overflow-x-auto rounded-md border',
          children: /* @__PURE__ */ jsxs('table', {
            className: 'min-w-full divide-y divide-gray-200',
            children: [
              /* @__PURE__ */ jsx('thead', {
                className: 'bg-gray-50',
                children: /* @__PURE__ */ jsx('tr', {
                  children: Array.from({ length: 6 }).map((_, i) =>
                    /* @__PURE__ */ jsx(
                      'th',
                      {
                        className: 'px-4 py-3',
                        children: /* @__PURE__ */ jsx('div', {
                          className:
                            'h-4 bg-gray-200 rounded w-20 animate-pulse',
                        }),
                      },
                      i,
                    ),
                  ),
                }),
              }),
              /* @__PURE__ */ jsx('tbody', {
                children: Array.from({ length: 8 }).map((_, rowIndex) =>
                  /* @__PURE__ */ jsxs(
                    'tr',
                    {
                      className: 'border-b border-gray-100',
                      children: [
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsx('div', {
                            className:
                              'w-8 h-8 bg-gray-200 rounded-full animate-pulse',
                          }),
                        }),
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsxs('div', {
                            className: 'flex items-center gap-3',
                            children: [
                              /* @__PURE__ */ jsx('div', {
                                className:
                                  'w-8 h-8 bg-gray-200 rounded-full animate-pulse',
                              }),
                              /* @__PURE__ */ jsx('div', {
                                className:
                                  'h-10 w-10 bg-gray-200 rounded-sm animate-pulse',
                              }),
                              /* @__PURE__ */ jsx('div', {
                                className:
                                  'h-4 bg-gray-200 rounded w-40 animate-pulse',
                              }),
                            ],
                          }),
                        }),
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsx('div', {
                            className:
                              'h-4 bg-gray-200 rounded w-24 animate-pulse',
                          }),
                        }),
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsx('div', {
                            className:
                              'h-4 bg-gray-200 rounded w-36 animate-pulse',
                          }),
                        }),
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsx('div', {
                            className:
                              'h-4 bg-gray-200 rounded w-10 animate-pulse',
                          }),
                        }),
                        /* @__PURE__ */ jsx('td', {
                          className: 'px-4 py-4',
                          children: /* @__PURE__ */ jsx('div', {
                            className:
                              'h-4 bg-gray-200 rounded w-12 animate-pulse',
                          }),
                        }),
                      ],
                    },
                    rowIndex,
                  ),
                ),
              }),
            ],
          }),
        }),
      ],
    });
  }
  if (error) {
    return /* @__PURE__ */ jsx('div', {
      className: 'text-red-500',
      children: error,
    });
  }
  const marqueeStyles = `
    @keyframes limited-marquee {
      0% { transform: translateX(0); }
      20% { transform: translateX(0); }
      80% { transform: translateX(calc(-100% + 100%)); }
      100% { transform: translateX(0); }
    }
    
    .hover-marquee {
      animation: limited-marquee 3s ease-in-out;
      animation-iteration-count: 1;
      display: inline-block;
      position: relative;
      max-width: 100%;
    }

    @keyframes marquee-animation {
      0% { transform: translateX(0); }
      10% { transform: translateX(0); }
      90% { transform: translateX(max(-100%, -300px)); }
      100% { transform: translateX(0); }
    }
    
    .marquee-text {
      animation: marquee-animation 3s ease-in-out;
      display: inline-block;
      white-space: nowrap;
    }
    
    /* Ensure containers don't grow with content */
    [class*="max-w-"] {
      overflow: hidden;
    }
    
    /* Pulse animation for currently playing track */
    @keyframes pulse-light {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.7; }
    }
    
    .animate-pulse-light {
      animation: pulse-light 2s ease-in-out infinite;
    }
  `;
  return /* @__PURE__ */ jsxs('div', {
    className: 'space-y-4 ml-8',
    children: [
      /* @__PURE__ */ jsx('style', { jsx: true, children: marqueeStyles }),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex justify-between items-center mb-4',
        children: [
          /* @__PURE__ */ jsx('div', {}),
          /* @__PURE__ */ jsx(SearchInput, {
            ref: searchInputRef,
            value: searchQuery,
            onChange: setSearchQuery,
          }),
        ],
      }),
      /* @__PURE__ */ jsx('div', {
        className: 'relative overflow-x-auto rounded-md border',
        children: /* @__PURE__ */ jsxs('table', {
          className: 'min-w-full divide-y divide-gray-200',
          children: [
            /* @__PURE__ */ jsx('thead', {
              className: 'bg-gray-50',
              children: table.getHeaderGroups().map((headerGroup) =>
                /* @__PURE__ */ jsx(
                  'tr',
                  {
                    children: headerGroup.headers.map((header) =>
                      /* @__PURE__ */ jsx(
                        'th',
                        {
                          scope: 'col',
                          className:
                            'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                          children: header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              ),
                        },
                        header.id,
                      ),
                    ),
                  },
                  headerGroup.id,
                ),
              ),
            }),
            /* @__PURE__ */ jsx('tbody', {
              className: 'bg-white divide-y divide-gray-200',
              children: table.getRowModel().rows.map((row) => {
                const track = row.original;
                const isSuggested = suggestedTrackIds.has(track.id);
                const isFirstSuggested =
                  isSuggested &&
                  (row.index === 0 ||
                    !suggestedTrackIds.has(
                      table.getRowModel().rows[row.index - 1]?.original.id,
                    ));
                const isLastSuggested =
                  isSuggested &&
                  (row.index === table.getRowModel().rows.length - 1 ||
                    !suggestedTrackIds.has(
                      table.getRowModel().rows[row.index + 1]?.original.id,
                    ));
                return /* @__PURE__ */ jsxs(
                  'tr',
                  {
                    className: cn(
                      'hover:bg-accent/5 group relative transition-all duration-300',
                      isSuggested && [
                        'bg-gradient-to-r from-main/[0.03] to-main/[0.07]',
                        'border-l-[3px] border-main/40',
                        'shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]',
                      ],
                      playingTrackId === track.id && [
                        'bg-main/[0.03]',
                        'border-l-[3px] border-main/60',
                        'shadow-[inset_0_0_30px_rgba(0,0,0,0.01)]',
                      ],
                    ),
                    onMouseEnter: () => setRowHover(track.id),
                    onMouseLeave: () => setRowHover(null),
                    children: [
                      row
                        .getVisibleCells()
                        .map((cell) =>
                          /* @__PURE__ */ jsx(
                            'td',
                            {
                              className: 'px-4 py-4 whitespace-nowrap',
                              children: flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              ),
                            },
                            cell.id,
                          ),
                        ),
                      isFirstSuggested &&
                        /* @__PURE__ */ jsx('div', {
                          className:
                            'absolute -top-px left-0 right-0 h-px bg-main/10',
                        }),
                      isLastSuggested &&
                        /* @__PURE__ */ jsx('div', {
                          className:
                            'absolute -bottom-px left-0 right-0 h-px bg-main/10',
                        }),
                    ],
                  },
                  track.id,
                );
              }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Dialog, {
        open: isCreatingPlaylist,
        onOpenChange: setIsCreatingPlaylist,
        children: /* @__PURE__ */ jsxs(DialogContent, {
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: 'Create New Playlist',
              }),
            }),
            /* @__PURE__ */ jsx('div', {
              className: 'py-4',
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: 'Playlist name',
                value: newPlaylistName,
                onChange: (e) => setNewPlaylistName(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === 'Enter' && newPlaylistName.trim() && !isLoading)
                    handleCreateNewPlaylist();
                  if (e.key === 'Escape') setIsCreatingPlaylist(false);
                },
                disabled: isLoading,
                autoFocus: true,
              }),
            }),
            /* @__PURE__ */ jsxs(DialogFooter, {
              children: [
                /* @__PURE__ */ jsx(Button, {
                  variant: 'outline',
                  onClick: () => setIsCreatingPlaylist(false),
                  disabled: isLoading,
                  children: 'Cancel',
                }),
                /* @__PURE__ */ jsx(Button, {
                  onClick: handleCreateNewPlaylist,
                  disabled: !newPlaylistName.trim() || isLoading,
                  children: isLoading ? 'Creating...' : 'Create',
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Dialog, {
        open: showPlaylistOptions !== null,
        onOpenChange: (open) => !open && setShowPlaylistOptions(null),
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: 'sm:max-w-md',
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: 'Add to Playlist',
              }),
            }),
            /* @__PURE__ */ jsxs('div', {
              className: 'grid gap-4 py-4',
              children: [
                playlists && playlists.length > 0
                  ? /* @__PURE__ */ jsx('div', {
                      className: 'grid gap-2',
                      children: playlists.map((playlist) =>
                        /* @__PURE__ */ jsxs(
                          Button,
                          {
                            variant: 'outline',
                            className: 'w-full justify-start',
                            onClick: () => {
                              if (selectedTrack && showPlaylistOptions) {
                                handleAddToPlaylist(
                                  playlist.id,
                                  selectedTrack.id,
                                );
                                setShowPlaylistOptions(null);
                              }
                            },
                            children: [
                              /* @__PURE__ */ jsx(ListPlus, {
                                className: 'mr-2 h-4 w-4',
                              }),
                              playlist.name,
                            ],
                          },
                          playlist.id,
                        ),
                      ),
                    })
                  : /* @__PURE__ */ jsx('div', {
                      className: 'text-center py-2 text-muted-foreground',
                      children: 'No playlists yet',
                    }),
                /* @__PURE__ */ jsxs(Button, {
                  variant: 'outline',
                  className: 'w-full justify-start',
                  onClick: () => {
                    setIsCreatingPlaylist(true);
                    setShowPlaylistOptions(null);
                  },
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: 'mr-2 h-4 w-4' }),
                    'Create New Playlist',
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxs('div', {
        className:
          'flex items-center justify-between sticky bottom-4 bg-white border rounded-md p-2 shadow-sm',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-2',
            children: [
              /* @__PURE__ */ jsxs('p', {
                className: 'text-sm text-gray-500',
                children: [
                  'Page',
                  ' ',
                  /* @__PURE__ */ jsxs('strong', {
                    children: [
                      table.getState().pagination.pageIndex + 1,
                      ' of',
                      ' ',
                      table.getPageCount(),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs('p', {
                className: 'text-sm text-gray-500 hidden md:block',
                children: [
                  '| Displaying ',
                  table.getRowModel().rows.length,
                  ' of',
                  ' ',
                  table.getFilteredRowModel().rows.length,
                  ' tracks',
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center gap-2',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center gap-1',
                children: [
                  /* @__PURE__ */ jsx('span', {
                    className: 'text-sm text-gray-500 hidden sm:inline',
                    children: 'Rows per page:',
                  }),
                  /* @__PURE__ */ jsxs(Select, {
                    value: String(table.getState().pagination.pageSize),
                    onValueChange: (value) => {
                      table.setPageSize(Number(value));
                    },
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, {
                        className: 'h-8 w-[70px]',
                        children: /* @__PURE__ */ jsx(SelectValue, {
                          placeholder: table.getState().pagination.pageSize,
                        }),
                      }),
                      /* @__PURE__ */ jsx(SelectContent, {
                        children: [5, 10, 20, 30, 50].map((pageSize) =>
                          /* @__PURE__ */ jsx(
                            SelectItem,
                            { value: String(pageSize), children: pageSize },
                            pageSize,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center gap-1',
                children: [
                  /* @__PURE__ */ jsxs(Button, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: () => table.setPageIndex(0),
                    disabled: !table.getCanPreviousPage(),
                    className: 'hidden sm:flex h-8 w-8 p-0 lg:flex',
                    children: [
                      /* @__PURE__ */ jsx('span', {
                        className: 'sr-only',
                        children: 'Go to first page',
                      }),
                      /* @__PURE__ */ jsx(ChevronLeft, {
                        className: 'h-4 w-4',
                      }),
                      /* @__PURE__ */ jsx(ChevronLeft, {
                        className: 'h-4 w-4',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(Button, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: () => table.previousPage(),
                    disabled: !table.getCanPreviousPage(),
                    className: 'h-8 w-8 p-0',
                    children: [
                      /* @__PURE__ */ jsx('span', {
                        className: 'sr-only',
                        children: 'Go to previous page',
                      }),
                      /* @__PURE__ */ jsx(ChevronLeft, {
                        className: 'h-4 w-4',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(Button, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: () => table.nextPage(),
                    disabled: !table.getCanNextPage(),
                    className: 'h-8 w-8 p-0',
                    children: [
                      /* @__PURE__ */ jsx('span', {
                        className: 'sr-only',
                        children: 'Go to next page',
                      }),
                      /* @__PURE__ */ jsx(ChevronRight, {
                        className: 'h-4 w-4',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(Button, {
                    variant: 'outline',
                    size: 'sm',
                    onClick: () => table.setPageIndex(table.getPageCount() - 1),
                    disabled: !table.getCanNextPage(),
                    className: 'hidden sm:flex h-8 w-8 p-0 lg:flex',
                    children: [
                      /* @__PURE__ */ jsx('span', {
                        className: 'sr-only',
                        children: 'Go to last page',
                      }),
                      /* @__PURE__ */ jsx(ChevronRight, {
                        className: 'h-4 w-4',
                      }),
                      /* @__PURE__ */ jsx(ChevronRight, {
                        className: 'h-4 w-4',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ArtistPreview({ artist, children }) {
  return /* @__PURE__ */ jsxs('div', {
    className: 'relative group inline-block',
    children: [
      /* @__PURE__ */ jsx('span', {
        className:
          'cursor-pointer hover:text-primary hover:underline underline-offset-2',
        children,
      }),
      /* @__PURE__ */ jsx('div', {
        className:
          'absolute left-0 top-full mt-2 w-64 rounded-md bg-background/95 p-3 shadow-lg ring-1 ring-border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300',
        children: /* @__PURE__ */ jsxs('div', {
          className: 'flex flex-col space-y-2',
          children: [
            /* @__PURE__ */ jsx('h4', {
              className: 'text-sm font-semibold',
              children: artist,
            }),
            /* @__PURE__ */ jsxs('div', {
              className: 'flex items-center',
              children: [
                /* @__PURE__ */ jsx('span', {
                  className:
                    'bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mr-2',
                  children: 'Artist',
                }),
                /* @__PURE__ */ jsx('span', {
                  className: 'text-xs text-muted-foreground',
                  children: 'View all tracks',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) =>
    /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
      ref,
      sideOffset,
      className: cn(
        'z-50 overflow-hidden rounded-md bg-main border-2 border-black px-3 py-1.5 text-xs text-black animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-light',
        className,
      ),
      ...props,
    }),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function useTrackSorting(tracks) {
  const { suggestedTrackIds } = useTracksStore();
  const [orderingConfig, setOrderingConfig] = useState({
    orderBy: 'manual',
    direction: 'asc',
  });
  const [isReordering, setIsReordering] = useState(false);
  const sortedTracks = useMemo(() => {
    setIsReordering(true);
    const suggested = tracks.filter((t) => suggestedTrackIds.has(t.id));
    const regular = tracks.filter((t) => !suggestedTrackIds.has(t.id));
    const sortByConfig = (tracks2) => {
      switch (orderingConfig.orderBy) {
        case 'bpm':
          return tracks2.sort((a, b) => {
            const diff = Number(a.bpm) - Number(b.bpm);
            return orderingConfig.direction === 'asc' ? diff : -diff;
          });
        case 'genre':
          return tracks2.sort((a, b) => {
            const aGenre = (a.genres?.[0] || '').toLowerCase();
            const bGenre = (b.genres?.[0] || '').toLowerCase();
            const diff = aGenre.localeCompare(bGenre);
            return orderingConfig.direction === 'asc' ? diff : -diff;
          });
        case 'suggested':
          return tracks2;
        default:
          return tracks2;
      }
    };
    const result =
      suggestedTrackIds.size > 0
        ? [...sortByConfig(suggested), ...regular]
        : sortByConfig([...suggested, ...regular]);
    setTimeout(() => setIsReordering(false), 100);
    return result;
  }, [tracks, suggestedTrackIds, orderingConfig]);
  return {
    sortedTracks,
    orderingConfig,
    setOrderingConfig,
  };
}
function PlaylistCreationModal({
  isOpen,
  onClose,
  suggestedTracks,
  onPlaylistCreated,
}) {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTracks, setSelectedTracks] = useState(
    new Set(suggestedTracks.map((track) => track.id)),
  );
  const [isCreating, setIsCreating] = useState(false);
  const toggleTrackSelection = (trackId) => {
    const newSelection = new Set(selectedTracks);
    if (newSelection.has(trackId)) {
      newSelection.delete(trackId);
    } else {
      newSelection.add(trackId);
    }
    setSelectedTracks(newSelection);
  };
  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }
    if (selectedTracks.size === 0) {
      toast.error('Please select at least one track');
      return;
    }
    setIsCreating(true);
    try {
      const playlistResponse = await fetch('/api/music/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: playlistName,
          description:
            description ||
            `AI-generated playlist with ${selectedTracks.size} tracks`,
        }),
      });
      if (!playlistResponse.ok) {
        throw new Error('Failed to create playlist');
      }
      const playlist = await playlistResponse.json();
      const trackPromises = Array.from(selectedTracks).map((trackId) =>
        fetch(`/api/music/playlists/${playlist.id}/tracks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackId }),
        }),
      );
      await Promise.all(trackPromises);
      toast.success(
        `Created playlist "${playlistName}" with ${selectedTracks.size} tracks`,
      );
      onPlaylistCreated?.(playlist.id);
      onClose();
      setPlaylistName('');
      setDescription('');
      setSelectedTracks(new Set(suggestedTracks.map((track) => track.id)));
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error('Failed to create playlist. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className:
        'max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-bg border-2 border-black shadow-light',
      children: [
        /* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            className: 'text-text font-heading',
            children: 'Create Playlist from AI Suggestions',
          }),
        }),
        /* @__PURE__ */ jsxs('div', {
          className: 'space-y-4 flex-1 overflow-hidden flex flex-col',
          children: [
            /* @__PURE__ */ jsxs('div', {
              className: 'space-y-3',
              children: [
                /* @__PURE__ */ jsxs('div', {
                  children: [
                    /* @__PURE__ */ jsx(Label, {
                      htmlFor: 'playlist-name',
                      className: 'text-text font-medium',
                      children: 'Playlist Name',
                    }),
                    /* @__PURE__ */ jsx(Input, {
                      id: 'playlist-name',
                      value: playlistName,
                      onChange: (e) => setPlaylistName(e.target.value),
                      placeholder: 'Enter playlist name...',
                      className:
                        'mt-1 border-2 border-black bg-white focus:ring-main focus:border-main',
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs('div', {
                  children: [
                    /* @__PURE__ */ jsx(Label, {
                      htmlFor: 'playlist-description',
                      className: 'text-text font-medium',
                      children: 'Description (Optional)',
                    }),
                    /* @__PURE__ */ jsx('textarea', {
                      id: 'playlist-description',
                      value: description,
                      onChange: (e) => setDescription(e.target.value),
                      placeholder: 'Describe your playlist...',
                      className:
                        'mt-1 resize-none flex min-h-[60px] w-full rounded-base border-2 border-black bg-white px-3 py-2 text-sm text-text placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main',
                      rows: 2,
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs('div', {
              className: 'flex-1 overflow-hidden flex flex-col',
              children: [
                /* @__PURE__ */ jsxs('div', {
                  className: 'flex items-center justify-between mb-3',
                  children: [
                    /* @__PURE__ */ jsxs(Label, {
                      className: 'text-text font-medium',
                      children: [
                        'Select Tracks (',
                        selectedTracks.size,
                        '/',
                        suggestedTracks.length,
                        ')',
                      ],
                    }),
                    /* @__PURE__ */ jsxs('div', {
                      className: 'flex space-x-2',
                      children: [
                        /* @__PURE__ */ jsx(Button, {
                          variant: 'outline',
                          size: 'sm',
                          onClick: () =>
                            setSelectedTracks(
                              new Set(suggestedTracks.map((t) => t.id)),
                            ),
                          className:
                            'border-2 border-black bg-white hover:bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all',
                          children: 'Select All',
                        }),
                        /* @__PURE__ */ jsx(Button, {
                          variant: 'outline',
                          size: 'sm',
                          onClick: () =>
                            setSelectedTracks(/* @__PURE__ */ new Set()),
                          className:
                            'border-2 border-black bg-white hover:bg-red-100 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all',
                          children: 'Clear All',
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ jsx('div', {
                  className:
                    'flex-1 overflow-y-auto space-y-2 border-2 border-black rounded-base p-3 bg-white',
                  children: suggestedTracks.map((track) => {
                    const isSelected = selectedTracks.has(track.id);
                    return /* @__PURE__ */ jsx(
                      Card,
                      {
                        className: `cursor-pointer transition-all border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none ${isSelected ? 'bg-main' : 'bg-white hover:bg-bg'}`,
                        onClick: () => toggleTrackSelection(track.id),
                        children: /* @__PURE__ */ jsx(CardContent, {
                          className: 'p-3',
                          children: /* @__PURE__ */ jsxs('div', {
                            className: 'flex items-center space-x-3',
                            children: [
                              /* @__PURE__ */ jsx('div', {
                                className:
                                  'w-10 h-10 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center',
                                children: isSelected
                                  ? /* @__PURE__ */ jsx(Check, {
                                      className: 'w-5 h-5 text-black',
                                    })
                                  : /* @__PURE__ */ jsx(Music, {
                                      className: 'w-5 h-5 text-black',
                                    }),
                              }),
                              /* @__PURE__ */ jsxs('div', {
                                className: 'flex-1 min-w-0',
                                children: [
                                  /* @__PURE__ */ jsx('h4', {
                                    className:
                                      'font-medium text-sm truncate text-text font-heading',
                                    children: track.title,
                                  }),
                                  /* @__PURE__ */ jsx('p', {
                                    className: 'text-xs text-gray-600 truncate',
                                    children: track.artist,
                                  }),
                                  /* @__PURE__ */ jsxs('div', {
                                    className:
                                      'flex items-center space-x-2 mt-1',
                                    children: [
                                      track.bpm &&
                                        /* @__PURE__ */ jsxs('span', {
                                          className:
                                            'bg-white border border-black text-xs px-2 py-0.5 rounded-base text-text font-mono',
                                          children: [track.bpm, ' BPM'],
                                        }),
                                      track.genres &&
                                        track.genres.length > 0 &&
                                        /* @__PURE__ */ jsx('span', {
                                          className:
                                            'border border-black text-xs px-2 py-0.5 rounded-base text-text',
                                          children: track.genres[0],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      },
                      track.id,
                    );
                  }),
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(DialogFooter, {
          children: [
            /* @__PURE__ */ jsx(Button, {
              variant: 'outline',
              onClick: onClose,
              disabled: isCreating,
              className:
                'border-2 border-black bg-white hover:bg-gray-100 text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all',
              children: 'Cancel',
            }),
            /* @__PURE__ */ jsx(Button, {
              onClick: handleCreatePlaylist,
              disabled: isCreating,
              className:
                'bg-main hover:bg-mainAccent border-2 border-black text-text font-medium shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all',
              children: isCreating
                ? /* @__PURE__ */ jsxs(Fragment, {
                    children: [
                      /* @__PURE__ */ jsx(Plus, {
                        className: 'w-4 h-4 mr-2 animate-spin',
                      }),
                      'Creating...',
                    ],
                  })
                : /* @__PURE__ */ jsxs(Fragment, {
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: 'w-4 h-4 mr-2' }),
                      'Create Playlist',
                    ],
                  }),
            }),
          ],
        }),
      ],
    }),
  });
}
const parseTracksFromMessage = (content) => {
  try {
    if (content.includes('{') && content.includes('}')) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.tracks) return parsed;
      }
    }
    const trackMatches = content.matchAll(
      /["'](.+?)["']\s*-\s*(.+?)\s*(?:\(|$)(\d+)?\s*(?:BPM)?(?:\)|$)/gi,
    );
    const tracks = Array.from(trackMatches).map((match) => ({
      title: match[1].trim(),
      artist: match[2].trim(),
      bpm: match[3] ? parseInt(match[3]) : void 0,
    }));
    if (tracks.length > 0) {
      return {
        tracks,
        explanation: content,
        context: 'track_suggestions',
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to parse tracks:', error);
    return null;
  }
};
const findMatchingTrack = (suggestion, tracks) => {
  let match = tracks.find(
    (t) =>
      t.title.toLowerCase().trim() === suggestion.title.toLowerCase().trim(),
  );
  if (match) return match;
  match = tracks.find(
    (t) =>
      t.title.toLowerCase().includes(suggestion.title.toLowerCase()) &&
      t.artist.toLowerCase().includes(suggestion.artist.toLowerCase()),
  );
  if (match) return match;
  match = tracks.find((t) => {
    const titleWords = suggestion.title.toLowerCase().split(' ');
    const trackTitle = t.title.toLowerCase();
    return titleWords.some(
      (word) => trackTitle.includes(word) && word.length > 2,
    );
  });
  return match || null;
};
const SUGGESTED_PROMPTS = [
  'Find tracks around 128 BPM for a house set',
  'Suggest tracks that mix well with techno',
  'Show me tracks for a chill downtempo session',
  'Find high-energy tracks above 140 BPM',
  'What tracks work well for peak time?',
  'Suggest tracks with similar vibes to deep house',
];
const TypingIndicator = () =>
  /* @__PURE__ */ jsxs('div', {
    className: 'flex items-center space-x-2 p-4',
    children: [
      /* @__PURE__ */ jsx('div', {
        className:
          'w-8 h-8 bg-main border-2 border-black rounded-base flex items-center justify-center',
        children: /* @__PURE__ */ jsx(Bot, { className: 'w-4 h-4 text-black' }),
      }),
      /* @__PURE__ */ jsxs('div', {
        className:
          'flex items-center space-x-1 bg-white border-2 border-black rounded-base px-4 py-2 shadow-light',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex space-x-1',
            children: [
              /* @__PURE__ */ jsx('div', {
                className:
                  'w-2 h-2 bg-mainAccent rounded-full animate-bounce [animation-delay:-0.3s]',
              }),
              /* @__PURE__ */ jsx('div', {
                className:
                  'w-2 h-2 bg-mainAccent rounded-full animate-bounce [animation-delay:-0.15s]',
              }),
              /* @__PURE__ */ jsx('div', {
                className: 'w-2 h-2 bg-mainAccent rounded-full animate-bounce',
              }),
            ],
          }),
          /* @__PURE__ */ jsx('span', {
            className: 'text-sm text-text ml-2 font-medium',
            children: 'DJ Assistant is thinking...',
          }),
        ],
      }),
    ],
  });
const TrackCard = ({ track, onPlay, onAddToPlaylist }) => {
  const { isPlaying, playingTrackId, isReady } = usePlayerStore();
  const isCurrentlyPlaying = playingTrackId === track.id && isPlaying;
  const hasAudio = track.youtube_video_id;
  return /* @__PURE__ */ jsx(Card, {
    className:
      'mb-4 transition-all border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none bg-white w-full',
    children: /* @__PURE__ */ jsx(CardContent, {
      className: 'p-4',
      children: /* @__PURE__ */ jsxs('div', {
        className: 'flex items-center justify-between gap-4',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center space-x-4 flex-1 min-w-0',
            children: [
              /* @__PURE__ */ jsx('div', {
                className:
                  'w-12 h-12 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center flex-shrink-0',
                children: /* @__PURE__ */ jsx(Music, {
                  className: 'w-6 h-6 text-black',
                }),
              }),
              /* @__PURE__ */ jsxs('div', {
                className: 'flex-1 min-w-0',
                children: [
                  /* @__PURE__ */ jsx('h4', {
                    className:
                      'font-medium text-sm truncate text-text font-heading mb-1',
                    children: track.title,
                  }),
                  /* @__PURE__ */ jsx('p', {
                    className: 'text-xs text-gray-600 truncate mb-2',
                    children: track.artist,
                  }),
                  /* @__PURE__ */ jsxs('div', {
                    className: 'flex items-center gap-2 flex-wrap',
                    children: [
                      track.bpm &&
                        /* @__PURE__ */ jsxs('span', {
                          className:
                            'bg-white border border-black text-xs px-2 py-1 rounded-base text-text font-mono',
                          children: [track.bpm, ' BPM'],
                        }),
                      track.genres &&
                        track.genres.length > 0 &&
                        /* @__PURE__ */ jsx('span', {
                          className:
                            'border border-black text-xs px-2 py-1 rounded-base text-text',
                          children: track.genres[0],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center space-x-3 flex-shrink-0',
            children: [
              /* @__PURE__ */ jsx(Button, {
                size: 'sm',
                variant: 'ghost',
                onClick: onPlay,
                disabled: !hasAudio || !isReady,
                className: cn(
                  'h-8 w-8 p-0 border border-black rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light',
                  hasAudio && isReady
                    ? 'bg-main hover:bg-mainAccent'
                    : 'bg-gray-200 cursor-not-allowed',
                ),
                children: isCurrentlyPlaying
                  ? /* @__PURE__ */ jsx(Pause, {
                      className: 'w-4 h-4 text-black',
                    })
                  : /* @__PURE__ */ jsx(Play, {
                      className: 'w-4 h-4 text-black',
                    }),
              }),
              /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Button, {
                      size: 'sm',
                      variant: 'ghost',
                      className:
                        'h-8 w-8 p-0 bg-white hover:bg-bg border border-black rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light',
                      children: /* @__PURE__ */ jsx(MoreVertical, {
                        className: 'w-4 h-4 text-black',
                      }),
                    }),
                  }),
                  /* @__PURE__ */ jsx(DropdownMenuContent, {
                    align: 'end',
                    className:
                      'bg-bg border-2 border-black rounded-base shadow-light',
                    children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
                      onClick: onAddToPlaylist,
                      className: 'hover:bg-main text-text',
                      children: [
                        /* @__PURE__ */ jsx(Plus, {
                          className: 'w-4 h-4 mr-2',
                        }),
                        'Add to Playlist',
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
const MessageBubble = ({
  message,
  userAvatar,
  matchedTracks = [],
  onTrackPlay,
  onTrackAddToPlaylist,
  onCreatePlaylist,
}) => {
  const isUser = message.role === 'user';
  return /* @__PURE__ */ jsx('div', {
    className: `flex ${isUser ? 'justify-end' : 'justify-start'} mb-8 w-full`,
    children: /* @__PURE__ */ jsxs('div', {
      className: `flex items-start space-x-4 max-w-full ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`,
      children: [
        /* @__PURE__ */ jsx('div', {
          className: 'w-8 h-8 flex-shrink-0',
          children: isUser
            ? /* @__PURE__ */ jsxs(Avatar, {
                className: 'w-8 h-8',
                children: [
                  /* @__PURE__ */ jsx(AvatarImage, { src: userAvatar }),
                  /* @__PURE__ */ jsx(AvatarFallback, {
                    className:
                      'bg-mainAccent text-black border-2 border-black text-sm',
                    children: userAvatar?.charAt(0)?.toUpperCase() || 'U',
                  }),
                ],
              })
            : /* @__PURE__ */ jsx('div', {
                className:
                  'w-8 h-8 bg-main border-2 border-black rounded-base flex items-center justify-center',
                children: /* @__PURE__ */ jsx(Bot, {
                  className: 'w-4 h-4 text-black',
                }),
              }),
        }),
        /* @__PURE__ */ jsxs('div', {
          className: `space-y-3 ${isUser ? 'items-end' : 'items-start'} flex flex-col flex-1 min-w-0`,
          children: [
            /* @__PURE__ */ jsx('div', {
              className: cn(
                'rounded-base px-4 py-3 max-w-full break-words border-2 border-black shadow-light',
                isUser ? 'bg-main text-text' : 'bg-white text-text',
              ),
              children: /* @__PURE__ */ jsx('div', {
                className: 'whitespace-pre-wrap text-sm leading-relaxed',
                children: message.content,
              }),
            }),
            !isUser &&
              matchedTracks.length > 0 &&
              /* @__PURE__ */ jsxs('div', {
                className: 'w-full space-y-3 max-w-full',
                children: [
                  /* @__PURE__ */ jsxs('div', {
                    className:
                      'flex items-center justify-between p-3 bg-bg border-2 border-black rounded-base',
                    children: [
                      /* @__PURE__ */ jsxs('div', {
                        className:
                          'flex items-center space-x-2 text-sm text-text',
                        children: [
                          /* @__PURE__ */ jsx(Sparkles, {
                            className: 'w-4 h-4 text-mainAccent2',
                          }),
                          /* @__PURE__ */ jsxs('span', {
                            className: 'font-medium',
                            children: [
                              'Found ',
                              matchedTracks.length,
                              ' matching tracks',
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs(Button, {
                        size: 'sm',
                        variant: 'outline',
                        onClick: () => onCreatePlaylist(matchedTracks),
                        className:
                          'h-8 text-xs bg-main hover:bg-mainAccent border-2 border-black text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all flex-shrink-0',
                        children: [
                          /* @__PURE__ */ jsx(Plus, {
                            className: 'w-3 h-3 mr-1',
                          }),
                          'Create Playlist',
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx('div', {
                    className: 'space-y-3 max-w-full overflow-hidden',
                    children: matchedTracks.map((track) =>
                      /* @__PURE__ */ jsx(
                        TrackCard,
                        {
                          track,
                          onPlay: () => onTrackPlay(track),
                          onAddToPlaylist: () => onTrackAddToPlaylist(track),
                        },
                        track.id,
                      ),
                    ),
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
};
function EnhancedChatInterface({ tracks, onTracksFilter, isOpen, onClose }) {
  const messagesEndRef = useRef(null);
  const { userIdentity } = useAuthStore();
  const { setSuggestedTracks } = useTracksStore();
  const { setOrderingConfig } = useTrackSorting(tracks);
  const { togglePlayPause, initializePlayer, isReady } = usePlayerStore();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [matchedTracksMap, setMatchedTracksMap] = useState(
    /* @__PURE__ */ new Map(),
  );
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  useEffect(() => {
    if (!isReady) {
      initializePlayer();
    }
  }, [initializePlayer, isReady]);
  const processTrackSuggestions = useCallback(
    (content, messageId) => {
      try {
        const suggestion = parseTracksFromMessage(content);
        if (suggestion) {
          const matchedTracks = suggestion.tracks
            .map((track) => findMatchingTrack(track, tracks))
            .filter(Boolean);
          if (matchedTracks.length > 0) {
            setMatchedTracksMap(
              (prev) => new Map(prev.set(messageId, matchedTracks)),
            );
            setSuggestedTracks(matchedTracks);
            setOrderingConfig({ orderBy: 'suggested', direction: 'asc' });
            onTracksFilter(matchedTracks);
            toast.success(
              `Found ${matchedTracks.length} matching tracks in your collection`,
            );
          } else {
            toast.error('No matching tracks found in your collection');
          }
        }
      } catch (error) {
        console.error('Failed to process track suggestions:', error);
        toast.error('Failed to process track suggestions');
      }
    },
    [tracks, onTracksFilter, setOrderingConfig, setSuggestedTracks],
  );
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/ai/chat',
      body: {
        tracks: tracks.map((track) => ({
          title: track.title,
          artist: track.artist,
          bpm: track.bpm,
          genres: track.genres,
        })),
      },
      onFinish: (message) => {
        processTrackSuggestions(message.content, message.id);
      },
      onError: (error) => {
        console.error('Chat error:', error);
        toast.error('Failed to get AI response. Please try again.');
      },
    });
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);
  const handleSuggestedPrompt = (prompt) => {
    handleInputChange({ target: { value: prompt } });
    setShowSuggestions(false);
  };
  const handleTrackPlay = async (track) => {
    if (!isReady) {
      toast.error('Player is still loading...');
      return;
    }
    if (!track.youtube_video_id) {
      toast.error('No audio available for this track');
      return;
    }
    try {
      const { playingTrackId } = usePlayerStore.getState();
      const isCurrentlyPlaying = playingTrackId === track.id;
      togglePlayPause(track);
      toast.success(
        `${isCurrentlyPlaying ? 'Pausing' : 'Playing'} ${track.title}`,
      );
    } catch (error) {
      console.error('Error playing track:', error);
      toast.error('Failed to play track');
    }
  };
  const handleTrackAddToPlaylist = (track) => {
    setPlaylistTracks([track]);
    setPlaylistModalOpen(true);
  };
  const handleCreatePlaylistFromSuggestions = (tracks2) => {
    setPlaylistTracks(tracks2);
    setPlaylistModalOpen(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setShowSuggestions(false);
      handleSubmit(e);
    }
  };
  return /* @__PURE__ */ jsxs('div', {
    className: 'flex flex-col h-full bg-bg max-w-full overflow-hidden',
    children: [
      /* @__PURE__ */ jsx('div', {
        className:
          'p-4 border-b-2 border-black bg-bg flex-shrink-0 sticky top-0 z-10',
        children: /* @__PURE__ */ jsxs('div', {
          className: 'flex items-center justify-between',
          children: [
            /* @__PURE__ */ jsxs('div', {
              className: 'flex items-center space-x-3 flex-1 min-w-0',
              children: [
                /* @__PURE__ */ jsx('div', {
                  className:
                    'w-10 h-10 bg-main border-2 border-black rounded-base flex items-center justify-center shadow-light flex-shrink-0',
                  children: /* @__PURE__ */ jsx(Bot, {
                    className: 'w-5 h-5 text-black',
                  }),
                }),
                /* @__PURE__ */ jsxs('div', {
                  className: 'min-w-0',
                  children: [
                    /* @__PURE__ */ jsx('h2', {
                      className: 'font-semibold text-sm text-text font-heading',
                      children: 'DJ Assistant',
                    }),
                    /* @__PURE__ */ jsxs('p', {
                      className: 'text-xs text-gray-600',
                      children: [
                        tracks.length,
                        ' tracks loaded • Ready to help',
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsx(Button, {
              variant: 'ghost',
              size: 'sm',
              onClick: onClose,
              className:
                'h-8 w-8 p-0 hover:bg-mainAccent border border-black rounded-base flex-shrink-0',
              children: /* @__PURE__ */ jsx(MoreVertical, {
                className: 'w-4 h-4 text-black',
              }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx('div', {
        className: 'flex-1 overflow-y-auto overflow-x-hidden',
        children: /* @__PURE__ */ jsxs('div', {
          className: 'p-4 space-y-2 max-w-full',
          children: [
            messages.length === 0 &&
              /* @__PURE__ */ jsxs('div', {
                className: 'mb-10',
                children: [
                  /* @__PURE__ */ jsx(MessageBubble, {
                    message: {
                      role: 'assistant',
                      content: `Hey there! 👋 I'm your AI DJ assistant. I can help you find perfect tracks for your sets, suggest mixing ideas, and analyze your collection.

I know about all ${tracks.length} tracks in your library. What would you like to explore today?`,
                    },
                    matchedTracks: [],
                    onTrackPlay: handleTrackPlay,
                    onTrackAddToPlaylist: handleTrackAddToPlaylist,
                    onCreatePlaylist: handleCreatePlaylistFromSuggestions,
                  }),
                  showSuggestions &&
                    /* @__PURE__ */ jsxs('div', {
                      className: 'space-y-4 mt-8 max-w-full',
                      children: [
                        /* @__PURE__ */ jsxs('div', {
                          className:
                            'flex items-center space-x-2 text-sm text-gray-600',
                          children: [
                            /* @__PURE__ */ jsx(Sparkles, {
                              className: 'w-4 h-4 text-mainAccent2',
                            }),
                            /* @__PURE__ */ jsx('span', {
                              className: 'font-medium',
                              children: 'Try asking me about:',
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx('div', {
                          className: 'grid grid-cols-1 gap-3 max-w-full',
                          children: SUGGESTED_PROMPTS.map((prompt, index) =>
                            /* @__PURE__ */ jsxs(
                              Button,
                              {
                                variant: 'outline',
                                size: 'sm',
                                className:
                                  'h-auto p-4 text-left justify-start text-wrap bg-white hover:bg-main border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full',
                                onClick: () => handleSuggestedPrompt(prompt),
                                children: [
                                  /* @__PURE__ */ jsx(MessageSquare, {
                                    className: 'w-4 h-4 mr-3 flex-shrink-0',
                                  }),
                                  /* @__PURE__ */ jsx('span', {
                                    className: 'text-sm text-left',
                                    children: prompt,
                                  }),
                                ],
                              },
                              index,
                            ),
                          ),
                        }),
                      ],
                    }),
                ],
              }),
            messages.map((message) =>
              /* @__PURE__ */ jsx(
                MessageBubble,
                {
                  message,
                  userAvatar: userIdentity?.avatarUrl,
                  matchedTracks: matchedTracksMap.get(message.id) || [],
                  onTrackPlay: handleTrackPlay,
                  onTrackAddToPlaylist: handleTrackAddToPlaylist,
                  onCreatePlaylist: handleCreatePlaylistFromSuggestions,
                },
                message.id,
              ),
            ),
            isLoading && /* @__PURE__ */ jsx(TypingIndicator, {}),
            /* @__PURE__ */ jsx('div', { ref: messagesEndRef }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx('div', {
        className:
          'p-4 border-t-2 border-black bg-bg flex-shrink-0 sticky bottom-0 z-10',
        children: /* @__PURE__ */ jsxs('form', {
          onSubmit,
          className: 'flex space-x-3',
          children: [
            /* @__PURE__ */ jsx(Input, {
              value: input,
              onChange: handleInputChange,
              placeholder: 'Ask about tracks, mixing tips, or BPM matching...',
              disabled: isLoading,
              className:
                'flex-1 border-2 border-black bg-white focus:ring-main focus:border-main text-text h-11 rounded-base',
            }),
            /* @__PURE__ */ jsx(TooltipProvider, {
              children: /* @__PURE__ */ jsxs(Tooltip, {
                children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Button, {
                      type: 'submit',
                      disabled: isLoading || !input.trim(),
                      className:
                        'h-11 px-4 bg-main hover:bg-mainAccent border-2 border-black text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all flex-shrink-0 rounded-base',
                      children: /* @__PURE__ */ jsx(Send, {
                        className: 'w-4 h-4',
                      }),
                    }),
                  }),
                  /* @__PURE__ */ jsx(TooltipContent, {
                    className: 'bg-bg border-2 border-black text-text',
                    children: /* @__PURE__ */ jsx('p', {
                      children: 'Send message',
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(PlaylistCreationModal, {
        isOpen: playlistModalOpen,
        onClose: () => setPlaylistModalOpen(false),
        suggestedTracks: playlistTracks,
        onPlaylistCreated: (playlistId) => {
          toast.success('Playlist created successfully!');
        },
      }),
    ],
  });
}
function EnhancedAiLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [chatPosition, setChatPosition] = useState('sidebar');
  const { allTracks: tracks, setAllTracks } = useTracksStore();
  const { initializePlayer } = usePlayerStore();
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setChatPosition('overlay');
      } else if (tablet) {
        setChatPosition('bottom');
      } else {
        setChatPosition('sidebar');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/music/tracks', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch tracks');
        const data = await res.json();
        if (!data.tracks) {
          throw new Error('No tracks data received');
        }
        setAllTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        toast.error('Failed to load tracks for AI assistant');
      } finally {
        setIsLoading(false);
      }
    }
    if (tracks.length === 0) {
      fetchTracks();
    } else {
      setIsLoading(false);
    }
  }, [setAllTracks, tracks.length]);
  const handleTracksFilter = (filteredTracks) => {
    if (filteredTracks.length > 0) {
      toast.success(`AI found ${filteredTracks.length} matching tracks`);
    }
  };
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const closeChat = () => {
    setIsChatOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        toggleChat();
      }
      if (e.key === 'Escape' && isChatOpen) {
        closeChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);
  if (isLoading) {
    return /* @__PURE__ */ jsx('div', {
      className: 'flex items-center justify-center min-h-[400px]',
      children: /* @__PURE__ */ jsxs('div', {
        className: 'flex flex-col items-center space-y-4',
        children: [
          /* @__PURE__ */ jsx(Loader2, {
            className: 'h-8 w-8 animate-spin text-primary',
          }),
          /* @__PURE__ */ jsx('p', {
            className: 'text-sm text-muted-foreground',
            children: 'Loading AI assistant...',
          }),
        ],
      }),
    });
  }
  return /* @__PURE__ */ jsx(ErrorBoundary, {
    children: /* @__PURE__ */ jsxs('div', {
      className: 'relative min-h-screen',
      children: [
        /* @__PURE__ */ jsx('div', {
          className: cn(
            'transition-all duration-300 ease-in-out pb-20 min-h-screen',
            chatPosition === 'sidebar' &&
              isChatOpen &&
              'lg:mr-[450px] xl:mr-[500px]',
            chatPosition === 'bottom' && isChatOpen && 'pb-[420px]',
          ),
          children,
        }),
        isMobile &&
          isChatOpen &&
          /* @__PURE__ */ jsx('div', {
            className: 'fixed inset-0 bg-black/50 z-40 md:hidden',
            onClick: closeChat,
          }),
        chatPosition !== 'bottom' &&
          /* @__PURE__ */ jsx(Card, {
            className: cn(
              'fixed right-0 transition-all duration-300 ease-in-out z-50',
              'border-l-2 border-black shadow-light bg-bg',
              {
                // Sidebar positioning - account for persistent player
                'top-16 bottom-20 w-full sm:w-[450px] xl:w-[500px]':
                  isChatOpen && chatPosition === 'sidebar',
                // Overlay positioning - full screen on mobile
                'top-16 bottom-20 w-full':
                  isChatOpen && chatPosition === 'overlay',
                'translate-x-0': isChatOpen,
                'translate-x-full': !isChatOpen,
              },
            ),
            children:
              isChatOpen &&
              /* @__PURE__ */ jsx(EnhancedChatInterface, {
                tracks,
                onTracksFilter: handleTracksFilter,
                isOpen: isChatOpen,
                onClose: closeChat,
              }),
          }),
        chatPosition === 'bottom' &&
          /* @__PURE__ */ jsx(Card, {
            className: cn(
              'fixed bottom-20 left-0 right-0 transition-all duration-300 ease-in-out z-50',
              'border-t-2 border-black shadow-light bg-bg',
              {
                'h-[400px]': isChatOpen,
                'translate-y-0': isChatOpen,
                'translate-y-full': !isChatOpen,
              },
            ),
            children:
              isChatOpen &&
              /* @__PURE__ */ jsx(EnhancedChatInterface, {
                tracks,
                onTracksFilter: handleTracksFilter,
                isOpen: isChatOpen,
                onClose: closeChat,
              }),
          }),
        /* @__PURE__ */ jsxs('div', {
          className:
            'fixed bottom-28 right-6 z-50 flex flex-col items-end space-y-3',
          children: [
            !isChatOpen &&
              tracks.length > 0 &&
              /* @__PURE__ */ jsx('div', {
                className:
                  'bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light animate-in fade-in-50 slide-in-from-right-2',
                children: /* @__PURE__ */ jsxs('div', {
                  className: 'flex items-center space-x-2',
                  children: [
                    /* @__PURE__ */ jsx(Bot, {
                      className: 'w-4 h-4 text-black',
                    }),
                    /* @__PURE__ */ jsxs('span', {
                      className: 'text-sm font-medium text-text',
                      children: [tracks.length, ' tracks ready'],
                    }),
                  ],
                }),
              }),
            /* @__PURE__ */ jsx(Button, {
              onClick: toggleChat,
              className: cn(
                'h-14 w-14 rounded-base shadow-light border-2 border-black transition-all duration-200',
                'bg-main hover:bg-mainAccent text-black font-medium',
                'hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
                'animate-in fade-in-50 slide-in-from-right-2',
                isChatOpen && 'rotate-180',
              ),
              children: isChatOpen
                ? /* @__PURE__ */ jsx(X, { className: 'h-6 w-6' })
                : /* @__PURE__ */ jsx(MessageCircle, { className: 'h-6 w-6' }),
            }),
          ],
        }),
        !isChatOpen &&
          /* @__PURE__ */ jsx('div', {
            className: 'fixed bottom-28 right-24 z-40 hidden lg:block',
            children: /* @__PURE__ */ jsx('div', {
              className:
                'bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light opacity-80 hover:opacity-100 transition-opacity animate-in fade-in-50 slide-in-from-right-2 delay-300',
              children: /* @__PURE__ */ jsxs('div', {
                className:
                  'flex items-center space-x-2 text-xs text-text whitespace-nowrap',
                children: [
                  /* @__PURE__ */ jsx('span', { children: 'Press' }),
                  /* @__PURE__ */ jsx('kbd', {
                    className:
                      'px-1.5 py-0.5 bg-white border border-black rounded-base text-xs font-mono',
                    children: '⌘/',
                  }),
                  /* @__PURE__ */ jsx('span', { children: 'to open chat' }),
                ],
              }),
            }),
          }),
      ],
    }),
  });
}
function TracksPage() {
  return /* @__PURE__ */ jsxs(ErrorBoundary, {
    children: [
      /* @__PURE__ */ jsx(PageHeader, {
        title: 'Track Collection',
        description: 'Browse and manage your music tracks',
      }),
      /* @__PURE__ */ jsx(EnhancedAiLayout, {
        children: /* @__PURE__ */ jsx('div', {
          className: 'mx-auto py-8 px-4 lg:px-8 overflow-visible',
          children: /* @__PURE__ */ jsx(TracksTable, {}),
        }),
      }),
    ],
  });
}
export { TracksPage as component };
