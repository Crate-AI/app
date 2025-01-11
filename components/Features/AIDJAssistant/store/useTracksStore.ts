import { create } from 'zustand'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'

interface TracksStore {
  allTracks: CrateTrack[]
  suggestedTrackIds: Set<string>
  setAllTracks: (tracks: CrateTrack[]) => void
  setSuggestedTracks: (tracks: CrateTrack[]) => void
}

export const useTracksStore = create<TracksStore>((set) => ({
  allTracks: [],
  suggestedTrackIds: new Set<string>(),
  setAllTracks: (tracks) => set({ allTracks: tracks }),
  setSuggestedTracks: (tracks) => {
    set({ suggestedTrackIds: new Set(tracks.map(t => t.id)) })
  }
})) 