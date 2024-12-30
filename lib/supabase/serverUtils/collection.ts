import { InsertCrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route';
import { findTrackVideo } from '@/lib/services/youtube';
import { Release } from '@/types/discogs';
import { SupabaseClient } from '@supabase/supabase-js';

export const CollectionUtils = (supabase: SupabaseClient) => {
  const getCollection = async (discogsReleaseId: string) => {
    const { data, error } = await supabase
      .from('discogs_releases')
      .select('*')
      .eq('discogs_release_id', discogsReleaseId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const ingestCollection = async (releases: Release[]) => {
    const { error: releaseError } = await supabase
      .from('discogs_releases')
      .upsert(
        releases.map((r) => ({
          discogs_release_id: r.id,
          discogs_release_data: r as any,
        })),
      );

    if (releaseError) {
      throw new Error(releaseError.message);
    }
    // Fetch the videoId for each track in the release, then flatten into an
    // array of tracks for the entire collection
    const releaseTracks: InsertCrateTrack[] = (
      await Promise.all(
        releases.map(async (release) => {
          return await Promise.all(
            release.tracklist.map(async (track) => {
              const trackInfo = {
                discogs_release_id: release.id.toString(),
                title: track.title,
                position: track.position,
                extra_artists: track.extraartists
                  ?.map((artist) => artist.name)
                  .join(', '),
                artist: release.artists.map((artist) => artist.name).join(', '),
                duration: track.duration,
                bpm: Math.floor(Math.random() * (140 - 115) + 115),
              };
              try {
                const videoId = await findTrackVideo(track, release);
                return {
                  ...trackInfo,
                  youtube_video_id: videoId,
                };
              } catch {
                return {
                  ...trackInfo,
                  youtube_video_id: null,
                };
              }
            }),
          );
        }),
      )
    ).flat();

    const { error: newTrackError } = await supabase
      .from('tracks')
      .upsert(releaseTracks)
      .select();

    if (newTrackError) {
      throw newTrackError;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }

    const { error: userReleaseError } = await supabase
      .from('user_releases')
      .upsert(
        releases.map((r) => ({
          user_id: userData.user.id,
          discogs_release_id: r.id,
        })),
      );

    if (userReleaseError) {
      throw new Error(userReleaseError.message);
    }
  };

  return {
    getCollection,
    ingestCollection,
  };
};
