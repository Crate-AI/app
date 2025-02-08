import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DISCOGS_REQUEST_TOKEN_URL = 'https://api.discogs.com/oauth/request_token';
const CONSUMER_KEY = process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET!;

function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}

function generateTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateOAuthSignature(method: string, url: string, params: Record<string, string>, consumerSecret: string) {
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(paramString)
  ].join('&');

  const signingKey = `${encodeURIComponent(consumerSecret)}&`;
  
  return crypto
    .createHmac('sha1', signingKey)
    .update(signatureBaseString)
    .digest('base64');
}

export async function GET() {
  try {
    const timestamp = generateTimestamp();
    const nonce = generateNonce();
    const callback = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/auth/discogs/callback`
      : 'http://localhost:3000/api/auth/discogs/callback';

    const oauthParams = {
      oauth_consumer_key: CONSUMER_KEY,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_callback: callback,
      oauth_version: '1.0'
    };

    const signature = generateOAuthSignature(
      'GET',
      DISCOGS_REQUEST_TOKEN_URL,
      oauthParams,
      CONSUMER_SECRET
    );

    const authHeader = `OAuth oauth_consumer_key="${encodeURIComponent(CONSUMER_KEY)}", ` +
      `oauth_nonce="${encodeURIComponent(nonce)}", ` +
      `oauth_signature="${encodeURIComponent(signature)}", ` +
      `oauth_signature_method="HMAC-SHA1", ` +
      `oauth_timestamp="${timestamp}", ` +
      `oauth_callback="${encodeURIComponent(callback)}", ` +
      `oauth_version="1.0"`;

    const response = await fetch(DISCOGS_REQUEST_TOKEN_URL, {
      headers: {
        'Authorization': authHeader,
        'User-Agent': 'CrateAI/1.0'
      }
    });

    if (!response.ok) {
      console.error('Discogs request token error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { error: 'Failed to get request token from Discogs' },
        { status: response.status }
      );
    }

    const data = await response.text();
    const params = new URLSearchParams(data);
    const requestToken = params.get('oauth_token');
    const requestTokenSecret = params.get('oauth_token_secret');

    if (!requestToken || !requestTokenSecret) {
      console.error('Missing token or secret in Discogs response');
      return NextResponse.json(
        { error: 'Invalid response from Discogs' },
        { status: 500 }
      );
    }

    const authUrl = `https://discogs.com/oauth/authorize?oauth_token=${requestToken}`;

    return NextResponse.json({
      requestToken,
      requestTokenSecret,
      authUrl
    });
  } catch (error) {
    console.error('Proxy request token error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
} 