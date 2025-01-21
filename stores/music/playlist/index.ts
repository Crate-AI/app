import { create } from 'zustand';
import { CrateTrack } from '@/types';
import { PlaylistWithTracks } from '@/types/ui/playlist';
import { supabase } from '@/lib/supabase/client';
import { InsertPlaylist, InsertPlaylistTrack, Playlist, PlaylistTrack } from '@/types/database/playlist';
import { toast } from 'sonner';

interface PlaylistStore {
  playlists: PlaylistWithTracks[];
  isLoading: boolean;
  error: string | null;
  
  fetchPlaylists: () => Promise<void>;
  createPlaylist: (title: string, description?: string) => Promise<string>;
  addTrackToPlaylist: (playlistId: string, track: CrateTrack) => Promise<void>;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  updateTrackOrder: (playlistId: string, trackId: string, newPosition: number) => Promise<void>;
  clearError: () => void;
}

export const usePlaylistStore = create<PlaylistStore>((set, get) => {
  return {
    playlists: [],
    isLoading: false,
    error: null,
    
    fetchPlaylists: async () => {
      set({ isLoading: true, error: null });
      try {
        const { data: playlists, error } = await supabase
          .from('playlists')
          .select(`
            *,
            playlist_tracks (
              *,
              track: tracks (*)
            )
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Transform the data to match PlaylistWithTracks
        const transformedPlaylists: PlaylistWithTracks[] = (playlists ?? []).map((playlist) => ({
          ...playlist,
          tracks: (playlist.playlist_tracks ?? [])
            .filter(pt => pt.track !== null)
            .sort((a, b) => a.position - b.position)
            .map(pt => pt.track as CrateTrack)
        }));
        
        set({ playlists: transformedPlaylists });
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to fetch playlists');
      } finally {
        set({ isLoading: false });
      }
    },
    
    createPlaylist: async (title: string, description?: string) => {
      set({ isLoading: true, error: null });
      try {
        const session = await supabase.auth.getSession();
        console.log('session', session);
        const user = session.data.session?.user;
        console.log('user', user);
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        const newPlaylist: InsertPlaylist = {
          title,
          description,
          user_id: user.id
        };
        
        const { data: playlist, error } = await supabase
          .from('playlists')
          .insert(newPlaylist)
          .select()
          .single();
          
        if (error) throw error;
        
        set(state => ({
          playlists: [...state.playlists, { ...playlist, tracks: [] }]
        }));
        
        toast.success('Playlist created');
        return playlist.id;
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to create playlist');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    
    addTrackToPlaylist: async (playlistId: string, track: CrateTrack) => {
      set({ isLoading: true, error: null });
      try {
        // Get the current highest position
        const { data: currentTracks } = await supabase
          .from('playlist_tracks')
          .select('position')
          .eq('playlist_id', playlistId)
          .order('position', { ascending: false })
          .limit(1);
          
        const newPosition = (currentTracks?.[0]?.position ?? -1) + 1;
        
        const newTrack: InsertPlaylistTrack = {
          playlist_id: playlistId,
          track_id: track.id,
          position: newPosition
        };
        
        const { error } = await supabase
          .from('playlist_tracks')
          .insert(newTrack);
          
        if (error) throw error;
        
        // Update local state
        set(state => ({
          playlists: state.playlists.map(playlist =>
            playlist.id === playlistId
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist
          )
        }));
        
        toast.success('Track added to playlist');
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to add track to playlist');
      } finally {
        set({ isLoading: false });
      }
    },
    
    removeTrackFromPlaylist: async (playlistId: string, trackId: string) => {
      set({ isLoading: true, error: null });
      try {
        const { error } = await supabase
          .from('playlist_tracks')
          .delete()
          .eq('playlist_id', playlistId)
          .eq('track_id', trackId);
          
        if (error) throw error;
        
        // Update local state
        set(state => ({
          playlists: state.playlists.map(playlist =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: playlist.tracks.filter(track => track.id !== trackId)
                }
              : playlist
          )
        }));
        
        toast.success('Track removed from playlist');
      } catch (error) {
        set({ error: (error as Error).message });
        toast.error('Failed to remove track from playlist');
      } finally {
        set({ isLoading: false });
      }
    },
    
    updateTrackOrder: async (playlistId: string, trackId: string, newPosition: number) => {
      set({ isLoading: true, error: null });
      try {
        const { error } = await supabase
          .from('playlist_tracks')
          .update({ position: newPosition })
          .eq('playlist_id', playlistId)
          .eq('track_id', trackId);
          
        if (error) throw error;
        
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
    
    clearError: () => set({ error: null })
  };
}); 