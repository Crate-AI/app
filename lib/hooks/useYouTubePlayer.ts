import { useState, useEffect, useRef } from 'react';

interface UseYouTubePlayerProps {
  onReady?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export function useYouTubePlayer({ onReady, onEnd, onError }: UseYouTubePlayerProps = {}) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<{ current: HTMLDivElement | null }>({ current: null });

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'youtube-player';
    container.style.position = 'absolute';
    container.style.visibility = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.width = '1px';
    container.style.height = '1px';
    document.body.appendChild(container);
    containerRef.current.current = container;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if (window.YT && window.YT.Player && containerRef.current.current) {
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
              setIsPlayerReady(true);
              onReady?.();
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onEnd?.();
              }
            },
            onError: (event: any) => {
              onError?.(event);
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
  }, [onReady, onEnd, onError]);

  return { playerRef, isPlayerReady };
} 