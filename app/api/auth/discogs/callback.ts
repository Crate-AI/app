import { createFileRoute } from '@tanstack/react-router';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { parse, serialize } from 'cookie';

/**
 * Discogs OAuth Callback Handler
 *
 * This handles the OAuth callback from Discogs and stores the access tokens.
 * Primary authentication is handled by Convex Auth (email OTP).
 * Discogs OAuth is only for connecting to the user's Discogs account.
 */
export const Route = createFileRoute('/api/auth/discogs/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const { searchParams } = url;
          const oauthVerifier = searchParams.get('oauth_verifier');
          const oauthToken = searchParams.get('oauth_token');

          const cookies = parse(request.headers.get('cookie') || '');
          const requestToken = cookies['request_token'];
          const requestTokenSecret = cookies['request_token_secret'];
          const authRedirect = cookies['auth_redirect'];

          const baseUrl = import.meta.env.VITE_BASE_URL;
          if (!baseUrl) {
            throw new Error('VITE_BASE_URL environment variable is required');
          }

          if (
            !oauthToken ||
            !oauthVerifier ||
            !requestToken ||
            !requestTokenSecret
          ) {
            return Response.redirect(new URL('/?error=missing_oauth', baseUrl));
          }

          const sdk = new DiscogsSDK({
            DiscogsConsumerKey: import.meta.env.VITE_DISCOGS_CONSUMER_KEY || '',
            DiscogsConsumerSecret:
              import.meta.env.VITE_DISCOGS_CONSUMER_SECRET || '',
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

          // Get user identity from Discogs
          const userIdentity = await sdk.auth.getUserIdentity();
          const userProfile = await fetch(userIdentity.resource_url).then(
            (res) => res.json(),
          );

          // Prepare headers for response
          const headers = new Headers();

          // Clear request tokens
          headers.append(
            'Set-Cookie',
            serialize('request_token', '', { maxAge: -1, path: '/' }),
          );
          headers.append(
            'Set-Cookie',
            serialize('request_token_secret', '', { maxAge: -1, path: '/' }),
          );

          // Set access tokens for Discogs API calls
          headers.append(
            'Set-Cookie',
            serialize('access_token', tokens.token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );
          headers.append(
            'Set-Cookie',
            serialize('access_token_secret', tokens.secret, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );

          // Store Discogs user data (for display purposes)
          const userDataToSet = {
            username: userIdentity.username,
            avatarUrl: userProfile.avatar_url || '/default-avatar.png',
            discogsId: userIdentity.id,
          };

          headers.append(
            'Set-Cookie',
            serialize('user_data', JSON.stringify(userDataToSet), {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );

          // Clear auth redirect cookie if set
          if (authRedirect) {
            headers.append(
              'Set-Cookie',
              serialize('auth_redirect', '', { maxAge: -1, path: '/' }),
            );
          }

          // Redirect to the target URL
          const targetUrl = authRedirect || '/';
          const redirectUrl = new URL(targetUrl, baseUrl).toString();
          headers.set('Location', redirectUrl);

          return new Response(null, {
            status: 302,
            headers,
          });
        } catch (error) {
          console.error('Error during OAuth callback:', error);
          const baseUrl =
            import.meta.env.VITE_BASE_URL || 'http://localhost:1995';
          return Response.redirect(new URL('/?error=auth_failed', baseUrl));
        }
      },
    },
  },
});
