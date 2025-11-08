import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// GET - Fetch user's favorite tracks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data: favorites, error } = await supabase
      .from('user_favorites')
      .select(`
        track_id,
        created_at,
        tracks:track_id (
          id,
          title,
          artist,
          duration,
          youtube_video_id,
          artwork,
          genres,
          styles,
          discogs_release_id,
          position
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }

    const favoriteTrackIds = favorites?.map(fav => fav.track_id) || [];
    
    return NextResponse.json({ 
      favoriteTrackIds,
      favorites: favorites || []
    });
  } catch (error) {
    console.error('Error in GET favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Add track to favorites
export async function POST(request: Request) {
  try {
    const { userId, trackId } = await request.json();

    if (!userId || !trackId) {
      return NextResponse.json({ error: 'User ID and Track ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: userId,
        track_id: trackId,
      })
      .select()
      .single();

    if (error) {
      // Handle unique constraint violation (already favorited)
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Track already in favorites' }, { status: 200 });
      }
      console.error('Error adding favorite:', error);
      return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Added to favorites' });
  } catch (error) {
    console.error('Error in POST favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove track from favorites
export async function DELETE(request: Request) {
  try {
    const { userId, trackId } = await request.json();

    if (!userId || !trackId) {
      return NextResponse.json({ error: 'User ID and Track ID are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('track_id', trackId);

    if (error) {
      console.error('Error removing favorite:', error);
      return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error in DELETE favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 