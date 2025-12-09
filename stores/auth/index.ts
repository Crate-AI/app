import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserIdentity } from '@/types';

interface AuthStore {
  userIdentity: UserIdentity | null;
  isLoading: boolean;
  setUserIdentity: (identity: UserIdentity | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  isAuthenticated: () => boolean;
}

const initialState = {
  userIdentity: null,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserIdentity: (identity) => {
        set({ userIdentity: identity });
      },
      setIsLoading: (isLoading) => {
        set({ isLoading });
      },
      isAuthenticated: () => {
        const state = get();
        return !!state.userIdentity;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userIdentity: state.userIdentity,
      }),
    },
  ),
);
