import { create } from 'zustand';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
