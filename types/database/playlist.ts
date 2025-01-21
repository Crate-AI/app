import { Database } from "./supabase";

export type Playlist = Database['public']['Tables']['playlists']['Row'];
export type PlaylistTrack = Database['public']['Tables']['playlist_tracks']['Row'];
export type InsertPlaylist = Database['public']['Tables']['playlists']['Insert'];
export type InsertPlaylistTrack = Database['public']['Tables']['playlist_tracks']['Insert'];