import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        // Check what environment variables are available
        const debugInfo = {
          origin,
          hasDiscogsKey: !!process.env.DISCOGS_CONSUMER_KEY,
          discogsKeyLength: process.env.DISCOGS_CONSUMER_KEY?.length || 0,
          hasDiscogsSecret: !!process.env.DISCOGS_CONSUMER_SECRET,
          discogsSecretLength: process.env.DISCOGS_CONSUMER_SECRET?.length || 0,
          hasViteDiscogsKey: !!process.env.VITE_DISCOGS_CONSUMER_KEY,
          viteDiscogsKeyLength:
            process.env.VITE_DISCOGS_CONSUMER_KEY?.length || 0,
          hasViteDiscogsSecret: !!process.env.VITE_DISCOGS_CONSUMER_SECRET,
          viteDiscogsSecretLength:
            process.env.VITE_DISCOGS_CONSUMER_SECRET?.length || 0,
          nodeEnv: process.env.NODE_ENV,
          // Check first 4 chars of key to verify it's correct (safe to expose partial)
          keyPrefix: process.env.DISCOGS_CONSUMER_KEY?.substring(0, 4) || 'N/A',
          viteKeyPrefix:
            process.env.VITE_DISCOGS_CONSUMER_KEY?.substring(0, 4) || 'N/A',
        };

        return Response.json(debugInfo);
      },
    },
  },
});
