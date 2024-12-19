import { useState, useEffect } from 'react';
import { Play, Pause, Clock, Music, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Track, Release } from '@/types/discogs';

interface ReleaseTracksProps {
  releaseId: number;
}

interface TrackWithMetadata extends Track {
  bpm?: number; // For future BPM detection feature
  previewUrl?: string; // For future audio preview feature
}

const ReleaseTracks = ({ releaseId }: ReleaseTracksProps) => {
  const [tracks, setTracks] = useState<TrackWithMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/discogs/release/${releaseId}`);
        if (!response.ok) throw new Error('Failed to fetch release details');
        
        const data: Release = await response.json();
        // Add placeholder BPM and preview URL for now
        const tracksWithMetadata = data.tracklist.map(track => ({
          ...track,
          bpm: Math.floor(Math.random() * (140 - 115) + 115), // Placeholder BPM
          previewUrl: '/api/preview/placeholder' // Placeholder preview URL
        }));
        
        setTracks(tracksWithMetadata);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tracks');
      } finally {
        setLoading(false);
      }
    };

    if (releaseId) {
      fetchTracks();
    }
  }, [releaseId]);

  const handlePlayToggle = (trackPosition: string) => {
    setPlayingTrackId(playingTrackId === trackPosition ? null : trackPosition);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-16 bg-border/10 rounded-base"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-2 text-sm text-text/60 dark:text-darkText/60">
        <div className="w-8">#</div>
        <div>TITLE</div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>TIME</span>
        </div>
        <div className="flex items-center gap-1">
          <BarChart2 className="w-4 h-4" />
          <span>BPM</span>
        </div>
      </div>

      {tracks.map((track) => (
        <div
          key={track.position}
          className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center hover:bg-border/10"
        >
          <div className="w-8 flex items-center justify-center">
            <Button
              variant="noShadow"
              size="icon"
              className="w-8 h-8"
              onClick={() => handlePlayToggle(track.position)}
            >
              {playingTrackId === track.position ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div>
            <div className="font-medium text-text dark:text-darkText">
              {track.title}
            </div>
            {track.extraartists && (
              <div className="text-sm text-text/60 dark:text-darkText/60">
                {track.extraartists.map(artist => artist.name).join(', ')}
              </div>
            )}
          </div>

          <div className="text-text/60 dark:text-darkText/60">
            {track.duration}
          </div>

          <div className="text-text/60 dark:text-darkText/60 flex items-center gap-2">
            <span>{track.bpm || '---'}</span>
            {track.bpm && (
              <Music className="w-4 h-4 text-text/40 dark:text-darkText/40" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReleaseTracks;