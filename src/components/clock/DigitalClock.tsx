'use client';

import { useState, useEffect } from 'react';
import { useClock } from '@/lib/hooks/useClock';

export function DigitalClock() {
  const { hours, minutes, seconds } = useClock();
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setColonVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  const ampm = hours < 12 ? 'AM' : 'PM';
  const h = hours % 12 === 0 ? 12 : hours % 12;
  const hStr = String(h).padStart(2, '0');
  const mStr = String(minutes).padStart(2, '0');
  const sStr = String(seconds).padStart(2, '0');

  return (
    <div className="flex items-end justify-center gap-0.5 leading-none select-none">
      <span className="text-4xl font-extrabold tabular-nums text-[var(--text-primary)]">
        {hStr}
      </span>
      <span
        className="text-4xl font-extrabold text-[var(--primary)] transition-opacity duration-100"
        style={{ opacity: colonVisible ? 1 : 0.15 }}
      >
        :
      </span>
      <span className="text-4xl font-extrabold tabular-nums text-[var(--text-primary)]">
        {mStr}
      </span>
      <div className="flex flex-col items-start ml-1 mb-1 gap-0.5">
        <span className="text-xs font-semibold text-[var(--text-secondary)] leading-none">{ampm}</span>
        <span className="text-xs font-medium tabular-nums text-[var(--text-muted)] leading-none">{sStr}</span>
      </div>
    </div>
  );
}
