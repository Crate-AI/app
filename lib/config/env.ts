/**
 * Centralized environment configuration for Cloudflare Workers + local dev
 *
 * In production (Cloudflare Workers): secrets come from cloudflare:workers bindings
 * In local dev: secrets come from .dev.vars (loaded by miniflare)
 *
 * This module handles the fallback logic in ONE place.
 */

import { env as cloudflareEnv } from 'cloudflare:workers';

type CloudflareEnv = {
  DISCOGS_CONSUMER_KEY?: string;
  DISCOGS_CONSUMER_SECRET?: string;
  // Add other secrets here as needed
};

/**
 * Get an environment variable from Cloudflare bindings (production)
 * or process.env (local dev fallback)
 */
function getEnvVar(key: keyof CloudflareEnv): string {
  const cfEnv = cloudflareEnv as CloudflareEnv;

  // Try Cloudflare env first (production)
  if (cfEnv[key]) {
    return cfEnv[key];
  }

  // Fall back to process.env (local dev)
  // Check both non-prefixed and VITE_ prefixed versions
  return (
    process.env[key] ||
    process.env[`VITE_${key}`] ||
    ''
  );
}

/**
 * Discogs API credentials
 */
export function getDiscogsCredentials() {
  return {
    consumerKey: getEnvVar('DISCOGS_CONSUMER_KEY'),
    consumerSecret: getEnvVar('DISCOGS_CONSUMER_SECRET'),
  };
}

/**
 * Check if Discogs credentials are configured
 */
export function hasDiscogsCredentials(): boolean {
  const { consumerKey, consumerSecret } = getDiscogsCredentials();
  return Boolean(consumerKey && consumerSecret);
}
