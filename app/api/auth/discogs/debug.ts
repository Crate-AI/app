import { createFileRoute } from '@tanstack/react-router';
import {
  getDiscogsCredentials,
  hasDiscogsCredentials,
  getEnvironment,
  getCloudflareEnv,
} from '@/lib/config/env';

/**
 * Debug endpoint for verifying Discogs credentials are properly configured.
 *
 * This endpoint is useful for:
 * - Verifying secrets are loaded in production after deployment
 * - Debugging local development setup
 * - Checking .dev.vars is properly configured
 *
 * @route GET /api/auth/discogs/debug
 */
export const Route = createFileRoute('/api/auth/discogs/debug')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { consumerKey, consumerSecret } = getDiscogsCredentials();
        const cfEnv = getCloudflareEnv();

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
          environment: getEnvironment() || 'not-set',
          // List all available env keys (without values) for debugging
          availableBindings: Object.keys(cfEnv),
        };

        return Response.json(debugInfo);
      },
    },
  },
});
