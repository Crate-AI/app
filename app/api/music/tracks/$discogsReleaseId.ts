import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@/lib/supabase/server';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';
import { parse } from 'cookie';

export const Route = createFileRoute('/api/music/tracks/$discogsReleaseId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];

          if (!accessToken || !accessTokenSecret) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }

          const supabase = await createClient({ request });

          const { getReleaseTracks } = CollectionUtils(supabase as any);
          const tracks = await getReleaseTracks(params.discogsReleaseId);

          return Response.json(tracks, { status: 200 });
        } catch (error) {
          console.error('Could not fetch release', error);
          return Response.json(
            { error: 'Could not fetch release' },
            { status: 500 },
          );
        }
      },
    },
  },
});
