import { create } from 'zustand'
import { CrateTrack } from '@/types';

interface TracksStore {
  allTracks: CrateTrack[]
  suggestedTrackIds: Set<string>
  setAllTracks: (tracks: CrateTrack[]) => void
  setSuggestedTracks: (tracks: CrateTrack[]) => void
  clearSuggestions: () => void
}

export const useTracksStore = create<TracksStore>((set) => ({
  allTracks: [],
  suggestedTrackIds: new Set<string>(),

  setAllTracks: (tracks) => set({ allTracks: tracks }),
  
  setSuggestedTracks: (tracks) => {
    set(() => ({
      suggestedTrackIds: new Set(tracks.map(t => t.id))
    }))
  },
  
  clearSuggestions: () => set({ 
    suggestedTrackIds: new Set()
  })
}))

// Optional: Add selectors for common operations
export const useTrackSelectors = {
  getSuggestedTracks: (state: TracksStore) => 
    state.allTracks.filter(track => state.suggestedTrackIds.has(track.id)),
    
  getRegularTracks: (state: TracksStore) =>
    state.allTracks.filter(track => !state.suggestedTrackIds.has(track.id)),
    
  isTrackSuggested: (state: TracksStore, trackId: string) =>
    state.suggestedTrackIds.has(trackId)
} 