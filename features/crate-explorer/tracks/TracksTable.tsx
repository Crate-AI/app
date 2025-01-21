'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { CrateTrack } from '@/types'
import { useTracksStore , usePlaylistStore } from '@/stores'
import { OrderingConfig } from '@/types'
import { useYouTubePlayer } from '@/lib/hooks/useYoutubePlayer'
import { SearchInput } from './components/SearchInput'
import { TrackRow } from './components/TrackRow'
import { TableHeader } from './components/TableHeader'

export default function TracksTable() {
  const { allTracks, suggestedTrackIds } = useTracksStore()
  const { createPlaylist, addTrackToPlaylist } = usePlaylistStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [orderingConfig, setOrderingConfig] = useState<OrderingConfig>({
    orderBy: 'manual',
    direction: 'asc'
  })
  const { playingTrackId, isPlayerReady, handlePlayToggle } = useYouTubePlayer()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleAddToPlaylist = async (track: CrateTrack, playlistId: string) => {
    await addTrackToPlaylist(playlistId, track)
  }

  const handleCreateNewPlaylist = async (track: CrateTrack, name: string) => {
    const playlistId = await createPlaylist(name)
    await addTrackToPlaylist(playlistId, track)
  }

  const handleSort = (column: OrderingConfig['orderBy']) => {
    setOrderingConfig(prev => ({
      orderBy: column,
      direction: prev.orderBy === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  useEffect(() => {
    if (allTracks.length > 0) {
      setLoading(false)
    }
  }, [allTracks])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const sortedTracks = useMemo(() => {
    const filteredTracks = searchQuery 
      ? allTracks.filter(track => 
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.genres?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.styles?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allTracks

    const suggested = filteredTracks.filter(t => suggestedTrackIds.has(t.id))
    const regular = filteredTracks.filter(t => !suggestedTrackIds.has(t.id))
    
    const sortByConfig = (tracks: CrateTrack[]) => {
      switch (orderingConfig.orderBy) {
        case 'title':
          return tracks.sort((a, b) => {
            const diff = a.title.localeCompare(b.title)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
        case 'artist':
          return tracks.sort((a, b) => {
            const diff = a.artist.localeCompare(b.artist)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
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
        case 'style':
          return tracks.sort((a, b) => {
            const aStyle = (a.styles?.[0] || '').toLowerCase()
            const bStyle = (b.styles?.[0] || '').toLowerCase()
            const diff = aStyle.localeCompare(bStyle)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
        case 'duration':
          return tracks.sort((a, b) => {
            const diff = Number(a.duration) - Number(b.duration)
            return orderingConfig.direction === 'asc' ? diff : -diff
          })
        default:
          return tracks
      }
    }

    return suggestedTrackIds.size > 0 
      ? [...sortByConfig(suggested), ...regular]
      : sortByConfig([...suggested, ...regular])
  }, [allTracks, suggestedTrackIds, orderingConfig, searchQuery])

  if (loading && allTracks.length === 0) {
    return <div>Loading tracks...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center mb-4">
        <SearchInput 
          ref={searchInputRef}
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                isSuggested={suggestedTrackIds.has(track.id)}
                isFirstSuggested={
                  suggestedTrackIds.has(track.id) &&
                  !suggestedTrackIds.has(sortedTracks[index - 1]?.id)
                }
                isLastSuggested={
                  suggestedTrackIds.has(track.id) &&
                  !suggestedTrackIds.has(sortedTracks[index + 1]?.id)
                }
                playingTrackId={playingTrackId}
                isPlayerReady={isPlayerReady}
                onPlayToggle={handlePlayToggle}
                onAddToPlaylist={handleAddToPlaylist}
                onCreateNewPlaylist={handleCreateNewPlaylist}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}