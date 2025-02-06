import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  console.error('NEXT_PUBLIC_BASE_URL is not set');
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
}

console.log('Request Token Route - Starting with config:', {
  baseUrl,
  hasConsumerKey: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  hasConsumerSecret: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  nodeEnv: process.env.NODE_ENV,
  consumerKeyLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.length,
  consumerSecretLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET?.length,
  fullBaseUrl: process.env.NEXT_PUBLIC_BASE_URL
});

if (!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || !process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET) {
  console.error('Missing Discogs credentials');
  throw new Error('Discogs credentials are required');
}

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
  userAgent: 'CrateApp/1.0 +https://crate.ai',
});

export async function GET() {
  console.log('GET request started');
  try {
    console.log('Getting request token from Discogs...');
    const requestTokenResponse = await sdk.auth.getRequestToken().catch(error => {
      console.error('SDK getRequestToken error:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause
      });
      throw error;
    });

    if (!requestTokenResponse?.requestTokens?.token || !requestTokenResponse?.requestTokens?.secret) {
      console.error('Invalid request token response:', requestTokenResponse);
      throw new Error('Invalid response from Discogs');
    }

    console.log('Got request token response:', {
      hasToken: !!requestTokenResponse.requestTokens.token,
      hasSecret: !!requestTokenResponse.requestTokens.secret,
      verificationURL: requestTokenResponse.verificationURL,
      tokenLength: requestTokenResponse.requestTokens.token?.length,
      secretLength: requestTokenResponse.requestTokens.secret?.length
    });

    const { token, secret } = requestTokenResponse.requestTokens;

    // Store both token and secret
    const cookieStore = cookies();
    
    try {
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

      const verifyToken = cookieStore.get('request_token');
      const verifySecret = cookieStore.get('request_token_secret');

      console.log('Cookies verification:', {
        tokenSet: !!verifyToken,
        secretSet: !!verifySecret,
        tokenMatch: verifyToken?.value === token,
        secretMatch: verifySecret?.value === secret
      });

    } catch (cookieError) {
      console.error('Cookie setting error:', cookieError);
      throw new Error('Failed to set cookies');
    }

    return NextResponse.json({
      authUrl: requestTokenResponse.verificationURL,
      requestToken: token,
      requestTokenSecret: secret,
    });
  } catch (error: any) {
    console.error('Error in request token route:', {
      error: error.message,
      stack: error.stack,
      cause: error.cause,
      name: error.name,
      code: error.code,
      type: typeof error,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Error getting authorization URL',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 },
    );
  }
}
