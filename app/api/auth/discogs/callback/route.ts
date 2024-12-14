import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const oauthVerifier = searchParams.get('oauth_verifier');
  const oauthToken = searchParams.get('oauth_token');
  const requestTokenSecret = cookies().get('request_token_secret')?.value;

  if (!oauthToken || !oauthVerifier || !requestTokenSecret) {
    return NextResponse.json(
      { error: 'Missing OAuth parameters.' },
      { status: 400 }
    );
  }

  try {
    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      callbackUrl: 'http://localhost:3000/api/auth/discogs/callback'
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setRequestToken(oauthToken);
    await tokenManager.setRequestTokenSecret(requestTokenSecret);

    await sdk.auth.handleCallback({
      oauthVerifier,
      oauthToken
    });

    const userIdentity = await sdk.auth.getUserIdentity();
    const userProfile = await fetch(userIdentity.resource_url).then(res => res.json());
    cookies().delete('request_token_secret');

    const redirectScript = `
      <script>
        window.opener.postMessage({ 
          type: 'LOGIN_SUCCESS', 
          username: '${userIdentity.username}',
          avatar_url: '${userProfile.avatar_url || '/default-avatar.png'}'
        }, '*');
        setTimeout(() => window.close(), 1000);
      </script>
    `;

    return new Response(redirectScript, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error: any) {
    console.error('Error during OAuth callback:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}