'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GradeLevel, Semester, ThemeMode, UserProfile } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';

interface ProfileState {
  profile: UserProfile;
  setGrade: (grade: GradeLevel) => void;
  setSemester: (semester: Semester) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const createDefaultProfile = (): UserProfile => ({
  id: generateId(),
  grade: 'high-1',
  semester: '1',
  theme: 'light',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: createDefaultProfile(),

      setGrade: (grade) =>
        set((state) => ({
          profile: { ...state.profile, grade, updatedAt: new Date().toISOString() },
        })),

      setSemester: (semester) =>
        set((state) => ({
          profile: { ...state.profile, semester, updatedAt: new Date().toISOString() },
        })),

      setTheme: (theme) =>
        set((state) => ({
          profile: { ...state.profile, theme, updatedAt: new Date().toISOString() },
        })),

      toggleTheme: () =>
        set((state) => ({
          profile: {
            ...state.profile,
            theme: state.profile.theme === 'light' ? 'dark' : 'light',
            updatedAt: new Date().toISOString(),
          },
        })),
    }),
    {
      name: STORAGE_KEYS.PROFILE,
    }
  )
);
