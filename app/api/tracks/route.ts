import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CollectionUtils } from '@/lib/supabase/serverUtils/collection'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { getCollectionTracks } = CollectionUtils(supabase);
    const tracks = await getCollectionTracks();
    
    return NextResponse.json({ tracks: tracks || [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Could not fetch tracks' },
      { status: 500 },
    );
  }
} 