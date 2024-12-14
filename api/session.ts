import { Session, SupabaseClient, User } from '@supabase/supabase-js';

import { Database } from '@/types/supabase';

export interface SessionAPI {
  createSessionFromURL(url: string): Promise<{
    user: User | null;
    session: Session | null;
  } | null>;
  sendMagicLink(email: string, redirectTo: string): Promise<void>;
  signOut(): Promise<void>;
}

export function getSessionAPI(supabase: SupabaseClient<Database>): SessionAPI {
  async function sendMagicLink(email: string, redirectTo: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    if (error) {
      throw error;
    }
  }

  async function createSessionFromURL(url: string): Promise<{
    user: User | null;
    session: Session | null;
  } | null> {
    const parsedUrl = new URL(url);
    const searchParams = parsedUrl.searchParams;

    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');

    if (!access_token) return null;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || '',
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  return {
    sendMagicLink,
    createSessionFromURL,
    signOut,
  };
}
