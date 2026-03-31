'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupplyStore } from '@/lib/store/useSupplyStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';

interface SupplyFormProps {
  onClose: () => void;
  defaultSubjectId?: string;
}

export function SupplyForm({ onClose, defaultSubjectId }: SupplyFormProps) {
  const [name, setName] = useState('');
  const [subjectId, setSubjectId] = useState(defaultSubjectId || '');

  const { addItem } = useSupplyStore();
  const subjects = useSubjectStore((s) => s.subjects);

  const handleSubmit = () => {
    if (!name || !subjectId) return;
    addItem({ name, subjectId, isRequired: true });
    setName('');
  };

  const handleSubmitAndClose = () => {
    if (name && subjectId) {
      addItem({ name, subjectId, isRequired: true });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-2xl bg-[var(--bg-primary)] p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">준비물 추가</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-secondary)]">
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
              과목 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSubjectId(s.id)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: subjectId === s.id ? s.color : `${s.color}15`,
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
              준비물 이름
            </label>
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 교과서, 체육복, 리코더"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name && subjectId) {
                    handleSubmit();
                  }
                }}
              />
              <Button
                onClick={handleSubmit}
                disabled={!name || !subjectId}
                size="sm"
                variant="secondary"
              >
                추가
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button onClick={handleSubmitAndClose} className="flex-1">
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
