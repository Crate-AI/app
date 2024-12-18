import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { query, type = 'master', format = 'LP' } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 },
      );
    }

    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;

    if (!accessToken || !accessTokenSecret) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret:
        process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      userAgent: 'CrateApp/1.0 +https://crate.ai',
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setAccessToken(accessToken);
    await tokenManager.setAccessTokenSecret(accessTokenSecret);

    const searchResults = await sdk.search.getSearchResults({
      query,
      type,
      format,
    });

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Discogs search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Discogs' },
      { status: 500 },
    );
  }
}
