import { create } from 'zustand';
import type { YouTubePlayer as YTPlayer, YouTubeEvent } from '@/types/youtube';

interface PlayerState {
  player: YTPlayer | null;
  isReady: boolean;
  playingTrackId: string | null;
  initializePlayer: () => Promise<void>;
  setPlayer: (player: YTPlayer) => void;
  setIsReady: (ready: boolean) => void;
  setPlayingTrackId: (trackId: string | null) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  player: null,
  isReady: false,
  playingTrackId: null,

  initializePlayer: async () => {
    try {
      await new Promise<void>((resolve) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }

        window.onYouTubeIframeAPIReady = resolve;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      });

      const container = document.createElement('div');
      container.id = 'youtube-player';
      container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
      document.body.appendChild(container);

      const ytPlayer = new window.YT.Player('youtube-player', {
        width: '1',
        height: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: () => {
            set({ player: ytPlayer, isReady: true });
          },
          onStateChange: (event: YouTubeEvent) => {
            if (event.data !== -1) {
              set({ isReady: true });
            }
          },
          onError: (event: YouTubeEvent) => {
            if ([2, 5, 100, 101, 150].includes(event.data)) {
              set({ isReady: false, player: null });
            }
          }
        }
      });
    } catch (error) {
      set({ isReady: false, player: null });
    }
  },

  setPlayer: (player) => set({ player }),
  setIsReady: (ready) => set({ isReady: ready }),
  setPlayingTrackId: (trackId) => set({ playingTrackId: trackId }),
  reset: () => set({ player: null, isReady: false, playingTrackId: null })
})); 