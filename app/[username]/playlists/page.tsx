'use client';

import { useState, useEffect } from "react";
import { PlaylistCard } from '@/features/playlists/components/PlaylistCard';
import { Playlist } from '@/features/playlists/components/Playlist';
import { usePlaylistStore } from '@/stores';

const PlaylistPage = () => {
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const { playlists, fetchPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handlePlaylistClick = (playlistId: string) => {
    setActivePlaylistId(currentId => currentId === playlistId ? null : playlistId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-medium-title font-heading font-bold mb-8 text-text">
          Playlists
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              isPlaying={activePlaylistId === playlist.id}
              onClick={() => handlePlaylistClick(playlist.id)}
            />
          ))}
        </div>

        {activePlaylistId && (
          <div className="mt-12">
            <Playlist activePlaylistId={activePlaylistId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
