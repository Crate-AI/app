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
    // Try NEXT_PUBLIC_BASE_URL first, then fall back to VERCEL_URL
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');

    const response = await fetch(`${baseUrl}/api/auth/discogs/request-token`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error('Invalid response format');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get request token');
    }

    // Keep the cookie setting as it's crucial for the callback
    cookies().set('request_token', data.requestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/', // Ensure cookie is available for all paths
    });

    cookies().set('request_token_secret', data.requestTokenSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/', // Ensure cookie is available for all paths
    });

    return { authorizationUrl: data.authUrl };
  } catch (error) {
    console.error('Error in requestDiscogsAuth:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to start Discogs authentication');
  }
}
