'use client';

import { useEffect } from 'react';
import { useAlarmStore } from '@/lib/store/useAlarmStore';
import { isAlarmActiveToday } from '@/lib/utils/alarm';

export function useAlarmChecker() {
  const alarms = useAlarmStore((s) => s.alarms);
  const setRinging = useAlarmStore((s) => s.setRinging);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      if (now.getSeconds() !== 0) return;

      const h = now.getHours();
      const m = now.getMinutes();

      alarms
        .filter((a) => a.isEnabled && a.hour === h && a.minute === m)
        .filter((a) => isAlarmActiveToday(a, now))
        .forEach((a) => setRinging(a.id));
    };

    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, [alarms, setRinging]);
}
