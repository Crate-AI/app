import { create } from 'zustand'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'

interface TracksStore {
  allTracks: CrateTrack[]
  suggestedTrackIds: Set<string>
  draggedTrackId: string | null
  setAllTracks: (tracks: CrateTrack[]) => void
  setSuggestedTracks: (tracks: CrateTrack[]) => void
  reorderTracks: (oldIndex: number, newIndex: number) => void
  setDraggedTrackId: (trackId: string | null) => void
  clearSuggestions: () => void
}

export const useTracksStore = create<TracksStore>((set) => ({
  allTracks: [],
  suggestedTrackIds: new Set<string>(),
  draggedTrackId: null,

  setAllTracks: (tracks) => set({ allTracks: tracks }),
  
  setSuggestedTracks: (tracks) => {
    set({ suggestedTrackIds: new Set(tracks.map(t => t.id)) })
  },

  reorderTracks: (oldIndex: number, newIndex: number) => 
    set((state) => {
      // Create a new array to maintain immutability
      const newTracks = [...state.allTracks]
      
      // Remove the track from the old position and get it
      const [movedTrack] = newTracks.splice(oldIndex, 1)
      
      // Insert the track at the new position
      newTracks.splice(newIndex, 0, movedTrack)
      
      // Return the new state
      return { allTracks: newTracks }
    }),

  setDraggedTrackId: (trackId) => set({ draggedTrackId: trackId }),
  
  clearSuggestions: () => set({ suggestedTrackIds: new Set() })
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