import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { auth } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } },
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: playlist, error } = await supabase
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
      .eq('id', params.playlistId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(playlist);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { playlistId: string } },
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data: playlist, error } = await supabase
      .from('playlists')
      .update({ title, description })
      .eq('id', params.playlistId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(playlist);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { playlistId: string } },
) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify playlist ownership
    const { data: playlist, error: playlistError } = await supabase
      .from('playlists')
      .select()
      .eq('id', params.playlistId)
      .eq('user_id', session.user.id)
      .single();

    if (playlistError || !playlist) {
      return NextResponse.json(
        { error: 'Playlist not found or unauthorized' },
        { status: 404 },
      );
    }

    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', params.playlistId)
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
