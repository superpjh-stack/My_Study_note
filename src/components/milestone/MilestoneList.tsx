'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DdayBadge } from './DdayBadge';
import { MilestoneForm } from './MilestoneForm';
import { EmptyState } from '@/components/shared/EmptyState';
import { useMilestoneStore } from '@/lib/store/useMilestoneStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { calculateDday, formatDate } from '@/lib/utils/date';
import { MILESTONE_TYPE_LABELS } from '@/lib/constants';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function MilestoneList() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { milestones, deleteMilestone, toggleComplete } = useMilestoneStore();
  const subjects = useSubjectStore((s) => s.subjects);

  const getSubject = (id?: string) => (id ? subjects.find((s) => s.id === id) : undefined);

  const activeMilestones = milestones
    .filter((m) => !m.isCompleted)
    .sort((a, b) => calculateDday(a.dueDate) - calculateDday(b.dueDate));

  const completedMilestones = milestones.filter((m) => m.isCompleted);

  const urgentGroup = activeMilestones.filter((m) => calculateDday(m.dueDate) <= 3);
  const warningGroup = activeMilestones.filter((m) => {
    const d = calculateDday(m.dueDate);
    return d > 3 && d <= 7;
  });
  const normalGroup = activeMilestones.filter((m) => calculateDday(m.dueDate) > 7);

  const renderGroup = (label: string, emoji: string, items: typeof activeMilestones) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2 px-1">
          {emoji} {label}
        </h3>
        <div className="space-y-2">
          {items.map((m) => {
            const subject = getSubject(m.subjectId);
            return (
              <Card key={m.id} className="flex items-center gap-3 p-3">
                <DdayBadge dueDate={m.dueDate} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {formatDate(m.dueDate, 'M월 d일 (EEE)')} | {MILESTONE_TYPE_LABELS[m.type]}
                    {subject && ` | ${subject.name}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleComplete(m.id)}
                    className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-emerald-500/10 hover:text-emerald-500"
                    title="완료"
                  >
                    <Target size={16} />
                  </button>
                  <button
                    onClick={() => deleteMilestone(m.id)}
                    className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-500"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {activeMilestones.length === 0 && completedMilestones.length === 0 ? (
        <EmptyState
          icon={Target}
          title="마일스톤이 없어요"
          description="시험, 과제, 대회 일정을 등록해보세요!"
          actionLabel="마일스톤 추가"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <>
          {renderGroup('긴급 (D-3 이내)', '🔴', urgentGroup)}
          {renderGroup('주의 (D-7 이내)', '🟡', warningGroup)}
          {renderGroup('일반', '🟢', normalGroup)}

          {completedMilestones.length > 0 && (
            <div className="mt-6 mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2 px-1">
                완료됨 ({completedMilestones.length})
              </h3>
              <div className="space-y-2 opacity-50">
                {completedMilestones.slice(0, 3).map((m) => (
                  <Card key={m.id} className="flex items-center gap-3 p-3">
                    <span className="text-xs line-through text-[var(--text-muted)]">
                      {m.title}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="fixed bottom-20 right-4 z-30">
        <Button
          onClick={() => setShowForm(true)}
          className="h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <Plus size={24} />
        </Button>
      </div>

      {showForm && (
        <MilestoneForm
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}
