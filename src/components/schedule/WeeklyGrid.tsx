'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { DAYS_OF_WEEK, PERIODS } from '@/lib/constants';
import { getTodayDayOfWeek } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';
import { ScheduleForm } from './ScheduleForm';
import type { DayOfWeek } from '@/lib/types';

export function WeeklyGrid() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ day: DayOfWeek; period: number } | null>(null);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  const { slots, deleteSlot } = useScheduleStore();
  const subjects = useSubjectStore((s) => s.subjects);
  const todayDay = getTodayDayOfWeek();

  const getSubject = (id: string) => subjects.find((s) => s.id === id);
  const getSlot = (day: DayOfWeek, period: number) =>
    slots.find((s) => s.dayOfWeek === day && s.period === period);

  const handleCellClick = (day: DayOfWeek, period: number) => {
    const existing = getSlot(day, period);
    if (existing) {
      setEditingSlotId(existing.id);
      setSelectedCell({ day, period });
    } else {
      setEditingSlotId(null);
      setSelectedCell({ day, period });
    }
    setShowForm(true);
  };

  return (
    <div className="px-2">
      <div className="grid grid-cols-6 gap-px rounded-xl bg-[var(--border)] overflow-hidden">
        {/* Header row */}
        <div className="bg-[var(--bg-primary)] p-2" />
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day.key}
            className={cn(
              'bg-[var(--bg-primary)] p-2 text-center text-xs font-semibold',
              todayDay === day.key
                ? 'text-primary bg-primary/5'
                : 'text-[var(--text-secondary)]'
            )}
          >
            {day.shortLabel}
          </div>
        ))}

        {/* Period rows */}
        {PERIODS.map((period) => (
          <>
            <div
              key={`period-${period}`}
              className="bg-[var(--bg-primary)] p-2 text-center text-xs text-[var(--text-muted)] flex items-center justify-center"
            >
              {period}
            </div>
            {DAYS_OF_WEEK.map((day) => {
              const slot = getSlot(day.key, period);
              const subject = slot ? getSubject(slot.subjectId) : null;

              return (
                <button
                  key={`${day.key}-${period}`}
                  onClick={() => handleCellClick(day.key, period)}
                  className={cn(
                    'bg-[var(--bg-primary)] p-1.5 text-center min-h-[44px] transition-colors',
                    'hover:bg-[var(--bg-secondary)]',
                    todayDay === day.key && 'bg-primary/5'
                  )}
                >
                  {subject ? (
                    <div
                      className="rounded-md px-1 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${subject.color}15`,
                        color: subject.color,
                        borderLeft: `3px solid ${subject.color}`,
                      }}
                    >
                      {subject.name.slice(0, 2)}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-0 hover:opacity-30">
                      <Plus size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </>
        ))}
      </div>

      {showForm && selectedCell && (
        <ScheduleForm
          day={selectedCell.day}
          period={selectedCell.period}
          editingSlotId={editingSlotId}
          onClose={() => {
            setShowForm(false);
            setSelectedCell(null);
            setEditingSlotId(null);
          }}
          onDelete={editingSlotId ? () => {
            deleteSlot(editingSlotId);
            setShowForm(false);
            setSelectedCell(null);
            setEditingSlotId(null);
          } : undefined}
        />
      )}
    </div>
  );
}
