'use client';

import { useState, useEffect } from 'react';

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useClock(): ClockTime {
  const [time, setTime] = useState<ClockTime>(() => {
    const now = new Date();
    return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
  });

  useEffect(() => {
    let rafId: number;
    let lastSec = -1;

    const tick = () => {
      const now = new Date();
      const s = now.getSeconds();
      if (s !== lastSec) {
        lastSec = s;
        setTime({ hours: now.getHours(), minutes: now.getMinutes(), seconds: s });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return time;
}
