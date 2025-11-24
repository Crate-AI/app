import {
  useNavigate,
  useLocation,
  useRouter,
  Link,
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  createFileRoute,
  lazyRouteComponent,
  createRouter,
} from '@tanstack/react-router';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Suspense, useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClient as createClient$1 } from '@supabase/supabase-js';
import {
  Home,
  Music,
  ListMusic,
  Search,
  Command,
  X,
  Clock,
  Zap,
  Settings,
  Plus,
  ArrowRight,
  Menu,
  Brain,
  Bell,
  User,
  LogOut,
  Pause,
  Play,
  Heart,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  VolumeX,
  Volume2,
  List,
  Loader2,
} from 'lucide-react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Slot } from '@radix-ui/react-slot';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  ChevronRightIcon,
  CheckIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import { Image } from '@unpic/react';
import { createServerClient } from '@supabase/ssr';
import { getWebRequest, appendResponseHeader } from 'vinxi/http';
import { serialize, parse } from 'cookie';
import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
const appCss = '/assets/globals-B54Fyd5_.css';
const initialState = {
  userIdentity: null,
  supabaseUser: null,
  isLoading: false,
};
const useAuthStore = create()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserIdentity: (identity) => {
        set({ userIdentity: identity });
      },
      setSupabaseUser: (user) => {
        set({ supabaseUser: user });
      },
      setIsLoading: (isLoading) => {
        set({ isLoading });
      },
      isAuthenticated: () => {
        const state = get();
        return !!state.userIdentity;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userIdentity: state.userIdentity,
      }),
    },
  ),
);
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const usePlayerStore = create((set, get) => ({
  player: null,
  isReady: false,
  isPlaying: false,
  playingTrackId: null,
  currentTrack: null,
  queue: [],
  currentIndex: 0,
  isShuffleEnabled: false,
  isRepeatEnabled: false,
  shuffledIndices: [],
  volume: 80,
  currentTime: 0,
  duration: 0,
  timeUpdateInterval: null,
  initializePlayer: async () => {
    try {
      await new Promise((resolve) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }
        window.onYouTubeIframeAPIReady = resolve;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      });
      const container = document.createElement('div');
      container.id = 'youtube-player';
      container.style.cssText =
        'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
      document.body.appendChild(container);
      const ytPlayer = new window.YT.Player('youtube-player', {
        width: '1',
        height: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            set({ player: ytPlayer, isReady: true });
            ytPlayer.setVolume(get().volume);
          },
          onStateChange: (event) => {
            if (event.data !== -1) {
              set({ isReady: true });
            }
            const isPlaying = event.data === 1;
            set({ isPlaying });
            const { startTimeTracking, stopTimeTracking } = get();
            if (isPlaying) {
              startTimeTracking();
            } else {
              stopTimeTracking();
            }
            if (event.data === 0) {
              setTimeout(() => {
                const { playNext } = get();
                playNext();
              }, 1e3);
            }
          },
          onError: (event) => {
            if ([2, 5, 100, 101, 150].includes(event.data)) {
              set({ isReady: false, player: null, isPlaying: false });
              setTimeout(() => {
                const { playNext } = get();
                playNext();
              }, 1e3);
            }
          },
        },
      });
    } catch (error) {
      set({ isReady: false, player: null, isPlaying: false });
    }
  },
  setPlayer: (player) => set({ player }),
  setIsReady: (ready) => set({ isReady: ready }),
  setPlayingTrackId: (trackId) => set({ playingTrackId: trackId }),
  playTrack: (track) => {
    const { player, isReady, startTimeTracking } = get();
    if (!player || !isReady || !track.youtube_video_id) return;
    player.loadVideoById({
      videoId: track.youtube_video_id,
      suggestedQuality: 'highres',
    });
    player.playVideo();
    set({
      playingTrackId: track.id,
      currentTrack: track,
      isPlaying: true,
    });
    startTimeTracking();
  },
  pauseTrack: () => {
    const { player, stopTimeTracking } = get();
    if (!player) return;
    player.pauseVideo();
    set({ isPlaying: false });
    stopTimeTracking();
  },
  togglePlayPause: (track) => {
    const {
      player,
      playingTrackId,
      isPlaying,
      queue,
      currentIndex,
      startTimeTracking,
      stopTimeTracking,
    } = get();
    if (!player || !track.youtube_video_id) return;
    if (playingTrackId === track.id) {
      if (isPlaying) {
        player.pauseVideo();
        set({ isPlaying: false });
        stopTimeTracking();
      } else {
        player.playVideo();
        set({ isPlaying: true });
        startTimeTracking();
      }
    } else {
      const trackIndex = queue.findIndex((t) => t.id === track.id);
      if (trackIndex !== -1) {
        set({ currentIndex: trackIndex });
      }
      player.loadVideoById({
        videoId: track.youtube_video_id,
        suggestedQuality: 'highres',
      });
      player.playVideo();
      set({
        playingTrackId: track.id,
        currentTrack: track,
        isPlaying: true,
      });
      startTimeTracking();
    }
  },
  setQueue: (tracks, startIndex = 0) => {
    const indices = Array.from({ length: tracks.length }, (_, i) => i);
    set({
      queue: tracks,
      currentIndex: startIndex,
      shuffledIndices: shuffleArray(indices),
    });
  },
  addToQueue: (track) => {
    const { queue } = get();
    if (!queue.find((t) => t.id === track.id)) {
      const newQueue = [...queue, track];
      const indices = Array.from({ length: newQueue.length }, (_, i) => i);
      set({
        queue: newQueue,
        shuffledIndices: shuffleArray(indices),
      });
    }
  },
  removeFromQueue: (trackId) => {
    const { queue, currentIndex } = get();
    const newQueue = queue.filter((track) => track.id !== trackId);
    const indices = Array.from({ length: newQueue.length }, (_, i) => i);
    const removedIndex = queue.findIndex((track) => track.id === trackId);
    const newIndex =
      removedIndex < currentIndex ? currentIndex - 1 : currentIndex;
    set({
      queue: newQueue,
      currentIndex: Math.max(0, newIndex),
      shuffledIndices: shuffleArray(indices),
    });
  },
  clearQueue: () => {
    set({
      queue: [],
      currentIndex: 0,
      shuffledIndices: [],
      currentTrack: null,
      playingTrackId: null,
    });
  },
  playNext: () => {
    const {
      queue,
      currentIndex,
      isShuffleEnabled,
      isRepeatEnabled,
      shuffledIndices,
      playTrack,
    } = get();
    if (queue.length === 0) return;
    let nextIndex;
    if (isShuffleEnabled) {
      const currentShuffledIndex = shuffledIndices.indexOf(currentIndex);
      const nextShuffledIndex =
        (currentShuffledIndex + 1) % shuffledIndices.length;
      nextIndex = shuffledIndices[nextShuffledIndex];
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    if (
      !isRepeatEnabled &&
      nextIndex === 0 &&
      currentIndex === queue.length - 1
    ) {
      return;
    }
    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      set({ currentIndex: nextIndex });
      playTrack(nextTrack);
    }
  },
  playPrevious: () => {
    const {
      queue,
      currentIndex,
      isShuffleEnabled,
      shuffledIndices,
      playTrack,
    } = get();
    if (queue.length === 0) return;
    let prevIndex;
    if (isShuffleEnabled) {
      const currentShuffledIndex = shuffledIndices.indexOf(currentIndex);
      const prevShuffledIndex =
        currentShuffledIndex === 0
          ? shuffledIndices.length - 1
          : currentShuffledIndex - 1;
      prevIndex = shuffledIndices[prevShuffledIndex];
    } else {
      prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    }
    const prevTrack = queue[prevIndex];
    if (prevTrack) {
      set({ currentIndex: prevIndex });
      playTrack(prevTrack);
    }
  },
  toggleShuffle: () => {
    const { isShuffleEnabled, queue } = get();
    const newShuffleState = !isShuffleEnabled;
    const indices = Array.from({ length: queue.length }, (_, i) => i);
    set({
      isShuffleEnabled: newShuffleState,
      shuffledIndices: newShuffleState ? shuffleArray(indices) : indices,
    });
  },
  toggleRepeat: () => {
    set((state) => ({ isRepeatEnabled: !state.isRepeatEnabled }));
  },
  setVolume: (volume) => {
    const { player } = get();
    if (player) {
      player.setVolume(volume);
    }
    set({ volume });
  },
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },
  setDuration: (duration) => {
    set({ duration });
  },
  seekTo: (time) => {
    const { player } = get();
    if (player) {
      player.seekTo(time);
      set({ currentTime: time });
    }
  },
  startTimeTracking: () => {
    const { timeUpdateInterval } = get();
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
    }
    const interval = setInterval(() => {
      const { player, isPlaying } = get();
      if (player && isPlaying) {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          set({ currentTime, duration });
        } catch (error) {
          console.error('Error updating time:', error);
        }
      }
    }, 1e3);
    set({ timeUpdateInterval: interval });
  },
  stopTimeTracking: () => {
    const { timeUpdateInterval } = get();
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
      set({ timeUpdateInterval: null });
    }
  },
  reset: () => {
    const { timeUpdateInterval } = get();
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
    }
    set({
      player: null,
      isReady: false,
      playingTrackId: null,
      currentTrack: null,
      isPlaying: false,
      queue: [],
      currentIndex: 0,
      isShuffleEnabled: false,
      isRepeatEnabled: false,
      shuffledIndices: [],
      volume: 80,
      currentTime: 0,
      duration: 0,
      timeUpdateInterval: null,
    });
  },
}));
function convertSearchResultToTrack(result) {
  const externalId = `external_${result.id}`;
  const titleParts = result.title.split(' - ');
  const artist = titleParts.length > 1 ? titleParts[0] : 'Unknown Artist';
  const title =
    titleParts.length > 1 ? titleParts.slice(1).join(' - ') : result.title;
  return {
    id: externalId,
    title: title || 'Unknown Title',
    artist,
    discogs_release_id: result.id.toString(),
    duration: '0:00',
    // Duration not available from search results
    position: '1',
    // Default position
    artwork: result.cover_image || result.thumb || null,
    youtube_video_id: null,
    // Will be populated when track is played
    extra_artists: null,
    genres: result.genre?.join(',') || null,
    styles: result.style?.join(',') || null,
    created_at: /* @__PURE__ */ new Date().toISOString(),
    bpm: null,
    // Will be populated if analyzed
  };
}
function isExternalTrack(trackId) {
  return trackId.startsWith('external_');
}
function createTemporaryTrackForPlayback(result, youtubeVideoId) {
  const track = convertSearchResultToTrack(result);
  return track;
}
const usePlaylistStore = create((set, get) => {
  return {
    playlists: [],
    isLoading: false,
    error: null,
    // FIXME: consistent return type
    fetchPlaylists: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch('/api/music/playlists');
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const playlists = await response.json();
        const transformedPlaylists = (playlists ?? []).map((playlist) => ({
          ...playlist,
          tracks: (playlist.playlist_tracks ?? [])
            .filter((pt) => pt.track !== null)
            .sort((a, b) => a.position - b.position)
            .map((pt) => pt.track),
        }));
        set({ playlists: transformedPlaylists });
        return transformedPlaylists;
      } catch (error) {
        set({ error: error.message });
        toast.error('Failed to fetch playlists');
      } finally {
        set({ isLoading: false });
      }
    },
    createPlaylist: async (title, description) => {
      try {
        const response = await fetch('/api/music/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
        if (!response.ok) {
          const error = await response.json();
          console.error('PlaylistStore: Response not OK', error);
          throw new Error(error.message || 'Failed to create playlist');
        }
        const playlist = await response.json();
        set((state) => ({
          playlists: [...state.playlists, playlist],
        }));
        return playlist.id;
      } catch (error) {
        console.error('PlaylistStore: Error in createPlaylist:', error);
        const message =
          error instanceof Error ? error.message : 'Failed to create playlist';
        toast.error(message);
        throw error;
      }
    },
    addTrackToPlaylist: async (playlistId, trackId) => {
      try {
        if (isExternalTrack(trackId)) {
          throw new Error('Use addExternalTrackToPlaylist for external tracks');
        }
        const response = await fetch(
          `/api/music/playlists/${playlistId}/tracks`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trackId }),
          },
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to add track to playlist');
        }
        toast.success('Track added to playlist');
      } catch (error) {
        console.error('PlaylistStore: Error adding track to playlist:', error);
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to add track to playlist';
        toast.error(message);
        throw error;
      }
    },
    addExternalTrackToPlaylist: async (playlistId, track) => {
      try {
        const response = await fetch(
          `/api/music/playlists/${playlistId}/external-tracks`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ track }),
          },
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.message || 'Failed to add external track to playlist',
          );
        }
        set((state) => ({
          playlists: state.playlists.map((playlist) => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                tracks: [...(playlist.tracks || []), track],
              };
            }
            return playlist;
          }),
        }));
        toast.success('Track added to playlist');
      } catch (error) {
        console.error(
          'PlaylistStore: Error adding external track to playlist:',
          error,
        );
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to add external track to playlist';
        toast.error(message);
        throw error;
      }
    },
    removeTrackFromPlaylist: async (playlistId, trackId) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(
          `/api/music/playlists/${playlistId}/tracks`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trackId }),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to remove track from playlist');
        }
        set((state) => ({
          playlists: state.playlists.map((playlist) => {
            if (playlist.id === playlistId) {
              const playlistWithTracks = playlist;
              return {
                ...playlist,
                tracks: playlistWithTracks.tracks.filter(
                  (track) => track.id !== trackId,
                ),
              };
            }
            return playlist;
          }),
        }));
        toast.success('Track removed from playlist');
      } catch (error) {
        set({ error: error.message });
        toast.error('Failed to remove track from playlist');
      } finally {
        set({ isLoading: false });
      }
    },
    updateTrackOrder: async (playlistId, trackId, newPosition) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(
          `/api/music/playlists/${playlistId}/tracks/${trackId}/position`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ position: newPosition }),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to update track order');
        }
        await get().fetchPlaylists();
        toast.success('Track order updated');
      } catch (error) {
        set({ error: error.message });
        toast.error('Failed to update track order');
      } finally {
        set({ isLoading: false });
      }
    },
    deletePlaylist: async (playlistId) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`/api/music/playlists/${playlistId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete playlist');
        }
        set((state) => ({
          playlists: state.playlists.filter(
            (playlist) => playlist.id !== playlistId,
          ),
        }));
      } catch (error) {
        set({ error: error.message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    togglePlaylistPublic: async (playlistId, isPublic) => {
      try {
        const response = await fetch(`/api/music/playlists/${playlistId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_public: isPublic }),
        });
        if (!response.ok) {
          throw new Error('Failed to update playlist visibility');
        }
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, is_public: isPublic }
              : playlist,
          ),
        }));
        toast.success(`Playlist is now ${isPublic ? 'public' : 'private'}`);
      } catch (error) {
        console.error('PlaylistStore: Error toggling playlist public:', error);
        toast.error('Failed to update playlist visibility');
        throw error;
      }
    },
    clearError: () => set({ error: null }),
  };
});
const useTracksStore = create((set) => ({
  allTracks: [],
  suggestedTrackIds: /* @__PURE__ */ new Set(),
  setAllTracks: (tracks) => set({ allTracks: tracks }),
  setSuggestedTracks: (tracks) => {
    set(() => ({
      suggestedTrackIds: new Set(tracks.map((t) => t.id)),
    }));
  },
  clearSuggestions: () =>
    set({
      suggestedTrackIds: /* @__PURE__ */ new Set(),
    }),
}));
const useFavoritesStore = create()(
  persist(
    (set, get) => ({
      favoriteTrackIds: /* @__PURE__ */ new Set(),
      isLoading: false,
      addToFavorites: async (trackId) => {
        set({ isLoading: true });
        try {
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          if (userIdentity?.username) {
            const userId = userIdentity.username;
            const response = await fetch('/api/music/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, trackId }),
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.log(
                'Database save failed, continuing with local storage:',
                errorData,
              );
            }
          }
          set((state) => ({
            favoriteTrackIds: new Set(state.favoriteTrackIds).add(trackId),
            isLoading: false,
          }));
        } catch (error) {
          console.error('Error adding favorite:', error);
          set((state) => ({
            favoriteTrackIds: new Set(state.favoriteTrackIds).add(trackId),
            isLoading: false,
          }));
        }
      },
      removeFromFavorites: async (trackId) => {
        set({ isLoading: true });
        try {
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          if (userIdentity?.username) {
            const userId = userIdentity.username;
            const response = await fetch('/api/music/favorites', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, trackId }),
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.log(
                'Database remove failed, continuing with local storage:',
                errorData,
              );
            }
          }
          set((state) => {
            const newFavorites = new Set(state.favoriteTrackIds);
            newFavorites.delete(trackId);
            return { favoriteTrackIds: newFavorites, isLoading: false };
          });
        } catch (error) {
          console.error('Error removing favorite:', error);
          set((state) => {
            const newFavorites = new Set(state.favoriteTrackIds);
            newFavorites.delete(trackId);
            return { favoriteTrackIds: newFavorites, isLoading: false };
          });
        }
      },
      toggleFavorite: async (trackId) => {
        const { favoriteTrackIds } = get();
        if (favoriteTrackIds.has(trackId)) {
          await get().removeFromFavorites(trackId);
        } else {
          await get().addToFavorites(trackId);
        }
      },
      isFavorite: (trackId) => {
        const { favoriteTrackIds } = get();
        return favoriteTrackIds.has(trackId);
      },
      getFavoriteTracksFromAllTracks: (allTracks) => {
        const { favoriteTrackIds } = get();
        return allTracks.filter((track) => favoriteTrackIds.has(track.id));
      },
      clearFavorites: async () => {
        set({ isLoading: true });
        try {
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          if (userIdentity?.username) {
            const userId = userIdentity.username;
            const { favoriteTrackIds } = get();
            const promises = Array.from(favoriteTrackIds).map((trackId) =>
              fetch('/api/music/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, trackId }),
              }),
            );
            try {
              await Promise.all(promises);
            } catch (error) {
              console.log(
                'Database clear failed, continuing with local storage:',
                error,
              );
            }
          }
          set({
            favoriteTrackIds: /* @__PURE__ */ new Set(),
            isLoading: false,
          });
        } catch (error) {
          console.error('Error clearing favorites:', error);
          set({
            favoriteTrackIds: /* @__PURE__ */ new Set(),
            isLoading: false,
          });
        }
      },
      loadFavorites: async () => {
        set({ isLoading: true });
        try {
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          if (userIdentity?.username) {
            const userId = userIdentity.username;
            await get().syncWithDatabase(userId);
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
          set({ isLoading: false });
        }
      },
      syncWithDatabase: async (userId) => {
        try {
          const response = await fetch(`/api/music/favorites?userId=${userId}`);
          if (!response.ok) {
            console.log(
              'Failed to fetch favorites from database, using local storage',
            );
            set({ isLoading: false });
            return;
          }
          const { favoriteTrackIds } = await response.json();
          set({
            favoriteTrackIds: new Set(favoriteTrackIds || []),
            isLoading: false,
          });
        } catch (error) {
          console.error(
            'Error syncing with database, using local storage:',
            error,
          );
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          try {
            const parsed = JSON.parse(item);
            return {
              ...parsed,
              state: {
                ...parsed.state,
                favoriteTrackIds: new Set(parsed.state.favoriteTrackIds || []),
                isLoading: false,
              },
            };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              favoriteTrackIds: Array.from(value.state.favoriteTrackIds),
              isLoading: false,
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    role: 'alert',
    className: cn(alertVariants({ variant }), className),
    ...props,
  }),
);
Alert.displayName = 'Alert';
const AlertTitle = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('h5', {
    ref,
    className: cn('mb-1 font-medium leading-none tracking-tight', className),
    ...props,
  }),
);
AlertTitle.displayName = 'AlertTitle';
const AlertDescription = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn('text-sm [&_p]:leading-relaxed', className),
    ...props,
  }),
);
AlertDescription.displayName = 'AlertDescription';
const supabaseUrl = 'https://olxynjdxmipslgseupxc.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seHluamR4bWlwc2xnc2V1cHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjM1NjcsImV4cCI6MjA0OTI5OTU2N30.NLdZXkEphv1SQl8AvWtulgHxKSNHgt-IsByE2r_w0CE';
const supabase = createClient$1(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
async function initializeAuth() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    if (!session) {
      return null;
    }
    return session.user;
  } catch (error) {
    return null;
  }
}
async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
const ERROR_MESSAGES = {
  auth_denied: 'Authentication was cancelled.',
  auth_failed: 'Authentication failed. Please try again.',
  missing_verifier: 'Invalid authentication response.',
  missing_oauth: 'Authentication parameters are missing.',
};
function AuthProviderContent({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { setUserIdentity, setSupabaseUser, setIsLoading } = useAuthStore();
  const [error, setError] = useState(null);
  const handleAuthError = (error2) => {
    console.error('AuthProvider: Error initializing auth:', error2);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('error');
    navigate({ to: newUrl.pathname + newUrl.search, replace: true });
    const errorMessage =
      error2 instanceof Error
        ? error2.message
        : typeof error2 === 'string'
          ? error2
          : 'An error occurred during authentication';
    setError(
      ERROR_MESSAGES[errorMessage] ||
        (process.env.NODE_ENV === 'development'
          ? errorMessage
          : 'An error occurred during authentication'),
    );
  };
  const handleAuthStateChange = (event, session) => {
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
        const error2 = searchParams.get('error');
        if (error2) throw error2;
      } catch (error2) {
        handleAuthError(error2);
      } finally {
        setIsLoading(false);
      }
    };
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    initAuth().catch((error2) => {
      console.error('Unhandled auth initialization error:', error2);
      handleAuthError(error2);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      error &&
        /* @__PURE__ */ jsx(Alert, {
          variant: 'destructive',
          className: 'mb-4',
          children: /* @__PURE__ */ jsx(AlertDescription, { children: error }),
        }),
      children,
    ],
  });
}
function AuthProvider({ children }) {
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: null,
    children: /* @__PURE__ */ jsx(AuthProviderContent, { children }),
  });
}
function useKeyboardNavigation() {
  const router2 = useRouter();
  const { userIdentity } = useAuthStore();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        event.target?.isContentEditable
      ) {
        return;
      }
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({ to: `/${userIdentity.username}` });
            }
            break;
          case '2':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({ to: `/${userIdentity.username}/tracks` });
            }
            break;
          case '3':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({ to: `/${userIdentity.username}/playlists` });
            }
            break;
          case '4':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({ to: `/${userIdentity.username}/collection` });
            }
            break;
          case '5':
            event.preventDefault();
            router2.navigate({ to: '/analyze' });
            break;
          case 'h':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({ to: `/${userIdentity.username}` });
            }
            break;
          case 'n':
            event.preventDefault();
            if (userIdentity) {
              router2.navigate({
                to: `/${userIdentity.username}/playlists/new`,
              });
            }
            break;
          case 'a':
            event.preventDefault();
            router2.navigate({ to: '/analyze' });
            break;
        }
      }
      switch (event.key) {
        case '?':
          event.preventDefault();
          showKeyboardShortcuts();
          break;
        case 'Escape':
          document.dispatchEvent(new CustomEvent('close-modals'));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router2, userIdentity]);
}
function showKeyboardShortcuts() {
  const shortcuts = [
    { key: '⌘K', description: 'Open command palette' },
    { key: '⌘B', description: 'Toggle sidebar' },
    { key: '⌘1', description: 'Go to dashboard' },
    { key: '⌘2', description: 'Go to tracks' },
    { key: '⌘3', description: 'Go to playlists' },
    { key: '⌘4', description: 'Go to collection' },
    { key: '⌘5', description: 'Go to analyze' },
    { key: '⌘H', description: 'Go to home' },
    { key: '⌘N', description: 'New playlist' },
    { key: '⌘A', description: 'Analyze track' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'Esc', description: 'Close modals' },
  ];
  const modal = document.createElement('div');
  modal.className =
    'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
      <div class="space-y-2">
        ${shortcuts
          .map(
            ({ key, description }) => `
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">${description}</span>
            <kbd class="px-2 py-1 bg-gray-100 rounded text-xs font-mono">${key}</kbd>
          </div>
        `,
          )
          .join('')}
      </div>
      <div class="mt-6 flex justify-end">
        <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
          Close
        </button>
      </div>
    </div>
  `;
  const closeModal = () => {
    document.body.removeChild(modal);
    document.removeEventListener('keydown', handleEscape);
  };
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  modal.querySelector('button')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscape);
  document.body.appendChild(modal);
}
const Avatar = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
    ref,
    className: cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    ),
    ...props,
  }),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
    ref,
    className: cn('aspect-square h-full w-full', className),
    ...props,
  }),
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
    ref,
    className: cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    ),
    ...props,
  }),
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function Sidebar({ collapsed = false, onToggle }) {
  const { pathname } = useLocation();
  const { userIdentity } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);
  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.();
  };
  if (!userIdentity) return null;
  const navigationItems = [
    {
      name: 'Dashboard',
      href: `/${userIdentity.username}`,
      icon: Home,
      description: 'Overview',
    },
    {
      name: 'Tracks',
      href: `/${userIdentity.username}/tracks`,
      icon: Music,
      description: 'Library',
    },
    {
      name: 'Playlists',
      href: `/${userIdentity.username}/playlists`,
      icon: ListMusic,
      description: 'Collections',
    },
    {
      name: 'Collection',
      href: `/${userIdentity.username}/collection`,
      icon: Search,
      description: 'Discogs',
    },
  ];
  return /* @__PURE__ */ jsxs('aside', {
    className: cn(
      'h-full bg-white border-r-2 border-gray-800 transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-20' : 'w-72',
    ),
    children: [
      /* @__PURE__ */ jsx('div', {
        className: cn(
          'flex items-center px-6 border-b-2 border-gray-800 h-16 transition-all',
          isCollapsed ? 'justify-center' : 'justify-start',
        ),
        children: /* @__PURE__ */ jsxs('div', {
          onClick: handleToggle,
          className: cn(
            'flex items-center transition-all cursor-pointer hover:scale-105 active:scale-95',
            !isCollapsed && 'space-x-3',
          ),
          children: [
            /* @__PURE__ */ jsx('div', {
              className: 'relative w-8 h-8 shrink-0',
              children: /* @__PURE__ */ jsx('img', {
                src: '/logo.svg',
                alt: 'Crate Logo',
                className: 'w-full h-full object-contain',
              }),
            }),
            !isCollapsed &&
              /* @__PURE__ */ jsx('span', {
                className: 'font-bold text-xl tracking-tight',
                children: 'Crate',
              }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx('nav', {
        className: 'flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar',
        children: navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== `/${userIdentity.username}` &&
              pathname.startsWith(item.href));
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.href,
              className: cn(
                'group flex items-center space-x-3 px-4 py-3 rounded-base transition-all duration-200 relative border-2',
                isActive
                  ? 'bg-main border-gray-800 shadow-light'
                  : 'bg-transparent border-transparent hover:bg-gray-100 hover:border-gray-200 text-gray-600 hover:text-black',
                isCollapsed && 'justify-center px-2',
              ),
              children: [
                /* @__PURE__ */ jsx(Icon, {
                  className: cn(
                    'w-5 h-5 shrink-0 transition-colors',
                    isActive ? 'text-black' : 'text-current',
                  ),
                }),
                !isCollapsed &&
                  /* @__PURE__ */ jsx('div', {
                    className: 'flex-1 min-w-0',
                    children: /* @__PURE__ */ jsx('div', {
                      className: cn(
                        'font-medium truncate',
                        isActive ? 'text-black' : 'text-current',
                      ),
                      children: item.name,
                    }),
                  }),
                isCollapsed &&
                  /* @__PURE__ */ jsx('div', {
                    className:
                      'absolute left-full ml-4 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-base shadow-light opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border-2 border-white',
                    children: item.name,
                  }),
              ],
            },
            item.name,
          );
        }),
      }),
      /* @__PURE__ */ jsx('div', {
        className: 'p-6 border-t-2 border-gray-800 bg-white',
        children: /* @__PURE__ */ jsxs('div', {
          className: cn(
            'flex items-center space-x-3 p-2 rounded-base border-2 transition-all cursor-pointer group',
            isCollapsed
              ? 'justify-center bg-transparent border-transparent hover:bg-white hover:border-gray-800 hover:shadow-light'
              : 'bg-white border-gray-800 shadow-light hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-gray-100',
          ),
          children: [
            /* @__PURE__ */ jsxs(Avatar, {
              className: 'w-9 h-9 border-2 border-gray-800 shrink-0',
              children: [
                /* @__PURE__ */ jsx(AvatarImage, {
                  src: userIdentity.avatarUrl ?? '',
                }),
                /* @__PURE__ */ jsx(AvatarFallback, {
                  className: 'bg-main font-bold text-sm',
                  children:
                    userIdentity.username?.charAt(0).toUpperCase() ?? '',
                }),
              ],
            }),
            !isCollapsed &&
              /* @__PURE__ */ jsxs('div', {
                className: 'flex-1 min-w-0 overflow-hidden',
                children: [
                  /* @__PURE__ */ jsx('div', {
                    className: 'font-medium text-sm truncate text-black',
                    children: userIdentity.username,
                  }),
                  /* @__PURE__ */ jsx('div', {
                    className: 'text-xs text-gray-500 truncate',
                    children: 'View Profile',
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
const buttonVariants = cva(
  'inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-main border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none active:bg-mainAccent active:scale-95 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
        noShadow:
          'bg-main border-2 border-border dark:border-darkBorder active:bg-mainAccent active:scale-95',
        link: 'underline-offset-4 text-text dark:text-darkText hover:underline active:text-mainAccent2',
        neutral:
          'bg-white dark:bg-darkBg dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none active:bg-main active:scale-95 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
        reverse:
          'bg-main border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark active:bg-mainAccent active:scale-95 active:translate-x-0 active:translate-y-0 active:shadow-none',
        chat: 'bg-main border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark active:bg-mainAccent active:scale-95 active:translate-x-0 active:translate-y-0 active:shadow-none',
        outline:
          'bg-main border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark active:bg-mainAccent active:scale-95 active:translate-x-0 active:translate-y-0 active:shadow-none',
        ghost:
          'bg-transparent border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark active:bg-main active:scale-95 active:translate-x-0 active:translate-y-0 active:shadow-none',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return /* @__PURE__ */ jsx(Comp, {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
    });
  },
);
Button.displayName = 'Button';
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) =>
    /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
      ref,
      className: cn(
        'flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRightIcon, { className: 'ml-auto' }),
      ],
    }),
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) =>
    /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
      ref,
      className: cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      ),
      ...props,
    }),
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) =>
    /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, {
      children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
        ref,
        sideOffset,
        className: cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        ),
        ...props,
      }),
    }),
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) =>
    /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
      ref,
      className: cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className,
      ),
      ...props,
    }),
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) =>
    /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
      ref,
      className: cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx('span', {
          className:
            'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
          children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, {
            children: /* @__PURE__ */ jsx(CheckIcon, { className: 'h-4 w-4' }),
          }),
        }),
        children,
      ],
    }),
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) =>
    /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
      ref,
      className: cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx('span', {
          className:
            'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
          children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, {
            children: /* @__PURE__ */ jsx(DotFilledIcon, {
              className: 'h-2 w-2 fill-current',
            }),
          }),
        }),
        children,
      ],
    }),
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) =>
    /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
      ref,
      className: cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      ),
      ...props,
    }),
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
    ref,
    className: cn('-mx-1 my-1 h-px bg-muted', className),
    ...props,
  }),
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { userIdentity } = useAuthStore();
  useEffect(() => {
    const recent = localStorage.getItem('crate-recent-commands');
    if (recent) {
      try {
        setRecentCommands(JSON.parse(recent));
      } catch (error) {
        console.error('Error loading recent commands:', error);
      }
    }
  }, []);
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : 0;
            scrollToSelected(newIndex);
            return newIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : filteredCommands.length - 1;
            scrollToSelected(newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query, onClose]);
  const scrollToSelected = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll('[data-command-item]');
    const selectedItem = items[index];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };
  const saveRecentCommand = (commandId) => {
    const updated = [
      commandId,
      ...recentCommands.filter((id) => id !== commandId),
    ].slice(0, 5);
    setRecentCommands(updated);
    localStorage.setItem('crate-recent-commands', JSON.stringify(updated));
  };
  const executeCommand = (command) => {
    saveRecentCommand(command.id);
    command.action();
    onClose();
    setQuery('');
    setSelectedIndex(0);
  };
  const generateCommands = () => {
    if (!userIdentity) return [];
    const commands2 = [
      // Navigation
      {
        id: 'nav-dashboard',
        title: 'Dashboard',
        description: 'Go to your personal dashboard',
        icon: Home,
        action: () => navigate({ to: `/${userIdentity.username}` }),
        keywords: ['dashboard', 'home', 'overview', 'profile'],
        category: 'navigation',
        href: `/${userIdentity.username}`,
      },
      {
        id: 'nav-tracks',
        title: 'Tracks',
        description: 'Browse your complete track collection',
        icon: Music,
        action: () => navigate({ to: `/${userIdentity.username}/tracks` }),
        keywords: ['tracks', 'music', 'collection', 'songs'],
        category: 'navigation',
        href: `/${userIdentity.username}/tracks`,
      },
      {
        id: 'nav-playlists',
        title: 'Playlists',
        description: 'Create and manage your playlists',
        icon: ListMusic,
        action: () => navigate({ to: `/${userIdentity.username}/playlists` }),
        keywords: ['playlists', 'lists', 'music', 'collections'],
        category: 'navigation',
        href: `/${userIdentity.username}/playlists`,
      },
      {
        id: 'nav-collection',
        title: 'Collection',
        description: 'Explore your synced Discogs collection',
        icon: Search,
        action: () => navigate({ to: `/${userIdentity.username}/collection` }),
        keywords: ['collection', 'discogs', 'explore', 'vinyl', 'records'],
        category: 'navigation',
        href: `/${userIdentity.username}/collection`,
      },
      {
        id: 'nav-settings',
        title: 'Settings',
        description: 'Manage your account and preferences',
        icon: Settings,
        action: () => navigate({ to: '/settings' }),
        keywords: ['settings', 'preferences', 'config', 'account'],
        category: 'navigation',
        href: '/settings',
      },
      // Quick Actions
      {
        id: 'action-new-playlist',
        title: 'Create Playlist',
        description: 'Start building a new playlist',
        icon: Plus,
        action: () =>
          navigate({ to: `/${userIdentity.username}/playlists/new` }),
        keywords: ['create', 'new', 'playlist', 'make'],
        category: 'actions',
        badge: 'Quick',
      },
      {
        id: 'action-add-track',
        title: 'Add Track',
        description: 'Add new music to your collection',
        icon: Music,
        action: () => navigate({ to: `/${userIdentity.username}/tracks/add` }),
        keywords: ['add', 'track', 'music', 'upload'],
        category: 'actions',
      },
    ];
    return commands2;
  };
  const commands = generateCommands();
  const filteredCommands = commands.filter((command) => {
    if (!query) return true;
    const searchTerms = query.toLowerCase().split(' ');
    return searchTerms.every(
      (term) =>
        command.title.toLowerCase().includes(term) ||
        command.description?.toLowerCase().includes(term) ||
        command.keywords.some((keyword) =>
          keyword.toLowerCase().includes(term),
        ),
    );
  });
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {});
  const recentCommandItems = !query
    ? commands.filter((cmd) => recentCommands.includes(cmd.id))
    : [];
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx('div', {
        className: cn(
          'fixed inset-0 bg-black/40 z-50 transition-opacity duration-200',
          isAnimating ? 'opacity-100' : 'opacity-0',
        ),
        onClick: onClose,
      }),
      /* @__PURE__ */ jsx('div', {
        className:
          'fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4',
        children: /* @__PURE__ */ jsxs('div', {
          className: cn(
            'bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-xl overflow-hidden transition-all duration-200 ease-out',
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2',
          ),
          children: [
            /* @__PURE__ */ jsxs('div', {
              className: 'flex items-center px-4 py-3 border-b border-gray-200',
              children: [
                /* @__PURE__ */ jsxs('div', {
                  className: 'flex items-center flex-1',
                  children: [
                    /* @__PURE__ */ jsx('div', {
                      className:
                        'flex items-center justify-center w-8 h-8 bg-main rounded-lg mr-3',
                      children: /* @__PURE__ */ jsx(Command, {
                        className: 'w-4 h-4 text-black',
                      }),
                    }),
                    /* @__PURE__ */ jsx('input', {
                      ref: inputRef,
                      type: 'text',
                      placeholder: 'Type a command or search...',
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      className:
                        'flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-500',
                    }),
                  ],
                }),
                /* @__PURE__ */ jsx('button', {
                  onClick: onClose,
                  className:
                    'flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 transition-colors',
                  children: /* @__PURE__ */ jsx(X, {
                    className: 'w-4 h-4 text-gray-400',
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ jsxs('div', {
              ref: containerRef,
              className: 'max-h-80 overflow-y-auto',
              children: [
                !query &&
                  recentCommandItems.length > 0 &&
                  /* @__PURE__ */ jsxs('div', {
                    className: 'p-3',
                    children: [
                      /* @__PURE__ */ jsxs('div', {
                        className:
                          'flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide',
                        children: [
                          /* @__PURE__ */ jsx(Clock, {
                            className: 'w-3 h-3 mr-2',
                          }),
                          'Recent',
                        ],
                      }),
                      /* @__PURE__ */ jsx('div', {
                        className: 'space-y-0.5',
                        children: recentCommandItems.map((command, index) =>
                          /* @__PURE__ */ jsx(
                            CommandButton,
                            {
                              command,
                              isSelected: index === selectedIndex,
                              onClick: () => executeCommand(command),
                            },
                            command.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                Object.entries(groupedCommands).map(
                  ([category, categoryCommands]) =>
                    /* @__PURE__ */ jsxs(
                      'div',
                      {
                        className: 'p-3',
                        children: [
                          /* @__PURE__ */ jsxs('div', {
                            className:
                              'flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide',
                            children: [
                              category === 'navigation' &&
                                /* @__PURE__ */ jsx(Home, {
                                  className: 'w-3 h-3 mr-2',
                                }),
                              category === 'actions' &&
                                /* @__PURE__ */ jsx(Zap, {
                                  className: 'w-3 h-3 mr-2',
                                }),
                              category === 'search' &&
                                /* @__PURE__ */ jsx(Search, {
                                  className: 'w-3 h-3 mr-2',
                                }),
                              category,
                            ],
                          }),
                          /* @__PURE__ */ jsx('div', {
                            className: 'space-y-0.5',
                            children: categoryCommands.map((command) => {
                              const globalIndex =
                                filteredCommands.indexOf(command);
                              return /* @__PURE__ */ jsx(
                                CommandButton,
                                {
                                  command,
                                  isSelected: globalIndex === selectedIndex,
                                  onClick: () => executeCommand(command),
                                },
                                command.id,
                              );
                            }),
                          }),
                        ],
                      },
                      category,
                    ),
                ),
                filteredCommands.length === 0 &&
                  /* @__PURE__ */ jsxs('div', {
                    className: 'p-8 text-center',
                    children: [
                      /* @__PURE__ */ jsx('div', {
                        className:
                          'w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3',
                        children: /* @__PURE__ */ jsx(Search, {
                          className: 'w-6 h-6 text-gray-400',
                        }),
                      }),
                      /* @__PURE__ */ jsx('h3', {
                        className: 'text-sm font-medium text-gray-900 mb-1',
                        children: 'No commands found',
                      }),
                      /* @__PURE__ */ jsx('p', {
                        className: 'text-xs text-gray-500',
                        children:
                          'Try adjusting your search or browse available commands',
                      }),
                    ],
                  }),
              ],
            }),
            /* @__PURE__ */ jsx('div', {
              className: 'px-4 py-3 bg-gray-50 border-t border-gray-200',
              children: /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  /* @__PURE__ */ jsxs('div', {
                    className:
                      'flex items-center space-x-4 text-xs text-gray-500',
                    children: [
                      /* @__PURE__ */ jsxs('div', {
                        className: 'flex items-center',
                        children: [
                          /* @__PURE__ */ jsx('kbd', {
                            className:
                              'px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1',
                            children: '↵',
                          }),
                          /* @__PURE__ */ jsx('span', {
                            children: 'to select',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs('div', {
                        className: 'flex items-center',
                        children: [
                          /* @__PURE__ */ jsx('kbd', {
                            className:
                              'px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1',
                            children: '↑↓',
                          }),
                          /* @__PURE__ */ jsx('span', {
                            children: 'to navigate',
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs('div', {
                    className: 'flex items-center text-xs text-gray-500',
                    children: [
                      /* @__PURE__ */ jsx('kbd', {
                        className:
                          'px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1',
                        children: 'esc',
                      }),
                      /* @__PURE__ */ jsx('span', { children: 'to close' }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
function CommandButton({ command, isSelected, onClick }) {
  const Icon = command.icon;
  return /* @__PURE__ */ jsxs('button', {
    'data-command-item': true,
    onClick,
    className: cn(
      'w-full flex items-center p-2 rounded-lg text-left transition-all duration-150 group',
      isSelected ? 'bg-main text-black' : 'hover:bg-gray-100',
    ),
    children: [
      /* @__PURE__ */ jsx('div', {
        className: cn(
          'flex items-center justify-center w-8 h-8 rounded-md mr-3 transition-colors',
          isSelected ? 'bg-black/10' : 'bg-gray-100 group-hover:bg-gray-200',
        ),
        children: /* @__PURE__ */ jsx(Icon, {
          className: cn(
            'w-4 h-4 transition-colors',
            isSelected ? 'text-black' : 'text-gray-600',
          ),
        }),
      }),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex-1 min-w-0',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center',
            children: [
              /* @__PURE__ */ jsx('div', {
                className: cn(
                  'text-sm font-medium truncate transition-colors',
                  isSelected ? 'text-black' : 'text-gray-900',
                ),
                children: command.title,
              }),
              command.badge &&
                /* @__PURE__ */ jsx('span', {
                  className: cn(
                    'ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full',
                    isSelected
                      ? 'bg-black/10 text-black'
                      : 'bg-main/20 text-yellow-800',
                  ),
                  children: command.badge,
                }),
            ],
          }),
          command.description &&
            /* @__PURE__ */ jsx('div', {
              className: cn(
                'text-xs truncate transition-colors',
                isSelected ? 'text-black/70' : 'text-gray-500',
              ),
              children: command.description,
            }),
        ],
      }),
      command.href &&
        /* @__PURE__ */ jsx(ArrowRight, {
          className: cn(
            'w-4 h-4 ml-2 transition-all duration-150',
            isSelected
              ? 'text-black translate-x-0'
              : 'text-gray-400 group-hover:translate-x-0.5',
          ),
        }),
    ],
  });
}
function TopBar({
  sidebarCollapsed = false,
  onMobileMenuToggle,
  mobileMenuOpen = false,
  onSearchQueryChange,
  searchQuery: externalSearchQuery,
  searchPlaceholder = 'Search tracks, playlists, artists...',
}) {
  const { userIdentity } = useAuthStore();
  useNavigate();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState([]);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchQuery =
    externalSearchQuery !== void 0 ? externalSearchQuery : internalSearchQuery;
  useEffect(() => {
    const recent = localStorage.getItem('crate-recent-commands');
    if (recent) {
      try {
        setRecentCommands(JSON.parse(recent));
      } catch (error) {
        console.error('Error loading recent commands:', error);
      }
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
      router.push('/');
    }
  };
  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-playlist':
        router.push(`/${userIdentity?.username}/playlists/new`);
        break;
      case 'analyze-track':
        router.push('/analyze');
        break;
      case 'add-track':
        router.push(`/${userIdentity?.username}/tracks/add`);
        break;
    }
  };
  const generateCommands = () => {
    if (!userIdentity) return [];
    const commands2 = [
      // Navigation
      {
        id: 'nav-dashboard',
        title: 'Dashboard',
        description: 'Go to your personal dashboard',
        icon: Home,
        action: () => router.push(`/${userIdentity.username}`),
        keywords: ['dashboard', 'home', 'overview', 'profile'],
        category: 'navigation',
        href: `/${userIdentity.username}`,
      },
      {
        id: 'nav-tracks',
        title: 'Tracks',
        description: 'Browse your complete track collection',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/tracks`),
        keywords: ['tracks', 'music', 'collection', 'songs'],
        category: 'navigation',
        href: `/${userIdentity.username}/tracks`,
      },
      {
        id: 'nav-playlists',
        title: 'Playlists',
        description: 'Create and manage your playlists',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/playlists`),
        keywords: ['playlists', 'lists', 'music', 'collections'],
        category: 'navigation',
        href: `/${userIdentity.username}/playlists`,
      },
      {
        id: 'nav-collection',
        title: 'Collection',
        description: 'Explore your synced Discogs collection',
        icon: Search,
        action: () => router.push(`/${userIdentity.username}/collection`),
        keywords: ['collection', 'discogs', 'explore', 'vinyl', 'records'],
        category: 'navigation',
        href: `/${userIdentity.username}/collection`,
      },
      {
        id: 'nav-analyze',
        title: 'AI Analysis',
        description: 'Analyze music with AI-powered insights',
        icon: Brain,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'ai', 'analysis', 'insights', 'smart'],
        category: 'navigation',
        href: '/analyze',
        badge: 'AI',
      },
      {
        id: 'nav-settings',
        title: 'Settings',
        description: 'Manage your account and preferences',
        icon: Settings,
        action: () => router.push('/settings'),
        keywords: ['settings', 'preferences', 'config', 'account'],
        category: 'navigation',
        href: '/settings',
      },
      // Quick Actions
      {
        id: 'action-new-playlist',
        title: 'Create Playlist',
        description: 'Start building a new playlist',
        icon: Plus,
        action: () => router.push(`/${userIdentity.username}/playlists/new`),
        keywords: ['create', 'new', 'playlist', 'make'],
        category: 'actions',
        badge: 'Quick',
      },
      {
        id: 'action-analyze-track',
        title: 'Analyze Track',
        description: 'Get AI-powered track analysis',
        icon: Zap,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'track', 'ai', 'quick'],
        category: 'actions',
        badge: 'AI',
      },
      {
        id: 'action-add-track',
        title: 'Add Track',
        description: 'Add new music to your collection',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/tracks/add`),
        keywords: ['add', 'track', 'music', 'upload'],
        category: 'actions',
      },
    ];
    return commands2;
  };
  const commands = generateCommands();
  const filteredCommands = commands.filter((command) => {
    if (!searchQuery) return true;
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every(
      (term) =>
        command.title.toLowerCase().includes(term) ||
        command.description?.toLowerCase().includes(term) ||
        command.keywords.some((keyword) =>
          keyword.toLowerCase().includes(term),
        ),
    );
  });
  const saveRecentCommand = (commandId) => {
    const updated = [
      commandId,
      ...recentCommands.filter((id) => id !== commandId),
    ].slice(0, 5);
    setRecentCommands(updated);
    localStorage.setItem('crate-recent-commands', JSON.stringify(updated));
  };
  const executeCommand = (command) => {
    saveRecentCommand(command.id);
    command.action();
    setSearchDropdownOpen(false);
    setInternalSearchQuery('');
    if (onSearchQueryChange) {
      onSearchQueryChange('');
    }
    setSelectedIndex(0);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    } else {
      setInternalSearchQuery(value);
    }
    if (value.length > 0 && !onSearchQueryChange) {
      setSearchDropdownOpen(true);
      setSelectedIndex(0);
    } else {
      setSearchDropdownOpen(false);
    }
  };
  const handleSearchFocus = () => {
    if (searchQuery.length > 0 && !onSearchQueryChange) {
      setSearchDropdownOpen(true);
    }
  };
  const handleSearchKeyDown = (e) => {
    if (!searchDropdownOpen) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSearchDropdownOpen(false);
        searchInputRef.current?.blur();
        break;
    }
  };
  const recentCommandItems = !searchQuery
    ? commands.filter((cmd) => recentCommands.includes(cmd.id))
    : [];
  const displayCommands = searchQuery ? filteredCommands : recentCommandItems;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(CommandPalette, {
        isOpen: commandPaletteOpen,
        onClose: () => setCommandPaletteOpen(false),
      }),
      /* @__PURE__ */ jsxs('header', {
        className: cn(
          'h-16 bg-white border-b-2 border-gray-800 transition-all duration-300 z-40 flex items-center justify-between px-6 w-full sticky top-0',
        ),
        children: [
          /* @__PURE__ */ jsx('button', {
            onClick: onMobileMenuToggle,
            className:
              'md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors',
            'aria-label': 'Toggle mobile menu',
            children: mobileMenuOpen
              ? /* @__PURE__ */ jsx(X, {
                  className: 'w-5 h-5 active:text-main transition-colors',
                })
              : /* @__PURE__ */ jsx(Menu, {
                  className: 'w-5 h-5 active:text-main transition-colors',
                }),
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex-1 max-w-2xl mx-4 relative',
            ref: dropdownRef,
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'relative',
                children: [
                  /* @__PURE__ */ jsx(Search, {
                    className:
                      'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black',
                  }),
                  /* @__PURE__ */ jsx('input', {
                    ref: searchInputRef,
                    type: 'text',
                    placeholder: searchPlaceholder,
                    value: searchQuery,
                    onChange: handleSearchChange,
                    onFocus: handleSearchFocus,
                    onKeyDown: handleSearchKeyDown,
                    className:
                      'w-full pl-10 pr-16 py-2 border-2 border-gray-800 rounded-base focus:outline-none focus:ring-0 text-sm transition-all placeholder:text-gray-500',
                  }),
                  /* @__PURE__ */ jsx('div', {
                    className:
                      'absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1',
                    children: /* @__PURE__ */ jsx('kbd', {
                      className:
                        'px-2 py-1 text-xs bg-white border-2 border-gray-800 rounded-base text-black font-bold cursor-pointer hover:bg-gray-100 transition-colors',
                      onClick: () => setCommandPaletteOpen(true),
                      children: '⌘K',
                    }),
                  }),
                ],
              }),
              searchDropdownOpen &&
                /* @__PURE__ */ jsxs('div', {
                  className:
                    'absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50',
                  children: [
                    !searchQuery &&
                      recentCommandItems.length > 0 &&
                      /* @__PURE__ */ jsx('div', {
                        className: 'p-2',
                        children: /* @__PURE__ */ jsxs('div', {
                          className:
                            'flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide',
                          children: [
                            /* @__PURE__ */ jsx(Clock, {
                              className: 'w-3 h-3 mr-2',
                            }),
                            'Recent',
                          ],
                        }),
                      }),
                    displayCommands.length > 0
                      ? /* @__PURE__ */ jsx('div', {
                          className: 'p-2 space-y-1',
                          children: displayCommands.map((command, index) =>
                            /* @__PURE__ */ jsx(
                              SearchCommandButton,
                              {
                                command,
                                isSelected: index === selectedIndex,
                                onClick: () => executeCommand(command),
                              },
                              command.id,
                            ),
                          ),
                        })
                      : /* @__PURE__ */ jsxs('div', {
                          className: 'p-6 text-center text-gray-500',
                          children: [
                            /* @__PURE__ */ jsx(Search, {
                              className: 'w-6 h-6 mx-auto mb-2 text-gray-300',
                            }),
                            /* @__PURE__ */ jsx('p', {
                              className: 'text-sm',
                              children: 'No commands found',
                            }),
                          ],
                        }),
                  ],
                }),
            ],
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center space-x-2',
            children: [
              /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Button, {
                      variant: 'ghost',
                      size: 'sm',
                      className: 'p-2 hover:bg-gray-100',
                      children: /* @__PURE__ */ jsx(Plus, {
                        className: 'w-4 h-4 active:text-main transition-colors',
                      }),
                    }),
                  }),
                  /* @__PURE__ */ jsxs(DropdownMenuContent, {
                    align: 'end',
                    className: 'w-48',
                    children: [
                      /* @__PURE__ */ jsxs(DropdownMenuItem, {
                        onClick: () => handleQuickAction('new-playlist'),
                        children: [
                          /* @__PURE__ */ jsx(ListMusic, {
                            className: 'w-4 h-4 mr-2',
                          }),
                          'New Playlist',
                        ],
                      }),
                      /* @__PURE__ */ jsxs(DropdownMenuItem, {
                        onClick: () => handleQuickAction('analyze-track'),
                        children: [
                          /* @__PURE__ */ jsx(Brain, {
                            className: 'w-4 h-4 mr-2',
                          }),
                          'Analyze Track',
                        ],
                      }),
                      /* @__PURE__ */ jsxs(DropdownMenuItem, {
                        onClick: () => handleQuickAction('add-track'),
                        children: [
                          /* @__PURE__ */ jsx(Plus, {
                            className: 'w-4 h-4 mr-2',
                          }),
                          'Add Track',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs(Button, {
                variant: 'ghost',
                size: 'sm',
                className: 'p-2 hover:bg-gray-100 relative',
                children: [
                  /* @__PURE__ */ jsx(Bell, {
                    className: 'w-4 h-4 active:text-main transition-colors',
                  }),
                  /* @__PURE__ */ jsx('span', {
                    className:
                      'absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs',
                  }),
                ],
              }),
              userIdentity
                ? /* @__PURE__ */ jsxs(DropdownMenu, {
                    children: [
                      /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                        asChild: true,
                        children: /* @__PURE__ */ jsxs(Button, {
                          variant: 'ghost',
                          className:
                            'flex items-center space-x-2 hover:bg-gray-100 p-2',
                          children: [
                            /* @__PURE__ */ jsxs(Avatar, {
                              className: 'w-8 h-8',
                              children: [
                                /* @__PURE__ */ jsx(AvatarImage, {
                                  src: userIdentity.avatarUrl,
                                }),
                                /* @__PURE__ */ jsx(AvatarFallback, {
                                  className:
                                    'bg-main text-black border-2 border-gray-800',
                                  children: userIdentity.username
                                    .charAt(0)
                                    .toUpperCase(),
                                }),
                              ],
                            }),
                            /* @__PURE__ */ jsx('span', {
                              className: 'hidden sm:block font-medium',
                              children: userIdentity.username,
                            }),
                          ],
                        }),
                      }),
                      /* @__PURE__ */ jsxs(DropdownMenuContent, {
                        align: 'end',
                        className: 'w-56',
                        children: [
                          /* @__PURE__ */ jsxs(DropdownMenuItem, {
                            onClick: () =>
                              router.push(`/${userIdentity.username}`),
                            children: [
                              /* @__PURE__ */ jsx(User, {
                                className: 'w-4 h-4 mr-2',
                              }),
                              'Profile',
                            ],
                          }),
                          /* @__PURE__ */ jsxs(DropdownMenuItem, {
                            onClick: () => router.push('/settings'),
                            children: [
                              /* @__PURE__ */ jsx(Settings, {
                                className: 'w-4 h-4 mr-2',
                              }),
                              'Settings',
                            ],
                          }),
                          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                          /* @__PURE__ */ jsxs(DropdownMenuItem, {
                            onClick: handleLogout,
                            className: 'text-red-600',
                            children: [
                              /* @__PURE__ */ jsx(LogOut, {
                                className: 'w-4 h-4 mr-2',
                              }),
                              'Sign Out',
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : /* @__PURE__ */ jsx(Button, {
                    onClick: () => router.push('/auth/signin'),
                    className: 'text-sm',
                    children: 'Sign In',
                  }),
            ],
          }),
        ],
      }),
    ],
  });
}
function SearchCommandButton({ command, isSelected, onClick }) {
  const Icon = command.icon;
  return /* @__PURE__ */ jsxs('button', {
    onClick,
    className: cn(
      'w-full flex items-center p-2 rounded-lg text-left transition-all duration-150 group',
      isSelected ? 'bg-main text-black' : 'hover:bg-gray-100',
    ),
    children: [
      /* @__PURE__ */ jsx('div', {
        className: cn(
          'flex items-center justify-center w-8 h-8 rounded-md mr-3 transition-colors',
          isSelected ? 'bg-black/10' : 'bg-gray-100 group-hover:bg-gray-200',
        ),
        children: /* @__PURE__ */ jsx(Icon, {
          className: cn(
            'w-4 h-4 transition-colors',
            isSelected ? 'text-black' : 'text-gray-600',
          ),
        }),
      }),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex-1 min-w-0',
        children: [
          /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center',
            children: [
              /* @__PURE__ */ jsx('div', {
                className: cn(
                  'text-sm font-medium truncate transition-colors',
                  isSelected ? 'text-black' : 'text-gray-900',
                ),
                children: command.title,
              }),
              command.badge &&
                /* @__PURE__ */ jsx('span', {
                  className: cn(
                    'ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full',
                    isSelected
                      ? 'bg-black/10 text-black'
                      : 'bg-main/20 text-yellow-800',
                  ),
                  children: command.badge,
                }),
            ],
          }),
          command.description &&
            /* @__PURE__ */ jsx('div', {
              className: cn(
                'text-xs truncate transition-colors',
                isSelected ? 'text-black/70' : 'text-gray-500',
              ),
              children: command.description,
            }),
        ],
      }),
      command.href &&
        /* @__PURE__ */ jsx(ArrowRight, {
          className: cn(
            'w-4 h-4 ml-2 transition-all duration-150',
            isSelected
              ? 'text-black translate-x-0'
              : 'text-gray-400 group-hover:translate-x-0.5',
          ),
        }),
    ],
  });
}
const cardVariants = cva(
  'rounded-base bg-white text-text border-2 border-gray-800 transition-all',
  {
    variants: {
      variant: {
        default: 'shadow-light',
        interactive:
          'shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none cursor-pointer active:bg-mainAccent/10 active:scale-[0.98] active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
        elevated:
          'shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
        flat: 'shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
const Card = React.forwardRef(({ className, variant, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn(cardVariants({ variant, className })),
    ...props,
  }),
);
Card.displayName = 'Card';
const CardHeader = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn('flex flex-col space-y-1.5 p-4', className),
    ...props,
  }),
);
CardHeader.displayName = 'CardHeader';
const CardTitle = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn(
      'font-semibold leading-none tracking-tight text-text font-heading',
      className,
    ),
    ...props,
  }),
);
CardTitle.displayName = 'CardTitle';
const CardDescription = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn('text-sm text-gray-600', className),
    ...props,
  }),
);
CardDescription.displayName = 'CardDescription';
const CardContent = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn('p-4 pt-0', className),
    ...props,
  }),
);
CardContent.displayName = 'CardContent';
const CardFooter = React.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx('div', {
    ref,
    className: cn('flex items-center p-4 pt-0', className),
    ...props,
  }),
);
CardFooter.displayName = 'CardFooter';
const PersistentPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    isShuffleEnabled,
    isRepeatEnabled,
    queue,
    currentIndex,
    volume,
    currentTime,
    duration,
    playNext,
    playPrevious,
    togglePlayPause,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    clearQueue,
    removeFromQueue,
    setQueue,
    seekTo,
  } = usePlayerStore();
  const [showQueue, setShowQueue] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };
  const handleToggleFavorite = async (trackId) => {
    if (!trackId) return;
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
  const handleTrackClick = (track, index) => {
    const trackIndex = queue.findIndex((t) => t.id === track.id);
    if (trackIndex !== -1) {
      setQueue(queue, trackIndex);
      togglePlayPause(track);
    }
  };
  const handleRemoveFromQueue = (trackId) => {
    removeFromQueue(trackId);
    toast.success('Track removed from queue');
  };
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (!isNaN(newTime) && duration > 0) {
      seekTo(newTime);
    }
  };
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  if (!currentTrack && queue.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs('div', {
    className: 'w-full z-[60] bg-bg border-t-2 border-gray-800',
    children: [
      showQueue &&
        /* @__PURE__ */ jsx('div', {
          className:
            'max-h-96 overflow-y-auto bg-white border-t-2 border-gray-800',
          children: /* @__PURE__ */ jsxs('div', {
            className: 'p-4',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center justify-between mb-4',
                children: [
                  /* @__PURE__ */ jsxs('h3', {
                    className: 'text-lg font-semibold text-text',
                    children: ['Queue (', queue.length, ' tracks)'],
                  }),
                  /* @__PURE__ */ jsxs('div', {
                    className: 'flex items-center space-x-2',
                    children: [
                      /* @__PURE__ */ jsx(Button, {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => clearQueue(),
                        className: 'text-xs',
                        children: 'Clear All',
                      }),
                      /* @__PURE__ */ jsx(Button, {
                        variant: 'ghost',
                        size: 'sm',
                        onClick: () => setShowQueue(false),
                        children: /* @__PURE__ */ jsx(X, {
                          className: 'w-4 h-4',
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx('div', {
                className: 'space-y-2',
                children: queue.map((track, index) =>
                  /* @__PURE__ */ jsxs(
                    'div',
                    {
                      className: cn(
                        'flex items-center space-x-3 p-3 rounded-base border-2 border-gray-800 hover:bg-mainAccent/10 transition-colors cursor-pointer track-row',
                        index === currentIndex && 'bg-main/20',
                      ),
                      onClick: () => handleTrackClick(track),
                      children: [
                        /* @__PURE__ */ jsx('div', {
                          className:
                            'w-8 h-8 bg-mainAccent border-2 border-gray-800 rounded-base flex items-center justify-center flex-shrink-0',
                          children:
                            index === currentIndex && isPlaying
                              ? /* @__PURE__ */ jsx(Pause, {
                                  className: 'w-4 h-4 text-black',
                                })
                              : /* @__PURE__ */ jsx(Play, {
                                  className: 'w-4 h-4 text-black',
                                }),
                        }),
                        track.artwork
                          ? /* @__PURE__ */ jsx(Image, {
                              src: track.artwork,
                              alt: track.title,
                              width: 32,
                              height: 32,
                              className: 'w-8 h-8 rounded-base object-cover',
                            })
                          : /* @__PURE__ */ jsx('div', {
                              className:
                                'w-8 h-8 bg-gray-200 rounded-base flex items-center justify-center',
                              children: /* @__PURE__ */ jsx(Music, {
                                className: 'w-4 h-4 text-gray-500',
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
                        /* @__PURE__ */ jsx('div', {
                          className: 'text-xs text-gray-500',
                          children: track.duration || '0:00',
                        }),
                        /* @__PURE__ */ jsx(Button, {
                          variant: 'ghost',
                          size: 'sm',
                          onClick: (e) => {
                            e.stopPropagation();
                            handleRemoveFromQueue(track.id);
                          },
                          className: 'h-8 w-8 p-0 icon-button',
                          children: /* @__PURE__ */ jsx(X, {
                            className: 'w-4 h-4',
                          }),
                        }),
                      ],
                    },
                    track.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      /* @__PURE__ */ jsx(Card, {
        className: 'rounded-none border-0 shadow-none',
        children: /* @__PURE__ */ jsx(CardContent, {
          className: 'p-3',
          children: /* @__PURE__ */ jsxs('div', {
            className: 'flex items-center space-x-2 sm:space-x-4',
            children: [
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center space-x-2 w-24 sm:w-48',
                children: [
                  /* @__PURE__ */ jsx('span', {
                    className:
                      'hidden sm:inline text-xs text-gray-500 font-mono w-8 text-right',
                    children: formatTime(currentTime),
                  }),
                  /* @__PURE__ */ jsx('div', {
                    className: 'flex-1 relative',
                    children: /* @__PURE__ */ jsx('input', {
                      type: 'range',
                      min: '0',
                      max: duration || 0,
                      value: currentTime,
                      onChange: handleProgressChange,
                      disabled: !duration,
                      className:
                        'w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed',
                      style: {
                        background: `linear-gradient(to right, #FFDC58 0%, #FFDC58 ${progressPercentage}%, #e5e5e5 ${progressPercentage}%, #e5e5e5 100%)`,
                      },
                    }),
                  }),
                  /* @__PURE__ */ jsx('span', {
                    className:
                      'hidden sm:inline text-xs text-gray-500 font-mono w-8',
                    children: formatTime(duration),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center space-x-3 flex-1 min-w-0',
                children: [
                  currentTrack?.artwork
                    ? /* @__PURE__ */ jsx(Image, {
                        src: currentTrack.artwork,
                        alt: currentTrack.title,
                        width: 40,
                        height: 40,
                        className: 'w-10 h-10 rounded-base object-cover',
                      })
                    : /* @__PURE__ */ jsx('div', {
                        className:
                          'w-10 h-10 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center',
                        children: /* @__PURE__ */ jsx(Music, {
                          className: 'w-5 h-5 text-black',
                        }),
                      }),
                  /* @__PURE__ */ jsxs('div', {
                    className: 'flex-1 min-w-0',
                    children: [
                      /* @__PURE__ */ jsx('div', {
                        className: 'font-medium text-sm truncate text-text',
                        children: currentTrack?.title || 'No track selected',
                      }),
                      /* @__PURE__ */ jsx('div', {
                        className: 'text-xs text-gray-600 truncate',
                        children: currentTrack?.artist || 'Unknown artist',
                      }),
                    ],
                  }),
                  currentTrack &&
                    /* @__PURE__ */ jsx('div', {
                      className: 'flex items-center space-x-1',
                      children:
                        currentTrack.genres &&
                        currentTrack.genres.length > 0 &&
                        /* @__PURE__ */ jsx('span', {
                          className:
                            'inline-flex items-center px-1.5 py-0.5 rounded-base text-xs font-medium bg-mainAccent2 border border-gray-800 text-black',
                          children: currentTrack.genres[0],
                        }),
                    }),
                ],
              }),
              currentTrack &&
                /* @__PURE__ */ jsx(Button, {
                  variant: 'ghost',
                  size: 'sm',
                  onClick: () => handleToggleFavorite(currentTrack.id),
                  className: cn(
                    'h-8 w-8 p-0 border border-gray-800 rounded-base icon-button',
                    isFavorite(currentTrack.id)
                      ? 'bg-red-100 hover:bg-red-200 text-red-600'
                      : 'bg-white hover:bg-gray-100 text-gray-600',
                  ),
                  children: /* @__PURE__ */ jsx(Heart, {
                    className: cn(
                      'w-4 h-4',
                      isFavorite(currentTrack.id) && 'fill-current',
                    ),
                  }),
                }),
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center space-x-1',
                children: [
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: toggleShuffle,
                    className: cn(
                      'h-8 w-8 p-0 border border-gray-800 rounded-base icon-button',
                      isShuffleEnabled
                        ? 'bg-main hover:bg-mainAccent'
                        : 'bg-white hover:bg-gray-100',
                    ),
                    children: /* @__PURE__ */ jsx(Shuffle, {
                      className: 'w-4 h-4',
                    }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: playPrevious,
                    disabled: queue.length === 0,
                    className:
                      'h-8 w-8 p-0 bg-white hover:bg-gray-100 border border-gray-800 rounded-base icon-button',
                    children: /* @__PURE__ */ jsx(SkipBack, {
                      className: 'w-4 h-4',
                    }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: () =>
                      currentTrack && togglePlayPause(currentTrack),
                    disabled: !currentTrack,
                    className:
                      'h-10 w-10 p-0 bg-main hover:bg-mainAccent border-2 border-gray-800 rounded-base play-button',
                    children: isPlaying
                      ? /* @__PURE__ */ jsx(Pause, {
                          className: 'w-5 h-5 text-black',
                        })
                      : /* @__PURE__ */ jsx(Play, {
                          className: 'w-5 h-5 text-black',
                        }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: playNext,
                    disabled: queue.length === 0,
                    className:
                      'h-8 w-8 p-0 bg-white hover:bg-gray-100 border border-gray-800 rounded-base icon-button',
                    children: /* @__PURE__ */ jsx(SkipForward, {
                      className: 'w-4 h-4',
                    }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: toggleRepeat,
                    className: cn(
                      'h-8 w-8 p-0 border border-gray-800 rounded-base icon-button',
                      isRepeatEnabled
                        ? 'bg-main hover:bg-mainAccent'
                        : 'bg-white hover:bg-gray-100',
                    ),
                    children: /* @__PURE__ */ jsx(Repeat, {
                      className: 'w-4 h-4',
                    }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs('div', {
                className: 'flex items-center space-x-2',
                children: [
                  /* @__PURE__ */ jsxs('div', {
                    className: 'hidden sm:flex items-center space-x-2',
                    children: [
                      /* @__PURE__ */ jsx(Button, {
                        variant: 'ghost',
                        size: 'sm',
                        onClick: toggleMute,
                        className:
                          'h-8 w-8 p-0 bg-white hover:bg-gray-100 border border-gray-800 rounded-base icon-button',
                        children:
                          isMuted || volume === 0
                            ? /* @__PURE__ */ jsx(VolumeX, {
                                className: 'w-4 h-4',
                              })
                            : /* @__PURE__ */ jsx(Volume2, {
                                className: 'w-4 h-4',
                              }),
                      }),
                      /* @__PURE__ */ jsx('div', {
                        className: 'w-16',
                        children: /* @__PURE__ */ jsx('input', {
                          type: 'range',
                          min: '0',
                          max: '100',
                          value: volume,
                          onChange: (e) =>
                            handleVolumeChange([parseInt(e.target.value)]),
                          className:
                            'w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer interactive-element',
                          style: {
                            background: `linear-gradient(to right, #FFDC58 0%, #FFDC58 ${volume}%, #e5e5e5 ${volume}%, #e5e5e5 100%)`,
                          },
                        }),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: 'ghost',
                    size: 'sm',
                    onClick: () => setShowQueue(!showQueue),
                    className: cn(
                      'h-8 w-8 p-0 border border-gray-800 rounded-base icon-button',
                      showQueue
                        ? 'bg-main hover:bg-mainAccent'
                        : 'bg-white hover:bg-gray-100',
                    ),
                    children: /* @__PURE__ */ jsx(List, {
                      className: 'w-4 h-4',
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
};
function AppLayout({ children }) {
  const { userIdentity } = useAuthStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useKeyboardNavigation();
  useEffect(() => {
    const savedState = localStorage.getItem('crate-sidebar-collapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('crate-sidebar-collapsed', JSON.stringify(newState));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && isMobile) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, isMobile]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        if (isMobile) {
          setMobileMenuOpen(!mobileMenuOpen);
        } else {
          toggleSidebar();
        }
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder*="Search"]',
        );
        searchInput?.focus();
      }
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed, mobileMenuOpen, isMobile]);
  if (!userIdentity) {
    return /* @__PURE__ */ jsx('div', { className: 'min-h-screen', children });
  }
  return /* @__PURE__ */ jsxs('div', {
    className: 'h-screen flex flex-col overflow-hidden bg-gray-50',
    children: [
      isMobile &&
        mobileMenuOpen &&
        /* @__PURE__ */ jsx('div', {
          className: 'fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden',
          onClick: () => setMobileMenuOpen(false),
        }),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex flex-1 overflow-hidden relative',
        children: [
          /* @__PURE__ */ jsx('div', {
            id: 'sidebar',
            className: cn(
              'transition-all duration-300 z-[60] bg-white border-r border-gray-800 flex-shrink-0',
              isMobile
                ? cn(
                    'fixed inset-y-0 left-0 h-full',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
                  )
                : cn('relative', sidebarCollapsed ? 'w-16' : 'w-64'),
            ),
            children: /* @__PURE__ */ jsx(Sidebar, {
              collapsed: !isMobile && sidebarCollapsed,
              onToggle: () => {
                if (isMobile) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  toggleSidebar();
                }
              },
            }),
          }),
          /* @__PURE__ */ jsxs('div', {
            className: 'flex flex-col flex-1 min-w-0 overflow-hidden relative',
            children: [
              /* @__PURE__ */ jsx(TopBar, {
                sidebarCollapsed,
                onMobileMenuToggle: () => setMobileMenuOpen(!mobileMenuOpen),
                mobileMenuOpen,
              }),
              /* @__PURE__ */ jsx('main', {
                className: 'flex-1 overflow-y-auto',
                children: /* @__PURE__ */ jsx('div', {
                  className: 'p-6 max-w-7xl mx-auto',
                  children,
                }),
              }),
            ],
          }),
        ],
      }),
      isMobile &&
        /* @__PURE__ */ jsx('div', {
          className:
            'fixed bottom-24 right-4 flex flex-col space-y-2 z-30 pointer-events-none',
          children: /* @__PURE__ */ jsx('button', {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className:
              'pointer-events-auto w-12 h-12 bg-main text-black rounded-full shadow-lg flex items-center justify-center hover:bg-mainAccent transition-colors border-2 border-black',
            'aria-label': 'Toggle navigation',
            children: mobileMenuOpen
              ? /* @__PURE__ */ jsx(X, {
                  className: 'w-6 h-6 active:text-main transition-colors',
                })
              : /* @__PURE__ */ jsx('svg', {
                  className: 'w-6 h-6 active:text-main transition-colors',
                  fill: 'none',
                  stroke: 'currentColor',
                  viewBox: '0 0 24 24',
                  children: /* @__PURE__ */ jsx('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    d: 'M4 6h16M4 12h16M4 18h16',
                  }),
                }),
          }),
        }),
      /* @__PURE__ */ jsx('div', {
        className: 'flex-shrink-0 z-[60]',
        children: /* @__PURE__ */ jsx(PersistentPlayer, {}),
      }),
    ],
  });
}
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      setHasError(true);
    };
    const errorListener = (errorEvent) => {
      handleError(
        new Error(
          errorEvent instanceof ErrorEvent
            ? errorEvent.message
            : 'Unhandled promise rejection',
        ),
        errorEvent,
      );
    };
    window.addEventListener('error', errorListener);
    window.addEventListener('unhandledrejection', errorListener);
    return () => {
      window.removeEventListener('error', errorListener);
      window.removeEventListener('unhandledrejection', errorListener);
    };
  }, []);
  if (hasError) {
    return /* @__PURE__ */ jsx(Fragment, {
      children:
        fallback ||
        /* @__PURE__ */ jsx('h1', { children: 'Something went wrong.' }),
    });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const LoadingSpinner = ({ className }) =>
  /* @__PURE__ */ jsx(Loader2, {
    className: cn('animate-spin text-mainAccent2', className),
  });
const GlobalError = ({}) => {
  return /* @__PURE__ */ jsxs('div', {
    className: 'flex min-h-screen flex-col items-center justify-center p-4',
    children: [
      /* @__PURE__ */ jsx('h1', {
        className: 'text-2xl font-bold mb-4',
        children: 'Sorry, something went wrong!',
      }),
      /* @__PURE__ */ jsx('p', {
        className: 'text-muted-foreground mb-4',
        children:
          'Please try refreshing the page or contact support if the problem persists.',
      }),
      /* @__PURE__ */ jsx(Button, {
        onClick: () => window.location.reload(),
        children: 'Refresh Page',
      }),
    ],
  });
};
const Route$q = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Crate',
      },
      {
        name: 'description',
        content: 'Your AI-powered music collection analyzer',
      },
      {
        name: 'keywords',
        content: 'Crate, Discogs, Music, AI, Analyzer, Bpm',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});
function RootLayout() {
  return /* @__PURE__ */ jsxs('html', {
    lang: 'en',
    children: [
      /* @__PURE__ */ jsx('head', {
        children: /* @__PURE__ */ jsx(HeadContent, {}),
      }),
      /* @__PURE__ */ jsxs('body', {
        style: {
          backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        },
        children: [
          /* @__PURE__ */ jsx(ErrorBoundary, {
            fallback: /* @__PURE__ */ jsx(GlobalError, {}),
            children: /* @__PURE__ */ jsx(AuthProvider, {
              children: /* @__PURE__ */ jsx(AppLayout, {
                children: /* @__PURE__ */ jsx(ErrorBoundary, {
                  children: /* @__PURE__ */ jsx(Suspense, {
                    fallback: /* @__PURE__ */ jsx(LoadingSpinner, {}),
                    children: /* @__PURE__ */ jsx(Outlet, {}),
                  }),
                }),
              }),
            }),
          }),
          /* @__PURE__ */ jsx(Toaster, {
            position: 'top-center',
            expand: false,
            closeButton: true,
            richColors: true,
            toastOptions: {
              style: {
                border: '2px solid #1f2937',
                // gray-800
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                color: '#1a1a1a',
              },
              className: 'shadow-light',
            },
          }),
          /* @__PURE__ */ jsx(Scripts, {}),
        ],
      }),
    ],
  });
}
const $$splitComponentImporter$7 = () =>
  import('./waitlist-BrYeGkcF.js').then((n) => n.f);
const Route$p = createFileRoute('/waitlist')({
  component: lazyRouteComponent($$splitComponentImporter$7, 'component'),
  head: () => ({
    meta: [
      {
        title: 'Crate',
      },
      {
        name: 'description',
        content: 'Smart digging 💿',
      },
    ],
  }),
});
const $$splitComponentImporter$6 = () => import('./analyze-BOdLdx8q.js');
const Route$o = createFileRoute('/analyze')({
  component: lazyRouteComponent($$splitComponentImporter$6, 'component'),
});
const $$splitComponentImporter$5 = () => import('./index-C8PTWzh2.js');
const Route$n = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter$5, 'component'),
});
const $$splitComponentImporter$4 = () => import('./index-BAkV4XWD.js');
const Route$m = createFileRoute('/$username/')({
  component: lazyRouteComponent($$splitComponentImporter$4, 'component'),
});
const Route$l = createFileRoute('/api/waitlist')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json();
          const { email, user_type } = data;
          if (!email || !user_type) {
            return Response.json(
              { error: 'Email and user type are required' },
              { status: 400 },
            );
          }
          const { error } = await supabase
            .from('waitlist')
            .insert([{ email, user_type }]);
          if (error) {
            throw error;
          }
          return Response.json(
            { message: 'Successfully added to waitlist!' },
            { status: 200 },
          );
        } catch (error) {
          console.error('Error adding to waitlist:', error);
          return Response.json(
            { error: 'Failed to add to waitlist' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const $$splitComponentImporter$3 = () => import('./analyze.chat-BNje0mGn.js');
const Route$k = createFileRoute('/analyze/chat')({
  component: lazyRouteComponent($$splitComponentImporter$3, 'component'),
});
const $$splitComponentImporter$2 = () => import('./tracks-D6KMek9z.js');
const Route$j = createFileRoute('/$username/tracks')({
  component: lazyRouteComponent($$splitComponentImporter$2, 'component'),
});
const $$splitComponentImporter$1 = () => import('./playlists-DhF4sS4J.js');
const Route$i = createFileRoute('/$username/playlists')({
  component: lazyRouteComponent($$splitComponentImporter$1, 'component'),
});
const $$splitComponentImporter = () => import('./collection-Qp9ykMCW.js');
const Route$h = createFileRoute('/$username/collection')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
});
async function createClient(context) {
  let cookiesStr = '';
  if (context?.request) {
    cookiesStr = context.request.headers.get('cookie') || '';
  } else {
    try {
      const request = getWebRequest();
      cookiesStr = request.headers.get('cookie') || '';
    } catch (e) {}
  }
  return createServerClient(
    'https://olxynjdxmipslgseupxc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seHluamR4bWlwc2xnc2V1cHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjM1NjcsImV4cCI6MjA0OTI5OTU2N30.NLdZXkEphv1SQl8AvWtulgHxKSNHgt-IsByE2r_w0CE',
    {
      cookies: {
        getAll() {
          const parsed = parse(cookiesStr);
          return Object.entries(parsed).map(([name, value]) => ({
            name,
            value: value ?? '',
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (context?.headers) {
              context.headers.append(
                'Set-Cookie',
                serialize(name, value, options),
              );
            } else {
              try {
                appendResponseHeader(
                  'Set-Cookie',
                  serialize(name, value, options),
                );
              } catch {}
            }
          });
        },
      },
    },
  );
}
const CollectionUtils = (supabase2) => {
  const getTracks = async (tracksData) => {
    const { data: trackAnalysisData, error: trackAnalysisError } =
      await supabase2
        .from('track_analysis')
        .select('*')
        .in(
          'track_id',
          tracksData.map((t) => t.id),
        );
    if (trackAnalysisError) {
      throw trackAnalysisError;
    }
    const crateTracks = tracksData.map((track) => {
      const trackAnalysis = trackAnalysisData.find(
        (analysis) => analysis.track_id === track.id,
      );
      return {
        ...track,
        bpm: trackAnalysis?.bpm,
      };
    });
    return crateTracks;
  };
  const getCollection = async () => {
    const { data: userData, error: userError } = await supabase2.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }
    const { data, error } = await supabase2
      .from('user_releases')
      .select(`discogs_release_id`)
      .eq('user_id', userData.user.id);
    if (error) {
      throw new Error(error.message);
    }
    const { data: releases, error: releaseError } = await supabase2
      .from('discogs_releases')
      .select()
      .in(
        'discogs_release_id',
        data.map((r) => r.discogs_release_id),
      );
    if (releaseError) {
      throw new Error(releaseError.message);
    }
    return releases;
  };
  const ingestCollection = async (collection) => {
    const combinedReleaseInfo = collection.releases.map((r) => ({
      discogs_release_id: r.id.toString(),
      discogs_release_data: null,
      basic_release_data: r,
    }));
    const { error: releaseError } = await supabase2
      .from('discogs_releases')
      .upsert(combinedReleaseInfo);
    if (releaseError) {
      throw new Error(releaseError.message);
    }
    const { data: userData, error: userError } = await supabase2.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }
    const { error: userReleaseError } = await supabase2
      .from('user_releases')
      .upsert(
        collection.releases.map((r) => ({
          user_id: userData.user.id,
          discogs_release_id: r.id.toString(),
        })),
      );
    if (userReleaseError) {
      throw new Error(userReleaseError.message);
    }
  };
  const getCollectionTracks = async () => {
    const { data: userData, error: userError } = await supabase2.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }
    const BATCH_SIZE = 1e3;
    let allTracks = [];
    let offset = 0;
    let hasMore = true;
    while (hasMore) {
      const { data: tracksData, error: tracksError } = await supabase2
        .from('user_releases_and_tracks')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('id', { ascending: true })
        .range(offset, offset + BATCH_SIZE - 1);
      if (tracksError) {
        throw tracksError;
      }
      if (!tracksData || tracksData.length === 0) {
        hasMore = false;
      } else {
        allTracks = [...allTracks, ...tracksData];
        offset += BATCH_SIZE;
        if (tracksData.length < BATCH_SIZE) {
          hasMore = false;
        }
      }
    }
    return allTracks;
  };
  const getReleaseTracks = async (releaseId) => {
    const { data: tracksData, error: tracksError } = await supabase2
      .from('tracks')
      .select('*')
      .eq('discogs_release_id', releaseId);
    if (tracksError) {
      throw tracksError;
    }
    const crateTracks = await getTracks(tracksData);
    return crateTracks;
  };
  return {
    getCollection,
    ingestCollection,
    getCollectionTracks,
    getReleaseTracks,
  };
};
const Route$g = createFileRoute('/api/music/tracks')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const { getCollectionTracks } = CollectionUtils(supabase2);
          const tracks = await getCollectionTracks();
          if (!tracks) {
            return Response.json({ tracks: [] });
          }
          return Response.json({ tracks });
        } catch (error) {
          console.error('Tracks API error:', error);
          return Response.json({ tracks: [] }, { status: 200 });
        }
      },
    },
  },
});
const Route$f = createFileRoute('/api/music/playlists')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlists, error } = await supabase2
            .from('playlists')
            .select(
              `
            *,
            playlist_tracks (
              *,
              track: tracks (*)
            )
          `,
            )
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });
          if (error) throw error;
          return Response.json(playlists);
        } catch (error) {
          console.error('Error in GET /api/music/playlists:', error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { title, description } = await request.json();
          if (!title) {
            return Response.json(
              { error: 'Title is required' },
              { status: 400 },
            );
          }
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;
          const { data: playlist, error } = await supabase2
            .from('playlists')
            .insert({
              title,
              description,
              user_id: userId,
            })
            .select()
            .single();
          if (error) {
            console.error('Error creating playlist:', error);
            throw error;
          }
          return Response.json(playlist);
        } catch (error) {
          console.error('Error in POST /api/music/playlists:', error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
    },
  },
});
const Route$e = createFileRoute('/api/music/favorites')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase2
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();
          if (playlistError || !favoritesPlaylist) {
            return Response.json({ favoriteTrackIds: [], favorites: [] });
          }
          const { data: playlistTracks, error: tracksError } = await supabase2
            .from('playlist_tracks')
            .select(
              `
            track_id,
            created_at,
            tracks (
              id,
              title,
              artist,
              duration,
              youtube_video_id,
              artwork,
              genres,
              styles,
              discogs_release_id,
              position
            )
          `,
            )
            .eq('playlist_id', favoritesPlaylist.id)
            .order('created_at', { ascending: false });
          if (tracksError) {
            console.error('Error fetching favorite tracks:', tracksError);
            return Response.json(
              { error: 'Failed to fetch favorites' },
              { status: 500 },
            );
          }
          const favoriteTrackIds =
            playlistTracks?.map((pt) => pt.track_id) || [];
          return Response.json({
            favoriteTrackIds,
            favorites: playlistTracks || [],
          });
        } catch (error) {
          console.error('Error in GET favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { trackId } = await request.json();
          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase2
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();
          if (playlistError || !favoritesPlaylist) {
            return Response.json(
              { error: 'Favorites playlist not found' },
              { status: 404 },
            );
          }
          const { data: lastTrack, error: positionError } = await supabase2
            .from('playlist_tracks')
            .select('position')
            .eq('playlist_id', favoritesPlaylist.id)
            .order('position', { ascending: false })
            .limit(1)
            .single();
          const nextPosition = (lastTrack?.position || 0) + 1;
          const { data, error } = await supabase2
            .from('playlist_tracks')
            .insert({
              playlist_id: favoritesPlaylist.id,
              track_id: trackId,
              position: nextPosition,
            })
            .select()
            .single();
          if (error) {
            if (error.code === '23505') {
              return Response.json(
                { message: 'Track already in favorites' },
                { status: 200 },
              );
            }
            console.error('Error adding favorite:', error);
            return Response.json(
              { error: 'Failed to add favorite' },
              { status: 500 },
            );
          }
          return Response.json({ data, message: 'Added to favorites' });
        } catch (error) {
          console.error('Error in POST favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
      DELETE: async ({ request }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { trackId } = await request.json();
          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase2
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();
          if (playlistError || !favoritesPlaylist) {
            return Response.json(
              { error: 'Favorites playlist not found' },
              { status: 404 },
            );
          }
          const { error } = await supabase2
            .from('playlist_tracks')
            .delete()
            .eq('playlist_id', favoritesPlaylist.id)
            .eq('track_id', trackId);
          if (error) {
            console.error('Error removing favorite:', error);
            return Response.json(
              { error: 'Failed to remove favorite' },
              { status: 500 },
            );
          }
          return Response.json({ message: 'Removed from favorites' });
        } catch (error) {
          console.error('Error in DELETE favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const Route$d = createFileRoute('/api/auth/user')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const userDataCookie = cookies['user_data'];
          if (!userDataCookie) {
            return Response.json({ user: null });
          }
          const user = JSON.parse(userDataCookie);
          return Response.json({ user });
        } catch (error) {
          console.error('Error getting current user:', error);
          return Response.json({ user: null });
        }
      },
    },
  },
});
const Route$c = createFileRoute('/api/auth/set-redirect')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { redirectUrl } = await request.json();
          const headers = new Headers();
          headers.append(
            'Set-Cookie',
            serialize('auth_redirect', redirectUrl, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 300,
              // 5 minutes
            }),
          );
          return new Response('OK', { headers });
        } catch (error) {
          return new Response('Error', { status: 500 });
        }
      },
    },
  },
});
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const model = anthropic('claude-3-5-sonnet-20241022');
const SYSTEM_PROMPT = `You are a world-class DJ assistant with deep knowledge of electronic music, mixing techniques, and track selection. You help DJs find perfect tracks for their sets, provide mixing advice, and analyze music collections.

## Your Expertise:
- Electronic music genres (house, techno, trance, drum & bass, etc.)
- BPM matching and harmonic mixing
- Track transitions and energy flow
- Reading the crowd and set building
- Equipment and software recommendations

## When suggesting tracks, use this EXACT format:
"[Track Title]" - [Artist Name] ([BPM] BPM)

Examples:
"Deep Burnt" - Pépé Bradock (127 BPM)
"Strings of Life" - Derrick May (125 BPM)

## Your personality:
- Enthusiastic about music and DJing
- Knowledgeable but approachable
- Give practical, actionable advice
- Consider the user's collection and preferences
- Ask clarifying questions when needed

## Response Guidelines:
- Always suggest tracks that exist in the user's collection
- Explain WHY tracks work well together
- Consider energy levels, key compatibility, and genre flow
- Provide mixing tips when relevant
- Be concise but informative`;
const Route$b = createFileRoute('/api/ai/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, tracks } = await request.json();
          if (!messages || !Array.isArray(messages)) {
            throw new Error('Invalid or missing messages array');
          }
          const formattedTracks =
            tracks?.map((track) => ({
              title: track.title,
              artist: track.artist,
              bpm: track.bpm,
              genre: track.genre,
            })) || [];
          const tracksContext =
            formattedTracks.length > 0
              ? `Available Tracks: ${JSON.stringify(formattedTracks)}`
              : 'No tracks available in the collection.';
          const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'system', content: tracksContext },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ];
          const result = await streamText({
            model,
            messages: fullMessages,
            temperature: 0.7,
            maxTokens: 1e3,
          });
          return result.toDataStreamResponse();
        } catch (error) {
          console.error('Chat API error:', error);
          return new Response(
            JSON.stringify({
              error: error?.message || 'An error occurred',
              details: error?.stack,
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }
      },
    },
  },
});
const Route$a = createFileRoute('/api/music/tracks/$discogsReleaseId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];
          if (!accessToken || !accessTokenSecret) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }
          const supabase2 = await createClient({ request });
          const { getReleaseTracks } = CollectionUtils(supabase2);
          const tracks = await getReleaseTracks(params.discogsReleaseId);
          return Response.json(tracks, { status: 200 });
        } catch (error) {
          console.error('Could not fetch release', error);
          return Response.json(
            { error: 'Could not fetch release' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const Route$9 = createFileRoute('/api/music/playlists/$playlistId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlist, error } = await supabase2
            .from('playlists')
            .select(
              `
            *,
            playlist_tracks (
              *,
              track: tracks (*)
            )
          `,
            )
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .single();
          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }
          return Response.json(playlist);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      PUT: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { title, description } = await request.json();
          if (!title) {
            return Response.json(
              { error: 'Title is required' },
              { status: 400 },
            );
          }
          const { data: playlist, error } = await supabase2
            .from('playlists')
            .update({ title, description })
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .select()
            .single();
          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }
          return Response.json(playlist);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      PATCH: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { is_public } = await request.json();
          const { data: playlist, error } = await supabase2
            .from('playlists')
            .update({ is_public })
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .select()
            .single();
          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }
          return Response.json(playlist);
        } catch (error) {
          console.error('Error updating playlist:', error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      DELETE: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const {
            data: { session },
          } = await supabase2.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlist, error: playlistError } = await supabase2
            .from('playlists')
            .select()
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .single();
          if (playlistError || !playlist) {
            return Response.json(
              { error: 'Playlist not found or unauthorized' },
              { status: 404 },
            );
          }
          const { error } = await supabase2
            .from('playlists')
            .delete()
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id);
          if (error) throw error;
          return Response.json({ success: true });
        } catch (error) {
          console.error('Error deleting playlist:', error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
    },
  },
});
const YOUTUBE_API_KEY$1 = process.env.YOUTUBE_API_KEY;
const Route$8 = createFileRoute('/api/external/youtube/search')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');
        if (!query) {
          return Response.json({ error: 'Missing query' }, { status: 400 });
        }
        if (!YOUTUBE_API_KEY$1) {
          return Response.json(
            { error: 'YouTube API key not configured' },
            { status: 500 },
          );
        }
        try {
          const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY$1}`;
          const response = await fetch(youtubeUrl);
          const data = await response.json();
          if (!data.items?.length) {
            return Response.json({ error: 'No results' }, { status: 404 });
          }
          return Response.json({
            videoId: data.items[0].id.videoId,
            title: data.items[0].snippet.title,
          });
        } catch (error) {
          console.error('YouTube API error:', error);
          return Response.json({ error: 'API error' }, { status: 500 });
        }
      },
    },
  },
});
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const Route$7 = createFileRoute('/api/external/youtube/$videoId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const videoId = params.videoId;
          const videoResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=contentDetails,snippet`,
          );
          const videoData = await videoResponse.json();
          if (!videoData.items?.length) {
            return Response.json({ error: 'Video not found' }, { status: 404 });
          }
          const response = {
            audioUrl: `https://www.youtube.com/embed/${videoId}?enablejsapi=1`,
            title: videoData.items[0].snippet.title,
            duration: videoData.items[0].contentDetails.duration,
          };
          return Response.json(response);
        } catch (error) {
          console.error('YouTube API error:', error);
          return Response.json(
            { error: 'Failed to get video data' },
            { status: 500 },
          );
        }
      },
    },
  },
});
function buildSearchParams(originalQuery) {
  const terms = originalQuery.trim().split(/\s+/);
  if (originalQuery.includes('-')) {
    const [artist, title] = originalQuery.split('-').map((s) => s.trim());
    return {
      artist,
      releaseTitle: title,
      type: 'release',
    };
  }
  if (terms.length > 1) {
    return {
      query: originalQuery,
      type: 'release',
      format: 'Vinyl',
    };
  }
  return {
    query: originalQuery,
    type: 'release',
  };
}
const Route$6 = createFileRoute('/api/external/discogs/search')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { query: originalQuery } = await request.json();
          if (!originalQuery?.trim()) {
            return Response.json(
              { error: 'Search query is required' },
              { status: 400 },
            );
          }
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];
          if (!accessToken || !accessTokenSecret) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }
          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: 'VzgMPIFOlJDZhpWoZMUX',
            DiscogsConsumerSecret: 'kEPnGjnAGawTRqgnTLMkdCujUIlAHNFm',
            userAgent: 'CrateApp/1.0 +https://crate.ai',
          });
          const tokenManager = sdk.auth.base.getTokenManager();
          await tokenManager.setAccessToken(accessToken);
          await tokenManager.setAccessTokenSecret(accessTokenSecret);
          const searchParams = buildSearchParams(originalQuery);
          const response = await sdk.search.getSearchResults(searchParams);
          const normalizedQuery = originalQuery.toLowerCase().trim();
          const terms = normalizedQuery.split(/\s+/);
          const sortedResults = [...response.results].sort((a, b) => {
            const titleA = (a.title || '').toLowerCase();
            const titleB = (b.title || '').toLowerCase();
            const aMatchesAll = terms.every((term) =>
              titleA.includes(term.toLowerCase()),
            );
            const bMatchesAll = terms.every((term) =>
              titleB.includes(term.toLowerCase()),
            );
            if (aMatchesAll && !bMatchesAll) return -1;
            if (!aMatchesAll && bMatchesAll) return 1;
            const aMatchCount = terms.filter((term) =>
              titleA.includes(term.toLowerCase()),
            ).length;
            const bMatchCount = terms.filter((term) =>
              titleB.includes(term.toLowerCase()),
            ).length;
            if (aMatchCount !== bMatchCount) {
              return bMatchCount - aMatchCount;
            }
            const aStartsWithTerm = terms.some((term) =>
              titleA.startsWith(term.toLowerCase()),
            );
            const bStartsWithTerm = terms.some((term) =>
              titleB.startsWith(term.toLowerCase()),
            );
            if (aStartsWithTerm && !bStartsWithTerm) return -1;
            if (!aStartsWithTerm && bStartsWithTerm) return 1;
            return 0;
          });
          return Response.json({
            results: sortedResults,
            pagination: response.pagination,
          });
        } catch (error) {
          console.error('Discogs search error:', error);
          return Response.json(
            { error: 'Failed to search Discogs' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const Route$5 = createFileRoute('/api/external/discogs/collection')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];
          const userData = cookies['user_data'];
          const supabase2 = await createClient({ request });
          const { ingestCollection, getCollection } =
            CollectionUtils(supabase2);
          if (!accessToken || !accessTokenSecret || !userData) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }
          const userDataJson = JSON.parse(decodeURIComponent(userData));
          const username = userDataJson?.username;
          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: 'VzgMPIFOlJDZhpWoZMUX',
            DiscogsConsumerSecret: 'kEPnGjnAGawTRqgnTLMkdCujUIlAHNFm',
            userAgent: 'CrateApp/1.0 +https://crate.ai',
          });
          const tokenManager = sdk.auth.base.getTokenManager();
          await tokenManager.setAccessToken(accessToken);
          await tokenManager.setAccessTokenSecret(accessTokenSecret);
          const existingCollection = await getCollection();
          if (existingCollection && existingCollection.length > 0) {
            const collectionResponse = {
              pagination: {
                page: 1,
                pages: 1,
                per_page: existingCollection.length,
                items: existingCollection.length,
                urls: {
                  next: '',
                  last: '',
                },
              },
              releases: existingCollection.map((row) => row.basic_release_data),
            };
            return Response.json(collectionResponse);
          }
          const collection = await sdk.collection.getCollection({
            username,
            page: 1,
            perPage: 100,
          });
          await ingestCollection(collection);
          return Response.json(collection);
        } catch (error) {
          console.error('Error fetching collection:', error);
          return Response.json(
            { error: 'Failed to fetch collection' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const Route$4 = createFileRoute('/api/auth/discogs/request-token')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const baseUrl = 'http://localhost:3000';
          if (!baseUrl);
          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: 'VzgMPIFOlJDZhpWoZMUX',
            DiscogsConsumerSecret: 'kEPnGjnAGawTRqgnTLMkdCujUIlAHNFm',
            callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
            userAgent: 'CrateApp/1.0 +https://crate.ai',
            debug: false,
          });
          const requestTokenResponse = await sdk.auth
            .getRequestToken()
            .catch(async (error) => {
              const responseText = error.response?.text
                ? await error.response.text()
                : '';
              if (responseText.includes('Authentication Required')) {
                throw new Error(
                  'Vercel authentication is blocking the request.',
                );
              }
              throw error;
            });
          if (
            !requestTokenResponse?.requestTokens?.token ||
            !requestTokenResponse?.requestTokens?.secret
          ) {
            throw new Error('Invalid response from Discogs');
          }
          const { token, secret } = requestTokenResponse.requestTokens;
          const headers = new Headers();
          headers.append(
            'Set-Cookie',
            serialize('request_token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );
          headers.append(
            'Set-Cookie',
            serialize('request_token_secret', secret, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );
          return Response.json(
            {
              authUrl: requestTokenResponse.verificationURL,
              requestToken: token,
              requestTokenSecret: secret,
            },
            { headers },
          );
        } catch (error) {
          console.error('Error in request token route:', error);
          return Response.json(
            {
              error: error.message || 'Error getting authorization URL',
              details:
                process.env.NODE_ENV === 'development' ? error.stack : void 0,
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
const Route$3 = createFileRoute('/api/auth/discogs/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const { searchParams } = url;
          const oauthVerifier = searchParams.get('oauth_verifier');
          const oauthToken = searchParams.get('oauth_token');
          const cookies = parse(request.headers.get('cookie') || '');
          const requestToken = cookies['request_token'];
          const requestTokenSecret = cookies['request_token_secret'];
          const authRedirect = cookies['auth_redirect'];
          const baseUrl = 'http://localhost:3000';
          if (!baseUrl);
          if (
            !oauthToken ||
            !oauthVerifier ||
            !requestToken ||
            !requestTokenSecret
          ) {
            return Response.redirect(new URL('/?error=missing_oauth', baseUrl));
          }
          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: 'VzgMPIFOlJDZhpWoZMUX',
            DiscogsConsumerSecret: 'kEPnGjnAGawTRqgnTLMkdCujUIlAHNFm',
            callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
            userAgent: 'CrateApp/1.0 +https://crate.ai',
          });
          const tokenManager = sdk.auth.base.getTokenManager();
          await tokenManager.setRequestToken(requestToken);
          await tokenManager.setRequestTokenSecret(requestTokenSecret);
          const tokens = await sdk.auth.handleCallback({
            oauthVerifier,
            oauthToken,
          });
          if (!tokens?.token || !tokens?.secret) {
            throw new Error('Invalid response from Discogs callback');
          }
          const userIdentity = await sdk.auth.getUserIdentity();
          const userProfile = await fetch(userIdentity.resource_url).then(
            (res) => res.json(),
          );
          const headers = new Headers();
          const supabase2 = await createClient({ request, headers });
          const user = await sdk.user.getUser({
            username: userIdentity.username,
          });
          const password = `discogs_${userIdentity.id}`;
          headers.append(
            'Set-Cookie',
            serialize('request_token', '', { maxAge: -1, path: '/' }),
          );
          headers.append(
            'Set-Cookie',
            serialize('request_token_secret', '', { maxAge: -1, path: '/' }),
          );
          headers.append(
            'Set-Cookie',
            serialize('access_token', tokens.token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );
          headers.append(
            'Set-Cookie',
            serialize('access_token_secret', tokens.secret, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );
          let targetUrl = authRedirect || '/';
          const { data: signInData, error: signInError } =
            await supabase2.auth.signInWithPassword({
              email: user.email,
              password,
            });
          let userDataToSet = null;
          if (signInData?.user) {
            userDataToSet = {
              userId: signInData.user.id,
              username: userIdentity.username,
              avatarUrl: userProfile.avatar_url || '/default-avatar.png',
            };
            await supabase2.from('user_discogs_profile').upsert({
              user_id: signInData.user.id,
              username: userIdentity.username,
            });
          } else {
            const { data: signUpData, error: signUpError } =
              await supabase2.auth.signUp({
                email: user.email,
                password,
                options: {
                  data: {
                    discogs_username: userIdentity.username,
                    discogs_id: userIdentity.id,
                  },
                },
              });
            if (signUpError || !signUpData.user) {
              return Response.redirect(
                new URL('/?error=signup_failed', baseUrl),
              );
            }
            await supabase2.from('user_discogs_profile').upsert({
              user_id: signUpData.user.id,
              username: userIdentity.username,
            });
            userDataToSet = {
              userId: signUpData.user.id,
              username: userIdentity.username,
              avatarUrl: userProfile.avatar_url || '/default-avatar.png',
            };
          }
          if (userDataToSet) {
            headers.append(
              'Set-Cookie',
              serialize('user_data', JSON.stringify(userDataToSet), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
              }),
            );
          }
          if (authRedirect) {
            headers.append(
              'Set-Cookie',
              serialize('auth_redirect', '', { maxAge: -1, path: '/' }),
            );
          }
          const redirectUrl = new URL(targetUrl, baseUrl).toString();
          headers.set('Location', redirectUrl);
          return new Response(null, {
            status: 302,
            headers,
          });
        } catch (error) {
          console.error('Error during OAuth callback:', error);
          const baseUrl = 'http://localhost:3000';
          return Response.redirect(new URL('/?error=auth_failed', baseUrl));
        }
      },
    },
  },
});
const Route$2 = createFileRoute('/api/music/playlists/$playlistId/tracks')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          if (!userData?.userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlist, error: playlistError } = await supabase2
            .from('playlists')
            .select()
            .eq('id', params.playlistId)
            .eq('user_id', userData.userId)
            .single();
          if (playlistError || !playlist) {
            console.error('Error verifying playlist ownership:', playlistError);
            return Response.json(
              { error: 'Playlist not found or unauthorized' },
              { status: 404 },
            );
          }
          const { trackId } = await request.json();
          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }
          const { data: currentTracks, error: positionError } = await supabase2
            .from('playlist_tracks')
            .select('position')
            .eq('playlist_id', params.playlistId)
            .order('position', { ascending: false })
            .limit(1);
          if (positionError) {
            console.error('Error getting track positions:', positionError);
            throw positionError;
          }
          const nextPosition = currentTracks?.[0]?.position
            ? currentTracks[0].position + 1
            : 0;
          const { error: insertError } = await supabase2
            .from('playlist_tracks')
            .insert({
              playlist_id: params.playlistId,
              track_id: trackId,
              position: nextPosition,
            });
          if (insertError) {
            console.error('Error adding track to playlist:', insertError);
            throw insertError;
          }
          return Response.json({ success: true });
        } catch (error) {
          console.error(
            'Error in POST /api/music/playlists/$playlistId/tracks:',
            error,
          );
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      DELETE: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          if (!userData?.userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlist, error: playlistError } = await supabase2
            .from('playlists')
            .select()
            .eq('id', params.playlistId)
            .eq('user_id', userData.userId)
            .single();
          if (playlistError || !playlist) {
            console.error('Error verifying playlist ownership:', playlistError);
            return Response.json(
              { error: 'Playlist not found or unauthorized' },
              { status: 404 },
            );
          }
          const { trackId } = await request.json();
          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }
          const { error } = await supabase2
            .from('playlist_tracks')
            .delete()
            .eq('playlist_id', params.playlistId)
            .eq('track_id', trackId);
          if (error) throw error;
          return Response.json({ success: true });
        } catch (error) {
          console.error('Error removing track from playlist:', error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
    },
  },
});
const Route$1 = createFileRoute(
  '/api/music/playlists/$playlistId/external-tracks',
)({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const supabase2 = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          if (!userData?.userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }
          const { data: playlist, error: playlistError } = await supabase2
            .from('playlists')
            .select()
            .eq('id', params.playlistId)
            .eq('user_id', userData.userId)
            .single();
          if (playlistError || !playlist) {
            console.error('Error verifying playlist ownership:', playlistError);
            return Response.json(
              { error: 'Playlist not found or unauthorized' },
              { status: 404 },
            );
          }
          const { track } = await request.json();
          if (!track || !track.id) {
            return Response.json(
              { error: 'Track data is required' },
              { status: 400 },
            );
          }
          if (!isExternalTrack(track.id)) {
            return Response.json(
              {
                error:
                  'This endpoint is only for external tracks. Use the regular tracks endpoint for collection tracks.',
              },
              { status: 400 },
            );
          }
          const { data: existingTrack } = await supabase2
            .from('tracks')
            .select('id')
            .eq('id', track.id)
            .single();
          let trackId = track.id;
          if (!existingTrack) {
            const { data: newTrack, error: trackError } = await supabase2
              .from('tracks')
              .insert({
                id: track.id,
                title: track.title,
                artist: track.artist,
                discogs_release_id: track.discogs_release_id,
                duration: track.duration || '0:00',
                position: track.position || '1',
                artwork: track.artwork,
                youtube_video_id: track.youtube_video_id,
                extra_artists: track.extra_artists,
                genres: track.genres,
                styles: track.styles,
              })
              .select('id')
              .single();
            if (trackError) {
              console.error('Error creating external track:', trackError);
              return Response.json(
                { error: 'Failed to create external track' },
                { status: 500 },
              );
            }
            trackId = newTrack.id;
          }
          const { data: currentTracks, error: positionError } = await supabase2
            .from('playlist_tracks')
            .select('position')
            .eq('playlist_id', params.playlistId)
            .order('position', { ascending: false })
            .limit(1);
          if (positionError) {
            console.error('Error fetching current tracks:', positionError);
            return Response.json(
              { error: 'Failed to fetch current tracks' },
              { status: 500 },
            );
          }
          const nextPosition =
            currentTracks.length > 0 ? currentTracks[0].position + 1 : 1;
          const { error: insertError } = await supabase2
            .from('playlist_tracks')
            .insert({
              playlist_id: params.playlistId,
              track_id: trackId,
              position: nextPosition,
            });
          if (insertError) {
            console.error(
              'Error adding external track to playlist:',
              insertError,
            );
            return Response.json(
              { error: 'Failed to add external track to playlist' },
              { status: 500 },
            );
          }
          return Response.json({
            success: true,
            message: 'External track added to playlist successfully',
            trackId,
          });
        } catch (error) {
          console.error('Error in external-tracks route:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
    },
  },
});
function createRateLimiter(maxRequests = 60, timeWindow = 60) {
  const limits = /* @__PURE__ */ new Map();
  function check(identifier) {
    const now = Date.now();
    const info = limits.get(identifier);
    if (!info || now > info.resetTime) {
      limits.set(identifier, {
        count: 1,
        resetTime: now + timeWindow * 1e3,
      });
      return {
        isLimited: false,
        remaining: maxRequests - 1,
        reset: Math.floor((now + timeWindow * 1e3) / 1e3),
      };
    }
    if (info.count >= maxRequests) {
      return {
        isLimited: true,
        remaining: 0,
        reset: Math.floor(info.resetTime / 1e3),
      };
    }
    info.count += 1;
    limits.set(identifier, info);
    return {
      isLimited: false,
      remaining: maxRequests - info.count,
      reset: Math.floor(info.resetTime / 1e3),
    };
  }
  function cleanup() {
    const now = Date.now();
    Array.from(limits.entries()).forEach(([identifier, info]) => {
      if (now > info.resetTime) {
        limits.delete(identifier);
      }
    });
  }
  setInterval(cleanup, 6e4);
  return { check };
}
const rateLimiter = createRateLimiter();
new DiscogsSDK({
  DiscogsConsumerKey: 'VzgMPIFOlJDZhpWoZMUX',
  DiscogsConsumerSecret: 'kEPnGjnAGawTRqgnTLMkdCujUIlAHNFm',
});
const getDiscogsRelease = async (
  accessToken,
  accessTokenSecret,
  ip,
  releaseId,
) => {
  const identifier = `discogs:${accessToken ? accessToken : ip}`;
  const { isLimited, remaining, reset } = rateLimiter.check(identifier);
  if (isLimited) {
    return { isLimited, remaining, reset };
  }
  const discogsUrl = `https://api.discogs.com/releases/${releaseId}`;
  const response = await fetch(discogsUrl, {
    headers: {
      Authorization: `OAuth oauth_token=${accessToken}, oauth_token_secret=${accessTokenSecret}`,
      'User-Agent': 'CrateApp/1.0 +https://crate.ai',
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }
  const release = await response.json();
  return { release, remaining, reset, isLimited };
};
const Route = createFileRoute('/api/external/discogs/release/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const cookiesList = parse(request.headers.get('cookie') || '');
          const ip = request.headers.get('x-forwarded-for') || 'unknown';
          const accessToken = cookiesList['access_token'];
          const accessTokenSecret = cookiesList['access_token_secret'];
          if (!accessToken || !accessTokenSecret) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }
          const { release, remaining, reset, isLimited } =
            await getDiscogsRelease(
              accessToken,
              accessTokenSecret,
              ip,
              params.id,
            );
          if (isLimited) {
            return Response.json(
              { error: 'Rate limit exceeded' },
              {
                status: 429,
                headers: {
                  'X-RateLimit-Limit': '60',
                  'X-RateLimit-Remaining': '0',
                  'X-RateLimit-Reset': reset.toString(),
                },
              },
            );
          }
          return Response.json(release, {
            headers: {
              'X-RateLimit-Limit': '60',
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          });
        } catch (error) {
          console.error('Discogs release fetch error:', error);
          return Response.json(
            { error: 'Failed to fetch release details' },
            { status: 500 },
          );
        }
      },
    },
  },
});
const WaitlistRoute = Route$p.update({
  id: '/waitlist',
  path: '/waitlist',
  getParentRoute: () => Route$q,
});
const AnalyzeRoute = Route$o.update({
  id: '/analyze',
  path: '/analyze',
  getParentRoute: () => Route$q,
});
const IndexRoute = Route$n.update({
  id: '/',
  path: '/',
  getParentRoute: () => Route$q,
});
const UsernameIndexRoute = Route$m.update({
  id: '/$username/',
  path: '/$username/',
  getParentRoute: () => Route$q,
});
const ApiWaitlistRoute = Route$l.update({
  id: '/api/waitlist',
  path: '/api/waitlist',
  getParentRoute: () => Route$q,
});
const AnalyzeChatRoute = Route$k.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => AnalyzeRoute,
});
const UsernameTracksRoute = Route$j.update({
  id: '/$username/tracks',
  path: '/$username/tracks',
  getParentRoute: () => Route$q,
});
const UsernamePlaylistsRoute = Route$i.update({
  id: '/$username/playlists',
  path: '/$username/playlists',
  getParentRoute: () => Route$q,
});
const UsernameCollectionRoute = Route$h.update({
  id: '/$username/collection',
  path: '/$username/collection',
  getParentRoute: () => Route$q,
});
const ApiMusicTracksRoute = Route$g.update({
  id: '/api/music/tracks',
  path: '/api/music/tracks',
  getParentRoute: () => Route$q,
});
const ApiMusicPlaylistsRoute = Route$f.update({
  id: '/api/music/playlists',
  path: '/api/music/playlists',
  getParentRoute: () => Route$q,
});
const ApiMusicFavoritesRoute = Route$e.update({
  id: '/api/music/favorites',
  path: '/api/music/favorites',
  getParentRoute: () => Route$q,
});
const ApiAuthUserRoute = Route$d.update({
  id: '/api/auth/user',
  path: '/api/auth/user',
  getParentRoute: () => Route$q,
});
const ApiAuthSetRedirectRoute = Route$c.update({
  id: '/api/auth/set-redirect',
  path: '/api/auth/set-redirect',
  getParentRoute: () => Route$q,
});
const ApiAiChatRoute = Route$b.update({
  id: '/api/ai/chat',
  path: '/api/ai/chat',
  getParentRoute: () => Route$q,
});
const ApiMusicTracksDiscogsReleaseIdRoute = Route$a.update({
  id: '/$discogsReleaseId',
  path: '/$discogsReleaseId',
  getParentRoute: () => ApiMusicTracksRoute,
});
const ApiMusicPlaylistsPlaylistIdRoute = Route$9.update({
  id: '/$playlistId',
  path: '/$playlistId',
  getParentRoute: () => ApiMusicPlaylistsRoute,
});
const ApiExternalYoutubeSearchRoute = Route$8.update({
  id: '/api/external/youtube/search',
  path: '/api/external/youtube/search',
  getParentRoute: () => Route$q,
});
const ApiExternalYoutubeVideoIdRoute = Route$7.update({
  id: '/api/external/youtube/$videoId',
  path: '/api/external/youtube/$videoId',
  getParentRoute: () => Route$q,
});
const ApiExternalDiscogsSearchRoute = Route$6.update({
  id: '/api/external/discogs/search',
  path: '/api/external/discogs/search',
  getParentRoute: () => Route$q,
});
const ApiExternalDiscogsCollectionRoute = Route$5.update({
  id: '/api/external/discogs/collection',
  path: '/api/external/discogs/collection',
  getParentRoute: () => Route$q,
});
const ApiAuthDiscogsRequestTokenRoute = Route$4.update({
  id: '/api/auth/discogs/request-token',
  path: '/api/auth/discogs/request-token',
  getParentRoute: () => Route$q,
});
const ApiAuthDiscogsCallbackRoute = Route$3.update({
  id: '/api/auth/discogs/callback',
  path: '/api/auth/discogs/callback',
  getParentRoute: () => Route$q,
});
const ApiMusicPlaylistsPlaylistIdTracksRoute = Route$2.update({
  id: '/tracks',
  path: '/tracks',
  getParentRoute: () => ApiMusicPlaylistsPlaylistIdRoute,
});
const ApiMusicPlaylistsPlaylistIdExternalTracksRoute = Route$1.update({
  id: '/external-tracks',
  path: '/external-tracks',
  getParentRoute: () => ApiMusicPlaylistsPlaylistIdRoute,
});
const ApiExternalDiscogsReleaseIdRoute = Route.update({
  id: '/api/external/discogs/release/$id',
  path: '/api/external/discogs/release/$id',
  getParentRoute: () => Route$q,
});
const AnalyzeRouteChildren = {
  AnalyzeChatRoute,
};
const AnalyzeRouteWithChildren =
  AnalyzeRoute._addFileChildren(AnalyzeRouteChildren);
