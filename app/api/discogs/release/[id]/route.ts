import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { rateLimiter } from '@/lib/utils/rateLimiter';
import { Release } from '@/types/discogs';

export const getDiscogsRelease = async (
  accessToken: string,
  accessTokenSecret: string,
  ip: string,
  releaseId: string,
) => {
  const identifier = `discogs:${accessToken ? accessToken : ip}`;

  // Check rate limit first
  const { isLimited, remaining, reset } = rateLimiter.check(identifier);

  if (isLimited) {
    return { isLimited, remaining, reset };
  }

  const discogsUrl = `https://api.discogs.com/releases/${releaseId}`;

  const response = await fetch(discogsUrl, {
    headers: {
      Authorization: `OAuth oauth_token=${accessToken}, oauth_token_secret=${accessTokenSecret}`,
      'User-Agent': 'CrateApp/1.0 +https://crate.ai',
      Accept: 'application/json',
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  const release: Release = await response.json();

  return { release, remaining, reset, isLimited };
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;

    if (!accessToken || !accessTokenSecret) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    const { release, remaining, reset, isLimited } = await getDiscogsRelease(
      accessToken,
      accessTokenSecret,
      ip,
      params.id,
    );

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
        },
      );
    }

    return NextResponse.json(release, {
      headers: {
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  } catch (error) {
    console.error('Discogs release fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release details' },
      { status: 500 },
    );
  }
}
