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
    const { messages, tracks } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid or missing messages array')
    }

    const fullMessages: CoreMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Available Tracks: ${JSON.stringify(tracks)}` },
      ...messages
    ]

    const result = await streamText({
      model,
      messages: fullMessages,
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