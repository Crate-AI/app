'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'
import type { YouTubePlayer, YouTubeConfig } from '@/types/youtube'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'
import { motion, AnimatePresence } from 'framer-motion'
import { useTracksStore } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import { cn } from '@/lib/utils/utils'

export default function TracksTable() {
  const { allTracks, suggestedTrackIds } = useTracksStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playerRef = useRef<YouTubePlayer>()

  useEffect(() => {
    // Initialize YouTube Player
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Create hidden container for player
    const playerContainer = document.createElement('div')
    playerContainer.id = 'youtube-player'
    playerContainer.style.display = 'none'
    document.body.appendChild(playerContainer)

    window.onYouTubeIframeAPIReady = () => {
      const config: YouTubeConfig = {
        width: '1',
        height: '1',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: () => setIsPlayerReady(true),
          onStateChange: () => {},
          onError: (e) => console.error('YouTube player error:', e)
        }
      }

      playerRef.current = new window.YT.Player('youtube-player', config)
    }

    return () => {
      playerRef.current?.destroy()
      document.getElementById('youtube-player')?.remove()
    }
  }, [])

  useEffect(() => {
    // Set loading to false once we have tracks
    if (allTracks.length > 0) {
      setLoading(false)
    }
  }, [allTracks])

  const handlePlayToggle = async (track: CrateTrack) => {
    if (!track.youtube_video_id || !playerRef.current) {
      return
    }

    try {
      if (playingTrackId === track.id) {
        playerRef.current.pauseVideo()
        setPlayingTrackId(null)
      } else {
        playerRef.current.loadVideoById({
          videoId: track.youtube_video_id,
          suggestedQuality: 'small'
        })
        playerRef.current.playVideo()
        setPlayingTrackId(track.id)
      }
    } catch (error) {
      console.error('Error toggling track:', error)
    }
  }

  const formatArtists = (artist: string, extraArtists: string | null) => {
    if (!extraArtists) return artist
    return `${artist}, ${extraArtists}`
  }

  // Sort tracks with suggested ones first
  const sortedTracks = useMemo(() => {
    const suggested = allTracks.filter(t => suggestedTrackIds.has(t.id))
      .sort((a, b) => Number(a.bpm) - Number(b.bpm))
    
    const notSuggested = allTracks.filter(t => !suggestedTrackIds.has(t.id))
    
    return [...suggested, ...notSuggested]
  }, [allTracks, suggestedTrackIds])

  // Add smooth scroll behavior when tracks are suggested
  useEffect(() => {
    if (suggestedTrackIds.size > 0) {
      const firstSuggested = document.querySelector('[data-suggested="true"]')
      firstSuggested?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
    }
  }, [suggestedTrackIds])

  if (loading && allTracks.length === 0) {
    return <div>Loading tracks...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!sortedTracks.length) {
    return (
      <div className="text-gray-600">
        <p>No tracks found in your collection.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Play
            </th>
            <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th scope="col" className="w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="w-72 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Genre
            </th>
            <th scope="col" className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              BPM
            </th>
            <th scope="col" className="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <AnimatePresence>
            {sortedTracks.map((track, index) => {
              const isSuggested = suggestedTrackIds.has(track.id)
              const isFirstSuggested = isSuggested && 
                (!suggestedTrackIds.has(sortedTracks[index - 1]?.id))
              const isLastSuggested = isSuggested && 
                (!suggestedTrackIds.has(sortedTracks[index + 1]?.id))

              return (
                <motion.tr
                  key={track.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  data-suggested={isSuggested}
                  className={cn(
                    'hover:bg-gray-50 group relative',
                    isSuggested && 'bg-primary/5'
                  )}
                >
                  {isFirstSuggested && (
                    <td 
                      colSpan={6} 
                      className="absolute -top-8 left-0 right-0 text-center py-1 border-t border-primary/10"
                    >
                      <span className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                        Suggested Tracks
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="noShadow"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => handlePlayToggle(track)}
                      disabled={!track.youtube_video_id || !isPlayerReady}
                    >
                      {playingTrackId === track.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {track.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[24rem]">
                    {track.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[18rem]">
                    {formatArtists(track.artist, track.extra_artists)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {track.genres?.join(', ') || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {track.bpm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {track.duration || '-'}
                  </td>
                  {isLastSuggested && (
                    <div className="absolute -bottom-px left-0 right-0 h-px bg-primary/20" />
                  )}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
} 