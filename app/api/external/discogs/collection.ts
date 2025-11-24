import { createFileRoute } from '@tanstack/react-router';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';
import { createClient } from '@/lib/supabase/server';
import { parse } from 'cookie';
import { Release } from '@crate.ai/discogs-sdk/dist/collection/types';

export const Route = createFileRoute('/api/external/discogs/collection')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const cookies = parse(request.headers.get('cookie') || '');
          const accessToken = cookies['access_token'];
          const accessTokenSecret = cookies['access_token_secret'];
          const userData = cookies['user_data'];

          const supabase = await createClient({ request }); // Need to ensure this works
          const { ingestCollection, getCollection } = CollectionUtils(
            supabase as any,
          );

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

          // check if collection is already in the database
          const existingCollection = await getCollection();

          if (existingCollection && existingCollection.length > 0) {
            const collectionResponse = {
              pagination: {
                page: 1,
                pages: 1,
                per_page: existingCollection.length,
                items: existingCollection.length,
                urls: {
                  next: '',
                  last: '',
                },
              },
              releases: existingCollection.map(
                (row) => row.basic_release_data as unknown as Release,
              ),
            };
            return Response.json(collectionResponse);
          }

          // fetch collection from Discogs and ingest it into the database
          const collection = await sdk.collection.getCollection({
            username,
            page: 1,
            perPage: 100,
          });

          await ingestCollection(collection);

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
