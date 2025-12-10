import { createFileRoute } from '@tanstack/react-router';
import { getEvent } from 'vinxi/http';

export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        // Try to get Cloudflare env from the event context
        let cloudflareEnv: Record<string, unknown> | null = null;
        try {
          const event = getEvent();
          // Cloudflare Workers adapter puts env in context.cloudflare.env
          cloudflareEnv = (event?.context as any)?.cloudflare?.env || null;
        } catch (e) {
          // getEvent might not be available
        }

        // Check what environment variables are available
        const debugInfo = {
          origin,
          // process.env (build-time only in Workers)
          processEnv: {
            hasDiscogsKey: !!process.env.DISCOGS_CONSUMER_KEY,
            discogsKeyLength: process.env.DISCOGS_CONSUMER_KEY?.length || 0,
            hasDiscogsSecret: !!process.env.DISCOGS_CONSUMER_SECRET,
            discogsSecretLength:
              process.env.DISCOGS_CONSUMER_SECRET?.length || 0,
            hasViteDiscogsKey: !!process.env.VITE_DISCOGS_CONSUMER_KEY,
            viteDiscogsKeyLength:
              process.env.VITE_DISCOGS_CONSUMER_KEY?.length || 0,
            hasViteDiscogsSecret: !!process.env.VITE_DISCOGS_CONSUMER_SECRET,
            viteDiscogsSecretLength:
              process.env.VITE_DISCOGS_CONSUMER_SECRET?.length || 0,
            nodeEnv: process.env.NODE_ENV,
          },
          // Cloudflare env bindings (runtime secrets)
          cloudflareEnv: cloudflareEnv
            ? {
                hasDiscogsKey: !!(cloudflareEnv as any).DISCOGS_CONSUMER_KEY,
                discogsKeyLength:
                  ((cloudflareEnv as any).DISCOGS_CONSUMER_KEY as string)
                    ?.length || 0,
                hasDiscogsSecret: !!(cloudflareEnv as any)
                  .DISCOGS_CONSUMER_SECRET,
                discogsSecretLength:
                  ((cloudflareEnv as any).DISCOGS_CONSUMER_SECRET as string)
                    ?.length || 0,
                availableKeys: Object.keys(cloudflareEnv),
              }
            : 'not available',
        };

        return Response.json(debugInfo);
      },
    },
  },
});
