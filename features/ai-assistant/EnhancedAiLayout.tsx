'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Bot, Loader2, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/utils';
import EnhancedChatInterface from '@/features/ai-assistant/components/chat/EnhancedChatInterface';
import { CrateTrack } from '@/types';
import { useTracksStore, usePlayerStore } from '@/stores';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { toast } from 'sonner';

interface EnhancedAiLayoutProps {
  children: React.ReactNode;
}

export default function EnhancedAiLayout({ children }: EnhancedAiLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [chatPosition, setChatPosition] = useState<'sidebar' | 'overlay' | 'bottom'>('sidebar');
  const { allTracks: tracks, setAllTracks } = useTracksStore();
  const { initializePlayer } = usePlayerStore();

  // Initialize player when layout mounts
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);

  // Detect mobile and set appropriate chat position
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setChatPosition(mobile ? 'overlay' : 'sidebar');
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch tracks on mount
  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/music/tracks', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch tracks');
        const data = await res.json();
        if (!data.tracks) {
          throw new Error('No tracks data received');
        }
        setAllTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        toast.error('Failed to load tracks for AI assistant');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (tracks.length === 0) {
      fetchTracks();
    } else {
      setIsLoading(false);
    }
  }, [setAllTracks, tracks.length]);

  const handleTracksFilter = (filteredTracks: CrateTrack[]) => {
    if (filteredTracks.length > 0) {
      toast.success(`AI found ${filteredTracks.length} matching tracks`);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        toggleChat();
      }
      if (e.key === 'Escape' && isChatOpen) {
        closeChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading AI assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        {/* Main Content */}
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            chatPosition === 'sidebar' && isChatOpen && 'lg:mr-[450px] xl:mr-[500px]',
            chatPosition === 'bottom' && isChatOpen && 'pb-[400px]'
          )}
        >
          {children}
        </div>

        {/* Mobile Overlay */}
        {isMobile && isChatOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeChat}
          />
        )}

        {/* Chat Interface - Sidebar/Overlay */}
        {chatPosition !== 'bottom' && (
          <Card
            className={cn(
              'fixed right-0 top-16 bottom-0 transition-all duration-300 ease-in-out z-50',
              'border-l-2 border-black shadow-light bg-bg',
              {
                'w-full sm:w-[450px] xl:w-[500px]': isChatOpen && chatPosition === 'sidebar',
                'w-full h-full': isChatOpen && chatPosition === 'overlay',
                'translate-x-0': isChatOpen,
                'translate-x-full': !isChatOpen
              }
            )}
          >
            {isChatOpen && (
              <EnhancedChatInterface
                tracks={tracks}
                onTracksFilter={handleTracksFilter}
                isOpen={isChatOpen}
                onClose={closeChat}
              />
            )}
          </Card>
        )}

        {/* Chat Interface - Bottom (Tablet/Small Desktop) */}
        {chatPosition === 'bottom' && (
          <Card
            className={cn(
              'fixed bottom-0 left-0 right-0 transition-all duration-300 ease-in-out z-50',
              'border-t-2 border-black shadow-light bg-bg',
              {
                'h-[400px]': isChatOpen,
                'translate-y-0': isChatOpen,
                'translate-y-full': !isChatOpen
              }
            )}
          >
            {isChatOpen && (
              <EnhancedChatInterface
                tracks={tracks}
                onTracksFilter={handleTracksFilter}
                isOpen={isChatOpen}
                onClose={closeChat}
              />
            )}
          </Card>
        )}

        {/* Chat Toggle Button */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
          {/* Quick Info Badge - Only show when closed and has tracks */}
          {!isChatOpen && tracks.length > 0 && (
            <div className="bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-text">{tracks.length} tracks ready</span>
              </div>
            </div>
          )}

          {/* Main Chat Button */}
          <Button
            onClick={toggleChat}
            className={cn(
              "h-14 w-14 rounded-base shadow-light border-2 border-black transition-all duration-200",
              "bg-main hover:bg-mainAccent text-black font-medium",
              "hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
              isChatOpen && "rotate-180"
            )}
          >
            {isChatOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Keyboard Shortcut Hint - Separate positioned element */}
        {!isChatOpen && (
          <div className="fixed bottom-6 right-24 z-40 hidden lg:block">
            <div className="bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2 text-xs text-text whitespace-nowrap">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-black rounded-base text-xs font-mono">⌘/</kbd>
                <span>to open chat</span>
              </div>
            </div>
          </div>
        )}


      </div>
    </ErrorBoundary>
  );
} 