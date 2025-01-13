import { create } from 'zustand'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'

export interface OrderingConfig {
  orderBy: 'bpm' | 'genre' | 'manual' | 'suggested'
  direction: 'asc' | 'desc'
}

interface TracksStore {
  allTracks: CrateTrack[]
  suggestedTrackIds: Set<string>
  draggedTrackId: string | null
  orderingConfig: OrderingConfig
  setAllTracks: (tracks: CrateTrack[]) => void
  setSuggestedTracks: (tracks: CrateTrack[]) => void
  reorderTracks: (oldIndex: number, newIndex: number) => void
  setDraggedTrackId: (trackId: string | null) => void
  setOrderingConfig: (config: Partial<OrderingConfig>) => void
  clearSuggestions: () => void
}

export const useTracksStore = create<TracksStore>((set) => ({
  allTracks: [],
  suggestedTrackIds: new Set<string>(),
  draggedTrackId: null,
  orderingConfig: {
    orderBy: 'manual',
    direction: 'asc'
  },

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
  })
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