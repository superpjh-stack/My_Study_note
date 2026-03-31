'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { DAYS_OF_WEEK, PERIOD_TIMES } from '@/lib/constants';
import type { DayOfWeek } from '@/lib/types';

interface ScheduleFormProps {
  day: DayOfWeek;
  period: number;
  editingSlotId: string | null;
  onClose: () => void;
  onDelete?: () => void;
}

export function ScheduleForm({ day, period, editingSlotId, onClose, onDelete }: ScheduleFormProps) {
  const { slots, addSlot, updateSlot } = useScheduleStore();
  const subjects = useSubjectStore((s) => s.subjects);

  const existingSlot = editingSlotId ? slots.find((s) => s.id === editingSlotId) : null;
  const [selectedSubjectId, setSelectedSubjectId] = useState(existingSlot?.subjectId || '');

  const dayLabel = DAYS_OF_WEEK.find((d) => d.key === day)?.label || '';
  const timeInfo = PERIOD_TIMES[period];

  const handleSave = () => {
    if (!selectedSubjectId) return;

    if (editingSlotId) {
      updateSlot(editingSlotId, {
        subjectId: selectedSubjectId,
        startTime: timeInfo?.start,
        endTime: timeInfo?.end,
      });
    } else {
      addSlot({
        subjectId: selectedSubjectId,
        dayOfWeek: day,
        period,
        startTime: timeInfo?.start,
        endTime: timeInfo?.end,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-2xl bg-[var(--bg-primary)] p-5 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">
            {dayLabel} {period}교시
            {timeInfo && (
              <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">
                ({timeInfo.start} ~ {timeInfo.end})
              </span>
            )}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-secondary)]">
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            과목 선택
          </label>
          <div className="grid grid-cols-3 gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all border-2 ${
                  selectedSubjectId === subject.id
                    ? 'border-current'
                    : 'border-transparent'
                }`}
                style={{
                  backgroundColor: `${subject.color}15`,
                  color: subject.color,
                  borderColor:
                    selectedSubjectId === subject.id ? subject.color : 'transparent',
                }}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {onDelete && (
            <Button variant="destructive" onClick={onDelete} size="sm" className="gap-1">
              <Trash2 size={14} />
              삭제
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={onClose} size="sm">
            취소
          </Button>
          <Button onClick={handleSave} disabled={!selectedSubjectId} size="sm">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
