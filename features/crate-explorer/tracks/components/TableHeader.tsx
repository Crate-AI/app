import { OrderingConfig } from "@/types"

interface TableHeaderProps {
  onSort: (column: OrderingConfig['orderBy']) => void
}

export function TableHeader({ onSort }: TableHeaderProps) {
  return (
    <thead>
      <tr className="bg-background/50">
        <th scope="col" className="w-12 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">
          Playlist
        </th>
        <th scope="col" className="w-16 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">
          Play
        </th>
        <th 
          scope="col" 
          className="w-20 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase"
        >
          Position
        </th>
        <th 
          scope="col" 
          className="w-80 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('title')}
        >
          Title
        </th>
        <th 
          scope="col" 
          className="w-48 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('artist')}
        >
          Artist
        </th>
        <th 
          scope="col" 
          className="w-32 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('genre')}
        >
          Genre
        </th>
        <th 
          scope="col" 
          className="w-36 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('style')}
        >
          Styles
        </th>
        <th 
          scope="col" 
          className="w-20 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('bpm')}
        >
          BPM
        </th>
        <th 
          scope="col" 
          className="w-24 px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground"
          onClick={() => onSort?.('duration')}
        >
          Duration
        </th>
      </tr>
    </thead>
  )
} 