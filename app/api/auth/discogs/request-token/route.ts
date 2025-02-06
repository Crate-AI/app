import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
  callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discogs/callback`,
});

export async function GET() {
  try {
    const requestTokenResponse = await sdk.auth.getRequestToken();
    const { token, secret } = requestTokenResponse.requestTokens;

    // Store both token and secret
    const cookieStore = cookies();
    cookieStore.set('request_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('request_token_secret', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({
      authUrl: requestTokenResponse.verificationURL,
      requestToken: token,
      requestTokenSecret: secret,
    });
  } catch (error: any) {
    console.error('Error getting request token:', error);
    return NextResponse.json(
      { error: error.message || 'Error getting authorization URL' },
      { status: 500 },
    );
  }
}
