'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser && pathname !== '/login') {
      router.replace('/login');
    }
  }, [currentUser, pathname, router]);

  if (!currentUser && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
