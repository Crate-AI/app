import { createFileRoute } from '@tanstack/react-router';
import {
  getDiscogsCredentials,
  hasDiscogsCredentials,
} from '@/lib/config/env';

export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { consumerKey, consumerSecret } = getDiscogsCredentials();

        const debugInfo = {
          origin,
          hasCredentials: hasDiscogsCredentials(),
          credentials: {
            hasConsumerKey: !!consumerKey,
            consumerKeyLength: consumerKey?.length || 0,
            hasConsumerSecret: !!consumerSecret,
            consumerSecretLength: consumerSecret?.length || 0,
            // Show first 4 chars to verify correct key (safe to expose)
            keyPrefix: consumerKey?.substring(0, 4) || 'N/A',
          },
          environment: process.env.NODE_ENV,
        };

        return Response.json(debugInfo);
      },
    },
  },
});
