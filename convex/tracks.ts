import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';
import { v } from 'convex/values';

/**
 * Get all tracks for the authenticated user
 * Uses indexed queries to avoid reading the entire tracks table
 */
export const getUserTracks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      return [];
    }

    // Get the legacy user ID for data linking
    let legacyUserId: string | null = null;
    
    if (user.supabaseUserId) {
      legacyUserId = user.supabaseUserId;
    }
    
    if (!legacyUserId && user.email) {
      const profileByEmail = await ctx.db
        .query('user_discogs_profile')
        .withIndex('by_user', (q) => q.eq('user_id', user.email!))
        .first();
      
      if (profileByEmail) {
        legacyUserId = profileByEmail.user_id;
      }
    }

    if (!legacyUserId) {
      return [];
    }

    // Get user's releases using the indexed query
    const userReleases = await ctx.db
      .query('user_releases')
      .withIndex('by_user', (q) => q.eq('user_id', legacyUserId!))
      .collect();

    if (!userReleases || userReleases.length === 0) {
      return [];
    }

    // Fetch tracks for each release using the index
    // This is more efficient than fetching ALL tracks
    const allTracks: any[] = [];
    
    for (const release of userReleases) {
      const releaseTracks = await ctx.db
        .query('tracks')
        .withIndex('by_discogs_release', (q) => 
          q.eq('discogs_release_id', release.discogs_release_id)
        )
        .collect();
      
      allTracks.push(...releaseTracks);
    }

    // Return tracks without analysis for now (to reduce data size)
    return allTracks;
  },
});

/**
 * Get paginated tracks for the authenticated user
 * Use this for large collections
 */
export const getUserTracksPaginated = query({
  args: {
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { cursor, limit = 50 }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { tracks: [], nextCursor: null };
    }

    const user = await ctx.db.get(userId);
    if (!user?.supabaseUserId) {
      return { tracks: [], nextCursor: null };
    }

    // Get user's releases
    const userReleases = await ctx.db
      .query('user_releases')
      .withIndex('by_user', (q) => q.eq('user_id', user.supabaseUserId!))
      .collect();

    if (!userReleases || userReleases.length === 0) {
      return { tracks: [], nextCursor: null };
    }

    const releaseIds = new Set(userReleases.map(r => String(r.discogs_release_id)));

    // Get paginated tracks
    let query = ctx.db.query('tracks').order('desc');
    
    const results = await query.paginate({ 
      cursor: cursor ?? null, 
      numItems: limit * 2 // Fetch more to filter
    });

    // Filter to only user's tracks
    const userTracks = results.page.filter(track => 
      releaseIds.has(String(track.discogs_release_id))
    ).slice(0, limit);

    return {
      tracks: userTracks,
      nextCursor: results.continueCursor,
      isDone: results.isDone,
    };
  },
});

/**
 * Get a single track by ID
 */
export const getTrack = query({
  args: { trackId: v.id('tracks') },
  handler: async (ctx, { trackId }) => {
    return await ctx.db.get(trackId);
  },
});

/**
 * Get track by old string ID (for compatibility)
 */
export const getTrackByOldId = query({
  args: { oldId: v.string() },
  handler: async (ctx, { oldId }) => {
    return await ctx.db
      .query('tracks')
      .withIndex('by_old_id', (q) => q.eq('id', oldId))
      .first();
  },
});

/**
 * Search tracks by title or artist
 */
export const searchTracks = query({
  args: { searchQuery: v.string() },
  handler: async (ctx, { searchQuery }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);
    if (!user?.supabaseUserId) {
      return [];
    }

    // Get user's releases first
    const userReleases = await ctx.db
      .query('user_releases')
      .withIndex('by_user', (q) => q.eq('user_id', user.supabaseUserId!))
      .collect();

    if (!userReleases.length) {
      return [];
    }

    const releaseIds = new Set(userReleases.map(r => String(r.discogs_release_id)));
    const lowerQuery = searchQuery.toLowerCase();

    // Get user's tracks by fetching each release
    const allTracks: any[] = [];
    for (const release of userReleases.slice(0, 20)) { // Limit to first 20 releases for search
      const releaseTracks = await ctx.db
        .query('tracks')
        .withIndex('by_discogs_release', (q) => 
          q.eq('discogs_release_id', release.discogs_release_id)
        )
        .collect();
      allTracks.push(...releaseTracks);
    }

    // Filter by search query
    return allTracks
      .filter(track => 
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 50);
  },
});
