'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Alarm } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';
import { getNextAlarmInfo } from '@/lib/utils/alarm';

interface AlarmState {
  alarms: Alarm[];
  ringingAlarmId: string | null;
  addAlarm: (alarm: Omit<Alarm, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAlarm: (id: string, patch: Partial<Alarm>) => void;
  deleteAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  setRinging: (id: string | null) => void;
  getNextAlarm: () => ReturnType<typeof getNextAlarmInfo>;
}

export const useAlarmStore = create<AlarmState>()(
  persist(
    (set, get) => ({
      alarms: [],
      ringingAlarmId: null,

      addAlarm: (alarm) =>
        set((state) => ({
          alarms: [
            ...state.alarms,
            {
              ...alarm,
              id: generateId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateAlarm: (id, patch) =>
        set((state) => ({
          alarms: state.alarms.map((a) =>
            a.id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a
          ),
        })),

      deleteAlarm: (id) =>
        set((state) => ({ alarms: state.alarms.filter((a) => a.id !== id) })),

      toggleAlarm: (id) =>
        set((state) => ({
          alarms: state.alarms.map((a) =>
            a.id === id
              ? { ...a, isEnabled: !a.isEnabled, updatedAt: new Date().toISOString() }
              : a
          ),
        })),

      setRinging: (id) => set({ ringingAlarmId: id }),

      getNextAlarm: () => getNextAlarmInfo(get().alarms),
    }),
    { name: STORAGE_KEYS.ALARMS }
  )
);
