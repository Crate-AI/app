import { getAuthUserId } from '@convex-dev/auth/server';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

/**
 * Get the current authenticated user with all profile fields
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

/**
 * Get a user by their username (for public profiles)
 */
export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return await ctx.db
      .query('users')
      .withIndex('by_username', (q) => q.eq('username', username))
      .first();
  },
});

/**
 * Check if a username is available
 */
export const checkUsernameAvailable = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    // Validate username format
    if (username.length < 3 || username.length > 30) {
      return { available: false, error: 'Username must be 3-30 characters' };
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return { available: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }

    const existing = await ctx.db
      .query('users')
      .withIndex('by_username', (q) => q.eq('username', username))
      .first();
    
    return { available: !existing, error: existing ? 'Username is already taken' : null };
  },
});

/**
 * Set username for the current user (during onboarding)
 */
export const setUsername = mutation({
  args: { 
    username: v.string(),
    displayName: v.optional(v.string()),
  },
  handler: async (ctx, { username, displayName }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    // Validate username format
    if (username.length < 3 || username.length > 30) {
      throw new Error('Username must be 3-30 characters');
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, underscores, and hyphens');
    }

    // Check if username is already taken
    const existing = await ctx.db
      .query('users')
      .withIndex('by_username', (q) => q.eq('username', username))
      .first();
    
    if (existing && existing._id !== userId) {
      throw new Error('Username is already taken');
    }

    // Update user with username
    await ctx.db.patch(userId, {
      username: username.toLowerCase(),
      displayName: displayName || username,
      onboardingComplete: true,
    });

    return { success: true, username: username.toLowerCase() };
  },
});

/**
 * Update user profile
 */
export const updateProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    await ctx.db.patch(userId, args);
    return { success: true };
  },
});
