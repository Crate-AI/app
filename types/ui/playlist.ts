import { CrateTrack } from '@/types';

export interface Playlist {
  id: number;
  title: string;
  tracks: CrateTrack[];
  coverImage?: string;
}

export interface PlaylistCardProps {
  playlist: Playlist;
  isPlaying?: boolean;
  onClick?: () => void;
} 