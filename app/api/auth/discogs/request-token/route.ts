import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  console.error('NEXT_PUBLIC_BASE_URL is not set');
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
}

if (!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || !process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET) {
  console.error('Missing Discogs credentials');
  throw new Error('Discogs credentials are required');
}

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
  userAgent: 'CrateApp/1.0 +https://crate.ai',
  debug: false
});

export async function GET() {
  try {
    const requestTokenResponse = await sdk.auth.getRequestToken().catch(async error => {
      const responseText = error.response?.text ? await error.response.text() : '';
      const isAuthPage = responseText.includes('Authentication Required');
      
      if (isAuthPage) {
        throw new Error('Vercel authentication is blocking the request. Please configure authentication bypass in vercel.json');
      }
      throw error;
    });

    if (!requestTokenResponse?.requestTokens?.token || !requestTokenResponse?.requestTokens?.secret) {
      throw new Error('Invalid response from Discogs');
    }

    const { token, secret } = requestTokenResponse.requestTokens;
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
    } catch (cookieError) {
      throw new Error('Failed to set cookies');
    }

    return NextResponse.json({
      authUrl: requestTokenResponse.verificationURL,
      requestToken: token,
      requestTokenSecret: secret,
    });
  } catch (error: any) {
    console.error('Error in request token route:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Error getting authorization URL',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 },
    );
  }
}
