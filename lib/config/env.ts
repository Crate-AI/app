/**
 * Centralized Environment Configuration
 *
 * This module provides type-safe access to environment variables/secrets.
 *
 * Adapted for Netlify/Node.js environment.
 */

/**
 * Type definition for Environment variables.
 */
export interface CloudflareEnv {
  // Discogs OAuth credentials
  DISCOGS_CONSUMER_KEY?: string;
  DISCOGS_CONSUMER_SECRET?: string;

  // Environment identifier
  ENVIRONMENT?: 'development' | 'staging' | 'production';
}

/**
 * Get the environment object.
 * In Node.js/Netlify, this comes from process.env
 */
export function getCloudflareEnv(): CloudflareEnv {
  return (typeof process !== 'undefined' ? process.env : {}) as unknown as CloudflareEnv;
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
  return (getEnvVar('ENVIRONMENT') as CloudflareEnv['ENVIRONMENT']) || 'development';
}
