// app/api/chat/route.ts
import { CoreMessage, streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'

export const runtime = 'edge'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})
const model = anthropic('claude-3-5-sonnet-20241022')

const SYSTEM_PROMPT = `You are a world class DJ assistant, you are helping a DJ to find the perfect tracks for their set and  a music curator. Format your responses in two parts:

1. First, write your explanation and track list as plain text:
[track name] - [artist] ([bpm] BPM)`

export async function POST(req: Request) {
  try {
    const { prompt, tracks } = await req.json()
    if (!prompt) throw new Error('No prompt provided')

    const messages: CoreMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Tracks: ${JSON.stringify(tracks)}\n\nRequest: ${prompt}` }
    ]

    const result = await streamText({
      model,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: error?.message || 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}