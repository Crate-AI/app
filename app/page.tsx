import type { NextPage, Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import Banner from '@/components/Banner';
import { DiscogsSDK, StorageService } from '@crate.ai/discogs-sdk';
import { UserDetails, DiscogsCollectionResponse, Release, MasterRelease } from '@/types/discogs';
import Waitlist from '@/components/Waitlist';
// import AlbumList from '@/components/AlbumList';

// const discogs = new DiscogsSDK({
//   DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY as string,
//   DiscogsConsumerSecret: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET as string,
// });

StorageService.storagePath = process.env.NEXT_PUBLIC_STORAGE_PATH as string;

export const metadata: Metadata = {
  title: 'Crate',
  description: 'Smart digging 💿',
};

const fetchUserDetails = async (resourceUrl: string): Promise<UserDetails> => {
  const userDetails: UserDetails = await fetch(resourceUrl).then((res) => res.json());
  return userDetails;
};

// const fetchUserCollection = async (username: string): Promise<DiscogsCollectionResponse> => {
//   const PER_PAGE = 1; // Limit the number of releases per page for testing

//   const fetchCollection = async (page = 1) => {
//     const response = await discogs.collection.getCollection({
//       username: username,
//       page: page,
//       perPage: PER_PAGE,
//       folderId: 0
//     });
//     return response;
//   };

//   const firstPageData = await fetchCollection();
//   const totalPages = firstPageData.pagination.pages;
//   let allReleases = firstPageData.releases;

//   for (let page = 2; page <= Math.min(2, totalPages); page++) { // Fetch only up to 2 pages for testing
//     const pageData = await fetchCollection(page);
//     allReleases = [...allReleases, ...pageData.releases];
//   }

//   return { ...firstPageData, releases: allReleases };
// };

// const fetchMasterRelease = async (masterUrl: string): Promise<MasterRelease> => {
//   const masterRelease = await fetch(masterUrl).then((res) => res.json());
// //  console.log('masterRelease', masterRelease);
//   return masterRelease;
// };

// const processReleases = async (releases: Release[]): Promise<any[]> => {
//   const processedReleases = await Promise.all(releases.map(async (release) => {
//     const { id, title, year, artists, labels, genres, styles, master_url } = release.basic_information;
//     let masterData = null;
//   //  console.log(id, title, year, artists, labels, genres, styles, master_url);
//     if (master_url) {
//       masterData = await fetchMasterRelease(master_url);
//     }

//     return {
//       id,
//       title,
//       year,
//       artists: artists.map(artist => artist.name),
//       labels: labels.map(label => label.name),
//       genres,
//       styles,
//       masterData,
//     };
//   }));

//   return processedReleases;
// };

const Home: NextPage = async () => {
  const { username, resource_url } = StorageService.getItem('userIdentity');
  const userDetails = await fetchUserDetails(resource_url);
  // const userCollection = await fetchUserCollection(username);
  // const processedReleases = await processReleases(userCollection.releases);

  return (
    <div>
      <main>
        <Waitlist />
          {/* <Banner /> */}
          {/* {username ? (
            <Banner avatarUrl={userDetails.avatar_url} username={userDetails.username} />
          ) : (
            <Banner avatarUrl="/default-avatar.png" username="Guest" />
          )} */}
          {/* <HeroSection /> */}
          {/* <AlbumList releases={processedReleases} /> */}

      </main>
    </div>
  );
};

export default Home;