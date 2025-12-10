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

  // Allow preview deployments:
  // - Custom domain: https://131-pr.crate.audio
  // - Workers.dev: https://crate-app-pr-131.xxx.workers.dev
  const isPreviewOrigin =
    /^https:\/\/\d+-pr\.crate\.audio$/.test(origin) ||
    /^https:\/\/crate-app-pr-\d+\.[a-z0-9]+\.workers\.dev$/.test(origin);

  if (!ALLOWED_ORIGINS.includes(origin) && !isPreviewOrigin) {
    throw new Error(`Invalid origin: ${origin}`);
  }
  return origin;
}

/**
 * Check if cookies should use secure flag (HTTPS)
 */
function isSecureOrigin(origin: string): boolean {
  return origin.startsWith('https://');
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
          const secureCookie = isSecureOrigin(baseUrl);

          headers.append(
            'Set-Cookie',
            serialize('request_token', token, {
              httpOnly: true,
              secure: secureCookie,
              sameSite: 'lax',
              path: '/',
            }),
          );

          headers.append(
            'Set-Cookie',
            serialize('request_token_secret', secret, {
              httpOnly: true,
              secure: secureCookie,
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
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
