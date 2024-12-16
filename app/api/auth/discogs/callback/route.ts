import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const oauthVerifier = searchParams.get('oauth_verifier');
    const oauthToken = searchParams.get('oauth_token');

    const requestToken = cookies().get('request_token')?.value;
    const requestTokenSecret = cookies().get('request_token_secret')?.value;

    if (!oauthToken || !oauthVerifier || !requestToken || !requestTokenSecret) {
      console.error('Missing OAuth parameters:', {
        oauthToken,
        oauthVerifier,
        hasRequestToken: !!requestToken,
        hasRequestTokenSecret: !!requestTokenSecret,
      });
      return NextResponse.redirect(
        new URL('/?error=missing_oauth', request.url),
      );
    }

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret:
        process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discogs/callback`,
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setRequestToken(requestToken);
    await tokenManager.setRequestTokenSecret(requestTokenSecret);

    const tokens = await sdk.auth.handleCallback({
      oauthVerifier,
      oauthToken,
    });

    const userIdentity = await sdk.auth.getUserIdentity();
    const userProfile = await fetch(userIdentity.resource_url).then((res) =>
      res.json(),
    );

    cookies().delete('request_token');
    cookies().delete('request_token_secret');

    cookies().set('access_token', tokens.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookies().set('access_token_secret', tokens.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookies().set(
      'user_data',
      JSON.stringify({
        username: userIdentity.username,
        avatar_url: userProfile.avatar_url || '/default-avatar.png',
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    );

    return NextResponse.redirect(
      new URL(`/${userIdentity.username}`, request.url),
    );
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
