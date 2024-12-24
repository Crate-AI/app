import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Clock, Music, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Track, Release } from '@/types/discogs';

interface TrackWithMetadata extends Track {
  bpm?: number;
  videoUrl?: string | null;
  videoId?: string | null;
}

interface ReleaseTracksProps {
  releaseId: number;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const searchYouTube = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) throw new Error('Failed to search YouTube');
    const data = await response.json();
    return data.videoId;
  } catch (err) {
    console.error('YouTube search failed:', err);
    return null;
  }
};

const ReleaseTracks = ({ releaseId }: ReleaseTracksProps) => {
  const [tracks, setTracks] = useState<TrackWithMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<{ current: HTMLDivElement | null }>({ current: null });
  const [searchedTracks, setSearchedTracks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'youtube-player';
    container.style.position = 'absolute';
    container.style.visibility = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.width = '1px';
    container.style.height = '1px';
    document.body.appendChild(container);
    playerContainerRef.current.current = container;

    // Load YouTube IFrame Player API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if (window.YT && window.YT.Player && playerContainerRef.current.current) {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '1',
          width: '1',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              console.log('YouTube player is ready');
              setIsPlayerReady(true);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setPlayingTrackId(null);
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event);
              setPlayingTrackId(null);
              setError('Failed to play track');
            }
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      container.remove();
    };
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/discogs/release/${releaseId}`);
        if (!response.ok) throw new Error('Failed to fetch release details');
        
        const data: Release = await response.json();
        
        const tracksWithMetadata = await Promise.all(data.tracklist.map(async track => {
          // Try Discogs videos first
          const matchingVideo = data.videos?.find(video => 
            video.title.toLowerCase() === track.title.toLowerCase() ||
            video.title.toLowerCase().includes(track.title.toLowerCase())
          );

          let videoId = matchingVideo?.uri 
            ? new URL(matchingVideo.uri).searchParams.get('v')
            : null;

          // Fallback to YouTube search if no match found
          if (!videoId && !searchedTracks.has(track.position)) {
            const searchQuery = `${track.title} ${data.artists[0]?.name || ''}`; 
            videoId = await searchYouTube(searchQuery);
            setSearchedTracks(prev => new Set([...prev, track.position]));
          }

          console.log('Track:', {
            title: track.title,
            matchedVideo: matchingVideo?.title || 'YouTube fallback',
            videoId,
            position: track.position
          });

          return {
            ...track,
            bpm: Math.floor(Math.random() * (140 - 115) + 115),
            videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
            videoId
          };
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

  const handlePlayToggle = async (track: TrackWithMetadata) => {
    if (!track.videoId || !playerRef.current || !isPlayerReady) {
      console.log('Cannot play: player not ready or no video ID');
      return;
    }

    try {
      if (playingTrackId === track.position) {
        playerRef.current.pauseVideo();
        setPlayingTrackId(null);
      } else {
        if (playingTrackId) {
          playerRef.current.stopVideo();
        }
        
        playerRef.current.loadVideoById({
          videoId: track.videoId,
          suggestedQuality: 'small'
        });
        
        await new Promise(resolve => setTimeout(resolve, 100));
        playerRef.current.playVideo();
        setPlayingTrackId(track.position);
      }
    } catch (err) {
      console.error('Failed to play track:', err);
      setError('Failed to play track');
    }
  };

  // Rest of the component remains the same...
  
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
              onClick={() => handlePlayToggle(track)}
              disabled={!track.videoId || !isPlayerReady}
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