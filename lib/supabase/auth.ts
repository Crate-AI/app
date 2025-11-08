import { supabase } from './client';

export async function auth() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    if (!session) {
      return null;
    }
    return session.user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function initializeAuth() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return null;
    }

    if (!session) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
