import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';

export const Route = createFileRoute('/api/music/playlists')({
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

          return Response.json(playlists);
        } catch (error) {
          console.error('Error in GET /api/music/playlists:', error);
          return Response.json(
            { error: (error as Error).message },
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

          const { title, description } = await request.json();
          if (!title) {
            return Response.json(
              { error: 'Title is required' },
              { status: 400 },
            );
          }

          // Get user data from cookie
          const userDataCookie = cookies['user_data'];
          const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
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

          return Response.json(playlist);
        } catch (error) {
          console.error('Error in POST /api/music/playlists:', error);
          return Response.json(
            { error: (error as Error).message },
            { status: 500 },
          );
        }
      },
    },
  },
});
