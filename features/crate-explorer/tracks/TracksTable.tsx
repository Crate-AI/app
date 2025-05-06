'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { CrateTrack } from '@/types'
import { useTracksStore, usePlaylistStore } from '@/stores'
import { useYouTubePlayer } from '@/lib/hooks/useYoutubePlayer'
import { SearchInput } from './components/SearchInput'
import { Button } from '@/components/ui/button'
import { Sparkles, MoreHorizontal, ArrowUpDown, Play, Pause, ChevronLeft, ChevronRight, PlusCircle, Share, Info, ListPlus, Plus } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
  getPaginationRowModel,
  PaginationState
} from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function TracksTable() {
  const { allTracks, suggestedTrackIds } = useTracksStore()
  const { createPlaylist, addTrackToPlaylist, fetchPlaylists } = usePlaylistStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { playingTrackId, isPlayerReady, handlePlayToggle } = useYouTubePlayer()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [rowHover, setRowHover] = useState<string | null>(null)
  const [playlists, setPlaylists] = useState<any[]>([])
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<CrateTrack | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const fetchedPlaylists = await fetchPlaylists();
        // Safely set playlists if they exist
        if (Array.isArray(fetchedPlaylists)) {
          setPlaylists(fetchedPlaylists);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Failed to fetch playlists');
      }
    };
    
    getPlaylists();
  }, [fetchPlaylists]);

  const handleAddToPlaylist = async (playlistId: string, trackId: string) => {
    try {
      await addTrackToPlaylist(playlistId, trackId);
      toast.success('Added to playlist');
    } catch (error) {
      toast.error('Failed to add to playlist');
    }
  }

  const handleCreateNewPlaylist = async () => {
    if (!newPlaylistName.trim() || isLoading || !selectedTrack) return;
    
    setIsLoading(true);
    try {
      const playlistId = await createPlaylist(newPlaylistName);
      await addTrackToPlaylist(playlistId, selectedTrack.id);
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
      toast.success('Playlist created successfully');
    } catch (error) {
      toast.error('Failed to create playlist');
    } finally {
      setIsLoading(false);
      setSelectedTrack(null);
    }
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

  // Function to handle creating AI-suggested playlist
  const handleCreateAiPlaylist = async () => {
    try {
      const aiPlaylistName = `AI Mix ${new Date().toLocaleDateString()}`;
      const playlistId = await createPlaylist(aiPlaylistName);
      
      // Add suggested tracks to the playlist
      const tracksToAdd = table.getFilteredRowModel().rows
        .map(row => row.original)
        .filter(track => suggestedTrackIds.has(track.id))
        .slice(0, 10);
        
      for (const track of tracksToAdd) {
        await addTrackToPlaylist(playlistId, track.id);
      }
    } catch (error) {
      console.error('Error creating AI playlist:', error);
      setError('Failed to create AI playlist');
    }
  }
   
  const formatArtists = (artist: string, extraArtists: string | null) => {
    if (!extraArtists) return artist
    return `${artist}, ${extraArtists}`
  }

  const formatList = (list: string | null) => {
    if (!list) return '-'
    return list.split(',').join(', ')
  }

  const columnHelper = createColumnHelper<CrateTrack>()
   
  const columns = useMemo(() => [
    // Combined Play/Position column with contextual actions
    columnHelper.display({
      id: 'playActions',
      header: 'Track',
      cell: ({row}) => {
        const track = row.original
        const isHovering = rowHover === track.id
        
        return (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="noShadow"
                size="icon"
                className="w-8 h-8 relative z-10"
                onClick={() => handlePlayToggle(track)}
                disabled={!track.youtube_video_id || !isPlayerReady}
              >
                {playingTrackId === track.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              {track.position && (
                <span className="absolute -top-2 -right-2 text-xs px-1 bg-gray-100 rounded-full text-gray-500">
                  {track.position}
                </span>
              )}
            </div>
            
            {track.artwork ? (
              <div className="h-10 w-10 flex-shrink-0">
                <Image
                  src={track.artwork}
                  alt={track.title}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-sm object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-sm" />
            )}
            
            <div className="text-sm font-medium text-gray-900 max-w-[16rem] relative overflow-hidden">
              <div className={cn(
                "whitespace-nowrap",
                isHovering && track.title.length > 30 && "hover-marquee"
              )}>
                {track.title}
              </div>
            </div>
            
            {/* Contextual actions that appear on hover */}
            {isHovering && (
              <div className="flex items-center gap-1 ml-2 animate-fadeIn">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="start"
                          className="bg-background/60 backdrop-blur-lg border border-border/50"
                        >
                          {playlists.map((playlist) => (
                            <DropdownMenuItem
                              key={playlist.id}
                              onClick={() => handleAddToPlaylist(playlist.id, track.id)}
                              className="hover:bg-accent/50"
                            >
                              {playlist.name}
                            </DropdownMenuItem>
                          ))}
                          {playlists.length > 0 && <DropdownMenuSeparator className="bg-border/50" />}
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedTrack(track);
                              setIsCreatingPlaylist(true);
                            }}
                            className="hover:bg-accent/50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Playlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to playlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share track</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        )
      }
    }),
    columnHelper.accessor(row => row.artist, {
      id: 'artist',
      header: ({column}) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Artist</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({row}) => {
        const track = row.original
        const isHovering = rowHover === track.id
        const artist = formatArtists(track.artist, track.extra_artists)
        return (
          <div className="text-sm text-gray-500 max-w-[18rem] relative overflow-hidden">
            <div className={cn(
              "whitespace-nowrap",
              isHovering && artist.length > 15 && "hover-marquee"
            )}>
              {artist}
            </div>
          </div>
        )
      }
    }),
    columnHelper.accessor(row => row.genres, {
      id: 'genre_style',
      header: ({column}) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Genre/Style</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({row}) => {
        const track = row.original
        const isHovering = rowHover === track.id
        const genreStyle = [
          track.genres && formatList(track.genres),
          track.styles && formatList(track.styles)
        ].filter(Boolean).join(' / ');
        
        return (
          <div className="text-sm text-gray-500 max-w-[18rem] relative overflow-hidden">
            <div className={cn(
              "whitespace-nowrap",
              isHovering && genreStyle.length > 20 && "hover-marquee"
            )}>
              {genreStyle}
            </div>
          </div>
        )
      }
    }),
    columnHelper.accessor(row => row.bpm, {
      id: 'bpm',
      header: ({column}) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>BPM</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({getValue}) => <div className="text-sm text-gray-500">{getValue() || '-'}</div>
    }),
    columnHelper.accessor(row => row.duration, {
      id: 'duration',
      header: ({column}) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Duration</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({getValue}) => <div className="text-sm text-gray-500">{getValue() || '-'}</div>
    })
  ], [playingTrackId, isPlayerReady, rowHover, handlePlayToggle, handleAddToPlaylist, playlists])

  const globalFilter: FilterFn<CrateTrack> = (row, columnId, value) => {
    const searchLower = value.toLowerCase()
    const track = row.original
    return (
      track.title.toLowerCase().includes(searchLower) ||
      track.artist.toLowerCase().includes(searchLower) ||
      (track.genres?.toLowerCase() || '').includes(searchLower) ||
      (track.styles?.toLowerCase() || '').includes(searchLower)
    )
  }

  const table = useReactTable({
    data: allTracks,
    columns,
    state: {
      sorting,
      globalFilter: searchQuery,
      pagination,
    },
    globalFilterFn: globalFilter,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchQuery,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    debugTable: process.env.NODE_ENV === 'development',
  })

  if (loading && allTracks.length === 0) {
    return <div>Loading tracks...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  // Add a custom CSS block at the end of the component
  const marqueeStyles = `
    @keyframes limited-marquee {
      0% { transform: translateX(0); }
      20% { transform: translateX(0); }
      80% { transform: translateX(calc(-100% + 100%)); }
      100% { transform: translateX(0); }
    }
    
    .hover-marquee {
      animation: limited-marquee 3s ease-in-out;
      animation-iteration-count: 1;
      display: inline-block;
      position: relative;
      max-width: 100%;
    }
  `;

  return (
    <div className="space-y-4 ml-8">
      <style jsx>{marqueeStyles}</style>
      <div className="flex justify-between items-center mb-4">
        <div>
          {suggestedTrackIds.size > 0 && (
            <Button 
              onClick={handleCreateAiPlaylist}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create AI Playlist</span>
            </Button>
          )}
        </div>
        <SearchInput 
          ref={searchInputRef}
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      <div className="relative overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => {
              const track = row.original
              const isSuggested = suggestedTrackIds.has(track.id)
              const isFirstSuggested = 
                isSuggested && 
                (row.index === 0 || !suggestedTrackIds.has(table.getRowModel().rows[row.index - 1]?.original.id))
              const isLastSuggested = 
                isSuggested && 
                (row.index === table.getRowModel().rows.length - 1 || !suggestedTrackIds.has(table.getRowModel().rows[row.index + 1]?.original.id))
                
              return (
                <tr 
                  key={track.id}
                  className={cn(
                    'hover:bg-accent/5 group relative transition-all duration-300',
                    isSuggested && [
                      'bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]',
                      'border-l-[3px] border-primary/40',
                      'shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]'
                    ]
                  )}
                  onMouseEnter={() => setRowHover(track.id)}
                  onMouseLeave={() => setRowHover(null)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  
                  {isFirstSuggested && (
                    <div className="absolute -top-px left-0 right-0 h-px bg-primary/10" />
                  )}
                  {isLastSuggested && (
                    <div className="absolute -bottom-px left-0 right-0 h-px bg-primary/10" />
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Create New Playlist Dialog */}
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
                if (e.key === 'Enter' && newPlaylistName.trim() && !isLoading) handleCreateNewPlaylist();
                if (e.key === 'Escape') setIsCreatingPlaylist(false);
              }}
              disabled={isLoading}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreatingPlaylist(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNewPlaylist}
              disabled={!newPlaylistName.trim() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination Controls - Fixed position at the bottom */}
      <div className="flex items-center justify-between sticky bottom-4 bg-white border rounded-md p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </p>
          <p className="text-sm text-gray-500 hidden md:block">
            | Displaying {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} tracks
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500 hidden sm:inline">Rows per page:</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="hidden sm:flex h-8 w-8 p-0 lg:flex"
            >
              <span className="sr-only">Go to first page</span>
              <ChevronLeft className="h-4 w-4" />
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="hidden sm:flex h-8 w-8 p-0 lg:flex"
            >
              <span className="sr-only">Go to last page</span>
              <ChevronRight className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}