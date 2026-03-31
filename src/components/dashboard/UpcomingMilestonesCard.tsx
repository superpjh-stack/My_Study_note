'use client';

import Link from 'next/link';
import { Target, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DdayBadge } from '@/components/milestone/DdayBadge';
import { useMilestoneStore } from '@/lib/store/useMilestoneStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { MILESTONE_TYPE_LABELS } from '@/lib/constants';

export function UpcomingMilestonesCard() {
  const upcoming = useMilestoneStore((s) => s.getUpcoming(3));
  const subjects = useSubjectStore((s) => s.subjects);

  const getSubject = (id?: string) => id ? subjects.find((s) => s.id === id) : undefined;

  return (
    <Card>
      <CardHeader>
        <Target size={18} className="text-amber-500" />
        <CardTitle>다가오는 마일스톤</CardTitle>
        <Link
          href="/milestones"
          className="ml-auto flex items-center text-xs text-[var(--text-muted)] hover:text-primary"
        >
          더보기 <ChevronRight size={14} />
        </Link>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">
            다가오는 마일스톤이 없어요
          </p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((m) => {
              const subject = getSubject(m.subjectId);
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <DdayBadge dueDate={m.dueDate} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {MILESTONE_TYPE_LABELS[m.type]}
                      {subject && ` | ${subject.name}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
