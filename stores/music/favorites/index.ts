import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CrateTrack } from '@/types';

interface FavoritesStore {
  favoriteTrackIds: Set<string>;
  addToFavorites: (trackId: string) => void;
  removeFromFavorites: (trackId: string) => void;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  getFavoriteTracksFromAllTracks: (allTracks: CrateTrack[]) => CrateTrack[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteTrackIds: new Set<string>(),

      addToFavorites: (trackId: string) => {
        set((state) => ({
          favoriteTrackIds: new Set(state.favoriteTrackIds).add(trackId),
        }));
      },

      removeFromFavorites: (trackId: string) => {
        set((state) => {
          const newFavorites = new Set(state.favoriteTrackIds);
          newFavorites.delete(trackId);
          return { favoriteTrackIds: newFavorites };
        });
      },

      toggleFavorite: (trackId: string) => {
        const { favoriteTrackIds } = get();
        if (favoriteTrackIds.has(trackId)) {
          get().removeFromFavorites(trackId);
        } else {
          get().addToFavorites(trackId);
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

      clearFavorites: () => {
        set({ favoriteTrackIds: new Set<string>() });
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
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
