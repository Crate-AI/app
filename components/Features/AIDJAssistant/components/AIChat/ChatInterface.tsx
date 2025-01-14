'use client'

import React, { useCallback, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChat } from 'ai/react'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'
import { useTracksStore } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import { cn } from '@/lib/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ChatLoader } from '@/components/Features/AIDJAssistant/components/ChatLoader'
import { useAuthStore } from '@/lib/store/authStore';
interface ChatInterfaceProps {
  tracks: CrateTrack[]
  onTracksFilter?: (tracks: CrateTrack[]) => void
}

interface ParsedTrack {
  title: string
  artist: string
  bpm: number
}

const findMatchingTrack = (suggestion: ParsedTrack, tracks: CrateTrack[]) => {
  // Try exact match first
  let match = tracks.find(t => 
    t.title.toLowerCase() === suggestion.title.toLowerCase() &&
    t.artist.toLowerCase().includes(suggestion.artist.toLowerCase())
  )

  // If no exact match, try fuzzy matching
  if (!match) {
    match = tracks.find(t => 
      t.title.toLowerCase().includes(suggestion.title.toLowerCase()) ||
      suggestion.title.toLowerCase().includes(t.title.toLowerCase())
    )
  }

  return match
}

const parseTracksFromMessage = (content: string): ParsedTrack[] => {
  // Match both old format "(123 BPM)" and new format "$$123 BPM$$"
  const matches = content.matchAll(/["'](.+?)["']\s*-\s*(.+?)\s*(?:\(|$$)(\d+)\s*BPM(?:\)|$$)/g)
  return Array.from(matches).map(match => ({
    title: match[1].trim(),
    artist: match[2].trim(),
    bpm: parseInt(match[3])
  }))
}

export default function ChatInterface({ tracks, onTracksFilter }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const setSuggestedTracks = useTracksStore(state => state.setSuggestedTracks)
  const { userIdentity } = useAuthStore();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { tracks },
    onFinish: (message) => {
      processTrackSuggestions(message.content)
    }
  })

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Separate processing from rendering
  const processTrackSuggestions = useCallback((content: string) => {
    try {
      const suggestedTracks = parseTracksFromMessage(content)
      if (suggestedTracks.length > 0) {
        const matchedTracks = suggestedTracks
          .map(suggestion => findMatchingTrack(suggestion, tracks))
          .filter(Boolean) as CrateTrack[]

        if (matchedTracks.length > 0) {
          setSuggestedTracks(matchedTracks)
          onTracksFilter?.(matchedTracks)
        }
      }
    } catch (e) {
      console.error('Failed to process track suggestions:', e)
    }
  }, [tracks, setSuggestedTracks, onTracksFilter])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-[120px]">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback>
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'rounded-lg p-3 shadow-sm border transition-colors',
                    message.role === 'user' 
                      ? 'bg-primary/10 border-primary/20 text-primary-foreground ml-auto hover:bg-primary/15'
                      : 'bg-muted/50 border-muted-foreground/20 text-foreground hover:bg-muted/60'
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarImage src={userIdentity?.avatarUrl} alt="User" />
                    <AvatarFallback>{userIdentity?.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isLoading && <ChatLoader />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form 
        onSubmit={onSubmit} 
        className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed bottom-0 left-0 right-0 border-t border-border"
      >
        <div className="flex gap-2 max-w-[1200px] mx-auto">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about tracks, mixing suggestions..."
            disabled={isLoading}
            className="min-h-10"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLoading ? 'Thinking...' : 'Send message'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  )
}

