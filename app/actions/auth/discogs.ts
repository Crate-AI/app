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
    console.log('Starting Discogs auth request...');
    
    // Try NEXT_PUBLIC_BASE_URL first, then fall back to VERCEL_URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (
      process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'
    );

    console.log('Auth request config:', {
      baseUrl,
      hasConsumerKey: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
      hasConsumerSecret: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      protocol: baseUrl.startsWith('https') ? 'https' : 'http',
      consumerKeyLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.length,
      consumerSecretLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET?.length
    });

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
      console.error('Failed to parse response:', {
        text: responseText,
        error: e
      });
      throw new Error('Invalid response format');
    }

    if (!response.ok) {
      console.error('Failed to get request token:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        data,
        url: `${baseUrl}/api/auth/discogs/request-token`
      });
      throw new Error(data.error || 'Failed to get request token');
    }

    console.log('Received response:', {
      status: response.status,
      hasAuthUrl: !!data.authUrl,
      hasRequestToken: !!data.requestToken,
      hasRequestTokenSecret: !!data.requestTokenSecret,
      authUrlLength: data.authUrl?.length,
      requestTokenLength: data.requestToken?.length,
      requestTokenSecretLength: data.requestTokenSecret?.length,
      fullAuthUrl: data.authUrl // This is safe to log as it's a public URL
    });

    // Keep the cookie setting as it's crucial for the callback
    cookies().set('request_token', data.requestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',  // Ensure cookie is available for all paths
    });

    cookies().set('request_token_secret', data.requestTokenSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',  // Ensure cookie is available for all paths
    });

    // Verify cookies were set
    const verifyToken = cookies().get('request_token');
    const verifySecret = cookies().get('request_token_secret');
    
    console.log('Cookie verification:', {
      tokenSet: !!verifyToken,
      secretSet: !!verifySecret,
      tokenMatch: verifyToken?.value === data.requestToken,
      secretMatch: verifySecret?.value === data.requestTokenSecret
    });

    return { authorizationUrl: data.authUrl };
  } catch (error) {
    console.error('Error in requestDiscogsAuth:', error);
    throw error instanceof Error ? error : new Error('Failed to start Discogs authentication');
  }
}