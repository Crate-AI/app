import { Database } from '@/types/database/supabase';
import { CollectionResponse } from '@crate.ai/discogs-sdk/dist/collection/types';
import { SupabaseClient } from '@supabase/supabase-js';

// this type is used only here
type DBTrack = Database['public']['Tables']['tracks']['Row'];

export const CollectionUtils = (supabase: SupabaseClient<Database>) => {
  const getTracks = async (tracksData: DBTrack[]) => {
    const { data: trackAnalysisData, error: trackAnalysisError } =
      await supabase
        .from('track_analysis')
        .select('*')
        .in(
          'track_id',
          tracksData.map((t) => t.id),
        );

    if (trackAnalysisError) {
      throw trackAnalysisError;
    }

    // combine with track analysis data
    const crateTracks = tracksData.map((track) => {
      const trackAnalysis = trackAnalysisData.find(
        (analysis) => analysis.track_id === track.id,
      );

      return {
        ...track,
        bpm: trackAnalysis?.bpm,
      };
    });

    return crateTracks;
  };

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

  const ingestCollection = async (collection: CollectionResponse) => {
    const combinedReleaseInfo = collection.releases.map((r) => ({
      discogs_release_id: r.id.toString(),
      discogs_release_data: null,
      basic_release_data: r,
    }));

    const { error: releaseError } = await supabase
      .from('discogs_releases')
      .upsert(combinedReleaseInfo);

    if (releaseError) {
      throw new Error(releaseError.message);
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error(userError.message);
    }

    const { error: userReleaseError } = await supabase
      .from('user_releases')
      .upsert(
        collection.releases.map((r) => ({
          user_id: userData.user.id,
          discogs_release_id: r.id.toString(),
        })),
      );

    if (userReleaseError) {
      throw new Error(userReleaseError.message);
    }
  };

  const getCollectionTracks = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const { data: tracksData, error: tracksError } = await supabase.rpc(
      'fetch_discogs_releases_and_tracks',
      {
        user_id: userData.user.id,
      },
    );
    if (tracksError) {
      throw tracksError;
    }
    return tracksData;
  };

  const getReleaseTracks = async (releaseId: string) => {
    const { data: tracksData, error: tracksError } = await supabase
      .from('tracks')
      .select('*')
      .eq('discogs_release_id', releaseId);

    if (tracksError) {
      throw tracksError;
    }

    const crateTracks = await getTracks(tracksData);

    return crateTracks;
  };

  return {
    getCollection,
    ingestCollection,
    getCollectionTracks,
    getReleaseTracks,
  };
};
