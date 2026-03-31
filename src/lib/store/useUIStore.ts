'use client';

import { create } from 'zustand';

interface UIState {
  sheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sheetOpen: false,
  openSheet: () => set({ sheetOpen: true }),
  closeSheet: () => set({ sheetOpen: false }),
}));
