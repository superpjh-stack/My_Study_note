'use client';

import { useState, useEffect } from 'react';
import { isCherryBlossomSeason } from '@/lib/utils/season';

const STORAGE_KEY = 'season_theme_enabled';

export function useSeasonTheme() {
  const isAprilSeason = isCherryBlossomSeason();

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== 'false'; // default: true (사용자가 명시적으로 끄지 않으면 ON)
  });

  const isActive = isAprilSeason && enabled;

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return { isActive, isAprilSeason, enabled, toggle };
}
