'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScheduleSlot, DayOfWeek } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';

interface ScheduleState {
  slots: ScheduleSlot[];
  addSlot: (data: Pick<ScheduleSlot, 'subjectId' | 'dayOfWeek' | 'period' | 'startTime' | 'endTime' | 'note'>) => ScheduleSlot;
  updateSlot: (id: string, data: Partial<ScheduleSlot>) => void;
  deleteSlot: (id: string) => void;
  getSlotsByDay: (day: DayOfWeek) => ScheduleSlot[];
  getSlotByDayAndPeriod: (day: DayOfWeek, period: number) => ScheduleSlot | undefined;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      slots: [],

      addSlot: (data) => {
        const now = new Date().toISOString();
        const slot: ScheduleSlot = {
          id: generateId(),
          subjectId: data.subjectId,
          dayOfWeek: data.dayOfWeek,
          period: data.period,
          startTime: data.startTime,
          endTime: data.endTime,
          note: data.note,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ slots: [...state.slots, slot] }));
        return slot;
      },

      updateSlot: (id, data) =>
        set((state) => ({
          slots: state.slots.map((s) =>
            s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
          ),
        })),

      deleteSlot: (id) =>
        set((state) => ({
          slots: state.slots.filter((s) => s.id !== id),
        })),

      getSlotsByDay: (day) =>
        get().slots.filter((s) => s.dayOfWeek === day).sort((a, b) => a.period - b.period),

      getSlotByDayAndPeriod: (day, period) =>
        get().slots.find((s) => s.dayOfWeek === day && s.period === period),
    }),
    {
      name: STORAGE_KEYS.SCHEDULE,
    }
  )
);
