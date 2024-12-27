// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `As a DJ assistant, analyze record collections and suggest tracks based on:
- Venue type (club, bar, lounge)
- Time slot (warm-up, peak time, closing)
- Genre compatibility
- BPM/Energy level appropriateness
- Crowd expectations`;

export async function POST(req: NextRequest) {
  try {
    const { messages, collection } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: messages.filter((msg: any) => msg.role !== 'system'),
      system: SYSTEM_PROMPT + `\nAvailable tracks: ${JSON.stringify(collection)}`,
    });

    return Response.json(response);
  } catch (error) {
    console.error('Claude API error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}