'use client';

import { Trash2 } from 'lucide-react';
import { useAlarmStore } from '@/lib/store/useAlarmStore';
import { formatAlarmTime, formatRepeatLabel } from '@/lib/utils/alarm';
import type { Alarm } from '@/lib/types';

interface AlarmCardProps {
  alarm: Alarm;
  onEdit?: (alarm: Alarm) => void;
}

export function AlarmCard({ alarm, onEdit }: AlarmCardProps) {
  const { toggleAlarm, deleteAlarm } = useAlarmStore();

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
      alarm.isEnabled
        ? 'border-[var(--primary)]/20 bg-[var(--bg-secondary)]'
        : 'border-[var(--border)] bg-[var(--bg-secondary)] opacity-50'
    }`}>
      {/* 알람 정보 */}
      <button className="flex-1 text-left" onClick={() => onEdit?.(alarm)}>
        <div className="text-lg font-bold tabular-nums text-[var(--text-primary)]">
          {formatAlarmTime(alarm.hour, alarm.minute)}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs text-[var(--text-secondary)]">{alarm.name || '알람'}</span>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-xs text-[var(--text-muted)]">{formatRepeatLabel(alarm)}</span>
        </div>
      </button>

      {/* 삭제 */}
      <button onClick={() => deleteAlarm(alarm.id)}
        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 transition-colors">
        <Trash2 size={15} />
      </button>

      {/* ON/OFF 토글 */}
      <button onClick={() => toggleAlarm(alarm.id)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          alarm.isEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
        }`}
        role="switch" aria-checked={alarm.isEnabled}>
        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          alarm.isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );
}
