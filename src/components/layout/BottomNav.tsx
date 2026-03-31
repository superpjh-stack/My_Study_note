'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Target, Backpack } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useSeasonTheme } from '@/lib/hooks/useSeasonTheme';

const NAV_ITEMS = [
  { href: '/', label: '홈', icon: Home },
  { href: '/schedule', label: '시간표', icon: Calendar },
  { href: '/milestones', label: '마일스톤', icon: Target },
  { href: '/supplies', label: '준비물', icon: Backpack },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isActive: isSeasonActive } = useSeasonTheme();

  if (pathname === '/login') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-3 text-xs transition-colors',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              <Icon
                size={22}
                className={cn(
                  isActive && 'fill-primary/20',
                  isActive && isSeasonActive && 'nav-active-blossom'
                )}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
