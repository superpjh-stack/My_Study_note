'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Subject } from '@/lib/types';
import { STORAGE_KEYS, DEFAULT_SUBJECTS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';

interface SubjectState {
  subjects: Subject[];
  addSubject: (data: Pick<Subject, 'name' | 'color' | 'teacher' | 'classroom'>) => Subject;
  updateSubject: (id: string, data: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  getSubjectById: (id: string) => Subject | undefined;
  initializeDefaults: () => void;
}

export const useSubjectStore = create<SubjectState>()(
  persist(
    (set, get) => ({
      subjects: [],

      addSubject: (data) => {
        const now = new Date().toISOString();
        const subject: Subject = {
          id: generateId(),
          name: data.name,
          color: data.color,
          teacher: data.teacher,
          classroom: data.classroom,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ subjects: [...state.subjects, subject] }));
        return subject;
      },

      updateSubject: (id, data) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
          ),
        })),

      deleteSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
        })),

      getSubjectById: (id) => get().subjects.find((s) => s.id === id),

      initializeDefaults: () => {
        if (get().subjects.length === 0) {
          const now = new Date().toISOString();
          const subjects = DEFAULT_SUBJECTS.map((s) => ({
            id: generateId(),
            name: s.name,
            color: s.color,
            createdAt: now,
            updatedAt: now,
          }));
          set({ subjects });
        }
      },
    }),
    {
      name: STORAGE_KEYS.SUBJECTS,
    }
  )
);
