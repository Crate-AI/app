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
import type { TrackWithDetails } from '@/types/dj';
import ViewToggleButtons from './ViewToggleButtons';
import SearchView from './SearchView';
import CollectionView from './CollectionView';
import { createClient } from '@/lib/supabase/client';

interface CollectionStats {
  total: number;
  loaded: number;
}

interface ExtendedCrateExplorerProps extends CrateExplorerProps {
  suggestedTracks?: TrackWithDetails[];
}

const CrateExplorer = ({ suggestedTracks }: ExtendedCrateExplorerProps) => {
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
  const [tracksWithDetails, setTracksWithDetails] = useState<TrackWithDetails[]>([]);

  // Fetch track details from Supabase
  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!collection.length) return;
      
      try {
        const supabase = createClient();
        const releaseIds = collection.map(r => r.basic_information.id);
        
        const { data: supabaseTracks, error } = await supabase
          .from('tracks')
          .select('*')
          .in('discogs_release_id', releaseIds.map(String));

        if (error) throw error;
        if (!supabaseTracks) return;

        // Map tracks with details
        const mappedTracks = collection.flatMap(release => {
          const releaseTracks = supabaseTracks.filter(
            t => String(t.discogs_release_id) === String(release.basic_information.id)
          );

          return releaseTracks.map(track => ({
            id: track.id,
            title: track.title,
            artist: release.basic_information.artists[0]?.name || 'Unknown Artist',
            position: track.position,
            duration: track.duration,
            bpm: track.bpm || Math.floor(Math.random() * (140 - 115) + 115),
            key: 'Am',
            releaseId: release.basic_information.id,
            releaseTitle: release.basic_information.title,
            releaseYear: String(release.basic_information.year),
            thumb: release.basic_information.thumb,
            genre: release.basic_information.genres,
            style: release.basic_information.styles,
            youtubeVideoId: track.youtube_video_id,
            extraArtists: track.extra_artists
          }));
        });

        setTracksWithDetails(mappedTracks);
      } catch (error) {
        console.error('Error fetching track details:', error);
      }
    };

    fetchTrackDetails();
  }, [collection]);

  useEffect(() => {
    if (pagination) {
      setCollectionStats({
        total: pagination.items,
        loaded: collection.length,
      });
    }
  }, [collection, pagination]);

  // Switch to collection view when receiving suggestions
  useEffect(() => {
    if (suggestedTracks?.length) {
      setView('collection');
    }
  }, [suggestedTracks]);

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
          // Pass suggestedTracks but keep it optional to maintain backwards compatibility
          suggestedTracks={suggestedTracks}
        />
      )}
    </div>
  );
};

export default CrateExplorer;