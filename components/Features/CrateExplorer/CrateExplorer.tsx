import { useState, useEffect } from 'react';
import useDiscogsSearch from '@/lib/hooks/useDiscogsSearch';
import { useDiscogsCollection } from '@/lib/hooks/useDiscogsCollection';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import TrackDisplay from './TrackDisplay';
import type { CrateExplorerProps, DiscogsSearchResult, CollectionRelease } from '@/types/discogs';

interface CollectionStats {
  total: number;
  loaded: number;
}

const CrateExplorer = ({}: CrateExplorerProps) => {
  const { query, setQuery, results, isLoading: searchLoading, error: searchError } = useDiscogsSearch();
  const { collection, pagination, loading: collectionLoading, error: collectionError } = useDiscogsCollection();
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [view, setView] = useState<'search' | 'collection'>('search');
  const [collectionStats, setCollectionStats] = useState<CollectionStats>({ total: 0, loaded: 0 });

  useEffect(() => {
    if (pagination) {
      setCollectionStats({
        total: pagination.items,
        loaded: collection.length
      });
    }
  }, [collection, pagination]);

  const renderContent = () => {
    if (view === 'search') {
      return (
        <>
          <SearchBar 
            query={query}
            isLoading={searchLoading}
            onQueryChange={setQuery}
          />
          {searchError && (
            <div className="text-red-500 dark:text-red-400 text-center py-4">
              {searchError}
            </div>
          )}
          {!searchError && (
            <div className={viewMode === 'list' ? 'space-y-2' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
              {results.map((result: DiscogsSearchResult) => (
                <TrackDisplay
                  key={result.id}
                  result={result}
                  viewMode={viewMode}
                  isPlaying={playingTrackId === result.id}
                  onPlayToggle={() => setPlayingTrackId(
                    playingTrackId === result.id ? null : result.id
                  )}
                  dateAdded={result.date_added || ''}
                />
              ))}
            </div>
          )}
        </>
      );
    }

    return (
      <>
        {collectionLoading && <div>Loading collection...</div>}
        {collectionError && <div className="text-red-500">{collectionError}</div>}
        {collection.length > 0 && (
          <div className={viewMode === 'list' ? 'space-y-2' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
            {collection.map((release: CollectionRelease) => (
              <TrackDisplay
                key={release.instance_id}
                result={{
                  id: release.basic_information.id,
                  title: `${release.basic_information.artists.map(a => a.name).join(', ')} - ${release.basic_information.title}`,
                  thumb: release.basic_information.thumb,
                  cover_image: release.basic_information.cover_image,
                  year: String(release.basic_information.year),
                  label: [release.basic_information.labels.map(l => l.name).join(', ')],
                  genre: release.basic_information.genres,
                  style: release.basic_information.styles,
                  format: [release.basic_information.formats.map(f => f.name).join(', ')],
                  type: 'release',
                  uri: `https://www.discogs.com/release/${release.basic_information.id}`,
                  resource_url: `https://api.discogs.com/releases/${release.basic_information.id}`,
                }}
                viewMode={viewMode}
                isPlaying={playingTrackId === release.basic_information.id}
                onPlayToggle={() => setPlayingTrackId(
                  playingTrackId === release.basic_information.id ? null : release.basic_information.id
                )}
                dateAdded={release.date_added}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button 
            onClick={() => setView('search')}
            className={`px-4 py-2 rounded ${
              view === 'search' ? 'bg-yellow-400' : 'bg-gray-200'
            }`}
          >
            Search
          </button>
          <button 
            onClick={() => setView('collection')}
            className={`px-4 py-2 rounded ${
              view === 'collection' ? 'bg-yellow-400' : 'bg-gray-200'
            }`}
          >
            Collection {collectionStats.total > 0 && `(${collectionStats.total})`}
          </button>
        </div>
        <ViewToggle 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default CrateExplorer;