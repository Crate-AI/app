// app/api/chat/route.ts
import { CoreMessage, streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'

export const runtime = 'edge'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})
const model = anthropic('claude-3-5-sonnet-20241022');

const SYSTEM_PROMPT = `As a DJ assistant, analyze record collections and suggest tracks based on:
- Venue type (club, bar, lounge)
- Time slot (warm-up, peak time, closing)
- Genre compatibility
- BPM/Energy level appropriateness
- Crowd expectations`

export async function POST(req: Request) {
  try {
    const { prompt, collection } = await req.json()
    console.log('collection', collection)
    // Create a message array with the user's prompt
    const messages: CoreMessage[] = [
      { role: 'user', content: prompt }
    ]

    const result = await streamText({
      model,
      messages,
      system: SYSTEM_PROMPT + `\nAvailable tracks: ${JSON.stringify(collection)}`,
    })

    
    return result.toDataStreamResponse()

  } catch (error: any) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({
        error: error?.message || 'An error occurred during the request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}