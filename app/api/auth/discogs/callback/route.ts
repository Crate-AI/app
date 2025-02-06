import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

console.log('Callback Route - Environment:', {
  baseUrl,
  hasConsumerKey: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  hasConsumerSecret: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  nodeEnv: process.env.NODE_ENV
});

export async function GET(request: Request) {
  try {
    console.log('Starting OAuth callback...');
    const { searchParams } = new URL(request.url);
    const oauthVerifier = searchParams.get('oauth_verifier');
    const oauthToken = searchParams.get('oauth_token');

    const requestToken = cookies().get('request_token')?.value;
    const requestTokenSecret = cookies().get('request_token_secret')?.value;

    console.log('OAuth parameters:', {
      hasOauthVerifier: !!oauthVerifier,
      hasOauthToken: !!oauthToken,
      hasRequestToken: !!requestToken,
      hasRequestTokenSecret: !!requestTokenSecret,
      url: request.url
    });

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
      DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
      userAgent: 'CrateApp/1.0 +https://crate.ai',
    });

    console.log('Setting up token manager...');
    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setRequestToken(requestToken);
    await tokenManager.setRequestTokenSecret(requestTokenSecret);

    console.log('Handling callback...');
    const tokens = await sdk.auth.handleCallback({
      oauthVerifier,
      oauthToken,
    });
    console.log('Got access tokens:', {
      hasToken: !!tokens.token,
      hasSecret: !!tokens.secret
    });

    console.log('Getting user identity...');
    const userIdentity = await sdk.auth.getUserIdentity();
    console.log('Got user identity:', {
      username: userIdentity.username,
      id: userIdentity.id
    });

    const userProfile = await fetch(userIdentity.resource_url).then((res) =>
      res.json(),
    );
    console.log('Got user profile');

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

    console.log('Set access token cookies');

    // sync state with supabase auth
    console.log('Starting Supabase auth sync...');
    const supabase = await createClient();
    const user = await sdk.user.getUser({ username: userIdentity.username });
    console.log('Got Discogs user:', { email: user.email });

    const password = `discogs_${userIdentity.id}`;

    // Try to sign in with email first
    console.log('Attempting Supabase sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (signInData?.user) {
      console.log('Signed in existing user');
      // Update user data cookie
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
        }
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
    console.log('Creating new user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
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
      return NextResponse.redirect(new URL('/?error=signup_failed', request.url));
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
      return NextResponse.redirect(new URL('/?error=profile_failed', request.url));
    }

    // Set user data cookie
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
      }
    );

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error: any) {
    console.error('Error during OAuth callback:', {
      error: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
