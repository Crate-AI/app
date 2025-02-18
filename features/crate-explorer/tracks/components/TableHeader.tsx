import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderingConfig } from '@/types';

interface TableHeaderProps {
  onSort: (column: OrderingConfig['orderBy']) => void;
}

export const TableHeader = ({ onSort }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Play
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Position
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('title')}
          >
            <span>Title</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('artist')}
          >
            <span>Artist</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('genre')}
          >
            <span>Genre</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('style')}
          >
            <span>Style</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('bpm')}
          >
            <span>BPM</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => onSort('duration')}
          >
            <span>Duration</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </th>
      </tr>
    </thead>
  );
}; 