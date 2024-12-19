import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;
    const userData = cookies().get('user_data')?.value;

    if (!accessToken || !accessTokenSecret || !userData) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userDataJson = JSON.parse(decodeURIComponent(userData));
    const username = userDataJson?.username;

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
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

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
} 