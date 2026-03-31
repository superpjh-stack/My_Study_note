'use client';

import Link from 'next/link';
import { Backpack, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckItem } from '@/components/shared/CheckItem';
import { useSupplyStore } from '@/lib/store/useSupplyStore';
import { useScheduleStore } from '@/lib/store/useScheduleStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { getTodayDayOfWeek } from '@/lib/utils/date';

export function TodaySuppliesCard() {
  const today = getTodayDayOfWeek();
  const todaySlots = useScheduleStore((s) => (today ? s.getSlotsByDay(today) : []));
  const subjects = useSubjectStore((s) => s.subjects);
  const { items, isChecked, toggleCheck } = useSupplyStore();

  const todaySubjectIds = [...new Set(todaySlots.map((s) => s.subjectId))];
  const todaySupplies = items.filter((item) => todaySubjectIds.includes(item.subjectId));

  const getSubject = (id: string) => subjects.find((s) => s.id === id);
  const checkedCount = todaySupplies.filter((item) => isChecked(item.id)).length;

  return (
    <Card>
      <CardHeader>
        <Backpack size={18} className="text-emerald-500" />
        <CardTitle>오늘의 준비물</CardTitle>
        <Link
          href="/supplies"
          className="ml-auto flex items-center text-xs text-[var(--text-muted)] hover:text-primary"
        >
          더보기 <ChevronRight size={14} />
        </Link>
      </CardHeader>
      <CardContent>
        {!today ? (
          <p className="text-sm text-[var(--text-secondary)]">주말에는 준비물이 없어요</p>
        ) : todaySupplies.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">
            등록된 준비물이 없어요. 과목별 준비물을 추가해보세요!
          </p>
        ) : (
          <>
            <div className="space-y-0.5">
              {todaySupplies.slice(0, 5).map((item) => {
                const subject = getSubject(item.subjectId);
                return (
                  <CheckItem
                    key={item.id}
                    label={`${subject?.name || ''} - ${item.name}`}
                    checked={isChecked(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    subjectColor={subject?.color}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: todaySupplies.length > 0
                      ? `${(checkedCount / todaySupplies.length) * 100}%`
                      : '0%',
                  }}
                />
              </div>
              <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                {checkedCount}/{todaySupplies.length} 완료
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
