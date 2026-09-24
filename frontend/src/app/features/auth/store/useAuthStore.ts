import { create } from 'zustand';
import type { AuthUser } from '../types';

const REFRESH_TOKEN_KEY = 'pennywise_refresh_token';

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthInitialized: boolean;
  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setAuthInitialized: (initialized: boolean) => void;
  setTemporaryAccessToken: (accessToken: string) => void;
  loadRefreshTokenFromStorage: () => string | null;
  saveRefreshTokenToStorage: (token: string) => void;
  clearRefreshTokenFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthInitialized: false,

  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => {
    set({ user, accessToken, refreshToken });
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearAuth: () => {
    set({ user: null, accessToken: null, refreshToken: null });
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  setAuthInitialized: (initialized: boolean) => {
    set({ isAuthInitialized: initialized });
  },

  setTemporaryAccessToken: (accessToken: string) => {
    set({ accessToken });
  },

  loadRefreshTokenFromStorage: () => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token) {
      set({ refreshToken: token });
    }
    return token;
  },

  saveRefreshTokenToStorage: (token: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    set({ refreshToken: token });
  },

  clearRefreshTokenFromStorage: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ refreshToken: null });
  },
}));
