import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CrateTrack } from '@/types';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/auth';

interface FavoritesStore {
  favoriteTrackIds: Set<string>;
  isLoading: boolean;
  addToFavorites: (trackId: string) => Promise<void>;
  removeFromFavorites: (trackId: string) => Promise<void>;
  toggleFavorite: (trackId: string) => Promise<void>;
  isFavorite: (trackId: string) => boolean;
  getFavoriteTracksFromAllTracks: (allTracks: CrateTrack[]) => CrateTrack[];
  clearFavorites: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  syncWithDatabase: (userId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteTrackIds: new Set<string>(),
      isLoading: false,

      addToFavorites: async (trackId: string) => {
        set({ isLoading: true });
        try {
          // Get current user from auth store (Discogs auth)
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          
          if (userIdentity?.username) {
            // For now, use username as userId until proper Supabase user linking is set up
            const userId = userIdentity.username;
            
            // Add to database
            const response = await fetch('/api/music/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, trackId }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.log('Database save failed, continuing with local storage:', errorData);
              // Continue with local storage even if database fails
            }
          }

          // Update local state (always do this, even if database fails)
          set((state) => ({
            favoriteTrackIds: new Set(state.favoriteTrackIds).add(trackId),
            isLoading: false,
          }));
        } catch (error) {
          console.error('Error adding favorite:', error);
          // Still update local state on error
          set((state) => ({
            favoriteTrackIds: new Set(state.favoriteTrackIds).add(trackId),
            isLoading: false,
          }));
        }
      },

      removeFromFavorites: async (trackId: string) => {
        set({ isLoading: true });
        try {
          // Get current user from auth store (Discogs auth)
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          
          if (userIdentity?.username) {
            // For now, use username as userId until proper Supabase user linking is set up
            const userId = userIdentity.username;
            
            // Remove from database
            const response = await fetch('/api/music/favorites', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, trackId }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.log('Database remove failed, continuing with local storage:', errorData);
              // Continue with local storage even if database fails
            }
          }

          // Update local state (always do this, even if database fails)
          set((state) => {
            const newFavorites = new Set(state.favoriteTrackIds);
            newFavorites.delete(trackId);
            return { favoriteTrackIds: newFavorites, isLoading: false };
          });
        } catch (error) {
          console.error('Error removing favorite:', error);
          // Still update local state on error
          set((state) => {
            const newFavorites = new Set(state.favoriteTrackIds);
            newFavorites.delete(trackId);
            return { favoriteTrackIds: newFavorites, isLoading: false };
          });
        }
      },

      toggleFavorite: async (trackId: string) => {
        const { favoriteTrackIds } = get();
        if (favoriteTrackIds.has(trackId)) {
          await get().removeFromFavorites(trackId);
        } else {
          await get().addToFavorites(trackId);
        }
      },

      isFavorite: (trackId: string) => {
        const { favoriteTrackIds } = get();
        return favoriteTrackIds.has(trackId);
      },

      getFavoriteTracksFromAllTracks: (allTracks: CrateTrack[]) => {
        const { favoriteTrackIds } = get();
        return allTracks.filter((track) => favoriteTrackIds.has(track.id));
      },

      clearFavorites: async () => {
        set({ isLoading: true });
        try {
          // Get current user from auth store (Discogs auth)
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          
          if (userIdentity?.username) {
            // For now, use username as userId until proper Supabase user linking is set up
            const userId = userIdentity.username;
            
            // Clear all favorites from database
            const { favoriteTrackIds } = get();
            const promises = Array.from(favoriteTrackIds).map(trackId =>
              fetch('/api/music/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, trackId }),
              })
            );
            
            try {
              await Promise.all(promises);
            } catch (error) {
              console.log('Database clear failed, continuing with local storage:', error);
            }
          }

          // Clear local state (always do this, even if database fails)
          set({ favoriteTrackIds: new Set<string>(), isLoading: false });
        } catch (error) {
          console.error('Error clearing favorites:', error);
          // Still clear local state on error
          set({ favoriteTrackIds: new Set<string>(), isLoading: false });
        }
      },

      loadFavorites: async () => {
        set({ isLoading: true });
        try {
          // Get current user from auth store (Discogs auth)
          const authState = useAuthStore.getState();
          const userIdentity = authState.userIdentity;
          
          if (userIdentity?.username) {
            // For now, use username as userId until proper Supabase user linking is set up
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

      syncWithDatabase: async (userId: string) => {
        try {
          const response = await fetch(`/api/music/favorites?userId=${userId}`);
          
          if (!response.ok) {
            console.log('Failed to fetch favorites from database, using local storage');
            set({ isLoading: false });
            return;
          }

          const { favoriteTrackIds } = await response.json();
          
          set({ 
            favoriteTrackIds: new Set(favoriteTrackIds || []), 
            isLoading: false 
          });
        } catch (error) {
          console.error('Error syncing with database, using local storage:', error);
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
