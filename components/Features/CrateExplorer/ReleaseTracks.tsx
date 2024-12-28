import { PlaybackError } from '@/types/youtube';
import { TrackList } from './TrackList';
import { useState, useEffect } from 'react';
import { TrackWithMetadata } from '@/types/discogs';
import { usePlayerStore } from '@/lib/store/usePlayerStore';
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route';

interface Props {
  releaseId: number;
}

const ReleaseTracks = ({ releaseId }: Props) => {
  const [tracks, setTracks] = useState<CrateTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PlaybackError | null>(null);

  const {
    player,
    isReady,
    playingTrackId,
    setPlayingTrackId,
    initializePlayer,
  } = usePlayerStore();

  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);

  const handlePlayToggle = async (track: CrateTrack) => {
    if (!track.youtube_video_id || !player || !isReady) {
      const reason = !track.youtube_video_id
        ? 'No video ID available'
        : !player
          ? 'YouTube player not initialized'
          : 'Player not ready';
      setError({
        message: 'Cannot play track',
        details: reason,
        trackPosition: track.position,
      });
      return;
    }

    try {
      if (playingTrackId === track.position) {
        player.pauseVideo();
        setPlayingTrackId(null);
      } else {
        if (playingTrackId) {
          player.stopVideo();
        }

        player.loadVideoById({
          videoId: track.youtube_video_id,
          suggestedQuality: 'small',
        });

        player.playVideo();
        setPlayingTrackId(track.position);
      }
    } catch (err) {
      setError({
        message: 'Failed to play track',
        details: err instanceof Error ? err.message : 'Unknown error',
        trackPosition: track.position,
      });
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/tracks/${releaseId}`);
        if (!response.ok) throw new Error('Failed to fetch release');

        const tracksWithMetadata: CrateTrack[] = await response.json();
        setTracks(tracksWithMetadata);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'Failed to load tracks',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [releaseId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-border/10 rounded-base" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 p-4 text-center">
        <p className="font-semibold">{error.message}</p>
        {error.details && (
          <p className="text-sm mt-1 text-red-400 dark:text-red-300">
            {error.details}
            {error.trackPosition && ` (Track ${error.trackPosition})`}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <TrackList
        tracks={tracks}
        playingTrackId={playingTrackId}
        onPlayToggle={handlePlayToggle}
        isPlayerReady={isReady}
      />
    </>
  );
};

export default ReleaseTracks;
