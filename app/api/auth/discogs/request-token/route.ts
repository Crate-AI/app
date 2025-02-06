import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

console.log('Request Token Route - Environment:', {
  baseUrl,
  hasConsumerKey: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  hasConsumerSecret: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  nodeEnv: process.env.NODE_ENV
});

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
  callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
  userAgent: 'CrateApp/1.0 +https://crate.ai',
});

export async function GET() {
  try {
    console.log('Getting request token from Discogs...');
    const requestTokenResponse = await sdk.auth.getRequestToken();
    console.log('Got request token response:', {
      hasToken: !!requestTokenResponse.requestTokens.token,
      hasSecret: !!requestTokenResponse.requestTokens.secret,
      verificationURL: requestTokenResponse.verificationURL
    });

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

    console.log('Cookies set successfully');

    return NextResponse.json({
      authUrl: requestTokenResponse.verificationURL,
      requestToken: token,
      requestTokenSecret: secret,
    });
  } catch (error: any) {
    console.error('Error getting request token:', {
      error: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json(
      { error: error.message || 'Error getting authorization URL' },
      { status: 500 },
    );
  }
}
