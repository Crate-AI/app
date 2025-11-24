import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';

export const Route = createFileRoute('/api/music/playlists/$playlistId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const supabase = await createClient({ request });
          const cookies = parse(request.headers.get('cookie') || '');
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
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
            .eq('user_id', session.user.id)
            .single();

          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }

          return Response.json(playlist);
        } catch (error) {
          return Response.json(
            { error: (error as Error).message },
            { status: 500 },
          );
        }
      },
      PUT: async ({ request, params }) => {
        try {
          const supabase = await createClient({ request });
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

          const { data: playlist, error } = await supabase
            .from('playlists')
            .update({ title, description })
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .select()
            .single();

          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }

          return Response.json(playlist);
        } catch (error) {
          return Response.json(
            { error: (error as Error).message },
            { status: 500 },
          );
        }
      },
      PATCH: async ({ request, params }) => {
        try {
          const supabase = await createClient({ request });
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          const { is_public } = await request.json();

          const { data: playlist, error } = await supabase
            .from('playlists')
            .update({ is_public })
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .select()
            .single();

          if (error) throw error;
          if (!playlist) {
            return Response.json(
              { error: 'Playlist not found' },
              { status: 404 },
            );
          }

          return Response.json(playlist);
        } catch (error) {
          console.error('Error updating playlist:', error);
          return Response.json(
            { error: (error as Error).message },
            { status: 500 },
          );
        }
      },
      DELETE: async ({ request, params }) => {
        try {
          const supabase = await createClient({ request });
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          // Verify playlist ownership
          const { data: playlist, error: playlistError } = await supabase
            .from('playlists')
            .select()
            .eq('id', params.playlistId)
            .eq('user_id', session.user.id)
            .single();

          if (playlistError || !playlist) {
            return Response.json(
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

          return Response.json({ success: true });
        } catch (error) {
          console.error('Error deleting playlist:', error);
          return Response.json(
            { error: (error as Error).message },
            { status: 500 },
          );
        }
      },
    },
  },
});
