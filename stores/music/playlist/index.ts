import { create } from 'zustand';
import { CrateTrack, PlaylistWithTracks } from '@/types';
import { toast } from 'sonner';
import { isExternalTrack } from '@/lib/utils/track-conversion';

interface PlaylistStore {
  playlists: PlaylistWithTracks[];
  isLoading: boolean;
  error: string | null;

  fetchPlaylists: () => Promise<void>;
  createPlaylist: (title: string, description?: string) => Promise<string>;
  addTrackToPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  addExternalTrackToPlaylist: (playlistId: string, track: CrateTrack) => Promise<void>;
  removeTrackFromPlaylist: (
    playlistId: string,
    trackId: string,
  ) => Promise<void>;
  updateTrackOrder: (
    playlistId: string,
    trackId: string,
    newPosition: number,
  ) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  togglePlaylistPublic: (playlistId: string, isPublic: boolean) => Promise<void>;
  clearError: () => void;
}

export const usePlaylistStore = create<PlaylistStore>((set, get) => {
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

        // Transform the data to match PlaylistWithTracks
        const transformedPlaylists = (playlists ?? []).map((playlist: any) => ({
          ...playlist,
          tracks: (playlist.playlist_tracks ?? [])
            .filter((pt: { track: CrateTrack | null }) => pt.track !== null)
            .sort(
              (a: { position: number }, b: { position: number }) =>
                a.position - b.position,
            )
            .map((pt: { track: CrateTrack }) => pt.track),
        }));

        set({ playlists: transformedPlaylists });
        // FIXME: remove `isLoading`, `error` slop
        return transformedPlaylists;
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to fetch playlists');
      } finally {
        set({ isLoading: false });
      }
    },

    createPlaylist: async (title: string, description?: string) => {
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

    addTrackToPlaylist: async (playlistId: string, trackId: string) => {
      try {
        // Check if this is an external track
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

    addExternalTrackToPlaylist: async (playlistId: string, track: CrateTrack) => {
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
          throw new Error(error.message || 'Failed to add external track to playlist');
        }

        // Update local state optimistically
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
        console.error('PlaylistStore: Error adding external track to playlist:', error);
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to add external track to playlist';
        toast.error(message);
        throw error;
      }
    },

    removeTrackFromPlaylist: async (playlistId: string, trackId: string) => {
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

        // Update local state by filtering out the removed track
        set((state) => ({
          playlists: state.playlists.map((playlist) => {
            if (playlist.id === playlistId) {
              const playlistWithTracks = playlist as unknown as {
                id: string;
                tracks: CrateTrack[];
              };
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
        set({ error: (error as Error).message });
        toast.error('Failed to remove track from playlist');
      } finally {
        set({ isLoading: false });
      }
    },

    updateTrackOrder: async (
      playlistId: string,
      trackId: string,
      newPosition: number,
    ) => {
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

        // Fetch updated playlist to ensure correct order
        await get().fetchPlaylists();

        toast.success('Track order updated');
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to update track order');
      } finally {
        set({ isLoading: false });
      }
    },

    deletePlaylist: async (playlistId: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`/api/music/playlists/${playlistId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete playlist');
        }

        // Update local state by removing the deleted playlist
        set((state) => ({
          playlists: state.playlists.filter(
            (playlist) => playlist.id !== playlistId,
          ),
        }));
      } catch (error) {
        set({ error: (error as Error).message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    togglePlaylistPublic: async (playlistId: string, isPublic: boolean) => {
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

        // Update local state
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, is_public: isPublic }
              : playlist
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
