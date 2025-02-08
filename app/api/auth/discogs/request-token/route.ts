import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  console.error('NEXT_PUBLIC_BASE_URL is not set');
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
}

console.log('Request Token Route - Starting with config:', {
  baseUrl,
  hasConsumerKey: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  hasConsumerSecret: !!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  nodeEnv: process.env.NODE_ENV,
  consumerKeyLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.length,
  consumerSecretLength: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET?.length,
  fullBaseUrl: process.env.NEXT_PUBLIC_BASE_URL
});

if (!process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || !process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET) {
  console.error('Missing Discogs credentials');
  throw new Error('Discogs credentials are required');
}

const sdk = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY,
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET,
  callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
  userAgent: 'CrateApp/1.0 +https://crate.ai',
  debug: true
});

// Force log the OAuth parameters
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = `${Date.now()}${Math.random().toString().substring(2)}`;
const signature = `${process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET}&`;
const authHeader =
  `OAuth oauth_consumer_key="${process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY}",` +
  `oauth_nonce="${nonce}",` +
  `oauth_callback="${encodeURIComponent(`${baseUrl}/api/auth/discogs/callback`)}",` +
  `oauth_signature="${encodeURIComponent(signature)}",` +
  `oauth_signature_method="PLAINTEXT",` +
  `oauth_timestamp="${timestamp}",` +
  `oauth_version="1.0"`;

console.log('OAUTH DEBUG - Full Parameters:', {
  raw_callback_url: `${baseUrl}/api/auth/discogs/callback`,
  encoded_callback_url: encodeURIComponent(`${baseUrl}/api/auth/discogs/callback`),
  environment: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    BASE_URL: baseUrl,
    protocol: baseUrl.startsWith('https') ? 'https' : 'http'
  },
  oauth: {
    consumer_key_length: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.length,
    signature_method: 'PLAINTEXT',
    timestamp,
    nonce,
    version: '1.0'
  },
  full_auth_header: authHeader
});

// Log the SDK configuration and request details
console.log('SDK Instance:', {
  config: {
    consumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.slice(0, 4) + '...',
    consumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET?.slice(0, 4) + '...',
    callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
    userAgent: 'CrateApp/1.0 +https://crate.ai'
  },
  authBase: typeof sdk.auth.base,
  authMethods: Object.keys(sdk.auth),
  tokenManager: typeof sdk.auth.base.getTokenManager === 'function' ? 'available' : 'not available'
});

export async function GET() {
  console.log('GET request started');
  try {
    console.log('Getting request token from Discogs...');
    
    // Log the SDK configuration
    console.log('SDK Configuration:', {
      consumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.slice(0, 4) + '...',
      consumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET?.slice(0, 4) + '...',
      callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
      userAgent: 'CrateApp/1.0 +https://crate.ai'
    });

    const requestTokenResponse = await sdk.auth.getRequestToken().catch(async error => {
      // Check if the response is HTML (authentication page)
      const responseText = error.response?.text ? await error.response.text() : '';
      const isAuthPage = responseText.includes('Authentication Required');
      
      console.error('REQUEST TOKEN ERROR:', {
        error_type: isAuthPage ? 'Vercel Authentication Required' : 'Discogs API Error',
        error: {
          message: error.message,
          stack: error.stack,
          cause: error.cause,
        },
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: Object.fromEntries(error.response.headers?.entries() || []),
          is_html: responseText.startsWith('<!doctype html>'),
          content_type: error.response.headers?.get('content-type'),
          url: error.response.url
        } : undefined,
        request: {
          consumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY?.slice(0, 4) + '...',
          callbackUrl: `${baseUrl}/api/auth/discogs/callback`,
          baseUrl,
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
          rawRequest: error.request ? {
            headers: error.request.headers,
            url: error.request.url,
            method: error.request.method,
            authorization: error.request.headers?.Authorization || error.request.headers?.authorization
          } : undefined
        }
      });

      if (isAuthPage) {
        throw new Error('Vercel authentication is blocking the request. Please configure authentication bypass in vercel.json');
      }
      throw error;
    });

    if (!requestTokenResponse?.requestTokens?.token || !requestTokenResponse?.requestTokens?.secret) {
      console.error('Invalid request token response:', requestTokenResponse);
      throw new Error('Invalid response from Discogs');
    }

    console.log('Got request token response:', {
      hasToken: !!requestTokenResponse.requestTokens.token,
      hasSecret: !!requestTokenResponse.requestTokens.secret,
      verificationURL: requestTokenResponse.verificationURL,
      tokenLength: requestTokenResponse.requestTokens.token?.length,
      secretLength: requestTokenResponse.requestTokens.secret?.length
    });

    const { token, secret } = requestTokenResponse.requestTokens;

    // Store both token and secret
    const cookieStore = cookies();
    
    try {
      cookieStore.set('request_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      cookieStore.set('request_token_secret', secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      const verifyToken = cookieStore.get('request_token');
      const verifySecret = cookieStore.get('request_token_secret');

      console.log('Cookies verification:', {
        tokenSet: !!verifyToken,
        secretSet: !!verifySecret,
        tokenMatch: verifyToken?.value === token,
        secretMatch: verifySecret?.value === secret
      });

    } catch (cookieError) {
      console.error('Cookie setting error:', cookieError);
      throw new Error('Failed to set cookies');
    }

    return NextResponse.json({
      authUrl: requestTokenResponse.verificationURL,
      requestToken: token,
      requestTokenSecret: secret,
    });
  } catch (error: any) {
    console.error('Error in request token route:', {
      error: error.message,
      stack: error.stack,
      cause: error.cause,
      name: error.name,
      code: error.code,
      type: typeof error,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Error getting authorization URL',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 },
    );
  }
}
