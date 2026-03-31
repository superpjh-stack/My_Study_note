'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MilestoneList } from '@/components/milestone/MilestoneList';
import { MonthlyCalendar } from '@/components/milestone/MonthlyCalendar';
import { cn } from '@/lib/utils/cn';

type ViewMode = 'list' | 'calendar';

export default function MilestonesPage() {
  const [view, setView] = useState<ViewMode>('list');

  return (
    <div>
      <PageHeader title="마일스톤" />

      {/* 목록 / 캘린더 토글 */}
      <div className="sticky top-14 z-30 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-sm px-4 py-2">
        <div className="mx-auto flex max-w-lg gap-1 rounded-lg bg-[var(--bg-secondary)] p-1">
          <button
            onClick={() => setView('list')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors',
              view === 'list'
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            목록
          </button>
          <button
            onClick={() => setView('calendar')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors',
              view === 'calendar'
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            캘린더
          </button>
        </div>
      </div>

      <div className="py-4">
        {view === 'list' ? (
          <div className="px-4">
            <MilestoneList />
          </div>
        ) : (
          <MonthlyCalendar />
        )}
      </div>
    </div>
  );
}
