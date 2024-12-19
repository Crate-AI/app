import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { rateLimiter } from '@/lib/utils/rateLimiter';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const accessToken = cookies().get('access_token')?.value;
    
    // Check rate limit first
    const identifier = `discogs:${accessToken ? accessToken : ip}`;
    const { isLimited, remaining, reset } = rateLimiter.check(identifier);

    if (isLimited) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }

    const accessTokenSecret = cookies().get('access_token_secret')?.value;

    if (!accessToken || !accessTokenSecret) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const discogsUrl = `https://api.discogs.com/releases/${params.id}`;
    
    const response = await fetch(discogsUrl, {
      headers: {
        'Authorization': `OAuth oauth_token=${accessToken}, oauth_token_secret=${accessTokenSecret}`,
        'User-Agent': 'CrateApp/1.0 +https://crate.ai',
        'Accept': 'application/json'
      },
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      throw new Error(`Discogs API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { 
      headers: {
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
      }
    });
  } catch (error) {
    console.error('Discogs release fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release details' },
      { status: 500 }
    );
  }
}