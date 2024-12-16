import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserIdentity } from '@/types/auth';

interface AuthStore {
  // State
  isAuthenticated: boolean;
  userIdentity: UserIdentity | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setIsAuthenticated: (status: boolean) => void;
  setUserIdentity: (identity: UserIdentity | null) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  userIdentity: null,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setIsAuthenticated: (status) => set({ isAuthenticated: status }),

      setUserIdentity: (identity) =>
        set({
          userIdentity: identity,
          isAuthenticated: !!identity,
        }),

      setIsLoading: (status) => set({ isLoading: status }),

      setError: (error) => set({ error }),

      reset: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Only persist non-sensitive user data
        userIdentity: state.userIdentity,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Optional: Helper hooks for common auth operations
export function useUser() {
  const userIdentity = useAuthStore((state) => state.userIdentity);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { user: userIdentity, isAuthenticated };
}

export function useAuthStatus() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  return { isLoading, error };
}
