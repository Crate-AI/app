import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Discogs releases table
  discogs_releases: defineTable({
    discogs_release_id: v.string(),
    basic_release_data: v.optional(v.any()), // JSON data
    discogs_release_data: v.optional(v.any()), // JSON data
    uploaded_at: v.optional(v.string()),
  }).index("by_discogs_release_id", ["discogs_release_id"]),

  // Tracks table
  tracks: defineTable({
    artist: v.string(),
    artwork: v.optional(v.string()),
    created_at: v.optional(v.string()),
    discogs_release_id: v.string(),
    duration: v.string(),
    extra_artists: v.optional(v.string()),
    genres: v.optional(v.string()),
    position: v.string(),
    styles: v.optional(v.string()),
    title: v.string(),
    youtube_video_id: v.optional(v.string()),
  })
    .index("by_discogs_release_id", ["discogs_release_id"])
    .index("by_artist", ["artist"]),

  // Playlists table
  playlists: defineTable({
    title: v.string(),
    cover_image_url: v.optional(v.string()),
    created_at: v.optional(v.string()),
    description: v.optional(v.string()),
    is_favorites: v.optional(v.boolean()),
    is_public: v.optional(v.boolean()),
    updated_at: v.optional(v.string()),
    user_id: v.optional(v.string()),
  })
    .index("by_user_id", ["user_id"])
    .index("by_is_public", ["is_public"]),

  // Playlist tracks junction table
  playlist_tracks: defineTable({
    playlist_id: v.id("playlists"),
    track_id: v.id("tracks"),
    position: v.number(),
    created_at: v.optional(v.string()),
  })
    .index("by_playlist_id", ["playlist_id"])
    .index("by_track_id", ["track_id"])
    .index("by_playlist_position", ["playlist_id", "position"]),

  // Track analysis table
  track_analysis: defineTable({
    track_id: v.optional(v.string()),
    analysis: v.any(), // JSON data
    bpm: v.optional(v.number()),
    created_at: v.optional(v.string()),
  }).index("by_track_id", ["track_id"]),

  // User Discogs profile
  user_discogs_profile: defineTable({
    username: v.string(),
    user_id: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("by_user_id", ["user_id"]),

  // User releases junction table
  user_releases: defineTable({
    user_id: v.string(),
    discogs_release_id: v.string(),
  })
    .index("by_user_id", ["user_id"])
    .index("by_discogs_release_id", ["discogs_release_id"])
    .index("by_user_and_release", ["user_id", "discogs_release_id"]),

  // Waitlist table
  waitlist: defineTable({
    email: v.string(),
    user_type: v.string(),
  }).index("by_email", ["email"]),
});
