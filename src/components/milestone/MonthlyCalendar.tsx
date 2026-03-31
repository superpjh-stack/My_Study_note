'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMilestoneStore } from '@/lib/store/useMilestoneStore';
import { DdayBadge } from './DdayBadge';
import { MILESTONE_TYPE_LABELS } from '@/lib/constants';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { cn } from '@/lib/utils/cn';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';

const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export function MonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { milestones } = useMilestoneStore();
  const subjects = useSubjectStore((s) => s.subjects);

  const getSubject = (id?: string) => (id ? subjects.find((s) => s.id === id) : undefined);

  // 해당 날짜의 마일스톤 가져오기
  const getMilestonesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return milestones.filter((m) => m.dueDate.startsWith(dateStr));
  };

  // 달력 날짜 배열 생성
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let cursor = calStart;
  while (cursor <= calEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  const today = new Date();

  const selectedMilestones = selectedDate ? getMilestonesForDate(selectedDate) : [];

  return (
    <div className="px-4">
      {/* 월 네비게이션 */}
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="이전 달"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </span>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="다음 달"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {WEEK_LABELS.map((label, i) => (
          <div
            key={label}
            className={cn(
              'py-1 text-center text-xs font-semibold',
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-[var(--text-muted)]'
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-px rounded-xl bg-[var(--border)] overflow-hidden">
        {days.map((day, idx) => {
          const dayMilestones = getMilestonesForDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const dayNum = day.getDay(); // 0=일, 6=토

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(isSelected ? null : day)}
              className={cn(
                'flex flex-col items-center min-h-[52px] pt-1 pb-1 gap-0.5 transition-colors',
                'bg-[var(--bg-primary)]',
                !isCurrentMonth && 'opacity-30',
                isSelected && 'bg-primary/10',
                isCurrentMonth && !isSelected && 'hover:bg-[var(--bg-secondary)]'
              )}
            >
              {/* 날짜 숫자 */}
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                  isToday && 'bg-primary text-white',
                  !isToday && dayNum === 0 && 'text-red-500',
                  !isToday && dayNum === 6 && 'text-blue-500',
                  !isToday && dayNum !== 0 && dayNum !== 6 && 'text-[var(--text-primary)]'
                )}
              >
                {format(day, 'd')}
              </span>

              {/* D-day 뱃지 (마일스톤 있을 때만) */}
              {dayMilestones.slice(0, 2).map((m) => (
                <span
                  key={m.id}
                  className={cn(
                    'w-full max-w-[36px] rounded text-[9px] font-semibold text-center leading-tight px-0.5 truncate',
                    m.isCompleted
                      ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] line-through'
                      : 'bg-primary/15 text-primary'
                  )}
                >
                  {m.title.slice(0, 3)}
                </span>
              ))}
              {dayMilestones.length > 2 && (
                <span className="text-[9px] text-[var(--text-muted)]">
                  +{dayMilestones.length - 2}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 날짜의 마일스톤 목록 */}
      {selectedDate && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
            {format(selectedDate, 'M월 d일 (EEE)', { locale: ko })} 마일스톤
          </p>

          {selectedMilestones.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-6 text-center text-sm text-[var(--text-muted)]">
              이 날에 마일스톤이 없어요.
            </div>
          ) : (
            <div className="space-y-2">
              {selectedMilestones.map((m) => {
                const subject = getSubject(m.subjectId);
                return (
                  <div
                    key={m.id}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3',
                      m.isCompleted && 'opacity-50'
                    )}
                  >
                    <DdayBadge dueDate={m.dueDate} />
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium truncate', m.isCompleted && 'line-through')}>
                        {m.title}
                      </p>
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
        </div>
      )}
    </div>
  );
}
