import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import type {
  UserDetails,
  DiscogsCollectionResponse,
  Release,
} from '../types/discogs';

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
});

export async function getUserDetails(username: string): Promise<UserDetails> {
  const resourceUrl = `https://api.discogs.com/users/${username}`;
  const response = await fetch(resourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch user details for ${username}`);
  }

  return response.json();
}

function mapToCustomRelease(sdkRelease: any): Release {
  return {
    id: sdkRelease.id,
    title: sdkRelease.basic_information?.title || '',
    year: sdkRelease.basic_information?.year || 0,
    artists: sdkRelease.basic_information?.artists || [],
    labels: sdkRelease.basic_information?.labels?.map((l: any) => l.name) || [],
    genres: sdkRelease.basic_information?.genres || [],
    styles: sdkRelease.basic_information?.styles || [],
    master_url: sdkRelease.basic_information?.master_url || '',
    basic_information: {
      id: sdkRelease.basic_information?.id || 0,
      title: sdkRelease.basic_information?.title || '',
      year: sdkRelease.basic_information?.year || 0,
      artists: sdkRelease.basic_information?.artists || [],
      labels: sdkRelease.basic_information?.labels || [],
      genres: sdkRelease.basic_information?.genres || [],
      styles: sdkRelease.basic_information?.styles || [],
      master_url: sdkRelease.basic_information?.master_url || '',
    },
  };
}

export async function getUserCollection(
  username: string,
  perPage = 50,
  folderId = 0,
): Promise<DiscogsCollectionResponse> {
  try {
    const collection = await discogs.collection.getCollection({
      username,
      page: 1,
      perPage,
      folderId,
    });

    return {
      pagination: collection.pagination,
      releases: collection.releases.map(mapToCustomRelease),
    };
  } catch (error) {
    throw new Error(`Failed to fetch collection for ${username}: ${error}`);
  }
}

export async function getMasterRelease(masterUrl: string): Promise<any> {
  const response = await fetch(masterUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch master release: ${masterUrl}`);
  }

  return response.json();
}

export async function getGenreAnalysis(
  username: string,
): Promise<{ [genre: string]: number }> {
  const collection = await getUserCollection(username);

  return collection.releases.reduce(
    (genreCounts: { [genre: string]: number }, release) => {
      release.basic_information.genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
      return genreCounts;
    },
    {},
  );
}
