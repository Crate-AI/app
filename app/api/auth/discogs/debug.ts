import { createFileRoute } from '@tanstack/react-router';
import { env } from 'cloudflare:workers';

export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        // Access Cloudflare bindings the official way
        const cloudflareEnv = env as Record<string, unknown>;

        const debugInfo = {
          origin,
          // Cloudflare env bindings (the correct way)
          cloudflareEnv: {
            hasDiscogsKey: !!cloudflareEnv.DISCOGS_CONSUMER_KEY,
            discogsKeyLength:
              (cloudflareEnv.DISCOGS_CONSUMER_KEY as string)?.length || 0,
            hasDiscogsSecret: !!cloudflareEnv.DISCOGS_CONSUMER_SECRET,
            discogsSecretLength:
              (cloudflareEnv.DISCOGS_CONSUMER_SECRET as string)?.length || 0,
            availableKeys: Object.keys(cloudflareEnv),
            // Show first 4 chars to verify correct key
            keyPrefix:
              (cloudflareEnv.DISCOGS_CONSUMER_KEY as string)?.substring(0, 4) ||
              'N/A',
          },
          // process.env (build-time only)
          processEnv: {
            hasViteDiscogsKey: !!process.env.VITE_DISCOGS_CONSUMER_KEY,
            hasViteDiscogsSecret: !!process.env.VITE_DISCOGS_CONSUMER_SECRET,
            nodeEnv: process.env.NODE_ENV,
          },
        };

        return Response.json(debugInfo);
      },
    },
  },
});
