import { NextResponse } from 'next/server';
import { createClient } from '@/lib/database/server';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { getCollectionTracks } = CollectionUtils(supabase);
    const tracks = await getCollectionTracks();

    if (!tracks) {
      return NextResponse.json({ tracks: [] });
    }

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Tracks API error:', error);
    return NextResponse.json({ tracks: [] }, { status: 200 });
  }
}
