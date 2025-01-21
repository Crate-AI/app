import { useState, useMemo } from 'react'
import type { CrateTrack } from '@/types'
import { useTracksStore } from '@/stores'
import { OrderingConfig } from '@/types'

export function useTrackSorting(tracks: CrateTrack[]) {
  const { suggestedTrackIds } = useTracksStore()
  const [orderingConfig, setOrderingConfig] = useState<OrderingConfig>({
    orderBy: 'manual',
    direction: 'asc'
  })
  const [isReordering, setIsReordering] = useState(false)

  const sortedTracks = useMemo(() => {
    setIsReordering(true)
    
    const suggested = tracks.filter(t => suggestedTrackIds.has(t.id))
    const regular = tracks.filter(t => !suggestedTrackIds.has(t.id))
    
    const sortByConfig = (tracks: CrateTrack[]) => {
      switch (orderingConfig.orderBy) {
        case 'bpm':
          return tracks.sort((a, b) => {
            const diff = Number(a.bpm) - Number(b.bpm)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
        case 'genre':
          return tracks.sort((a, b) => {
            const aGenre = (a.genres?.[0] || '').toLowerCase()
            const bGenre = (b.genres?.[0] || '').toLowerCase()
            const diff = aGenre.localeCompare(bGenre)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
        case 'suggested':
          return tracks        
        default:
          return tracks
      }
    }

    const result = suggestedTrackIds.size > 0 
      ? [...sortByConfig(suggested), ...regular]
      : sortByConfig([...suggested, ...regular])
    
    setTimeout(() => setIsReordering(false), 100)
    return result
  }, [tracks, suggestedTrackIds, orderingConfig])


  return {
    sortedTracks,
    orderingConfig,
    setOrderingConfig,
  }
}