'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student-high' | 'student-middle' | 'admin';

export interface AuthUser {
  name: string;
  role: UserRole;
  emoji: string;
}

export const QUICK_LOGIN_USERS: AuthUser[] = [
  { name: 'Joeun', role: 'student-high', emoji: '🎓' },
  { name: 'Junho', role: 'student-middle', emoji: '📚' },
  { name: 'admin', role: 'admin', emoji: '🛠️' },
];

interface AuthState {
  currentUser: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
    }),
    { name: 'mykeep_auth' }
  )
);
