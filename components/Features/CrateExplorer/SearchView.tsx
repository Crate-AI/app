import { DiscogsSearchResult } from '@/types/discogs';
import SearchBar from './SearchBar';
import TrackGrid from './TrackGrid';

interface SearchViewProps {
  query: string;
  isLoading: boolean;
  error: string | null;
  results: DiscogsSearchResult[];
  onQueryChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  playingTrackId: number | null;
  onPlayToggle: (id: number) => void;
}

const SearchView = ({
  query,
  isLoading,
  error,
  results,
  onQueryChange,
  viewMode,
  playingTrackId,
  onPlayToggle,
}: SearchViewProps) => {
  return (
    <>
      <SearchBar
        query={query}
        isLoading={isLoading}
        onQueryChange={onQueryChange}
      />
      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-4">
          {error}
        </div>
      )}
      {!error && (
        <TrackGrid
          viewMode={viewMode}
          items={results}
          playingTrackId={playingTrackId}
          onPlayToggle={onPlayToggle}
        />
      )}
    </>
  );
};

export default SearchView;
