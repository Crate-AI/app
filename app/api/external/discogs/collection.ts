import { createFileRoute } from '@tanstack/react-router';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { parse } from 'cookie';
import { Release } from '@crate.ai/discogs-sdk/dist/collection/types';

/**
 * This API route fetches the user's Discogs collection.
 *
 * Note: Database operations have been migrated to Convex. This route now:
 * 1. Fetches collection directly from Discogs API
 * 2. Returns the data (client should call Convex to persist if needed)
 *
 * For cached collection data, the client should use the Convex query:
 * api.discogsCollection.getCollection
 */
export const Route = createFileRoute('/api/external/discogs/collection')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];
          const userData = cookies['user_data'];

          if (!accessToken || !accessTokenSecret || !userData) {
            return Response.json(
              { error: 'Authentication required' },
              { status: 401 },
            );
          }

          const userDataJson = JSON.parse(decodeURIComponent(userData));
          const username = userDataJson?.username;

          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: import.meta.env.VITE_DISCOGS_CONSUMER_KEY || '',
            DiscogsConsumerSecret:
              import.meta.env.VITE_DISCOGS_CONSUMER_SECRET || '',
            userAgent: 'CrateApp/1.0 +https://crate.ai',
          });

          const tokenManager = sdk.auth.base.getTokenManager();
          await tokenManager.setAccessToken(accessToken);
          await tokenManager.setAccessTokenSecret(accessTokenSecret);

          // Fetch collection from Discogs API
          const collection = await sdk.collection.getCollection({
            username,
            page: 1,
            perPage: 100,
          });

          return Response.json(collection);
        } catch (error) {
          console.error('Error fetching collection:', error);
          return Response.json(
            { error: 'Failed to fetch collection' },
            { status: 500 },
          );
        }
      },
    },
  },
});
