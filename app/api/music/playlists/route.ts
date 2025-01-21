import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { auth } from '@/lib/supabase/auth';

export async function GET() {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: playlists, error } = await supabase
      .from('playlists')
      .select(`
        *,
        playlist_tracks (
          *,
          track: tracks (*)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(playlists);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { data: playlist, error } = await supabase
      .from('playlists')
      .insert({
        title,
        description,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(playlist);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 