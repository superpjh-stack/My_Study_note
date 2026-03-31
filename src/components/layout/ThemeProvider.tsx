'use client';

import { useEffect } from 'react';
import { useProfileStore } from '@/lib/store/useProfileStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useProfileStore((s) => s.profile.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
