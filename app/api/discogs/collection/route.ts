import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies, headers } from 'next/headers';
import { CollectionUtils } from '@/lib/supabase/serverUtils/collection';
import { createClient } from '@/lib/supabase/server';
import { CollectionResponse } from '@crate.ai/discogs-sdk/dist/collection/types';
import { Release } from '@crate.ai/discogs-sdk/dist/collection/types';

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
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

    // check if collection is already in the database
    const existingCollection = await getCollection();

    if (existingCollection && existingCollection.length > 0) {
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
        // FIXME: why type error?
        releases: existingCollection.map(
          (row) => row.basic_release_data as Release,
        ),
      };
      return NextResponse.json(collectionResponse);
    }

    // fetch collection from Discogs and ingest it into the database

    let allReleases: Release[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const pageCollection = await sdk.collection.getCollection({
        username,
        page,
        perPage: 100,
      });

      allReleases = [...allReleases, ...pageCollection.releases];
      
      hasMorePages = !!pageCollection.pagination.urls.next;
      page++;
    }

    const fullCollection = {
      pagination: {
        page: 1,
        pages: 1,
        per_page: allReleases.length,
        items: allReleases.length,
        urls: { next: '', last: '' }
      },
      releases: allReleases
    };

    await ingestCollection(fullCollection);

    return NextResponse.json(fullCollection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 },
    );
  }
}
