import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { auth } from '@/lib/supabase/auth';

export async function POST(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify playlist ownership
    const { data: playlist } = await supabase
      .from('playlists')
      .select()
      .eq('id', params.playlistId)
      .eq('user_id', user.id)
      .single();

    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
    }

    const { trackId } = await request.json();
    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      );
    }

    // Get current highest position
    const { data: currentTracks } = await supabase
      .from('playlist_tracks')
      .select('position')
      .eq('playlist_id', params.playlistId)
      .order('position', { ascending: false })
      .limit(1);

    const newPosition = (currentTracks?.[0]?.position ?? -1) + 1;

    // Add track to playlist
    const { error } = await supabase
      .from('playlist_tracks')
      .insert({
        playlist_id: params.playlistId,
        track_id: trackId,
        position: newPosition
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify playlist ownership
    const { data: playlist } = await supabase
      .from('playlists')
      .select()
      .eq('id', params.playlistId)
      .eq('user_id', user.id)
      .single();

    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
    }

    const { trackId } = await request.json();
    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('playlist_tracks')
      .delete()
      .eq('playlist_id', params.playlistId)
      .eq('track_id', trackId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 