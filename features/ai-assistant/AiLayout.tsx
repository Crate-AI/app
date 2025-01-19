'use client'

import { useState, ReactNode, useEffect } from 'react'
import { X, Sparkles, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils/utils'
import ChatInterface from '@/features/ai-assistant/components/chat/ChatInterface'
import { CrateTrack } from '@/types'
import { useTracksStore } from '@/stores'
import ErrorBoundary from '@/components/Error/ErrorBoundary'
import { toast } from 'sonner'

interface AiLayoutProps {
  children: ReactNode
}

export default function AiLayout({ children }: AiLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { allTracks: tracks, setAllTracks } = useTracksStore()



  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/music/tracks', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to fetch tracks')
        const data = await res.json()
        if (!data.tracks) {
          throw new Error('No tracks data received')
        }
        setAllTracks(data.tracks)
      } catch (error) {
        console.error('Error fetching tracks:', error)
        toast.error('Failed to load tracks')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTracks()
  }, [setAllTracks])

  const handleTracksFilter = (filteredTracks: CrateTrack[]) => {
    if (filteredTracks.length > 0) {
      toast.success(`Found ${filteredTracks.length} matching tracks`)
    }
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            {
              'lg:mr-[350px] xl:mr-[400px]': isChatOpen,
              'mr-0': !isChatOpen
            }
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            children
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "fixed lg:bottom-20 bottom-16 lg:right-8 right-4 h-12 w-12 rounded-full shadow-lg z-50",
            "bg-background hover:bg-accent transition-all duration-200",
            "hover:scale-110 active:scale-95",
            isChatOpen && "rotate-180"
          )}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6" />
          )}
        </Button>

        <Card
          className={cn(
            'fixed right-0 transition-all duration-300 ease-in-out',
            'border-l shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
            'top-[164px] bottom-0 z-40',
            {
              'w-full sm:w-[350px] xl:w-[400px]': isChatOpen,
              'translate-x-0': isChatOpen,
              'translate-x-full': !isChatOpen
            }
          )}
        >
          <div className="flex flex-col h-full">
            <div className="border-b p-4 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary animate-pulse" />
                <h2 className="text-lg font-semibold">DJ Assistant</h2>
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent/10"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ChatInterface 
              tracks={tracks}
              onTracksFilter={handleTracksFilter}
            />
          </div>
        </Card>
      </div>
    </ErrorBoundary>
  )
}