import { ListPlus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CrateTrack } from '@/types'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface PlaylistActionsProps {
  track: CrateTrack
  playlists: { id: string; name: string }[]
  onAddToPlaylist: (track: CrateTrack, playlistId: string) => void
  onCreateNewPlaylist: (track: CrateTrack, name: string) => void
}

export function PlaylistActions({
  track,
  playlists,
  onAddToPlaylist,
  onCreateNewPlaylist
}: PlaylistActionsProps) {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  const handleCreateNewPlaylist = () => {
    if (!newPlaylistName.trim()) return
    onCreateNewPlaylist(track, newPlaylistName)
    setNewPlaylistName('')
    setIsCreatingPlaylist(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <ListPlus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {playlists.map((playlist) => (
            <DropdownMenuItem
              key={playlist.id}
              onClick={() => onAddToPlaylist(track, playlist.id)}
            >
              {playlist.name}
            </DropdownMenuItem>
          ))}
          {playlists.length > 0 && <DropdownMenuSeparator />}
          <DropdownMenuItem onClick={() => setIsCreatingPlaylist(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Playlist
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isCreatingPlaylist} onOpenChange={setIsCreatingPlaylist}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newPlaylistName.trim()) handleCreateNewPlaylist()
                if (e.key === 'Escape') setIsCreatingPlaylist(false)
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreatingPlaylist(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNewPlaylist}
              disabled={!newPlaylistName.trim()}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 