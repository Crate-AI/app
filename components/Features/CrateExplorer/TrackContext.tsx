import { createContext } from 'react';
import { TrackWithDetails } from '@/types/dj';

interface TrackContextType {
  result: TrackWithDetails;
  isPlaying: boolean;
  onPlayToggle: (videoId?: string) => void;
  dateAdded: string;
}

export const TrackContext = createContext<TrackContextType>({
  result: null as any,
  isPlaying: false,
  onPlayToggle: () => {},
  dateAdded: ''
}); 