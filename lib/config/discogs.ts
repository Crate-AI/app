/**
 * Centralized Discogs SDK factory
 *
 * Creates a properly configured DiscogsSDK instance with credentials
 * from the environment (Cloudflare bindings or local dev)
 */

import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { getDiscogsCredentials } from './env';

export interface CreateDiscogsSDKOptions {
  callbackUrl?: string;
  userAgent?: string;
}

const DEFAULT_USER_AGENT = 'CrateApp/1.0 +https://crate.ai';

/**
 * Create a new DiscogsSDK instance with credentials from environment
 *
 * NOTE: Must be called during request handling (not at module init)
 * because Cloudflare bindings are only available during requests
 */
export function createDiscogsSDK(options: CreateDiscogsSDKOptions = {}) {
  const { consumerKey, consumerSecret } = getDiscogsCredentials();

  return new DiscogsSDK({
    DiscogsConsumerKey: consumerKey,
    DiscogsConsumerSecret: consumerSecret,
    callbackUrl: options.callbackUrl,
    userAgent: options.userAgent || DEFAULT_USER_AGENT,
  });
}
