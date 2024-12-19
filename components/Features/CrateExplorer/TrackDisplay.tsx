import { TrackDisplayProps } from '@/types/discogs';
import TrackDisplayList from './TrackDisplayList';
import TrackDisplayGrid from './TrackDisplayGrid';

const TrackDisplay = ({ result, isPlaying, onPlayToggle, viewMode, dateAdded }: TrackDisplayProps) => {
  if (!result) return null;

  if (viewMode === 'list') {
    return <TrackDisplayList result={result} isPlaying={isPlaying} onPlayToggle={onPlayToggle} dateAdded={dateAdded} />;
  }

  return <TrackDisplayGrid result={result} isPlaying={isPlaying} onPlayToggle={onPlayToggle} dateAdded={dateAdded} />;
};

export default TrackDisplay;