import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';

export const Route = createFileRoute('/api/music/tracks')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase = await createClient({ request });
          const { getCollectionTracks } = CollectionUtils(supabase as any);
          const tracks = await getCollectionTracks();

          if (!tracks) {
            return Response.json({ tracks: [] });
          }

          return Response.json({ tracks });
        } catch (error) {
          console.error('Tracks API error:', error);
          return Response.json({ tracks: [] }, { status: 200 });
        }
      },
    },
  },
});
