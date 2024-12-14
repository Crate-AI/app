import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
  callbackUrl: 'http://localhost:3000/api/auth/discogs/callback'
});

export async function GET() {
  try {
    const requestTokenResponse = await sdk.auth.getRequestToken();
    
    // Store the request tokens in cookies
    cookies().set('request_token_secret', requestTokenResponse.requestTokens.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

  
    
    return NextResponse.json({ authUrl: requestTokenResponse.verificationURL });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error getting authorization URL' },
      { status: 500 }
    );
  }
}