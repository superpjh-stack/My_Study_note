'use client';

import { useEffect } from 'react';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { useSeasonTheme } from '@/lib/hooks/useSeasonTheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useProfileStore((s) => s.profile.theme);
  const { isActive } = useSeasonTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (isActive) {
      root.setAttribute('data-theme', 'cherry-blossom');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isActive]);

  return <>{children}</>;
}
