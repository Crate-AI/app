import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 },
    );
  }

  try {
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(youtubeUrl);
    const data = await response.json();

    if (!data.items?.length) {
      return NextResponse.json({ error: 'No results' }, { status: 404 });
    }

    return NextResponse.json({
      videoId: data.items[0].id.videoId,
      title: data.items[0].snippet.title,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}
