import { InsertCrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route';
import { findTrackVideo } from '@/lib/services/youtube';
import { CollectionResponse, Release } from '@/types/discogs';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const CollectionUtils = (supabase: SupabaseClient<Database>) => {
  const getCollection = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }

    const { data, error } = await supabase
      .from('user_releases')
      .select(`discogs_release_id`)
      .eq('user_id', userData.user.id);

    if (error) {
      throw new Error(error.message);
    }

    const { data: releases, error: releaseError } = await supabase
      .from('discogs_releases')
      .select()
      .in(
        'discogs_release_id',
        data.map((r) => r.discogs_release_id),
      );

    if (releaseError) {
      throw new Error(releaseError.message);
    }

    return releases;
  };

  const ingestCollection = async (
    collection: CollectionResponse,
    releases: Release[],
  ) => {
    const combinedReleaseInfo = [];
    for (let i = 0; i < collection.releases.length; i++) {
      combinedReleaseInfo.push({
        discogs_release_id: collection.releases[i].id,
        discogs_release_data: releases[i],
        basic_release_data: collection.releases[i],
      });
    }
    const { error: releaseError } = await supabase
      .from('discogs_releases')
      .upsert(combinedReleaseInfo);

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
