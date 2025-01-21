import { supabase } from './client';

export async function auth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  return session.user;
}

export async function initializeAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  // Set up auth state change listener
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session?.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });

  return session.user;
} 