'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Milestone, MilestoneType } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';
import { calculateDday } from '@/lib/utils/date';

interface MilestoneState {
  milestones: Milestone[];
  addMilestone: (data: Pick<Milestone, 'title' | 'type' | 'subjectId' | 'dueDate' | 'description'>) => Milestone;
  updateMilestone: (id: string, data: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;
  toggleComplete: (id: string) => void;
  getUpcoming: (limit?: number) => Milestone[];
}

export const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set, get) => ({
      milestones: [],

      addMilestone: (data) => {
        const now = new Date().toISOString();
        const milestone: Milestone = {
          id: generateId(),
          title: data.title,
          type: data.type,
          subjectId: data.subjectId,
          dueDate: data.dueDate,
          description: data.description,
          isCompleted: false,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ milestones: [...state.milestones, milestone] }));
        return milestone;
      },

      updateMilestone: (id, data) =>
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.id === id ? { ...m, ...data, updatedAt: new Date().toISOString() } : m
          ),
        })),

      deleteMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
        })),

      toggleComplete: (id) =>
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.id === id
              ? { ...m, isCompleted: !m.isCompleted, updatedAt: new Date().toISOString() }
              : m
          ),
        })),

      getUpcoming: (limit = 5) => {
        return get()
          .milestones
          .filter((m) => !m.isCompleted && calculateDday(m.dueDate) >= 0)
          .sort((a, b) => calculateDday(a.dueDate) - calculateDday(b.dueDate))
          .slice(0, limit);
      },
    }),
    {
      name: STORAGE_KEYS.MILESTONES,
    }
  )
);
