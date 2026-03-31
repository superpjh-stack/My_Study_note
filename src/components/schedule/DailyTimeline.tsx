'use client';

import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { DAYS_OF_WEEK, PERIODS, PERIOD_TIMES } from '@/lib/constants';
import { getTodayDayOfWeek } from '@/lib/utils/date';
import { SubjectBadge } from '@/components/shared/SubjectBadge';
import { cn } from '@/lib/utils/cn';
import type { DayOfWeek } from '@/lib/types';

export function DailyTimeline() {
  const { slots } = useScheduleStore();
  const subjects = useSubjectStore((s) => s.subjects);
  const todayDay = getTodayDayOfWeek();

  const getSubject = (id: string) => subjects.find((s) => s.id === id);

  const todayLabel = todayDay
    ? DAYS_OF_WEEK.find((d) => d.key === todayDay)?.label ?? ''
    : '';

  const todaySlots = todayDay
    ? slots
        .filter((s) => s.dayOfWeek === todayDay)
        .sort((a, b) => a.period - b.period)
    : [];

  if (!todayDay) {
    return (
      <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
        오늘은 주말이에요. 푹 쉬세요!
      </div>
    );
  }

  return (
    <div className="px-4">
      <p className="mb-3 text-sm font-semibold text-[var(--text-secondary)]">
        {todayLabel} 시간표
      </p>

      {todaySlots.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-10 text-center text-sm text-[var(--text-muted)]">
          오늘 등록된 수업이 없어요.
        </div>
      ) : (
        <div className="space-y-2">
          {PERIODS.map((period) => {
            const slot = todaySlots.find((s) => s.period === period);
            const subject = slot ? getSubject(slot.subjectId) : null;
            const time = PERIOD_TIMES[period];

            if (!slot || !subject) return null;

            return (
              <div
                key={period}
                className={cn(
                  'flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3',
                )}
              >
                {/* 교시 */}
                <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {period}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">교시</span>
                </div>

                {/* 과목 배지 */}
                <div className="flex-1 min-w-0">
                  <SubjectBadge name={subject.name} color={subject.color} size="sm" />
                </div>

                {/* 시간 */}
                <div className="shrink-0 text-right">
                  <span className="text-xs text-[var(--text-muted)]">
                    {time.start} - {time.end}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
