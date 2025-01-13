'use client'

import { useState, ReactNode, useEffect } from 'react'
import { X,Sparkles, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils/utils'
import ChatInterface from './components/AIChat/ChatInterface'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'
import { useTracksStore } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import ErrorBoundary from '@/components/Error/ErrorBoundary'

interface AIDJLayoutProps {
  children: ReactNode
}

export default function AIDJLayout({ children }: AIDJLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { allTracks: tracks, setAllTracks } = useTracksStore()

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/tracks', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to fetch tracks')
        const data = await res.json()
        setAllTracks(data.tracks || [])
      } catch (error) {
        console.error('Error fetching tracks:', error)
      }
    }
    fetchTracks()
  }, [setAllTracks])

  const handleTracksFilter = (filteredTracks: CrateTrack[]) => {
    console.log('Filtering tracks:', filteredTracks)
    // Implement filtering logic here
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        {/* Main content */}
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            isChatOpen ? 'mr-[400px]' : 'mr-0'
          )}
        >
          {children}
        </div>

        {/* Chat toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-24 right-6 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6" />
          )}
        </Button>

        {/* Chat panel */}
        <Card
          className={cn(
            'fixed right-0 w-[400px] transition-transform duration-300 ease-in-out',
            'border-l shadow-xl',
            'top-[120px] bottom-0',
            isChatOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">DJ Assistant</h2>
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </div>
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