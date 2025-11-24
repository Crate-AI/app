import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';
import { CrateTrack } from '@/types';
import { isExternalTrack } from '@/lib/utils/track-conversion';

export const Route = createFileRoute(
  '/api/music/playlists/$playlistId/external-tracks',
)({
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
            console.error('Error verifying playlist ownership:', playlistError);
            return Response.json(
              { error: 'Playlist not found or unauthorized' },
              { status: 404 },
            );
          }

          const { track }: { track: CrateTrack } = await request.json();
          if (!track || !track.id) {
            return Response.json(
              { error: 'Track data is required' },
              { status: 400 },
            );
          }

          // Verify this is an external track
          if (!isExternalTrack(track.id)) {
            return Response.json(
              {
                error:
                  'This endpoint is only for external tracks. Use the regular tracks endpoint for collection tracks.',
              },
              { status: 400 },
            );
          }

          // First, check if this external track already exists
          const { data: existingTrack } = await supabase
            .from('tracks')
            .select('id')
            .eq('id', track.id)
            .single();

          let trackId = track.id;

          if (!existingTrack) {
            // Insert the external track into the tracks table
            const { data: newTrack, error: trackError } = await supabase
              .from('tracks')
              .insert({
                id: track.id,
                title: track.title,
                artist: track.artist,
                discogs_release_id: track.discogs_release_id,
                duration: track.duration || '0:00',
                position: track.position || '1',
                artwork: track.artwork,
                youtube_video_id: track.youtube_video_id,
                extra_artists: track.extra_artists,
                genres: track.genres,
                styles: track.styles,
              })
              .select('id')
              .single();

            if (trackError) {
              console.error('Error creating external track:', trackError);
              return Response.json(
                { error: 'Failed to create external track' },
                { status: 500 },
              );
            }

            trackId = newTrack.id;
          }

          // Get the current highest position
          const { data: currentTracks, error: positionError } = await supabase
            .from('playlist_tracks')
            .select('position')
            .eq('playlist_id', params.playlistId)
            .order('position', { ascending: false })
            .limit(1);

          if (positionError) {
            console.error('Error fetching current tracks:', positionError);
            return Response.json(
              { error: 'Failed to fetch current tracks' },
              { status: 500 },
            );
          }

          const nextPosition =
            currentTracks.length > 0 ? currentTracks[0].position + 1 : 1;

          // Add track to playlist
          const { error: insertError } = await supabase
            .from('playlist_tracks')
            .insert({
              playlist_id: params.playlistId,
              track_id: trackId,
              position: nextPosition,
            });

          if (insertError) {
            console.error(
              'Error adding external track to playlist:',
              insertError,
            );
            return Response.json(
              { error: 'Failed to add external track to playlist' },
              { status: 500 },
            );
          }

          return Response.json({
            success: true,
            message: 'External track added to playlist successfully',
            trackId,
          });
        } catch (error) {
          console.error('Error in external-tracks route:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
    },
  },
});
