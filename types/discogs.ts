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
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
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
  title: string;
  year: number;
  artists: Artist[];
  labels: string[];
  genres: string[];
  styles: string[];
  master_url: string;
  basic_information: {
    id: number;
    title: string;
    year: number;
    artists: Artist[];
    labels: { name: string; resource_url: string }[];
    genres: string[];
    styles: string[];
    master_url: string;
  };
}

export interface DiscogsCollectionResponse {
  pagination: {
    per_page: number;
    items: number;
    page: number;
    pages: number;
  };
  releases: Release[];
}

export interface UserDetails {
  username: string;
  resource_url: string;
  avatar_url: string;
}
