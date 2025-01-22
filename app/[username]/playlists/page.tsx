'use client';

import { useState, useEffect } from "react";
import { PlaylistCard } from '@/features/playlists/components/PlaylistCard';
import { Playlist } from '@/features/playlists/components/Playlist';
import { usePlaylistStore } from '@/stores';
import { PlaylistWithTracks } from "@/types";
import { CollectionNav } from '@/components/layout/Navigation';

const PlaylistPage = () => {
  const [expandedPlaylistId, setExpandedPlaylistId] = useState<string | null>(null);
  const { playlists, fetchPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handlePlaylistClick = (playlist: PlaylistWithTracks) => {
    setExpandedPlaylistId(currentId => currentId === playlist.id ? null : playlist.id);
  };

  const handlePlaylistExpand = (playlistId: string) => {
    setExpandedPlaylistId(playlistId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CollectionNav />
        <h1 className="text-medium-title font-heading font-bold mb-8 text-text">
          Playlists
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              handleClick={() => handlePlaylistClick(playlist)}
              onExpand={() => handlePlaylistExpand(playlist.id)}
            />
          ))}
        </div>

        {expandedPlaylistId && (
          <div className="mt-12">
            <Playlist activePlaylistId={expandedPlaylistId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
