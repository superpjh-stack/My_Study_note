'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMilestoneStore } from '@/lib/store/useMilestoneStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { MILESTONE_TYPE_LABELS } from '@/lib/constants';
import type { MilestoneType } from '@/lib/types';

interface MilestoneFormProps {
  onClose: () => void;
}

export function MilestoneForm({ onClose }: MilestoneFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MilestoneType>('exam');
  const [subjectId, setSubjectId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  const { addMilestone } = useMilestoneStore();
  const subjects = useSubjectStore((s) => s.subjects);
  const { openSheet, closeSheet } = useUIStore();

  useEffect(() => {
    openSheet();
    return () => closeSheet();
  }, [openSheet, closeSheet]);

  const handleSubmit = () => {
    if (!title || !dueDate) return;
    addMilestone({
      title,
      type,
      subjectId: subjectId || undefined,
      dueDate,
      description: description || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-2xl bg-[var(--bg-primary)] p-5 pb-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">마일스톤 추가</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-secondary)]">
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              제목 *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 수학 중간고사"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              유형
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(MILESTONE_TYPE_LABELS) as [MilestoneType, string][]).map(
                ([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      type === key
                        ? 'bg-primary text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              마감일 *
            </label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              관련 과목
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSubjectId('')}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  !subjectId
                    ? 'bg-primary text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                없음
              </button>
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSubjectId(s.id)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor:
                      subjectId === s.id ? s.color : `${s.color}15`,
                    color: subjectId === s.id ? 'white' : s.color,
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              메모
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="추가 메모 (선택)"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !dueDate} className="flex-1">
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
