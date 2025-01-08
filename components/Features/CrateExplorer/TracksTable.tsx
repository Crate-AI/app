'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'
import type { YouTubePlayer, YouTubeConfig } from '@/types/youtube'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'

export default function TracksTable() {
  const [tracks, setTracks] = useState<CrateTrack[]>([])
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
    async function fetchTracks() {
      try {
        const res = await fetch(`/api/tracks`, {
          credentials: 'include'
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        setTracks(data.tracks || [])
      } catch (e) {
        console.error('Error loading tracks:', e)
        setError(e instanceof Error ? e.message : 'Failed to load tracks')
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

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

  if (loading) {
    return <div>Loading tracks...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!tracks.length) {
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Play
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              BPM
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tracks.map((track) => (
            <tr key={track.id} className="hover:bg-gray-50">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {track.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {track.artist}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {track.bpm}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {track.duration || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 