import { CrateTrack } from '@/app/api/tracks/[discogsReleaseId]/route';

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