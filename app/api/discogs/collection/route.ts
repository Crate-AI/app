import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies, headers } from 'next/headers';
import { CollectionUtils } from '@/lib/supabase/serverUtils/collection';
import { createClient } from '@/lib/supabase/server';
import { getDiscogsRelease } from '@/lib/discogsAPI';

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;
    const userData = cookies().get('user_data')?.value;

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

    const collection = await sdk.collection.getCollection({
      username,
      page: 1,
      perPage: 100,
    });

    const releases = await Promise.all(
      collection.releases.map(async (release) => {
        const { isLimited, release: releaseDetails } = await getDiscogsRelease(
          accessToken,
          accessTokenSecret,
          ip,
          release.id.toString(),
        );

        if (isLimited) {
          throw new Error('Rate limit reached while fetching release details');
        }

        return releaseDetails;
      }),
    );

    const supabase = await createClient();
    const { ingestCollection } = CollectionUtils(supabase);

    await ingestCollection(releases);

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 },
    );
  }
}
