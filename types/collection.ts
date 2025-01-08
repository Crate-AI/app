export interface Track {
  id: string
  created_at: string
  discogs_release_id: string
  youtube_video_id: string | null
  bpm: number
  title: string
  artist: string
  extra_artists: string | null
  position: string
  duration: string
} 