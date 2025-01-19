import { Database } from "./supabase";

export type InsertCrateTrack = Database['public']['Tables']['tracks']['Insert'];
export type CrateTrack = Database['public']['Tables']['tracks']['Row'];
export type Playlist = Database['public']['Tables']['playlists']['Row'];
export type PlaylistTrack = Database['public']['Tables']['playlist_tracks']['Row'];