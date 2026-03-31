'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { DailyChecklist } from '@/components/supplies/DailyChecklist';
import { SubjectSupplies } from '@/components/supplies/SubjectSupplies';
import { cn } from '@/lib/utils/cn';

type ViewMode = 'today' | 'manage';

export default function SuppliesPage() {
  const [view, setView] = useState<ViewMode>('today');

  return (
    <div>
      <PageHeader
        title="준비물"
        rightAction={
          <div className="flex rounded-lg bg-[var(--bg-secondary)] p-0.5">
            <button
              onClick={() => setView('today')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                view === 'today'
                  ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)]'
              )}
            >
              오늘
            </button>
            <button
              onClick={() => setView('manage')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                view === 'manage'
                  ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)]'
              )}
            >
              과목별
            </button>
          </div>
        }
      />
      <div className="py-4">
        {view === 'today' ? <DailyChecklist /> : <SubjectSupplies />}
      </div>
    </div>
  );
}
