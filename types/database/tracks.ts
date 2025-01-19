import { Database } from "./supabase";

export type InsertCrateTrack = Database['public']['Tables']['tracks']['Insert'];
export type CrateTrack = Database['public']['Tables']['tracks']['Row'];