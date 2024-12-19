import { TrackDisplayProps } from '@/types/discogs';
import TrackDisplayList from './TrackDisplayList';
import TrackDisplayGrid from './TrackDisplayGrid';

const TrackDisplay = ({ result, isPlaying, onPlayToggle, viewMode }: TrackDisplayProps) => {
  if (!result) return null;

  if (viewMode === 'list') {
    return <TrackDisplayList result={result} isPlaying={isPlaying} onPlayToggle={onPlayToggle} />;
  }

  return <TrackDisplayGrid result={result} isPlaying={isPlaying} onPlayToggle={onPlayToggle} />;
};

export default TrackDisplay;