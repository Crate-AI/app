'use client'

import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, GripVertical, ArrowUpDown, Search, X, ListPlus, ShoppingBag, Heart, Plus } from 'lucide-react'
import type { YouTubePlayer, YouTubeConfig } from '@/types/youtube'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'
import { useTracksStore } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import type { OrderingConfig } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import { cn } from '@/lib/utils/utils'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

interface SortableRowProps {
  track: CrateTrack
  index: number
  isSuggested: boolean
  isFirstSuggested: boolean
  isLastSuggested: boolean
  playingTrackId: string | null
  isPlayerReady: boolean
  onPlayToggle: (track: CrateTrack) => void
  onAddToPlaylist: (track: CrateTrack, playlistName: string) => void
  onCreateNewPlaylist: (track: CrateTrack, name: string) => void
}

const SortableRow = ({
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
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: track.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formatArtists = (artist: string, extraArtists: string | null) => {
    if (!extraArtists) return artist
    return `${artist}, ${extraArtists}`
  }

  const formatList = (list: string | null) => {
    if (!list) return '-'
    return list.split(',').join(', ')
  }

  const [isNewPlaylistDialogOpen, setIsNewPlaylistDialogOpen] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  const handleCreateNewPlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreateNewPlaylist(track, newPlaylistName.trim())
      setNewPlaylistName('')
      setIsNewPlaylistDialogOpen(false)
    }
  }

  return (
    <tr
      ref={setNodeRef}
      style={{
        ...style,
        touchAction: 'none'
      }}
      className={cn(
        'hover:bg-gray-50/80 group relative touch-none transition-all duration-300',
        isSuggested && [
          'bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]',
          'border-l-[3px] border-primary/40',
          'shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]'
        ],
        isDragging && 'shadow-lg bg-white opacity-50'
      )}
    >
    <td className="px-4 py-4 whitespace-nowrap">
        <div className="relative group">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-primary/5 group-hover:flex"
              >
                <ListPlus className="w-4 h-4" />
                <span className="sr-only">Add to Bag</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsNewPlaylistDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Bag
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isNewPlaylistDialogOpen} onOpenChange={setIsNewPlaylistDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bag</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter bag name (e.g., Datach Gig Jan 2025)"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPlaylistDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNewPlaylist}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
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

export default function TracksTable() {
  const { 
    allTracks, 
    suggestedTrackIds, 
    reorderTracks, 
    setDraggedTrackId,
    orderingConfig,
    setOrderingConfig,
    createPlaylist,
    addTrackToPlaylist
  } = useTracksStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playerRef = useRef<YouTubePlayer>()
  const [isReordering, setIsReordering] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
        tolerance: 5,
        delay: 250,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // YouTube player initialization
  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

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
    if (allTracks.length > 0) {
      setLoading(false)
    }
  }, [allTracks])

  const handlePlayToggle = async (track: CrateTrack) => {
    if (!track.youtube_video_id || !playerRef.current) return

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setDraggedTrackId(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = allTracks.findIndex((track) => track.id === active.id)
      const newIndex = allTracks.findIndex((track) => track.id === over.id)
      reorderTracks(oldIndex, newIndex)
    }

    setDraggedTrackId(null)
  }

  const sortedTracks = useMemo(() => {
    setIsReordering(true)
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

    // Always keep suggested tracks at the top when they exist
    const result = suggestedTrackIds.size > 0 
      ? [...sortByConfig(suggested), ...regular]
      : sortByConfig([...suggested, ...regular])
    
    
    setTimeout(() => setIsReordering(false), 100)
    return result
  }, [allTracks, suggestedTrackIds, orderingConfig, searchQuery])

  const handleAddToPlaylist = useCallback((track: CrateTrack, playlistId: string) => {
    addTrackToPlaylist(track.id, playlistId)
  }, [addTrackToPlaylist])

  const handleCreateNewPlaylist = useCallback((track: CrateTrack, name: string) => {
    const playlistId = createPlaylist(name)
    addTrackToPlaylist(track.id, playlistId)
  }, [createPlaylist, addTrackToPlaylist])

  if (loading && allTracks.length === 0) {
    return <div>Loading tracks...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!sortedTracks.length) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Select
                value={orderingConfig.orderBy}
                onValueChange={(value) => 
                  setOrderingConfig({ 
                    orderBy: value as OrderingConfig['orderBy'] 
                  })
                }
              >
                <SelectTrigger className="w-[180px] bg-background border border-input hover:border-input focus:border-input ring-offset-background">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Order</SelectItem>
                  <SelectItem value="bpm">BPM</SelectItem>
                  <SelectItem value="genre">Genre</SelectItem>
                  <SelectItem value="suggested">AI Suggested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOrderingConfig({
                  direction: orderingConfig.direction === 'asc' ? 'desc' : 'asc'
              })}
              className={cn(
                  'transition-transform',
                  'border-input hover:border-input focus-visible:border-input',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
                  orderingConfig.direction === 'desc' && 'rotate-180'
              )}
              >
              <ArrowUpDown className="h-4 w-4" />
          </Button>
          </div>


          <div className="flex items-center gap-2 w-[300px]">
            <div className="relative w-full p-[4px]">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" 
              />
              <Input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-8",
                  "transition-shadow duration-300",
                  "hover:shadow-hover",
                  "focus:shadow-focus"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">
            {searchQuery 
              ? `No tracks found matching "${searchQuery}"`
              : "No tracks found in your collection."
            }
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="mt-2"
            >
              Clear Search
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'transition-opacity duration-200',
      isReordering && 'opacity-90'
    )}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="overflow-x-auto relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Fixed Select Component */}
              <div className="relative">
                <Select
                  value={orderingConfig.orderBy}
                  onValueChange={(value) => 
                    setOrderingConfig({ 
                      orderBy: value as OrderingConfig['orderBy'] 
                    })
                  }
                >
                  <SelectTrigger className="w-[180px] bg-background border border-input hover:border-input focus:border-input ring-offset-background">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Order</SelectItem>
                    <SelectItem value="bpm">BPM</SelectItem>
                    <SelectItem value="genre">Genre</SelectItem>
                    <SelectItem value="suggested">AI Suggested</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fixed Sort Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOrderingConfig({
                    direction: orderingConfig.direction === 'asc' ? 'desc' : 'asc'
                })}
                className={cn(
                    'transition-transform',
                    'border-input hover:border-input focus-visible:border-input',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
                    orderingConfig.direction === 'desc' && 'rotate-180'
                )}
                >
                <ArrowUpDown className="h-4 w-4" />
            </Button>
            </div>

            {/* Fixed Search Input */}
            <div className="flex items-center gap-2 w-[300px]">
            <div className="relative w-full p-[4px]"> {/* Added padding to prevent shadow clipping */}
                <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" 
                />
                <Input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                    "w-full pl-9",
                    "transition-shadow duration-300",
                    "hover:shadow-hover", // Custom shadow on hover instead of scale
                    "focus:shadow-focus" // Custom shadow on focus
                )}
                />
            </div>
          </div>
         </div>

          {/* Table Structure */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th 
        scope="col" 
        className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Bag
        </th>
        <th 
        scope="col" 
        className="w-10 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        </th>
        <th 
        scope="col" 
        className="w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Play
        </th>
        <th 
        scope="col" 
        className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Position
        </th>
        <th 
        scope="col" 
        className="w-80 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Title
        </th>
        <th 
        scope="col" 
        className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Artist
        </th>
        <th 
        scope="col" 
        className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Genre
        </th>
        <th 
        scope="col" 
        className="w-36 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Styles
        </th>
        <th 
        scope="col" 
        className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        BPM
        </th>
        <th 
        scope="col" 
        className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
        Duration
        </th>
                </tr>
            </thead>
            <tbody className={cn(
              'bg-white divide-y divide-gray-200 relative',
              'transition-all duration-300 ease-in-out'
            )}>
              <SortableContext
                items={sortedTracks.map(track => track.id)}
                strategy={verticalListSortingStrategy}
              >
                {sortedTracks.map((track, index) => (
                  <SortableRow
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
              </SortableContext>
            </tbody>
          </table>
        </div>
      </DndContext>
    </div>
  )
}