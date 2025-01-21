'use client';

import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/utils";
import { usePlaylistStore } from "@/stores";
import { PlaylistWithTracks } from "@/types";
import { formatDuration } from "@/lib/utils/format";

interface PlaylistProps {
  activePlaylistId: string;
}

export const Playlist = ({ activePlaylistId }: PlaylistProps) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const { playlists } = usePlaylistStore();
  
  const activePlaylist = playlists.find(p => p.id === activePlaylistId);
  
  if (!activePlaylist) {
    return null;
  }

  const handlePlayPause = (trackId: string) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
      toast("Paused");
    } else {
      setCurrentlyPlaying(trackId);
      toast("Now playing");
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
          </tr>
        </thead>
        <tbody className="bg-bg divide-y divide-border">
          {activePlaylist.tracks.map((track) => (
            <tr
              key={track.id}
              className={cn(
                "group hover:bg-gray-50/5 transition-colors duration-200",
                currentlyPlaying === track.id && "bg-mainAccent/10"
              )}
            >
              <td className="pl-4 py-3">
                <button
                  onClick={() => handlePlayPause(track.id)}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    currentlyPlaying === track.id
                      ? "bg-mainAccent text-text"
                      : "bg-gray-50/10 hover:bg-gray-50/20 text-text"
                  )}
                >
                  {currentlyPlaying === track.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text">
                    {track.title}
                  </span>
                  <span className="text-small-subtitle text-text/70">
                    {track.artist}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-small-subtitle text-text/70">
                  {formatDuration(parseInt(track.duration))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};