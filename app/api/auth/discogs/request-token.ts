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
            .catch(async (error: unknown) => {
              console.error('[request-token] Raw error:', error);

              const response = (() => {
                if (!error || typeof error !== 'object') return undefined;
                if (!('response' in error)) return undefined;
                const { response } = error as { response?: unknown };
                return response;
              })();

              const responseText =
                response &&
                typeof response === 'object' &&
                'text' in response &&
                typeof (response as { text?: unknown }).text === 'function'
                  ? await (response as { text: () => Promise<string> }).text()
                  : '';

              console.error('[request-token] Response text:', responseText);
              console.error('[request-token] Response object:', response);

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
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : String(error);
          console.error('[request-token] Full error details:', {
            error,
            message,
            stack: error instanceof Error ? error.stack : undefined,
          });
          return Response.json(
            {
              error: message || 'Error getting authorization URL',
              details: error instanceof Error ? error.stack : String(error),
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
