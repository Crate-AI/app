export interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export interface Track {
  position: string;
  type_: string;
  title: string;
  extraartists?: Artist[];
  duration: string;
}

export interface Video {
  uri: string;
  title: string;
  description: string;
  duration: number;
  embed: boolean;
}

export interface Artist {
  name: string;
  anv?: string;
  join?: string;
  role?: string;
  tracks?: string;
  id: number;
  resource_url: string;
}

export interface Label {
  name: string;
  resource_url: string;
  catno?: string;
  entity_type?: string;
  entity_type_name?: string;
  id?: number;
}

export interface Format {
  name: string;
  qty: string;
  descriptions?: string[];
  text?: string;
}

export interface Community {
  want: number;
  have: number;
  rating?: {
    count: number;
    average: number;
  };
  status?: string;
  contributors?: {
    username: string;
    resource_url: string;
  }[];
}

export interface MasterRelease {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  images: Image[];
  genres: string[];
  styles: string[];
  year: number;
  tracklist: Track[];
  artists: Artist[];
  title: string;
  data_quality: string;
  videos: Video[];
}

export interface Release {
  id: number;
  status: string;
  title: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: Artist[];
  artists_sort: string;
  labels: Label[];
  series: any[];
  companies: any[];
  formats: Format[];
  data_quality: string;
  community: Community;
  format_quantity: number;
  date_added: string;
  date_changed: string;
  num_for_sale: number;
  lowest_price: number | null;
  master_id: number | null;
  master_url: string | null;
  genres: string[];
  styles: string[];
  tracklist: Track[];
  images?: Image[];
  videos?: Video[];
  thumb?: string;
  cover_image?: string;
  basic_information?: {
    id: number;
    title: string;
    year: number;
    artists: Artist[];
    labels: Label[];
    genres: string[];
    styles: string[];
    master_url: string | null;
    thumb: string;
    cover_image: string;
    format: string[];
    resource_url: string;
  };
}

export interface DiscogsSearchResult {
  id: number;
  type: string;
  user_data?: {
    in_wantlist: boolean;
    in_collection: boolean;
  };
  master_id?: number;
  master_url?: string;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  country?: string;
  year?: string;
  format?: string[];
  label?: string[];
  genre?: string[];
  style?: string[];
  barcode?: string[];
  catno?: string;
  community?: Community;
  format_quantity?: number;
  formats?: Format[];
}

export interface DiscogsCollectionResponse {
  pagination: {
    per_page: number;
    items: number;
    page: number;
    pages: number;
    urls: {
      last?: string;
      next?: string;
      prev?: string;
    };
  };
  releases: Release[];
}

export interface UserDetails {
  id: number;
  username: string;
  resource_url: string;
  avatar_url: string;
  collection_folders_url: string;
  collection_fields_url: string;
  wantlist_url: string;
  rating_avg?: number;
  num_collection?: number;
  num_wantlist?: number;
  num_lists?: number;
  num_for_sale?: number;
  home_page?: string;
  location?: string;
  registered: string;
  profile?: string;
  inventory_url?: string;
  email?: string;
  num_pending?: number;
}

// Component Props Interfaces
export interface TrackDisplayProps {
  result: DiscogsSearchResult;
  isPlaying: boolean;
  onPlayToggle: () => void;
  viewMode: 'grid' | 'list';
}

export interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export interface SearchBarProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
}

export interface CrateExplorerProps {
  initialReleases?: DiscogsSearchResult[];
}

// Hook Return Types
export interface UseDiscogsSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: DiscogsSearchResult[];
  isLoading: boolean;
  error: string | null;
  isQueryValid: boolean;
}

// API Response Types
export interface DiscogsAPIError {
  message: string;
  description?: string;
  status?: number;
}
export interface ReleaseTrack {
  position: string;
  type_: string;
  title: string;
  duration: string;
  extraartists?: Artist[];
}

export interface ReleaseDetails {
  id: number;
  title: string;
  artists: Artist[];
  tracklist: ReleaseTrack[];
  year: number;
  genres: string[];
  styles: string[];
  images: Image[];
  videos?: Video[];
  community: Community;
  labels: Label[];
  formats: Format[];
}

// Update the component props
export interface ReleasesTrackProps {
  releaseId: number;
  onTrackSelect?: (track: ReleaseTrack) => void;
}

export interface SearchParams {
  query?: string;
  type?: 'release' | 'master' | 'artist' | 'label';
  title?: string;
  releaseTitle?: string;
  artist?: string;
  format?: string;
}

export interface SearchResult {
  id: number;
  type: string;
  title: string;
  thumb: string;
  cover_image?: string;
  master_id?: number;
  master_url?: string;
  uri: string;
  country?: string;
  year?: string;
  format?: string[];
  label?: string[];
  genre?: string[];
  style?: string[];
  community?: {
    want: number;
    have: number;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  pagination?: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
  };
}