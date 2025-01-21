import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get user data from cookie
    const userDataCookie = cookieStore.get('user_data');
    const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;
    
    if (!userData?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify playlist ownership
    const { data: playlist, error: playlistError } = await supabase
      .from('playlists')
      .select()
      .eq('id', params.playlistId)
      .eq('user_id', userData.userId)
      .single();

    if (playlistError || !playlist) {
      console.error('Error verifying playlist ownership:', playlistError);
      return NextResponse.json(
        { error: 'Playlist not found or unauthorized' },
        { status: 404 }
      );
    }

    const { trackId } = await request.json();
    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      );
    }

    // Get the current highest position
    const { data: currentTracks, error: positionError } = await supabase
      .from('playlist_tracks')
      .select('position')
      .eq('playlist_id', params.playlistId)
      .order('position', { ascending: false })
      .limit(1);

    if (positionError) {
      console.error('Error getting track positions:', positionError);
      throw positionError;
    }

    const nextPosition = currentTracks?.[0]?.position 
      ? currentTracks[0].position + 1 
      : 0;

    // Add track to playlist
    const { error: insertError } = await supabase
      .from('playlist_tracks')
      .insert({
        playlist_id: params.playlistId,
        track_id: trackId,
        position: nextPosition
      });

    if (insertError) {
      console.error('Error adding track to playlist:', insertError);
      throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/music/playlists/[playlistId]/tracks:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { playlistId: string; trackId: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get user data from cookie
    const userDataCookie = cookieStore.get('user_data');
    const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;
    
    if (!userData?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('playlist_tracks')
      .delete()
      .eq('playlist_id', params.playlistId)
      .eq('track_id', params.trackId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 