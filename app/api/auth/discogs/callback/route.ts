import { NextResponse, NextRequest } from 'next/server';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import path from 'path';

// Initialize StorageService storage path
StorageService.storagePath = path.join(process.cwd(), 'storage.json');

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const oauthToken = searchParams.get('oauth_token');
  const oauthVerifier = searchParams.get('oauth_verifier');

  // Retrieve the request token secret from storage
  const requestTokenSecret = StorageService.getItem('oauthRequestTokenSecret');

  if (!oauthToken || !oauthVerifier || !requestTokenSecret) {
    console.error('Missing OAuth parameters or token secret.');
    return NextResponse.json(
      { error: 'Missing OAuth parameters or token secret.' },
      { status: 400 }
    );
  }

  try {
    // Exchange the request token and verifier for an access token
    const accessTokenResponse = await discogs.auth.getAccessToken({
      oauthToken,
      oauthVerifier,
      tokenSecret: requestTokenSecret,
    });

    // Store the access token and related user information
    StorageService.setItem('oauthAccessToken', accessTokenResponse.oauthAccessToken);
    StorageService.setItem(
      'oauthAccessTokenSecret',
      accessTokenResponse.oauthAccessTokenSecret
    );

    // Fetch user identity
    const userIdentity = await discogs.auth.getUserIdentity({
      oauthToken: accessTokenResponse.oauthAccessToken,
      oauthTokenSecret: accessTokenResponse.oauthAccessTokenSecret,
    });

    // Fetch additional user details from the resource URL to get the avatar URL
    const userDetailsResponse = await fetch(String(userIdentity.resource_url));
    if (!userDetailsResponse.ok) {
      throw new Error('Failed to fetch user details from resource URL.');
    }
    const userDetails = await userDetailsResponse.json();

    // Enhance userIdentity with avatar URL
    const enhancedUserIdentity = {
      ...userIdentity,
      avatar_url: userDetails.avatar_url,
    };

    // Store enhanced user identity in storage
    StorageService.setItem('userIdentity', enhancedUserIdentity);

    // Redirect to the user's personalized homepage
    return NextResponse.redirect(new URL(`/${userIdentity.username}`, request.url));
  } catch (error: any) {
    console.error('Error during OAuth callback:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
