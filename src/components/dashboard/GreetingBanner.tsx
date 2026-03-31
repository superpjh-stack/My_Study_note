'use client';

import { getGreeting, formatDateKorean } from '@/lib/utils/date';
import { useAuthStore } from '@/lib/store/useAuthStore';

export function GreetingBanner() {
  const greeting = getGreeting();
  const today = formatDateKorean(new Date());
  const currentUser = useAuthStore((s) => s.currentUser);

  return (
    <div className="px-4 py-3">
      <p className="text-xl font-bold text-[var(--text-primary)]">
        {greeting.emoji} {currentUser ? `${currentUser.name}! ` : ''}{greeting.text}!
      </p>
      <p className="text-sm text-[var(--text-secondary)]">{today}</p>
    </div>
  );
}
