import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { PlaylistCardProps } from "./types";

export const PlaylistCard = ({ 
  playlist,
  isPlaying = false,
  onClick 
}: PlaylistCardProps) => {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-light cursor-pointer border-none",
        isPlaying && 'ring-2 ring-mainAccent'
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <button 
        className={cn(
          "absolute right-4 top-4 p-3 rounded-full bg-mainAccent text-text",
          isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          "transition-all hover:scale-105"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <CardHeader className="h-48 bg-gray-100">
        {playlist.coverImage ? (
          <img 
            src={playlist.coverImage} 
            alt={playlist.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Play size={48} className="text-gray-400" />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 bg-bg">
        <CardTitle className="text-lg font-heading font-medium text-text mb-1">
          {playlist.title}
        </CardTitle>
        <p className="text-small-subtitle text-text/70">
          {playlist.tracks.length} tracks
        </p>
      </CardContent>
    </Card>
  );
}; 