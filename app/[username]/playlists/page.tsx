'use client';

import { useState, useEffect } from "react";
import { PlaylistCard } from '@/features/playlists/components/PlaylistCard';
import { Playlist } from '@/features/playlists/components/Playlist';
import { usePlaylistStore, usePlayerStore } from '@/stores';
import { PlaylistWithTracks } from "@/types";

const PlaylistPage = () => {
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const { playlists, fetchPlaylists } = usePlaylistStore();
  const { togglePlayPause } = usePlayerStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handlePlaylistAction = (playlist: PlaylistWithTracks) => {
    if (playlist.tracks?.length > 0) {
      togglePlayPause(playlist.tracks[0]);
      setActivePlaylistId(currentId => currentId === playlist.id ? null : playlist.id);
    }
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
              handleClick={() => handlePlaylistAction(playlist)}
              handlePlayPause={() => handlePlaylistAction(playlist)}
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
