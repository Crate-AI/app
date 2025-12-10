import { createFileRoute } from '@tanstack/react-router';
import { getEvent } from 'vinxi/http';

export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        // Try multiple ways to access Cloudflare env
        let eventInfo: Record<string, unknown> = {};
        let cloudflareEnv: Record<string, unknown> | null = null;

        try {
          const event = getEvent();
          // Explore the event structure
          eventInfo = {
            hasEvent: !!event,
            contextKeys: event?.context ? Object.keys(event.context) : [],
            // Check various possible locations
            hasCloudflare: !!(event?.context as any)?.cloudflare,
            hasCf: !!(event?.context as any)?.cf,
            hasEnv: !!(event?.context as any)?.env,
            hasPlatform: !!(event?.context as any)?.platform,
            // Check nested
            cloudflareKeys: (event?.context as any)?.cloudflare
              ? Object.keys((event.context as any).cloudflare)
              : [],
          };

          // Try different paths
          cloudflareEnv =
            (event?.context as any)?.cloudflare?.env ||
            (event?.context as any)?.env ||
            (event?.context as any)?.cf?.env ||
            null;
        } catch (e: any) {
          eventInfo = { error: e.message };
        }

        // Check what environment variables are available
        const debugInfo = {
          origin,
          eventInfo,
          processEnv: {
            hasDiscogsKey: !!process.env.DISCOGS_CONSUMER_KEY,
            hasDiscogsSecret: !!process.env.DISCOGS_CONSUMER_SECRET,
            hasViteDiscogsKey: !!process.env.VITE_DISCOGS_CONSUMER_KEY,
            hasViteDiscogsSecret: !!process.env.VITE_DISCOGS_CONSUMER_SECRET,
            nodeEnv: process.env.NODE_ENV,
            // List all env keys (to see what's available)
            allKeys: Object.keys(process.env).filter(
              (k) => !k.startsWith('npm_'),
            ),
          },
          cloudflareEnv: cloudflareEnv
            ? {
                hasDiscogsKey: !!(cloudflareEnv as any).DISCOGS_CONSUMER_KEY,
                hasDiscogsSecret: !!(cloudflareEnv as any)
                  .DISCOGS_CONSUMER_SECRET,
                availableKeys: Object.keys(cloudflareEnv),
              }
            : 'not available',
        };

        return Response.json(debugInfo);
      },
    },
  },
});
