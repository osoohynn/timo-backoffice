export interface LoginRequest {
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
