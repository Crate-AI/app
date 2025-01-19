import { create } from 'zustand';
import { CrateTrack } from '@/types';
import { Playlist } from '@/types';

interface PlaylistStore {
  playlists: Playlist[];
  createPlaylist: (title: string, tracks?: CrateTrack[]) => Playlist;
  addTrackToPlaylist: (playlistId: number, track: CrateTrack) => void;
  removeTrackFromPlaylist: (playlistId: number, trackId: string) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  createPlaylist: (title: string, tracks: CrateTrack[] = []) => {
    const newPlaylist = {
      id: Date.now(),
      title,
      tracks,
      // TODO: get cover image from tracks
      coverImage: tracks[0]?.artwork || undefined,
    };
    set((state) => ({
      playlists: [...state.playlists, newPlaylist],
    }));
    return newPlaylist;
  },
  addTrackToPlaylist: (playlistId: number, track: CrateTrack) => {
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      ),
    }));
  },
  removeTrackFromPlaylist: (playlistId: number, trackId: string) => {
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: playlist.tracks.filter((track) => track.id !== trackId),
            }
          : playlist
      ),
    }));
  },
})); 