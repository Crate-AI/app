import { createFileRoute } from '@tanstack/react-router';
import { serialize } from 'cookie';
import { createDiscogsSDK } from '@/lib/config/discogs';

// Allowed origins for OAuth redirects (security allowlist)
const ALLOWED_ORIGINS = [
  'http://localhost:1995',
  'https://staging.crate.audio',
  'https://crate.audio',
];

function getValidatedOrigin(requestUrl: string): string {
  const origin = new URL(requestUrl).origin;
  // Allow preview deployments (e.g., https://131-pr.crate.audio)
  const isPreviewOrigin = /^https:\/\/\d+-pr\.crate\.audio$/.test(origin);

  if (!ALLOWED_ORIGINS.includes(origin) && !isPreviewOrigin) {
    throw new Error(`Invalid origin: ${origin}`);
  }
  return origin;
}

export const Route = createFileRoute('/api/auth/discogs/request-token')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const baseUrl = getValidatedOrigin(request.url);

          const sdk = createDiscogsSDK({
            callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
          });

          const requestTokenResponse = await sdk.auth
            .getRequestToken()
            .catch(async (error) => {
              const responseText = error.response?.text
                ? await error.response.text()
                : '';
              if (responseText.includes('Authentication Required')) {
                throw new Error(
                  'Vercel authentication is blocking the request.',
                );
              }
              throw error;
            });

          if (
            !requestTokenResponse?.requestTokens?.token ||
            !requestTokenResponse?.requestTokens?.secret
          ) {
            throw new Error('Invalid response from Discogs');
          }

          const { token, secret } = requestTokenResponse.requestTokens;
          const headers = new Headers();

          headers.append(
            'Set-Cookie',
            serialize('request_token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );

          headers.append(
            'Set-Cookie',
            serialize('request_token_secret', secret, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            }),
          );

          return Response.json(
            {
              authUrl: requestTokenResponse.verificationURL,
              requestToken: token,
              requestTokenSecret: secret,
            },
            { headers },
          );
        } catch (error: any) {
          console.error('Error in request token route:', error);
          return Response.json(
            {
              error: error.message || 'Error getting authorization URL',
              details:
                process.env.NODE_ENV === 'development'
                  ? error.stack
                  : undefined,
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
