import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { DJAssistantPrompt } from '@/lib/prompts/dj-assistant';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, collection } = await req.json();
    console.log('Messages:', messages);
    console.log('Collection:', collection[0]);
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: messages,
      system: DJAssistantPrompt.systemPrompt,
    });
    console.log('Claude response:', response);
    return Response.json(response);
  } catch (error) {
    console.error('Claude API error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}