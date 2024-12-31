import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Disc } from 'lucide-react';
import { TrackWithDetails } from '@/types/dj';

interface TrackViewProps {
  track: TrackWithDetails;
  isPlaying: boolean;
  onPlayToggle: (videoId?: string) => void;
}

const TrackView = ({ track, isPlaying, onPlayToggle }: TrackViewProps) => {
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<YT.Player | null>(null);

  // YouTube player initialization code (same as before)...
  useEffect(() => {
    if (!track.youtubeVideoId) return;

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      try {
        playerRef.current = new YT.Player(`player-${track.id}`, {
          height: '0',
          width: '0',
          videoId: track.youtubeVideoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            playsinline: 1
          },
          events: {
            onReady: () => setPlayerReady(true),
            onStateChange: (event: any) => {
              if (event.data === YT.PlayerState.ENDED) {
                onPlayToggle();
              }
            },
            onError: () => setPlayerReady(false)
          }
        });
      } catch (error) {
        console.error('Error initializing player:', error);
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, [track.youtubeVideoId, track.id]);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error('Error controlling playback:', error);
    }
  }, [isPlaying, playerReady]);

  const handlePlayToggle = () => {
    if (!track.youtubeVideoId) return;
    onPlayToggle(track.youtubeVideoId);
  };

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg border">
      {/* Artwork and Play Button */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <img
          src={track.thumb || '/api/placeholder/64/64'}
          alt={track.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={handlePlayToggle}
          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors rounded-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{track.title}</div>
        <div className="text-sm text-text/60 flex items-center gap-2">
          <span>{track.artist}</span>
          {track.extraArtists && (
            <span className="text-text/40">feat. {track.extraArtists}</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-text/60">
          <span className="font-mono">{track.bpm} BPM</span>
          <span>•</span>
          <span className="font-mono">{track.key}</span>
          <span>•</span>
          <span>{track.style?.join(', ')}</span>
        </div>
      </div>

      {/* Release Info */}
      <div className="flex items-center gap-2 text-sm text-text/60">
        <Disc className="w-4 h-4" />
        <div>{track.releaseTitle}</div>
        <div>({track.releaseYear})</div>
      </div>

      <div id={`player-${track.id}`} style={{ display: 'none' }} />
    </div>
  );
};

export default TrackView;