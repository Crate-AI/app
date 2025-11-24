import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';

export const Route = createFileRoute('/api/music/playlists/$playlistId/tracks')(
  {
    server: {
      handlers: {
        POST: async ({ request, params }) => {
          try {
            const supabase = await createClient({ request });
            const cookies = parse(request.headers.get('cookie') || '');

            // Get user data from cookie
            const userDataCookie = cookies['user_data'];
            const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

            if (!userData?.userId) {
              return Response.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // Verify playlist ownership
            const { data: playlist, error: playlistError } = await supabase
              .from('playlists')
              .select()
              .eq('id', params.playlistId)
              .eq('user_id', userData.userId)
              .single();

            if (playlistError || !playlist) {
              console.error(
                'Error verifying playlist ownership:',
                playlistError,
              );
              return Response.json(
                { error: 'Playlist not found or unauthorized' },
                { status: 404 },
              );
            }

            const { trackId } = await request.json();
            if (!trackId) {
              return Response.json(
                { error: 'Track ID is required' },
                { status: 400 },
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
                position: nextPosition,
              });

            if (insertError) {
              console.error('Error adding track to playlist:', insertError);
              throw insertError;
            }

            return Response.json({ success: true });
          } catch (error) {
            console.error(
              'Error in POST /api/music/playlists/$playlistId/tracks:',
              error,
            );
            return Response.json(
              { error: (error as Error).message },
              { status: 500 },
            );
          }
        },
        DELETE: async ({ request, params }) => {
          try {
            const supabase = await createClient({ request });
            const cookies = parse(request.headers.get('cookie') || '');

            // Get user data from cookie
            const userDataCookie = cookies['user_data'];
            const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

            if (!userData?.userId) {
              return Response.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // Verify playlist ownership
            const { data: playlist, error: playlistError } = await supabase
              .from('playlists')
              .select()
              .eq('id', params.playlistId)
              .eq('user_id', userData.userId)
              .single();

            if (playlistError || !playlist) {
              console.error(
                'Error verifying playlist ownership:',
                playlistError,
              );
              return Response.json(
                { error: 'Playlist not found or unauthorized' },
                { status: 404 },
              );
            }

            const { trackId } = await request.json();
            if (!trackId) {
              return Response.json(
                { error: 'Track ID is required' },
                { status: 400 },
              );
            }

            const { error } = await supabase
              .from('playlist_tracks')
              .delete()
              .eq('playlist_id', params.playlistId)
              .eq('track_id', trackId);

            if (error) throw error;

            return Response.json({ success: true });
          } catch (error) {
            console.error('Error removing track from playlist:', error);
            return Response.json(
              { error: (error as Error).message },
              { status: 500 },
            );
          }
        },
      },
    },
  },
);
