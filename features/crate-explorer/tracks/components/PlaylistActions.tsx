import { ListPlus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CrateTrack } from '@/types'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores'
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
  playlists: Array<{ id: string; name: string }>
  onAddToPlaylist: (playlistId: string, trackId: string) => void
  onCreateNewPlaylist: (name: string, track: CrateTrack) => void
}

export function PlaylistActions({
  track,
  playlists,
  onAddToPlaylist,
  onCreateNewPlaylist
}: PlaylistActionsProps) {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const { isAuthenticated } = useAuthStore()

  const handleCreateNewPlaylist = async () => {
    
    if (!newPlaylistName.trim()) return
    
    try {
      await onCreateNewPlaylist(newPlaylistName, track)
      setNewPlaylistName('')
      setIsCreatingPlaylist(false)
      toast.success('Playlist created successfully')
    } catch (error) {
      toast.error('Failed to create playlist')
    }
  }

  const handleAddToPlaylist = (playlistId: string) => {
    if (!isAuthenticated()) {
      toast.error('Please sign in to add tracks to playlists');
      return;
    }
    
    onAddToPlaylist(playlistId, track.id);
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
              onClick={() => handleAddToPlaylist(playlist.id)}
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