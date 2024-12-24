// app/api/youtube/[videoId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const videoId = params.videoId;
    
    // First get video details to ensure it exists and is playable
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=contentDetails,snippet`
    );
    const videoData = await videoResponse.json();
    
    if (!videoData.items?.length) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    const response = {
      audioUrl: `https://www.youtube.com/embed/${videoId}?enablejsapi=1`,
      title: videoData.items[0].snippet.title,
      duration: videoData.items[0].contentDetails.duration
    }
    // Return a signed URL for the iframe player API
    return NextResponse.json(response);

  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to get video data' },
      { status: 500 }
    );
  }
}