const ApiMusicPlaylistsPlaylistIdRouteChildren = {
  ApiMusicPlaylistsPlaylistIdExternalTracksRoute,
  ApiMusicPlaylistsPlaylistIdTracksRoute,
};
const ApiMusicPlaylistsPlaylistIdRouteWithChildren =
  ApiMusicPlaylistsPlaylistIdRoute._addFileChildren(
    ApiMusicPlaylistsPlaylistIdRouteChildren,
  );
const ApiMusicPlaylistsRouteChildren = {
  ApiMusicPlaylistsPlaylistIdRoute:
    ApiMusicPlaylistsPlaylistIdRouteWithChildren,
};
const ApiMusicPlaylistsRouteWithChildren =
  ApiMusicPlaylistsRoute._addFileChildren(ApiMusicPlaylistsRouteChildren);
const ApiMusicTracksRouteChildren = {
  ApiMusicTracksDiscogsReleaseIdRoute,
};
const ApiMusicTracksRouteWithChildren = ApiMusicTracksRoute._addFileChildren(
  ApiMusicTracksRouteChildren,
);
const rootRouteChildren = {
  IndexRoute,
  AnalyzeRoute: AnalyzeRouteWithChildren,
  WaitlistRoute,
  UsernameCollectionRoute,
  UsernamePlaylistsRoute,
  UsernameTracksRoute,
  ApiWaitlistRoute,
  UsernameIndexRoute,
  ApiAiChatRoute,
  ApiAuthSetRedirectRoute,
  ApiAuthUserRoute,
  ApiMusicFavoritesRoute,
  ApiMusicPlaylistsRoute: ApiMusicPlaylistsRouteWithChildren,
  ApiMusicTracksRoute: ApiMusicTracksRouteWithChildren,
  ApiAuthDiscogsCallbackRoute,
  ApiAuthDiscogsRequestTokenRoute,
  ApiExternalDiscogsCollectionRoute,
  ApiExternalDiscogsSearchRoute,
  ApiExternalYoutubeVideoIdRoute,
  ApiExternalYoutubeSearchRoute,
  ApiExternalDiscogsReleaseIdRoute,
};
const routeTree = Route$q._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
  });
  return router2;
}
const router$1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      getRouter,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  Avatar as A,
  Button as B,
  Card as C,
  DropdownMenu as D,
  ErrorBoundary as E,
  LoadingSpinner as L,
  Route$m as R,
  useTracksStore as a,
  usePlaylistStore as b,
  cn as c,
  CardContent as d,
  usePlayerStore as e,
  useFavoritesStore as f,
  CardHeader as g,
  CardTitle as h,
  AvatarImage as i,
  AvatarFallback as j,
  DropdownMenuTrigger as k,
  DropdownMenuContent as l,
  DropdownMenuItem as m,
  convertSearchResultToTrack as n,
  createTemporaryTrackForPlayback as o,
  router$1 as r,
  useAuthStore as u,
};
