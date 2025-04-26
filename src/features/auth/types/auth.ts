export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}
