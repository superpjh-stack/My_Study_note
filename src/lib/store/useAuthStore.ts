'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student-high' | 'student-middle' | 'admin';

export interface AuthUser {
  name: string;
  role: UserRole;
  emoji: string;
  avatar: string; // path under /public, e.g. "/avatars/joeun.svg"
}

export const QUICK_LOGIN_USERS: AuthUser[] = [
  { name: 'Joeun',   role: 'student-high',   emoji: '🎓', avatar: '/avatars/joeun.svg'   },
  { name: 'Junho',   role: 'student-middle',  emoji: '📚', avatar: '/avatars/junho.svg'   },
  { name: 'Gerardo', role: 'student-high',    emoji: '🌟', avatar: '/avatars/gerardo.svg' },
  { name: 'Grace',   role: 'student-high',    emoji: '🌸', avatar: '/avatars/grace.svg'   },
  { name: 'admin',   role: 'admin',           emoji: '🛠️', avatar: '/avatars/admin.svg'   },
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
