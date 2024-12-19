import { useState } from 'react';
import { TrackDisplayProps } from '@/types/discogs';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import ReleaseTracks from './ReleaseTracks';

type TrackDisplayListProps = Omit<TrackDisplayProps, 'viewMode'>;

const TrackDisplayList = ({ result, isPlaying, onPlayToggle }: TrackDisplayListProps) => {
  const [showTracks, setShowTracks] = useState(false);
  if (!result) return null;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={result.thumb || '/api/placeholder/50/50'}
              alt={result.title}
              className="w-12 h-12 rounded-base object-cover"
            />
            <button
              onClick={onPlayToggle}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-base"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <div>
            <div className="font-medium text-text dark:text-darkText">
              {result.title}
            </div>
            <div className="text-sm text-text/60 dark:text-darkText/60">
              {result.year} · {result.country || 'Unknown'}
            </div>
          </div>
        </div>

        <div className="text-sm text-text/60 dark:text-darkText/60">
          <div>{result.genre?.join(', ') || 'No Genre'}</div>
          <div>{result.style?.join(', ') || 'No Style'}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="noShadow" 
            size="icon"
            onClick={() => setShowTracks(!showTracks)}
          >
            {showTracks ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          <Button variant="noShadow" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="noShadow" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {showTracks && (
        <div className="ml-16">
          <ReleaseTracks releaseId={result.id} />
        </div>
      )}
    </div>
  );
};

export default TrackDisplayList; 