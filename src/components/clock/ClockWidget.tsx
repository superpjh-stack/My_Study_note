'use client';

import { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';
import { AlarmCard } from './AlarmCard';
import { AlarmForm } from './AlarmForm';
import { useAlarmStore } from '@/lib/store/useAlarmStore';
import { useAlarmChecker } from '@/lib/hooks/useAlarmChecker';
import { formatMinutesLeft } from '@/lib/utils/alarm';
import type { Alarm } from '@/lib/types';

// 현재 날짜 포맷 "화요일, 4월 1일"
function formatToday(): string {
  const now = new Date();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return `${days[now.getDay()]}, ${now.getMonth() + 1}월 ${now.getDate()}일`;
}

export function ClockWidget() {
  useAlarmChecker(); // 알람 체크 훅 등록

  const alarms = useAlarmStore((s) => s.alarms);
  const getNextAlarm = useAlarmStore((s) => s.getNextAlarm);
  const [showForm, setShowForm] = useState(false);
  const [editAlarm, setEditAlarm] = useState<Alarm | undefined>();
  const [showAllAlarms, setShowAllAlarms] = useState(false);

  const next = getNextAlarm();
  const visibleAlarms = showAllAlarms ? alarms : alarms.slice(0, 3);

  const handleEdit = (alarm: Alarm) => {
    setEditAlarm(alarm);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditAlarm(undefined);
    setShowForm(true);
  };

  return (
    <>
      <div className="mx-4 mb-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
        {/* 시계 영역 */}
        <div className="px-4 pt-5 pb-3 flex flex-col items-center gap-3">
          <AnalogClock size={180} />
          <DigitalClock />
          <p className="text-sm text-[var(--text-secondary)]">{formatToday()}</p>

          {/* 다음 알람 배지 */}
          {next && (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5">
              <Bell size={12} className="text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                {next.alarm.name || '알람'} {formatMinutesLeft(next.minutesLeft)}
              </span>
            </div>
          )}
        </div>

        {/* 알람 목록 */}
        {alarms.length > 0 && (
          <div className="border-t border-[var(--border)] px-4 py-3 space-y-2">
            {visibleAlarms.map((alarm) => (
              <AlarmCard key={alarm.id} alarm={alarm} onEdit={handleEdit} />
            ))}
            {alarms.length > 3 && (
              <button
                onClick={() => setShowAllAlarms((v) => !v)}
                className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--primary)] py-1 transition-colors"
              >
                {showAllAlarms ? '접기' : `+${alarms.length - 3}개 더 보기`}
              </button>
            )}
          </div>
        )}

        {/* 알람 추가 버튼 */}
        <div className="px-4 py-3 border-t border-[var(--border)]">
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)]/10 py-2.5 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--primary)]/15 transition-colors"
          >
            <Plus size={16} />
            알람 추가
          </button>
        </div>
      </div>

      {showForm && (
        <AlarmForm
          onClose={() => setShowForm(false)}
          editAlarm={editAlarm}
        />
      )}
    </>
  );
}
