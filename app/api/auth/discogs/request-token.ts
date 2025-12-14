import { createFileRoute } from '@tanstack/react-router';
import { serialize } from 'cookie';
import { getDiscogsCredentials, getEnvironment } from '@/lib/config/env';

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

const DISCOGS_API_BASE = 'https://api.discogs.com';
const DISCOGS_AUTHORIZE_BASE = 'https://www.discogs.com/oauth/authorize';

function oauthNonce(): string {
  return `${Date.now()}${Math.random().toString().slice(2)}`;
}

function oauthTimestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}

function mask(value: string, visiblePrefix = 4): string {
  if (!value) return '';
  if (value.length <= visiblePrefix) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, visiblePrefix)}***`;
}

export const Route = createFileRoute('/api/auth/discogs/request-token')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const baseUrl = getValidatedOrigin(request.url);
          const callbackUrl = `${baseUrl}/api/auth/discogs/callback`;
          const { consumerKey, consumerSecret } = getDiscogsCredentials();
          const envName = getEnvironment() ?? 'development';

          if (!consumerKey || !consumerSecret) {
            throw new Error('Discogs credentials are not configured');
          }

          // OAuth 1.0a PLAINTEXT:
          // Send oauth_signature percent-encoded inside the Authorization header.
          // Discogs/Workers parsing is sensitive to raw '&' in oauth_signature value.
          const oauthSignatureRaw = `${consumerSecret}&`;
          const oauthSignatureParam = encodeURIComponent(oauthSignatureRaw);
          // IMPORTANT: Avoid Authorization header on Workers.
          // OAuth 1.0 allows sending OAuth params in POST body for
          // application/x-www-form-urlencoded requests.
          const oauthParams = new URLSearchParams({
            oauth_consumer_key: consumerKey,
            oauth_nonce: oauthNonce(),
            oauth_callback: callbackUrl,
            oauth_signature: oauthSignatureRaw, // URLSearchParams will encode
            oauth_signature_method: 'PLAINTEXT',
            oauth_timestamp: oauthTimestamp(),
            oauth_version: '1.0',
          });

          const res = await fetch(`${DISCOGS_API_BASE}/oauth/request_token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              // Discogs recommends providing a UA
              'User-Agent': 'CrateApp/1.0 +https://crate.ai',
            },
            body: oauthParams.toString(),
          });

          const text = await res.text();
          if (!res.ok) {
            const debug =
              envName !== 'production'
                ? {
                    env: envName,
                    baseUrl,
                    callbackUrl,
                    consumerKeyPrefix: mask(consumerKey),
                    consumerSecretPrefix: mask(consumerSecret),
                    oauthSignatureRawEndsWithAmpersand:
                      oauthSignatureRaw.endsWith('&'),
                    oauthSignatureParamHasPercent26:
                      oauthSignatureParam.includes('%26'),
                    oauthCallbackEncoded: encodeURIComponent(callbackUrl),
                    // Body encoding checks (safe; no secrets)
                    bodyHasOauthSignature: oauthParams
                      .toString()
                      .includes('oauth_signature='),
                    bodyContainsPercentChar: oauthParams.toString().includes('%'),
                    bodyHasPercent26: oauthParams.toString().includes('%26'),
                  }
                : undefined;
            return Response.json(
              {
                error: `HTTP error ${res.status}: ${text}`,
                debug,
              },
              { status: 500 },
            );
          }

          const params = new URLSearchParams(text);
          const token = params.get('oauth_token');
          const secret = params.get('oauth_token_secret');

          if (!token || !secret) {
            throw new Error('Invalid response from Discogs');
          }

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
              authUrl: `${DISCOGS_AUTHORIZE_BASE}?oauth_token=${token}`,
              requestToken: token,
              requestTokenSecret: secret,
            },
            { headers },
          );
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : String(error);
          console.error('Error in request token route:', error);
          return Response.json(
            {
              error: message || 'Error getting authorization URL',
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
