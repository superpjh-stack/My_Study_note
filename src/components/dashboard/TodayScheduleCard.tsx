'use client';

import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SubjectBadge } from '@/components/shared/SubjectBadge';
import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { getTodayDayOfWeek } from '@/lib/utils/date';

export function TodayScheduleCard() {
  const today = getTodayDayOfWeek();
  const slots = useScheduleStore((s) => (today ? s.getSlotsByDay(today) : []));
  const subjects = useSubjectStore((s) => s.subjects);

  const getSubject = (id: string) => subjects.find((s) => s.id === id);

  if (!today) {
    return (
      <Card>
        <CardHeader>
          <Calendar size={18} className="text-primary" />
          <CardTitle>오늘의 시간표</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--text-secondary)]">주말에는 수업이 없어요</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Calendar size={18} className="text-primary" />
        <CardTitle>오늘의 시간표</CardTitle>
        <Link
          href="/schedule"
          className="ml-auto flex items-center text-xs text-[var(--text-muted)] hover:text-primary"
        >
          더보기 <ChevronRight size={14} />
        </Link>
      </CardHeader>
      <CardContent>
        {slots.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">
            등록된 수업이 없어요. 시간표를 추가해보세요!
          </p>
        ) : (
          <div className="space-y-2">
            {slots.slice(0, 5).map((slot) => {
              const subject = getSubject(slot.subjectId);
              if (!subject) return null;
              return (
                <div key={slot.id} className="flex items-center gap-3">
                  <span className="w-12 text-xs text-[var(--text-muted)]">
                    {slot.period}교시
                  </span>
                  <div
                    className="h-6 w-1 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-sm font-medium">{subject.name}</span>
                  {subject.teacher && (
                    <span className="text-xs text-[var(--text-muted)]">
                      {subject.teacher}
                    </span>
                  )}
                </div>
              );
            })}
            {slots.length > 5 && (
              <p className="text-xs text-[var(--text-muted)]">
                +{slots.length - 5}개 더...
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
