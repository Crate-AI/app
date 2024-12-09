import { findYtVideo, getYtAudio } from '@/lib/youtubeDl';
import { NextResponse } from 'next/server';

// Define the POST handler
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { search_query } = data;

    if (!search_query) {
      return NextResponse.json(
        { error: 'search_query is required' },
        { status: 400 },
      );
    }

    const url = await findYtVideo(search_query);
    const info = await getYtAudio(url);

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    console.error('Video fetch error: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 },
    );
  }
}
