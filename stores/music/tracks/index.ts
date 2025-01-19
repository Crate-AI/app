import { create } from 'zustand'
import { CrateTrack } from '@/types';

export interface OrderingConfig {
  orderBy: 'bpm' | 'genre' | 'manual' | 'suggested'
  direction: 'asc' | 'desc'
}

interface Playlist {
  id: string
  name: string
  tracks: string[] // Track IDs
  createdAt: string
}

interface TracksStore {
  allTracks: CrateTrack[]
  suggestedTrackIds: Set<string>
  draggedTrackId: string | null
  orderingConfig: OrderingConfig
  playlists: Record<string, Playlist>
  activePlaylistId: string | null
  setAllTracks: (tracks: CrateTrack[]) => void
  setSuggestedTracks: (tracks: CrateTrack[]) => void
  reorderTracks: (oldIndex: number, newIndex: number) => void
  setDraggedTrackId: (trackId: string | null) => void
  setOrderingConfig: (config: Partial<OrderingConfig>) => void
  clearSuggestions: () => void
  createPlaylist: (name: string) => string
  addTrackToPlaylist: (trackId: string, playlistId: string) => void
  removeTrackFromPlaylist: (trackId: string, playlistId: string) => void
  setActivePlaylist: (playlistId: string | null) => void
  deletePlaylist: (playlistId: string) => void
}

export const useTracksStore = create<TracksStore>((set, get) => ({
  allTracks: [],
  suggestedTrackIds: new Set<string>(),
  draggedTrackId: null,
  orderingConfig: {
    orderBy: 'manual',
    direction: 'asc'
  },
  playlists: {
    main: {
      id: 'main',
      name: 'Main Bag',
      tracks: [],
      createdAt: new Date().toISOString()
    },
    favorites: {
      id: 'favorites',
      name: 'Favorites',
      tracks: [],
      createdAt: new Date().toISOString()
    }
  },
  activePlaylistId: null,

  setAllTracks: (tracks) => set({ allTracks: tracks }),
  
  setSuggestedTracks: (tracks) => {
    set(state => {
      // Only update the suggestedTrackIds, don't modify allTracks
      return {
        suggestedTrackIds: new Set(tracks.map(t => t.id)),
        orderingConfig: { orderBy: 'suggested', direction: 'asc' }
      }
    })
  },

  reorderTracks: (oldIndex: number, newIndex: number) => 
    set((state) => {
      const newTracks = [...state.allTracks]
      const [movedTrack] = newTracks.splice(oldIndex, 1)
      newTracks.splice(newIndex, 0, movedTrack)
      return { 
        allTracks: newTracks,
        orderingConfig: { ...state.orderingConfig, orderBy: 'manual' }
      }
    }),

  setDraggedTrackId: (trackId) => set({ draggedTrackId: trackId }),
  
  setOrderingConfig: (config) => set((state) => ({ 
    orderingConfig: { ...state.orderingConfig, ...config }
  })),
  
  clearSuggestions: () => set({ 
    suggestedTrackIds: new Set(),
    orderingConfig: { orderBy: 'manual', direction: 'asc' }
  }),

  createPlaylist: (name) => {
    const id = crypto.randomUUID()
    set((state) => ({
      playlists: {
        ...state.playlists,
        [id]: {
          id,
          name,
          tracks: [],
          createdAt: new Date().toISOString()
        }
      }
    }))
    return id
  },

  addTrackToPlaylist: (trackId, playlistId) => {
    set((state) => ({
      playlists: {
        ...state.playlists,
        [playlistId]: {
          ...state.playlists[playlistId],
          tracks: [...state.playlists[playlistId].tracks, trackId]
        }
      }
    }))
  },

  removeTrackFromPlaylist: (trackId, playlistId) => {
    set((state) => ({
      playlists: {
        ...state.playlists,
        [playlistId]: {
          ...state.playlists[playlistId],
          tracks: state.playlists[playlistId].tracks.filter(id => id !== trackId)
        }
      }
    }))
  },

  setActivePlaylist: (playlistId) => {
    set({ activePlaylistId: playlistId })
  },

  deletePlaylist: (playlistId) => {
    if (playlistId === 'main' || playlistId === 'favorites') return // Protect default playlists
    set((state) => {
      const { [playlistId]: _, ...remainingPlaylists } = state.playlists
      return { 
        playlists: remainingPlaylists,
        activePlaylistId: state.activePlaylistId === playlistId ? null : state.activePlaylistId
      }
    })
  },
}))

// Optional: Add selectors for common operations
export const useTrackSelectors = {
  getSuggestedTracks: (state: TracksStore) => 
    state.allTracks.filter(track => state.suggestedTrackIds.has(track.id)),
    
  getRegularTracks: (state: TracksStore) =>
    state.allTracks.filter(track => !state.suggestedTrackIds.has(track.id)),
    
  isTrackSuggested: (state: TracksStore, trackId: string) =>
    state.suggestedTrackIds.has(trackId),
    
  isDragging: (state: TracksStore) =>
    state.draggedTrackId !== null,
} 