'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { WeeklyGrid } from '@/components/schedule/WeeklyGrid';
import { DailyTimeline } from '@/components/schedule/DailyTimeline';
import { cn } from '@/lib/utils/cn';

type ViewMode = 'weekly' | 'daily';

export default function SchedulePage() {
  const [view, setView] = useState<ViewMode>('weekly');

  return (
    <div>
      <PageHeader title="시간표" />

      {/* 주간 / 일별 토글 */}
      <div className="sticky top-14 z-30 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-sm px-4 py-2">
        <div className="mx-auto flex max-w-lg gap-1 rounded-lg bg-[var(--bg-secondary)] p-1">
          <button
            onClick={() => setView('weekly')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors',
              view === 'weekly'
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            주간
          </button>
          <button
            onClick={() => setView('daily')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors',
              view === 'daily'
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            일별
          </button>
        </div>
      </div>

      <div className="py-4">
        {view === 'weekly' ? <WeeklyGrid /> : <DailyTimeline />}
      </div>
    </div>
  );
}
