import { Database } from '@/types/supabase';
import { CollectionResponse } from '@crate.ai/discogs-sdk/dist/collection/types';
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

    const { data: userReleases, error: userReleasesError } = await supabase
      .from('user_releases')
      .select('discogs_release_id')
      .eq('user_id', userData.user.id);

    if (userReleasesError) {
      throw userReleasesError;
    }

    const { data: tracksData, error: tracksError } = await supabase
      .from('tracks')
      .select('*')
      .in(
        'discogs_release_id',
        userReleases.map((r) => r.discogs_release_id),
      );

    if (tracksError) {
      throw tracksError;
    }

    return tracksData;
  };

  return {
    getCollection,
    ingestCollection,
    getCollectionTracks,
  };
};
