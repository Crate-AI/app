import { DJAssistantPrompt } from '@/lib/prompts/dj-assistant';
import { TrackWithDetails } from '@/types/dj';

interface ClaudeMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function sendMessageToClaude(prompt: string, tracks: TrackWithDetails[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      messages: [
        { 
          role: 'user', 
          content: DJAssistantPrompt.createUserPrompt(prompt, tracks)
        }
      ],
      collection: tracks
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message to Claude');
  }

  return response.json();
}