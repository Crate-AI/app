import { DiscogsSearchResult } from '@/types';
import SearchBar from '@/features/crate-explorer/components/SearchBar';
import TrackGrid from '@/features/crate-explorer/tracks/TrackGrid';

interface SearchViewProps {
  query: string;
  isLoading: boolean;
  error: string | null;
  results: DiscogsSearchResult[];
  onQueryChange: (query: string) => void;
  viewMode: 'grid' | 'list';
}

const SearchView = ({
  query,
  isLoading,
  error,
  results,
  onQueryChange,
  viewMode,
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
      {!error && <TrackGrid viewMode={viewMode} items={results} />}
    </>
  );
};

export default SearchView;
