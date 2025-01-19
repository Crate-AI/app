import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserIdentity } from '@/types';

interface AuthStore {
  userIdentity: UserIdentity | null;
  setUserIdentity: (identity: UserIdentity | null) => void;
}

const initialState = {
  userIdentity: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserIdentity: (identity) =>
        set({
          userIdentity: identity,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userIdentity: state.userIdentity,
      }),
    },
  ),
); 