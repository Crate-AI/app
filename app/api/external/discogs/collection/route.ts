import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';
import { createClient } from '@/lib/database/server';
import {
  CollectionResponse,
  Release,
} from '@crate.ai/discogs-sdk/dist/collection/types';

export const dynamic = 'force-dynamic';

/**
 * Fetches the user's collection from Discogs and ingests it into the database.
 * If the collection is already in the database, it will be returned from there, unless the `refreshCollection` flag is set in the request body in which case the collection will be fetched from Discogs and ingested into the database.
 * @param request - The incoming request
 * @returns The user's collection
 */
export async function GET(request: Request) {
  try {
    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;
    const userData = cookies().get('user_data')?.value;
    const supabase = await createClient();
    const { ingestCollection, getCollection } = CollectionUtils(supabase);

    if (!accessToken || !accessTokenSecret || !userData) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    const data = await request.json();
    const { refreshCollection }: { refreshCollection: string | undefined } =
      data;
    const userDataJson = JSON.parse(decodeURIComponent(userData));
    const username = userDataJson?.username;

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret:
        process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      userAgent: 'CrateApp/1.0 +https://crate.ai',
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setAccessToken(accessToken);
    await tokenManager.setAccessTokenSecret(accessTokenSecret);

    // check if collection is already in the database,
    // and it's  not being refreshed
    const existingCollection = await getCollection();

    if (
      existingCollection &&
      existingCollection.length > 0 &&
      !refreshCollection
    ) {
      const collectionResponse: CollectionResponse = {
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
      return NextResponse.json(collectionResponse);
    }

    // fetch collection from Discogs and ingest it into the database

    const collection = await sdk.collection.getCollection({
      username,
      page: 1,
      perPage: 100,
    });

    await ingestCollection(collection);

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 },
    );
  }
}
