'use client';

import { useEffect, useRef } from 'react';
import { useAlarmStore } from '@/lib/store/useAlarmStore';
import { alarmPlayer } from '@/lib/audio/alarmPlayer';
import { formatAlarmTime, formatRepeatLabel } from '@/lib/utils/alarm';

export function AlarmRinging() {
  const alarms = useAlarmStore((s) => s.alarms);
  const ringingId = useAlarmStore((s) => s.ringingAlarmId);
  const setRinging = useAlarmStore((s) => s.setRinging);
  const snoozeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const alarm = ringingId ? alarms.find((a) => a.id === ringingId) : null;

  // 알람 울림 시작
  useEffect(() => {
    if (alarm) {
      alarmPlayer.start(alarm.soundType, alarm.volume);
    } else {
      alarmPlayer.stop();
    }
    return () => { if (!alarm) alarmPlayer.stop(); };
  }, [alarm]);

  if (!alarm) return null;

  const handleDismiss = () => {
    alarmPlayer.stop();
    if (snoozeRef.current) clearTimeout(snoozeRef.current);
    setRinging(null);
  };

  const handleSnooze = () => {
    alarmPlayer.stop();
    setRinging(null);
    // 5분 후 재울림
    snoozeRef.current = setTimeout(() => {
      setRinging(alarm.id);
    }, 5 * 60 * 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 animate-in fade-in duration-300">
      {/* 맥박 이모지 */}
      <div className="text-6xl mb-6 animate-pulse">⏰</div>

      {/* 시간 */}
      <div className="text-6xl font-extrabold text-white tabular-nums mb-2">
        {formatAlarmTime(alarm.hour, alarm.minute)}
      </div>

      {/* 알람 이름 */}
      <div className="text-2xl font-semibold text-white/90 mb-2">
        {alarm.name || '알람'}
      </div>

      {/* 반복 */}
      <div className="text-sm text-white/50 mb-12">
        {formatRepeatLabel(alarm)}
      </div>

      {/* 버튼 */}
      <div className="flex gap-4">
        <button
          onClick={handleSnooze}
          className="rounded-full bg-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/30 transition-colors"
        >
          💤 5분 스누즈
        </button>
        <button
          onClick={handleDismiss}
          className="rounded-full bg-white px-8 py-4 text-base font-bold text-black hover:bg-white/90 transition-colors"
        >
          ✕ 끄기
        </button>
      </div>
    </div>
  );
}
