import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createClient } from '@/lib/database/server';
import { CollectionUtils } from '@/lib/database/serverUtils/collection';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { discogsReleaseId: string };
  },
) {
  try {
    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;

    if (!accessToken || !accessTokenSecret) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    const supabase = await createClient();

    const { getReleaseTracks } = CollectionUtils(supabase);
    const tracks = await getReleaseTracks(params.discogsReleaseId);

    return NextResponse.json(tracks, { status: 200 });
  } catch (error) {
    console.error('Could not fetch release', error);
    return NextResponse.json(
      { error: 'Could not fetch release' },
      { status: 500 },
    );
  }
}
