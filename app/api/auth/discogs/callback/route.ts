import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  console.error('NEXT_PUBLIC_BASE_URL is not set');
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
}

if (
  !process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY ||
  !process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET
) {
  console.error('Missing Discogs credentials');
  throw new Error('Discogs credentials are required');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const oauthVerifier = searchParams.get('oauth_verifier');
    const oauthToken = searchParams.get('oauth_token');

    const cookieStore = cookies();
    const requestToken = cookieStore.get('request_token')?.value;
    const requestTokenSecret = cookieStore.get('request_token_secret')?.value;

    if (!oauthToken || !oauthVerifier || !requestToken || !requestTokenSecret) {
      return NextResponse.redirect(
        new URL('/?error=missing_oauth', request.url),
      );
    }

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret:
        process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
      userAgent: 'CrateApp/1.0 +https://crate.ai',
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setRequestToken(requestToken);
    await tokenManager.setRequestTokenSecret(requestTokenSecret);

    const tokens = await sdk.auth.handleCallback({
      oauthVerifier,
      oauthToken,
    });

    if (!tokens?.token || !tokens?.secret) {
      throw new Error('Invalid response from Discogs callback');
    }

    const userIdentity = await sdk.auth.getUserIdentity();
    const userProfile = await fetch(userIdentity.resource_url).then((res) =>
      res.json(),
    );

    cookieStore.delete('request_token');
    cookieStore.delete('request_token_secret');

    cookieStore.set('access_token', tokens.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookieStore.set('access_token_secret', tokens.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // sync state with supabase auth
    const supabase = await createClient();
    const user = await sdk.user.getUser({ username: userIdentity.username });
    const password = `discogs_${userIdentity.id}`;

    // Try to sign in with email first
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

    if (signInData?.user) {
      // Update user data cookie
      cookieStore.set(
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

      // Update Discogs profile
      const { error: updateError } = await supabase
        .from('user_discogs_profile')
        .upsert({
          user_id: signInData.user.id,
          username: userIdentity.username,
        });

      if (updateError) {
        console.error('Failed to update user profile:', updateError);
      }

      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user doesn't exist, create new account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: user.email,
        password,
        options: {
          data: {
            discogs_username: userIdentity.username,
            discogs_id: userIdentity.id,
          },
        },
      },
    );

    if (signUpError || !signUpData.user) {
      console.error('Failed to create user:', signUpError);
      return NextResponse.redirect(
        new URL('/?error=signup_failed', request.url),
      );
    }

    // Create Discogs profile
    const { error: createError } = await supabase
      .from('user_discogs_profile')
      .upsert({
        user_id: signUpData.user.id,
        username: userIdentity.username,
      });

    if (createError) {
      console.error('Failed to create user profile:', createError);
      return NextResponse.redirect(
        new URL('/?error=profile_failed', request.url),
      );
    }

    // Set user data cookie
    cookieStore.set(
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

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error: any) {
    console.error('Error during OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
