import { Database } from './database/supabase';

// Track types
export type InsertCrateTrack = Database['public']['Tables']['tracks']['Insert'];
// we want the CrateTrack type to not care about implemeetation details
// for convenience, i.e. that track analysis info is stacked on separately
export type CrateTrack = Database['public']['Tables']['tracks']['Row'] & {
  bpm: number | null;
};

// Playlist types
export type Playlist = Database['public']['Tables']['playlists']['Row'];
export type PlaylistTrack =
  Database['public']['Tables']['playlist_tracks']['Row'];
export type InsertPlaylist =
  Database['public']['Tables']['playlists']['Insert'];
export type InsertPlaylistTrack =
  Database['public']['Tables']['playlist_tracks']['Insert'];
