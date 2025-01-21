import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

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

    // sync state with supabase auth
    const supabase = await createClient();
    const user = await sdk.user.getUser({ username: userIdentity.username });

    // set deterministic password based on some Discogs data
    // FIXME: make this more secure; this relies on the assumption
    // that this route is only accessible after a successful OAuth flow
    const password = `discogs_${userIdentity.id}`;

    // Try to sign in with email first
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

    // If user doesn't exist, create new account
    // TODO: is there a better check?
    if (signInError?.message.includes('Invalid login credentials')) {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: user.email,
          password,
          options: {
            data: {
              discogs_username: userIdentity.username,
              discogs_id: userIdentity.id,
            },
          },
        });

      if (signUpError || !signUpData.user) {
        console.error('Failed to create user:', signUpError);
        return NextResponse.redirect(
          new URL('/?error=signup_failed', request.url),
        );
      }
      const { error: createError } = await supabase
        .from('user_discogs_profile')
        .upsert({
          user_id: signUpData.user.id,
          username: userIdentity.username,
        });
      if (createError) {
        throw createError;
      }
      cookies().set(
        'user_data',
        JSON.stringify({
          userId: signUpData.user.id,
          username: userIdentity.username,
          avatarUrl: userProfile.avatar_url || '/default-avatar.png',
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      );
    } else if (signInData?.user) {
      const { error: createError } = await supabase
        .from('user_discogs_profile')
        .upsert({
          user_id: signInData.user.id,
          username: userIdentity.username,
        });
      if (createError) {
        throw createError;
      }
      // Existing user signed in successfully
      cookies().set(
        'user_data',
        JSON.stringify({
          userId: signInData.user.id,
          username: userIdentity.username,
          avatarUrl: userProfile.avatar_url || '/default-avatar.png',
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      );
    }

    return NextResponse.redirect(
      new URL(`/${userIdentity.username}`, request.url),
    );
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
