import { Play, Pause} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CrateTrack } from '@/types'
import { cn } from '@/lib/utils/utils'
import { usePlaylistStore } from '@/stores'
import { PlaylistActions } from './PlaylistActions'

interface TrackRowProps {
    track: CrateTrack
    index: number
    isSuggested: boolean
    isFirstSuggested: boolean
    isLastSuggested: boolean
    playingTrackId: string | null
    isPlayerReady: boolean
    onPlayToggle: (track: CrateTrack) => void
    onAddToPlaylist: (playlistId: string, trackId: string) => void
    onCreateNewPlaylist: (name: string, track: CrateTrack) => void
    isPlaying: boolean
    onPlayPause: () => void
}
  
export const TrackRow = ({
    track,
    index,
    isSuggested,
    isFirstSuggested,
    isLastSuggested,
    playingTrackId,
    isPlayerReady,
    onPlayToggle,
    onAddToPlaylist,
    onCreateNewPlaylist,
    isPlaying,
    onPlayPause,
  }: TrackRowProps) => {
    const { playlists } = usePlaylistStore()
    const formatArtists = (artist: string, extraArtists: string | null) => {
      if (!extraArtists) return artist
      return `${artist}, ${extraArtists}`
    }
  
    const formatList = (list: string | null) => {
      if (!list) return '-'
      return list.split(',').join(', ')
    }
    return (
      <tr
        className={cn(
          'hover:bg-accent/5 group relative transition-all duration-300',
          isSuggested && [
            'bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]',
            'border-l-[3px] border-primary/40',
            'shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]'
          ]
        )}
      >
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="relative group">
            <div className="invisible group-hover:visible">
            <PlaylistActions
              track={track}
              playlists={playlists.map(playlist => ({ id: playlist.id, name: playlist.title }))}
              onAddToPlaylist={onAddToPlaylist}
              onCreateNewPlaylist={onCreateNewPlaylist}
              />
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <Button
            variant="noShadow"
            size="icon"
            className="w-8 h-8"
            onClick={() => onPlayToggle(track)}
            disabled={!track.youtube_video_id || !isPlayerReady}
          >
            {playingTrackId === track.id ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {track.position}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[24rem]">
          {track.title}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[18rem]">
          {formatArtists(track.artist, track.extra_artists)}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatList(track.genres)}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatList(track.styles)}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {track.bpm || '-'}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {track.duration || '-'}
        </td>
        {isFirstSuggested && (
          <div className="absolute -top-px left-0 right-0 h-px bg-primary/10" />
        )}
        {isLastSuggested && (
          <div className="absolute -bottom-px left-0 right-0 h-px bg-primary/10" />
        )}
      </tr>
    )
  }