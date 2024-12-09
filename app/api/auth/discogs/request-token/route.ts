import { NextResponse, NextRequest } from 'next/server';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import path from 'path';

// Initialize StorageService storage path
StorageService.storagePath = path.join(process.cwd(), 'storage.json');

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
});

export async function GET(request: NextRequest) {
  try {
    const callbackUrl = 'http://localhost:3000/api/auth/discogs/callback';
    const requestTokenResponse =
      await discogs.auth.getRequestToken(callbackUrl);
    return NextResponse.json({ authUrl: requestTokenResponse.verificationURL });
  } catch (error: any) {
    console.error('Error obtaining request token:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Unknown error occurred' },
      { status: 500 },
    );
  }
}
