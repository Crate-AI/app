import { CollectionRelease } from '@/types/discogs';
import TrackGrid from './TrackGrid';
interface CollectionViewProps {
  isLoading: boolean;
  error: string | null;
  collection: CollectionRelease[];
  viewMode: 'grid' | 'list';
  playingTrackId: number | null;
  onPlayToggle: (id: number) => void;
}

const CollectionView = ({
  isLoading,
  error,
  collection,
  viewMode,
  playingTrackId,
  onPlayToggle,
}: CollectionViewProps) => {
  if (isLoading) return <div>Loading collection...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <TrackGrid
      viewMode={viewMode}
      items={collection.map((release) => ({
        id: release.basic_information.id,
        title: `${release.basic_information.artists.map((a) => a.name).join(', ')} - ${release.basic_information.title}`,
        thumb: release.basic_information.thumb,
        cover_image: release.basic_information.cover_image,
        year: String(release.basic_information.year),
        label: [release.basic_information.labels.map((l) => l.name).join(', ')],
        genre: release.basic_information.genres,
        style: release.basic_information.styles,
        format: [
          release.basic_information.formats.map((f) => f.name).join(', '),
        ],
        type: 'release',
        uri: `https://www.discogs.com/release/${release.basic_information.id}`,
        resource_url: `https://api.discogs.com/releases/${release.basic_information.id}`,
        date_added: release.date_added,
      }))}
      playingTrackId={playingTrackId}
      onPlayToggle={onPlayToggle}
    />
  );
};

export default CollectionView;
