'use server';

import { cookies } from 'next/headers';
import type { UserIdentity } from '@/types';

export async function getCurrentUserIdentity(): Promise<UserIdentity | null> {
  try {
    const userDataCookie = cookies().get('user_data')?.value;
    if (!userDataCookie) return null;

    return JSON.parse(userDataCookie);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requestDiscogsAuth(): Promise<{
  authorizationUrl: string;
}> {
  try {
    // For server-side requests in production, we need to use the internal URL
    const url = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/auth/discogs/request-token`
      : 'http://localhost:3000/api/auth/discogs/request-token';

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get request token');
    }

    const data = await response.json();

    cookies().set('request_token', data.requestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookies().set('request_token_secret', data.requestTokenSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { authorizationUrl: data.authUrl };
  } catch (error) {
    console.error('Error in requestDiscogsAuth:', error);
    throw new Error('Failed to start Discogs authentication');
  }
}
