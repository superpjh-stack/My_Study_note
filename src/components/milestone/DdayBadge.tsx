'use client';

import { Badge } from '@/components/ui/badge';
import { calculateDday, formatDday, getDdayColor } from '@/lib/utils/date';

interface DdayBadgeProps {
  dueDate: string;
  size?: 'sm' | 'lg';
}

export function DdayBadge({ dueDate, size = 'sm' }: DdayBadgeProps) {
  const dday = calculateDday(dueDate);
  const color = getDdayColor(dday);
  const text = formatDday(dday);

  if (size === 'lg') {
    return (
      <span
        className={`text-2xl font-extrabold ${
          color === 'danger'
            ? 'text-red-500'
            : color === 'warning'
            ? 'text-amber-500'
            : color === 'success'
            ? 'text-emerald-500'
            : 'text-[var(--text-muted)]'
        }`}
      >
        {text}
      </span>
    );
  }

  return <Badge variant={color}>{text}</Badge>;
}
