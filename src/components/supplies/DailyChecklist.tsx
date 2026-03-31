'use client';

import { useState } from 'react';
import { Backpack, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckItem } from '@/components/shared/CheckItem';
import { SubjectBadge } from '@/components/shared/SubjectBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { SupplyForm } from './SupplyForm';
import { useSupplyStore } from '@/lib/store/useSupplyStore';
import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { getTodayDayOfWeek, formatDateKorean } from '@/lib/utils/date';

export function DailyChecklist() {
  const [showForm, setShowForm] = useState(false);
  const today = getTodayDayOfWeek();
  const todaySlots = useScheduleStore((s) => (today ? s.getSlotsByDay(today) : []));
  const subjects = useSubjectStore((s) => s.subjects);
  const { items, isChecked, toggleCheck } = useSupplyStore();

  const getSubject = (id: string) => subjects.find((s) => s.id === id);

  // Group supplies by subject, ordered by today's schedule
  const todaySubjectIds = [...new Set(todaySlots.map((s) => s.subjectId))];
  const groupedSupplies = todaySubjectIds
    .map((subjectId) => ({
      subject: getSubject(subjectId),
      items: items.filter((item) => item.subjectId === subjectId),
      period: todaySlots.find((s) => s.subjectId === subjectId)?.period || 0,
    }))
    .filter((g) => g.subject && g.items.length > 0)
    .sort((a, b) => a.period - b.period);

  const allSupplyItems = groupedSupplies.flatMap((g) => g.items);
  const checkedCount = allSupplyItems.filter((item) => isChecked(item.id)).length;

  if (!today) {
    return (
      <EmptyState
        icon={Backpack}
        title="주말이에요!"
        description="오늘은 준비할 것이 없어요. 편하게 쉬세요!"
      />
    );
  }

  return (
    <div>
      <div className="px-4 mb-4">
        <h2 className="text-base font-semibold">{formatDateKorean(new Date())} 준비물</h2>
        {allSupplyItems.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${(checkedCount / allSupplyItems.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {checkedCount}/{allSupplyItems.length}
            </span>
          </div>
        )}
      </div>

      {groupedSupplies.length === 0 ? (
        <EmptyState
          icon={Backpack}
          title="준비물이 없어요"
          description="과목별 준비물을 등록하면 오늘 시간표에 맞게 자동으로 체크리스트가 만들어져요!"
          actionLabel="준비물 추가"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="space-y-3 px-4">
          {groupedSupplies.map((group) => (
            <Card key={group.subject!.id}>
              <CardHeader>
                <span className="text-xs text-[var(--text-muted)]">{group.period}교시</span>
                <SubjectBadge name={group.subject!.name} color={group.subject!.color} size="sm" />
              </CardHeader>
              <CardContent>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <CheckItem
                      key={item.id}
                      label={item.name}
                      checked={isChecked(item.id)}
                      onChange={() => toggleCheck(item.id)}
                      subjectColor={group.subject!.color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

      {showForm && <SupplyForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
