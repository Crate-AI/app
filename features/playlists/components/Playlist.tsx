'use client';

import { useEffect } from "react";
import { Play, Pause, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/utils";
import { usePlaylistStore, usePlayerStore } from "@/stores";
import { formatDuration } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

interface PlaylistProps {
  activePlaylistId: string;
}

export const Playlist = ({ activePlaylistId }: PlaylistProps) => {
  const { playlists, removeTrackFromPlaylist } = usePlaylistStore();
  const { initializePlayer, playingTrackId, isPlaying, togglePlayPause } = usePlayerStore();
  
  const activePlaylist = playlists.find(p => p.id === activePlaylistId);
  
  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);

  if (!activePlaylist) {
    return null;
  }

  const handleRemoveTrack = async (trackId: string) => {
    try {
      await removeTrackFromPlaylist(activePlaylistId, trackId);
    } catch (error) {
      console.error('Error removing track:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-medium-title font-heading font-bold text-text">
          {activePlaylist.title}
        </h2>
      </div>
      
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-bg">
          <tr>
            <th className="w-16 px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
              Play
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">
              Track
            </th>
            <th className="w-24 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider">
              Duration
            </th>
            <th className="w-16 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-bg divide-y divide-border">
          {activePlaylist.tracks?.map((track) => {
            const isPlayingThisTrack = playingTrackId === track.id;
            return (
              <tr key={track.id} className="hover:bg-bg/50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => togglePlayPause(track)}
                    className="p-2 rounded-full hover:bg-bg/50"
                  >
                    {isPlayingThisTrack && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-text">
                      {track.title}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-text/70">
                  {formatDuration(track.duration)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTrack(track.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};