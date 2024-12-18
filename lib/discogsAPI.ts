import { DiscogsSDK } from '@crate.ai/discogs-sdk';

const discogs = new DiscogsSDK({
  DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
  DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
});

export const fetchUserDetails = async (username: string) => {
  const resourceUrl = `https://api.discogs.com/users/${username}`;
  const response = await fetch(resourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch user details for ${username}`);
  }

  return response.json();
};

export const fetchUserCollection = async (
  username: string,
  perPage = 50,
  folderId = 0,
) => {
  const collection = await discogs.collection.getCollection({
    username,
    page: 1, // Fetch the first page for now
    perPage,
    folderId,
  });

  return collection;
};

export const fetchMasterRelease = async (masterUrl: string) => {
  const response = await fetch(masterUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch master release: ${masterUrl}`);
  }

  return response.json();
};

export async function getGenres(
  username: string,
): Promise<{ [genre: string]: number }> {
  const collection = await fetchUserCollection(username);

  const genreCounts: { [genre: string]: number } = {};
  collection.releases.forEach((release) => {
    release.basic_information.genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  return genreCounts;
}
