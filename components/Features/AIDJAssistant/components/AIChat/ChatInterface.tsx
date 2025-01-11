'use client'

import React from 'react'
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

export default function ChatInterface({ tracks, onTracksFilter }: ChatInterfaceProps) {
  const [messages, setMessages] = React.useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Hey DJ! I can help you find the perfect tracks. Try asking about specific genres, BPM ranges, or get mixing suggestions.'
  }])
  
  const setSuggestedTracks = useTracksStore(state => state.setSuggestedTracks)

  const formatMessage = (content: string) => {
    try {
      const jsonMatch = content.match(/__JSON__(.+)$/)
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1].trim())
        if (jsonData.tracks?.length > 0) {
          setSuggestedTracks(jsonData.tracks)
        }
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e)
    }

    const [displayText] = content.split('__JSON__')
    return <div className="whitespace-pre-wrap">{displayText.trim()}</div>
  }

  const { completion, complete, input, handleInputChange, isLoading } = useCompletion({
    api: '/api/chat',
    body: { tracks },
    onFinish: (prompt, completion) => {
      console.log('Completion received:', completion)
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'user', content: prompt },
        { id: (Date.now() + 1).toString(), role: 'assistant', content: completion }
      ])
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
              {formatMessage(message.content)}
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