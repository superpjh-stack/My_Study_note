'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SupplyItem, DailySupplyCheck } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils/id';
import { getTodayString } from '@/lib/utils/date';

interface SupplyState {
  items: SupplyItem[];
  dailyChecks: DailySupplyCheck[];
  addItem: (data: Pick<SupplyItem, 'subjectId' | 'name' | 'isRequired'>) => SupplyItem;
  updateItem: (id: string, data: Partial<SupplyItem>) => void;
  deleteItem: (id: string) => void;
  getItemsBySubject: (subjectId: string) => SupplyItem[];
  toggleCheck: (supplyItemId: string, date?: string) => void;
  isChecked: (supplyItemId: string, date?: string) => boolean;
  getTodayProgress: (subjectIds: string[]) => { checked: number; total: number };
}

export const useSupplyStore = create<SupplyState>()(
  persist(
    (set, get) => ({
      items: [],
      dailyChecks: [],

      addItem: (data) => {
        const now = new Date().toISOString();
        const item: SupplyItem = {
          id: generateId(),
          subjectId: data.subjectId,
          name: data.name,
          isRequired: data.isRequired,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ items: [...state.items, item] }));
        return item;
      },

      updateItem: (id, data) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...data, updatedAt: new Date().toISOString() } : i
          ),
        })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          dailyChecks: state.dailyChecks.filter((c) => c.supplyItemId !== id),
        })),

      getItemsBySubject: (subjectId) =>
        get().items.filter((i) => i.subjectId === subjectId),

      toggleCheck: (supplyItemId, date) => {
        const targetDate = date || getTodayString();
        const existing = get().dailyChecks.find(
          (c) => c.supplyItemId === supplyItemId && c.date === targetDate
        );

        if (existing) {
          set((state) => ({
            dailyChecks: state.dailyChecks.map((c) =>
              c.id === existing.id
                ? { ...c, isChecked: !c.isChecked, updatedAt: new Date().toISOString() }
                : c
            ),
          }));
        } else {
          const now = new Date().toISOString();
          const check: DailySupplyCheck = {
            id: generateId(),
            date: targetDate,
            supplyItemId,
            isChecked: true,
            createdAt: now,
            updatedAt: now,
          };
          set((state) => ({ dailyChecks: [...state.dailyChecks, check] }));
        }
      },

      isChecked: (supplyItemId, date) => {
        const targetDate = date || getTodayString();
        const check = get().dailyChecks.find(
          (c) => c.supplyItemId === supplyItemId && c.date === targetDate
        );
        return check?.isChecked ?? false;
      },

      getTodayProgress: (subjectIds) => {
        const today = getTodayString();
        const relevantItems = get().items.filter((i) =>
          subjectIds.includes(i.subjectId)
        );
        const checkedCount = relevantItems.filter((item) => {
          const check = get().dailyChecks.find(
            (c) => c.supplyItemId === item.id && c.date === today
          );
          return check?.isChecked ?? false;
        }).length;

        return { checked: checkedCount, total: relevantItems.length };
      },
    }),
    {
      name: STORAGE_KEYS.SUPPLIES,
    }
  )
);
