/**
 * Discogs SDK Factory
 *
 * Provides a centralized factory for creating DiscogsSDK instances
 * with proper credential loading from Cloudflare Workers environment.
 *
 * ## Usage
 *
 * ```typescript
 * // In API route handlers:
 * const sdk = createDiscogsSDK();
 *
 * // With OAuth callback URL:
 * const sdk = createDiscogsSDK({
 *   callbackUrl: `${baseUrl}/api/auth/discogs/callback`
 * });
 * ```
 *
 * ## Important
 *
 * - Must be called inside request handlers (not at module level)
 * - Cloudflare bindings are only available during request handling
 * - Credentials come from `.dev.vars` (local) or `wrangler secret` (production)
 *
 * @module lib/config/discogs
 */

import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { getDiscogsCredentials, hasDiscogsCredentials } from './env';

/**
 * Options for creating a DiscogsSDK instance
 */
export interface CreateDiscogsSDKOptions {
  /** OAuth callback URL for authentication flow */
  callbackUrl?: string;
  /** Custom User-Agent header for API requests */
  userAgent?: string;
}

/** Default User-Agent identifying the application to Discogs */
const DEFAULT_USER_AGENT = 'CrateApp/1.0 +https://crate.ai';

/**
 * Create a new DiscogsSDK instance with credentials from environment.
 *
 * @param options - Optional configuration
 * @returns Configured DiscogsSDK instance
 * @throws Error if credentials are not configured (in development)
 *
 * @example
 * ```typescript
 * // Basic usage
 * const sdk = createDiscogsSDK();
 * const results = await sdk.search.getSearchResults({ query: 'daft punk' });
 *
 * // With callback URL for OAuth
 * const sdk = createDiscogsSDK({
 *   callbackUrl: 'https://crate.audio/api/auth/discogs/callback'
 * });
 * ```
 */
export function createDiscogsSDK(
  options: CreateDiscogsSDKOptions = {},
): DiscogsSDK {
  // Validate credentials are present
  if (!hasDiscogsCredentials()) {
    console.warn(
      '[Discogs SDK] Missing credentials. Ensure DISCOGS_CONSUMER_KEY and ' +
        'DISCOGS_CONSUMER_SECRET are set in .dev.vars (local) or via wrangler secret (production).',
    );
  }

  const { consumerKey, consumerSecret } = getDiscogsCredentials();

  console.log('[createDiscogsSDK] Creating SDK with credentials:', {
    hasKey: Boolean(consumerKey),
    hasSecret: Boolean(consumerSecret),
    keyLength: consumerKey?.length,
    secretLength: consumerSecret?.length,
    keyPrefix: consumerKey?.substring(0, 4),
    secretPrefix: consumerSecret?.substring(0, 4),
    callbackUrl: options.callbackUrl,
  });

  return new DiscogsSDK({
    DiscogsConsumerKey: consumerKey,
    DiscogsConsumerSecret: consumerSecret,
    callbackUrl: options.callbackUrl,
    userAgent: options.userAgent ?? DEFAULT_USER_AGENT,
  });
}
