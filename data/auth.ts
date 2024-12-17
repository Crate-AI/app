import { cookies } from 'next/headers';
import type { UserIdentity } from '@/types/auth';

const COOKIE_KEYS = {
  REQUEST_TOKEN: 'discogs_request_token',
  REQUEST_SECRET: 'discogs_request_secret',
  ACCESS_TOKEN: 'discogs_access_token',
  ACCESS_SECRET: 'discogs_access_secret',
} as const;

export async function getAuthTokens() {
  const cookieStore = cookies();

  return {
    accessToken: cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null,
    accessTokenSecret:
      cookieStore.get(COOKIE_KEYS.ACCESS_SECRET)?.value ?? null,
  };
}

export async function setAuthTokens(tokens: {
  accessToken: string;
  accessTokenSecret: string;
}) {
  cookies().set(COOKIE_KEYS.ACCESS_TOKEN, tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  cookies().set(COOKIE_KEYS.ACCESS_SECRET, tokens.accessTokenSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

export async function clearAuthTokens() {
  cookies().delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookies().delete(COOKIE_KEYS.ACCESS_SECRET);
}

export function getCurrentUser(): UserIdentity | null {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get('user_data')?.value;

  if (!userDataCookie) return null;

  try {
    return JSON.parse(userDataCookie);
  } catch {
    return null;
  }
}
