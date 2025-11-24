import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';

export const Route = createFileRoute('/api/music/favorites')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');

          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          // Get user data from cookie
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;

          // Fetch the Favorites playlist
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();

          if (playlistError || !favoritesPlaylist) {
            return Response.json({ favoriteTrackIds: [], favorites: [] });
          }

          // Fetch tracks in the Favorites playlist
          const { data: playlistTracks, error: tracksError } = await supabase
            .from('playlist_tracks')
            .select(
              `
            track_id,
            created_at,
            tracks (
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
          `,
            )
            .eq('playlist_id', favoritesPlaylist.id)
            .order('created_at', { ascending: false });

          if (tracksError) {
            console.error('Error fetching favorite tracks:', tracksError);
            return Response.json(
              { error: 'Failed to fetch favorites' },
              { status: 500 },
            );
          }

          const favoriteTrackIds =
            playlistTracks?.map((pt) => pt.track_id) || [];

          return Response.json({
            favoriteTrackIds,
            favorites: playlistTracks || [],
          });
        } catch (error) {
          console.error('Error in GET favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const supabase = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');

          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          const { trackId } = await request.json();

          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }

          // Get user data from cookie
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;

          // Fetch the Favorites playlist
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();

          if (playlistError || !favoritesPlaylist) {
            return Response.json(
              { error: 'Favorites playlist not found' },
              { status: 404 },
            );
          }

          // Get the highest position in the playlist
          const { data: lastTrack, error: positionError } = await supabase
            .from('playlist_tracks')
            .select('position')
            .eq('playlist_id', favoritesPlaylist.id)
            .order('position', { ascending: false })
            .limit(1)
            .single();

          const nextPosition = (lastTrack?.position || 0) + 1;

          // Add track to Favorites playlist
          const { data, error } = await supabase
            .from('playlist_tracks')
            .insert({
              playlist_id: favoritesPlaylist.id,
              track_id: trackId,
              position: nextPosition,
            })
            .select()
            .single();

          if (error) {
            // Handle unique constraint violation (already in favorites)
            if (error.code === '23505') {
              return Response.json(
                { message: 'Track already in favorites' },
                { status: 200 },
              );
            }
            console.error('Error adding favorite:', error);
            return Response.json(
              { error: 'Failed to add favorite' },
              { status: 500 },
            );
          }

          return Response.json({ data, message: 'Added to favorites' });
        } catch (error) {
          console.error('Error in POST favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
      DELETE: async ({ request }) => {
        try {
          const supabase = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');

          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          const { trackId } = await request.json();

          if (!trackId) {
            return Response.json(
              { error: 'Track ID is required' },
              { status: 400 },
            );
          }

          // Get user data from cookie
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
          const userId = userData?.userId || session.user.id;

          // Fetch the Favorites playlist
          const { data: favoritesPlaylist, error: playlistError } =
            await supabase
              .from('playlists')
              .select('id')
              .eq('user_id', userId)
              .eq('is_favorites', true)
              .single();

          if (playlistError || !favoritesPlaylist) {
            return Response.json(
              { error: 'Favorites playlist not found' },
              { status: 404 },
            );
          }

          // Remove track from Favorites playlist
          const { error } = await supabase
            .from('playlist_tracks')
            .delete()
            .eq('playlist_id', favoritesPlaylist.id)
            .eq('track_id', trackId);

          if (error) {
            console.error('Error removing favorite:', error);
            return Response.json(
              { error: 'Failed to remove favorite' },
              { status: 500 },
            );
          }

          return Response.json({ message: 'Removed from favorites' });
        } catch (error) {
          console.error('Error in DELETE favorites:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          );
        }
      },
    },
  },
});
