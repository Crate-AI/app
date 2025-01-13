import { CoreMessage, streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'

export const runtime = 'edge'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})
const model = anthropic('claude-3-5-sonnet-20241022')

const SYSTEM_PROMPT = `You are a world class DJ assistant, helping DJs find perfect tracks for their sets. When suggesting tracks, always format them exactly like this:

"[Track Title]" - [Artist Name] ([BPM] BPM)

For example:
"Deep Burnt" - Pépé Bradock (127 BPM)

Always include the quotes around track titles for accurate parsing.`

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