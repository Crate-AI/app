import { NextResponse, NextRequest } from 'next/server';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import path from 'path';

StorageService.storagePath = path.join(process.cwd(), 'storage.json');

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const oauthToken = searchParams.get('oauth_token');
  const oauthVerifier = searchParams.get('oauth_verifier');

  const requestTokenSecret = StorageService.getItem('oauthRequestTokenSecret');

  if (!oauthToken || !oauthVerifier || !requestTokenSecret) {
    console.error('Missing OAuth parameters or token secret.');
    return NextResponse.json(
      { error: 'Missing OAuth parameters or token secret.' },
      { status: 400 }
    );
  }

  try {
    const accessTokenResponse = await discogs.auth.getAccessToken({
      oauthToken,
      oauthVerifier,
      tokenSecret: requestTokenSecret,
    });

    StorageService.setItem('oauthAccessToken', accessTokenResponse.oauthAccessToken);
    StorageService.setItem(
      'oauthAccessTokenSecret',
      accessTokenResponse.oauthAccessTokenSecret
    );

    const userIdentity = await discogs.auth.getUserIdentity({
      oauthToken: accessTokenResponse.oauthAccessToken,
      oauthTokenSecret: accessTokenResponse.oauthAccessTokenSecret,
    });

    const userDetailsResponse = await fetch(String(userIdentity.resource_url));
    if (!userDetailsResponse.ok) {
      throw new Error('Failed to fetch user details from resource URL.');
    }
    const userDetails = await userDetailsResponse.json();

    const enhancedUserIdentity = {
      ...userIdentity,
      avatar_url: userDetails.avatar_url,
    };

    StorageService.setItem('userIdentity', enhancedUserIdentity);

    const redirectScript = `
      <script>
        window.opener.postMessage({ type: 'LOGIN_SUCCESS', username: '${userIdentity.username}' }, '*');
        let countdown = 5;
        const interval = setInterval(() => {
          if (countdown === 0) {
            clearInterval(interval);
            window.close();
          } else {
            document.body.innerHTML = '<h1>Login successful!</h1><p>Closing in ' + countdown + ' seconds...</p>';
            countdown--;
          }
        }, 1000);
      </script>
    `;

    return new Response(redirectScript, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error: any) {
    console.error('Error during OAuth callback:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
