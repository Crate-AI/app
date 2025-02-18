import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { getDiscogsRelease } from '@/lib/api-clients/discogs';

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
