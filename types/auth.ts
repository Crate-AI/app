export interface UserIdentity {
  username: string;
  avatar_url: string;
}

export interface AuthState {
  userIdentity: UserIdentity | null;
  setUserIdentity: (identity: UserIdentity) => void;
}
