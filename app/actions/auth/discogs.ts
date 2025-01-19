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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/auth/discogs/request-token`);

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
