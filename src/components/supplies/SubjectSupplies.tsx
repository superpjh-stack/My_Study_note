'use client';

import { useState } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubjectBadge } from '@/components/shared/SubjectBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { SupplyForm } from './SupplyForm';
import { useSupplyStore } from '@/lib/store/useSupplyStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';

export function SubjectSupplies() {
  const [showForm, setShowForm] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>();
  const subjects = useSubjectStore((s) => s.subjects);
  const { items, deleteItem } = useSupplyStore();

  const groupedBySubject = subjects
    .map((subject) => ({
      subject,
      supplies: items.filter((i) => i.subjectId === subject.id),
    }))
    .filter((g) => g.supplies.length > 0);

  return (
    <div className="px-4 space-y-3">
      {groupedBySubject.length === 0 ? (
        <EmptyState
          icon={Package}
          title="등록된 준비물이 없어요"
          description="과목별 준비물을 등록해보세요!"
          actionLabel="준비물 추가"
          onAction={() => setShowForm(true)}
        />
      ) : (
        groupedBySubject.map((group) => (
          <Card key={group.subject.id}>
            <CardHeader>
              <SubjectBadge
                name={group.subject.name}
                color={group.subject.color}
                size="sm"
              />
              <button
                onClick={() => {
                  setSelectedSubjectId(group.subject.id);
                  setShowForm(true);
                }}
                className="ml-auto p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              >
                <Plus size={16} />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {group.supplies.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[var(--bg-secondary)] group"
                  >
                    <span className="text-sm">{item.name}</span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--text-muted)] hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <div className="fixed bottom-20 right-4 z-30">
        <Button
          onClick={() => {
            setSelectedSubjectId(undefined);
            setShowForm(true);
          }}
          className="h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <Plus size={24} />
        </Button>
      </div>

      {showForm && (
        <SupplyForm
          onClose={() => {
            setShowForm(false);
            setSelectedSubjectId(undefined);
          }}
          defaultSubjectId={selectedSubjectId}
        />
      )}
    </div>
  );
}
