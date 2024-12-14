// import { create } from 'zustand';

// interface UserStore {
//   requestToken: string | null;
//   requestTokenSecret: string | null;
//   accessToken: string | null;
//   accessTokenSecret: string | null;
//   authorizationUrl: string | null;
//   userIdentity: {
//     username: string;
//     avatar_url: string;
//   } | null;
//   setRequestToken: (token: string) => void;
//   setRequestTokenSecret: (secret: string) => void;
//   setAccessToken: (token: string) => void;
//   setAccessTokenSecret: (secret: string) => void;
//   setAuthorizationUrl: (url: string) => void;
//   setUserIdentity: (identity: { username: string; avatar_url: string }) => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   requestToken: null,
//   requestTokenSecret: null,
//   accessToken: null,
//   accessTokenSecret: null,
//   authorizationUrl: null,
//   userIdentity: null,
//   setRequestToken: (token) => set({ requestToken: token }),
//   setRequestTokenSecret: (secret) => set({ requestTokenSecret: secret }),
//   setAccessToken: (token) => set({ accessToken: token }),
//   setAccessTokenSecret: (secret) => set({ accessTokenSecret: secret }),
//   setAuthorizationUrl: (url) => set({ authorizationUrl: url }),
//   setUserIdentity: (identity) => set({ userIdentity: identity }),
// }));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  requestToken: string | null;
  requestTokenSecret: string | null;
  accessToken: string | null;
  accessTokenSecret: string | null;
  authorizationUrl: string | null;
  userIdentity: {
    username: string;
    avatar_url: string;
  } | null;
  setRequestToken: (token: string) => void;
  setRequestTokenSecret: (secret: string) => void;
  setAccessToken: (token: string) => void;
  setAccessTokenSecret: (secret: string) => void;
  setAuthorizationUrl: (url: string) => void;
  setUserIdentity: (identity: { username: string; avatar_url: string }) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      requestToken: null,
      requestTokenSecret: null,
      accessToken: null,
      accessTokenSecret: null,
      authorizationUrl: null,
      userIdentity: null,
      setRequestToken: (token) => set({ requestToken: token }),
      setRequestTokenSecret: (secret) => set({ requestTokenSecret: secret }),
      setAccessToken: (token) => set({ accessToken: token }),
      setAccessTokenSecret: (secret) => set({ accessTokenSecret: secret }),
      setAuthorizationUrl: (url) => set({ authorizationUrl: url }),
      setUserIdentity: (identity) => set({ userIdentity: identity }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these fields
        accessToken: state.accessToken,
        accessTokenSecret: state.accessTokenSecret,
        userIdentity: state.userIdentity,
      }),
    }
  )
);