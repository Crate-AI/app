'use client'

import { useState, useEffect } from 'react';
import useDiscogsSearch from '@/lib/hooks/useDiscogsSearch';
import { useDiscogsCollection } from '@/lib/hooks/useDiscogsCollection';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import TrackDisplay from './TrackDisplay';
import type {
  CrateExplorerProps,
  DiscogsSearchResult,
  CollectionRelease,
} from '@/types/discogs';
import ViewToggleButtons from './ViewToggleButtons';
import SearchView from './SearchView';
import CollectionView from './CollectionView';

interface CollectionStats {
  total: number;
  loaded: number;
}

const CrateExplorer = ({}: CrateExplorerProps) => {
  const {
    query,
    setQuery,
    results,
    isLoading: searchLoading,
    error: searchError,
  } = useDiscogsSearch();
  const {
    collection,
    pagination,
    loading: collectionLoading,
    error: collectionError,
  } = useDiscogsCollection();
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [view, setView] = useState<'search' | 'collection'>('search');
  const [collectionStats, setCollectionStats] = useState<CollectionStats>({
    total: 0,
    loaded: 0,
  });

  useEffect(() => {
    if (pagination) {
      setCollectionStats({
        total: pagination.items,
        loaded: collection.length,
      });
    }
  }, [collection, pagination]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <ViewToggleButtons
          view={view}
          onViewChange={setView}
          collectionCount={collectionStats.total}
        />
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {view === 'search' ? (
        <SearchView
          query={query}
          isLoading={searchLoading}
          error={searchError}
          results={results}
          onQueryChange={setQuery}
          viewMode={viewMode}
          playingTrackId={playingTrackId}
          onPlayToggle={(id) =>
            setPlayingTrackId(playingTrackId === id ? null : id)
          }
        />
      ) : (
        <CollectionView
          isLoading={collectionLoading}
          error={collectionError}
          collection={collection}
          viewMode={viewMode}
          playingTrackId={playingTrackId}
          onPlayToggle={(id) =>
            setPlayingTrackId(playingTrackId === id ? null : id)
          }
        />
      )}
    </div>
  );
};

export default CrateExplorer;
