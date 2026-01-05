/**
 * Cloudflare Workers Environment Bindings Type Definitions
 *
 * This file provides TypeScript type safety for the `cloudflare:workers` import.
 *
 * To regenerate this file automatically based on wrangler.toml, run:
 * ```
 * nr cf-typegen
 * ```
 *
 * @see https://developers.cloudflare.com/workers/configuration/typescript/
 */

interface CloudflareEnv {
  // ===========================================
  // SECRETS (set via wrangler secret put)
  // ===========================================

  /**
   * Discogs OAuth Consumer Key
   * @see https://www.discogs.com/settings/developers
   */
  DISCOGS_CONSUMER_KEY: string;

  /**
   * Discogs OAuth Consumer Secret
   * @see https://www.discogs.com/settings/developers
   */
  DISCOGS_CONSUMER_SECRET: string;

  // ===========================================
  // ENVIRONMENT VARIABLES (set in wrangler.toml)
  // ===========================================

  /**
   * Current environment identifier
   * Set in wrangler.toml under [env.*.vars]
   */
  ENVIRONMENT?: 'development' | 'staging' | 'production';
}

declare module 'cloudflare:workers' {
  /**
   * The environment bindings object containing secrets and variables.
   *
   * - In production: populated from `wrangler secret put` and `wrangler.toml`
   * - In local dev: populated from `.dev.vars` and `wrangler.toml`
   */
  const env: CloudflareEnv;
}
