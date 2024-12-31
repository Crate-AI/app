
export interface TrackWithDetails {
    id: string;
    title: string;
    artist: string;
    position: string;
    duration: string;
    bpm: number;
    key: string;
    releaseId: number;
    releaseTitle: string;
    releaseYear: string;
    thumb: string;
    genre: string[];
    style: string[];
    youtubeVideoId?: string;
    extraArtists?: string;
  }
  
  export interface TrackSuggestion {
    track: TrackWithDetails;
    reason: string;
  }
  
  export interface DJViewFilters {
    search: string;
    bpmRange: [number, number];
    key: string;
    energy: string;
    trackIds?: string[];
  }
  
  export interface TrackContextType {
    result: TrackWithDetails;
    isPlaying: boolean;
    onPlayToggle: () => void;
    dateAdded: string;
  }