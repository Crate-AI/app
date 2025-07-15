import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: playlists, error } = await supabase
      .from('playlists')
      .select(
        `
        *,
        playlist_tracks (
          *,
          track: tracks (*)
        )
      `,
      )
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(playlists);
  } catch (error) {
    console.error('Error in GET /api/music/playlists:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Get user data from cookie
    const userDataCookie = cookieStore.get('user_data');
    const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;
    const userId = userData?.userId || session.user.id;

    const { data: playlist, error } = await supabase
      .from('playlists')
      .insert({
        title,
        description,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error in POST /api/music/playlists:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
