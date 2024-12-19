import { useState } from 'react';
import useDiscogsSearch from '@/lib/hooks/useDiscogsSearch';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import TrackDisplay from './TrackDisplay';
import type { CrateExplorerProps, DiscogsSearchResult } from '@/types/discogs';

const CrateExplorer = ({}: CrateExplorerProps) => {
  const { query, setQuery, results, isLoading, error, isQueryValid } = useDiscogsSearch();
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <SearchBar 
        query={query}
        isLoading={isLoading}
        onQueryChange={setQuery}
      />

      <ViewToggle 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-4">
          {error}
        </div>
      )}

      {!error && (
        <div className={viewMode === 'list' ? 'space-y-2' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
          {results.length > 0 ? (
            results.map((result: DiscogsSearchResult) => (
              <TrackDisplay
                key={result.id}
                result={result}
                viewMode={viewMode}
                isPlaying={playingTrackId === result.id}
                onPlayToggle={() => setPlayingTrackId(
                  playingTrackId === result.id ? null : result.id
                )}
              />
            ))
          ) : (
            <div className="text-center text-text/60 dark:text-darkText/60 py-8 col-span-full">
              {!query && 'Start typing to search records'}
              {query && !isQueryValid && 'Type at least 3 characters to search'}
              {query && isQueryValid && !isLoading && 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrateExplorer;