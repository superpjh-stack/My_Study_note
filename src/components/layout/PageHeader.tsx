'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Moon, Sun, Settings, LogOut } from 'lucide-react';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  title: string;
  showSettings?: boolean;
  showThemeToggle?: boolean;
  rightAction?: React.ReactNode;
  titleClassName?: string;
}

export function PageHeader({
  title,
  showSettings = false,
  showThemeToggle = false,
  rightAction,
  titleClassName,
}: PageHeaderProps) {
  const { profile, toggleTheme } = useProfileStore();
  const { currentUser, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <h1 className={cn('text-lg font-bold text-[var(--text-primary)]', titleClassName)}>{title}</h1>
        <div className="flex items-center gap-2">
          {currentUser && (
            <span className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-full px-2 py-0.5">
              {currentUser.emoji} {currentUser.name}
            </span>
          )}
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="테마 변경"
            >
              {profile.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          {showSettings && (
            <Link
              href="/settings"
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="설정"
            >
              <Settings size={20} />
            </Link>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="로그아웃"
            >
              <LogOut size={18} />
            </button>
          )}
          {rightAction}
        </div>
      </div>
    </header>
  );
}
