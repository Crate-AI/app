import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getDiscogsRelease } from '../../discogs/release/[id]/route';
import { findTrackVideo } from '@/lib/services/youtube';
import { Database } from '@/types/supabase';

export type InsertCrateTrack = Database['public']['Tables']['tracks']['Insert'];
export type CrateTrack = Database['public']['Tables']['tracks']['Row'];

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { discogsReleaseId: string };
  },
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

    const supabase = await createClient();
    const { data: tracks, error: trackError } = await supabase
      .from('tracks')
      .select('*')
      .eq('discogs_release_id', params.discogsReleaseId);

    if (trackError) {
      throw trackError;
    }

    // If track is not in the database, fetch it from Discogs/YouTube
    if (tracks.length === 0) {
      const { release, remaining, reset, isLimited } = await getDiscogsRelease(
        accessToken,
        accessTokenSecret,
        ip,
        params.discogsReleaseId,
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

      const tracksWithMetadata = await Promise.all(
        release.tracklist.map(async (track) => {
          try {
            const videoId = await findTrackVideo(track, release);
            return {
              ...track,
              bpm: Math.floor(Math.random() * (140 - 115) + 115),
              videoId,
            };
          } catch {
            return {
              ...track,
              bpm: Math.floor(Math.random() * (140 - 115) + 115),
              videoId: null,
            };
          }
        }),
      );

      // Insert tracks and release into the database
      const { error: releaseError } = await supabase
        .from('discogs_releases')
        .upsert({
          discogs_release_id: params.discogsReleaseId,
          discogs_release_data: release as any,
        });

      if (releaseError) {
        console.error('Could not insert release', releaseError);
        throw releaseError;
      }

      const fetchedTracks: InsertCrateTrack[] = tracksWithMetadata.map(
        (track) => ({
          discogs_release_id: params.discogsReleaseId,
          bpm: track.bpm,
          youtube_video_id: track.videoId,
          title: track.title,
          position: track.position,
          extra_artists: track.extraartists
            ?.map((artist) => artist.name)
            .join(', '),
          artist: release.artists.map((artist) => artist.name).join(', '),
          duration: track.duration,
        }),
      );

      const { data: newTrackData, error: newTrackError } = await supabase
        .from('tracks')
        .upsert(fetchedTracks)
        .select();

      if (newTrackError) {
        throw newTrackError;
      }

      return NextResponse.json(newTrackData, {
        headers: {
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Could not fetch release', error);
    return NextResponse.json(
      { error: 'Could not fetch release' },
      { status: 500 },
    );
  }
}
