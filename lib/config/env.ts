/**
 * Centralized Environment Configuration for Cloudflare Workers
 *
 * This module provides type-safe access to environment variables/secrets.
 *
 * ## How it works:
 *
 * Both local development and production use the same access pattern:
 * `import { env } from 'cloudflare:workers'`
 *
 * - **Production**: Secrets are set via `wrangler secret put` in CI/CD
 * - **Local Dev**: Secrets are loaded from `.dev.vars` by Miniflare
 *
 * ## Required files:
 *
 * - `.dev.vars` - Local development secrets (DO NOT COMMIT)
 *   ```
 *   DISCOGS_CONSUMER_KEY=your_key
 *   DISCOGS_CONSUMER_SECRET=your_secret
 *   ```
 *
 * - `wrangler.toml` - Non-sensitive env vars in [vars] section
 *
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 * @see https://developers.cloudflare.com/workers/local-development/environment-variables/
 */

import { env as cloudflareEnv } from 'cloudflare:workers';

/**
 * Type definition for Cloudflare environment bindings.
 * Add new secrets/vars here as they are added to the project.
 *
 * To generate types automatically, run: `nr cf-typegen`
 */
export interface CloudflareEnv {
  // Discogs OAuth credentials
  DISCOGS_CONSUMER_KEY?: string;
  DISCOGS_CONSUMER_SECRET?: string;

  // Environment identifier (set in wrangler.toml [env.*.vars])
  ENVIRONMENT?: 'development' | 'staging' | 'production';
}

/**
 * Get the typed Cloudflare environment object.
 *
 * @returns The environment bindings from Cloudflare Workers runtime
 */
export function getCloudflareEnv(): CloudflareEnv {
  return cloudflareEnv as CloudflareEnv;
}

/**
 * Get an environment variable by key.
 *
 * @param key - The environment variable key
 * @returns The value or empty string if not set
 */
export function getEnvVar<K extends keyof CloudflareEnv>(
  key: K,
): NonNullable<CloudflareEnv[K]> | string {
  const env = getCloudflareEnv();
  return env[key] ?? '';
}

/**
 * Get Discogs API credentials from environment.
 *
 * @returns Object with consumerKey and consumerSecret
 */
export function getDiscogsCredentials() {
  const env = getCloudflareEnv();
  console.log('[getDiscogsCredentials] Raw env object:', Object.keys(env));
  console.log('[getDiscogsCredentials] Credentials check:', {
    hasKey: Boolean(env.DISCOGS_CONSUMER_KEY),
    hasSecret: Boolean(env.DISCOGS_CONSUMER_SECRET),
    keyLength: env.DISCOGS_CONSUMER_KEY?.length,
    secretLength: env.DISCOGS_CONSUMER_SECRET?.length,
    keyValue: env.DISCOGS_CONSUMER_KEY,
    secretValue: env.DISCOGS_CONSUMER_SECRET,
  });
  return {
    consumerKey: env.DISCOGS_CONSUMER_KEY ?? '',
    consumerSecret: env.DISCOGS_CONSUMER_SECRET ?? '',
  };
}

/**
 * Check if Discogs credentials are configured.
 *
 * @returns true if both consumer key and secret are present
 */
export function hasDiscogsCredentials(): boolean {
  const { consumerKey, consumerSecret } = getDiscogsCredentials();
  return Boolean(consumerKey && consumerSecret);
}

/**
 * Get the current environment name.
 *
 * @returns 'development', 'staging', or 'production'
 */
export function getEnvironment(): CloudflareEnv['ENVIRONMENT'] {
  return getEnvVar('ENVIRONMENT') as CloudflareEnv['ENVIRONMENT'];
}
