'use client'

import React, { useState, useCallback } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCompletion } from 'ai/react'
import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route'
import { useTracksStore } from '@/components/Features/AIDJAssistant/store/useTracksStore'
import { cn } from '@/lib/utils/utils'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

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
  const matches = content.matchAll(/["'](.+?)["']\s*-\s*(.+?)\s*\((\d+)\s*BPM\)/g)
  return Array.from(matches).map(match => ({
    title: match[1].trim(),
    artist: match[2].trim(),
    bpm: parseInt(match[3])
  }))
}

export default function ChatInterface({ tracks, onTracksFilter }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Hey DJ! I can help you find the perfect tracks. Try asking about specific genres, BPM ranges, or get mixing suggestions.'
  }])
  
  const setSuggestedTracks = useTracksStore(state => state.setSuggestedTracks)

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
        }
      }
    } catch (e) {
      console.error('Failed to process track suggestions:', e)
    }
  }, [tracks, setSuggestedTracks])

  const { completion, complete, input, handleInputChange, isLoading } = useCompletion({
    api: '/api/chat',
    body: { tracks },
    onFinish: (prompt, completion) => {
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'user', content: prompt },
        { id: (Date.now() + 1).toString(), role: 'assistant', content: completion }
      ])
      processTrackSuggestions(completion)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    try {
      await complete(input)
      handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-lg p-3 shadow-sm border transition-colors',
                message.role === 'user' 
                  ? 'bg-primary/10 border-primary/20 text-primary-foreground ml-auto hover:bg-primary/15'
                  : 'bg-muted/50 border-muted-foreground/20 text-foreground hover:bg-muted/60'
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted/30 border border-muted-foreground/20 text-foreground/70 rounded-lg p-3 shadow-sm">
              {completion || 'Thinking...'}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about tracks, mixing suggestions..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
} 