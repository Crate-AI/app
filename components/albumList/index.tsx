import React from 'react';
import { MasterRelease } from '@/types/discogs';

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
    <div className="flex flex-wrap gap-4 justify-center">
      {releases.map((release) => (
        <div key={release.id} className="border rounded-lg p-4 max-w-lg shadow-md bg-white">
          <h2 className="text-xl font-bold">{release.title} ({release.year})</h2>
          <p className="mt-2">Artists: {release.artists.join(', ')}</p>
          <p>Labels: {release.labels.join(', ')}</p>
          <p>Genres: {release.genres.join(', ')}</p>
          <p>Styles: {release.styles.join(', ')}</p>
          {release.masterData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Master Release Details:</h3>
              {release.masterData.genres && (
                <p>Genres: {release.masterData.genres.join(', ')}</p>
              )}
              {release.masterData.styles && (
                <p>Styles: {release.masterData.styles.join(', ')}</p>
              )}
              <p>Year: {release.masterData.year}</p>
              <h4 className="mt-2 text-md font-semibold">Tracklist:</h4>
              <table className="w-full mt-2 border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Position</th>
                    <th className="border p-2 text-left">Title</th>
                    <th className="border p-2 text-left">Artists</th>
                    <th className="border p-2 text-left">Play</th>
                  </tr>
                </thead>
                <tbody>
                  {release.masterData.tracklist.map((track, index) => (
                    <tr key={index}>
                      <td className="border p-2">{track.position}</td>
                      <td className="border p-2">{track.title}</td>
                      <td className="border p-2">{track.extraartists?.map(artist => artist.name).join(', ') || 'N/A'}</td>
                      <td className="border p-2">
                        {release?.masterData?.videos && release.masterData.videos.length > index && (
                          <iframe
                            className="w-full h-24"
                            src={`https://www.youtube.com/embed/${release.masterData.videos[index].uri.split('v=')[1]}`}
                            title={release.masterData.videos[index].title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className="mt-4 text-md font-semibold">Videos:</h4>
              <ul className="mt-2 list-disc list-inside">
                {release.masterData.videos && release.masterData.videos.map((video, index) => (
                  <li key={index}>
                    <a href={video.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{video.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AlbumList;