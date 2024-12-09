import React from 'react';
import { MasterRelease } from '@/types/discogs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

interface AlbumListProps {
  releases: {
    id: number;
    title: string;
    year: number;
    artists: string[];
    labels: string[];
    genres: string[];
    styles: string[];
    masterData: MasterRelease | null;
  }[];
}

const AlbumList: React.FC<AlbumListProps> = ({ releases }) => {
  return (
    <Table>
      <TableCaption>A list of music albums from your collection.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Artists</TableHead>
          <TableHead>Labels</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead>Styles</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Play</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {releases?.map((release) =>
          release.masterData?.tracklist.map((track, trackIndex) => (
            <TableRow key={`${release.id}-${trackIndex}`}>
              {trackIndex === 0 && (
                <>
                  <TableCell rowSpan={release?.masterData?.tracklist?.length}>
                    {release?.masterData?.images &&
                    release?.masterData?.images.length > 0 &&
                    release.masterData.images[0].uri150 ? (
                      <Image
                        src={release.masterData.images[0].uri150}
                        alt={`${release.title} cover`}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/logo.svg"
                        alt="Placeholder cover"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell
                    rowSpan={release.masterData?.tracklist?.length}
                    className="font-medium"
                  >
                    {release.title}
                  </TableCell>
                  <TableCell rowSpan={release.masterData?.tracklist?.length}>
                    {release.year}
                  </TableCell>
                  <TableCell rowSpan={release.masterData?.tracklist?.length}>
                    {release.artists.join(', ')}
                  </TableCell>
                  <TableCell rowSpan={release.masterData?.tracklist?.length}>
                    {release.labels.join(', ')}
                  </TableCell>
                  <TableCell rowSpan={release.masterData?.tracklist?.length}>
                    {release.genres.join(', ')}
                  </TableCell>
                  <TableCell rowSpan={release.masterData?.tracklist?.length}>
                    {release.styles.join(', ')}
                  </TableCell>
                </>
              )}
              <TableCell>
                {track.position} - {track.title}
                {track.extraartists && (
                  <span>
                    {' '}
                    (feat.{' '}
                    {track.extraartists.map((artist) => artist.name).join(', ')}
                    )
                  </span>
                )}
              </TableCell>
              <TableCell className="iframe-container">
                {release?.masterData?.videos &&
                  release.masterData.videos.length > trackIndex && (
                    <iframe
                      className="iframe"
                      src={`https://www.youtube.com/embed/${release.masterData.videos[trackIndex].uri.split('v=')[1]}`}
                      title={release.masterData.videos[trackIndex].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
};

export default AlbumList;
