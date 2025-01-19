import { DiscogsSearchResult } from '@/types';
import TrackDisplay from './TrackDisplay';

interface TrackGridProps {
  viewMode: 'grid' | 'list';
  items: DiscogsSearchResult[];
  playingTrackId: number | null;
  onPlayToggle: (id: number) => void;
}

const TrackGrid = ({
  viewMode,
  items,
  playingTrackId,
  onPlayToggle,
}: TrackGridProps) => {
  return (
    <div
      className={
        viewMode === 'list'
          ? 'space-y-2'
          : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      }
    >
      {items.map((item) => (
        <TrackDisplay
          key={item.id}
          result={item}
          viewMode={viewMode}
          isPlaying={playingTrackId === item.id}
          onPlayToggle={() => onPlayToggle(item.id)}
          dateAdded={item.date_added || ''}
        />
      ))}
    </div>
  );
};

export default TrackGrid;
