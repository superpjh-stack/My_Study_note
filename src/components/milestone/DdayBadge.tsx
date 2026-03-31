'use client';

import { Badge } from '@/components/ui/badge';
import { calculateDday, formatDday, getDdayColor } from '@/lib/utils/date';
import { useSeasonTheme } from '@/lib/hooks/useSeasonTheme';

interface DdayBadgeProps {
  dueDate: string;
  size?: 'sm' | 'lg';
}

export function DdayBadge({ dueDate, size = 'sm' }: DdayBadgeProps) {
  const dday = calculateDday(dueDate);
  const color = getDdayColor(dday);
  const text = formatDday(dday);
  const { isActive } = useSeasonTheme();

  // 벚꽃 시즌: 긴급(D-3 이내)은 danger 유지, 나머지는 그라데이션
  const useBlossomGradient = isActive && color !== 'danger';

  if (size === 'lg') {
    return (
      <span
        className={
          useBlossomGradient
            ? 'text-2xl font-extrabold dday-blossom'
            : `text-2xl font-extrabold ${
                color === 'danger'
                  ? 'text-red-500'
                  : color === 'warning'
                  ? 'text-amber-500'
                  : color === 'success'
                  ? 'text-emerald-500'
                  : 'text-[var(--text-muted)]'
              }`
        }
      >
        {text}
      </span>
    );
  }

  if (useBlossomGradient) {
    return (
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold dday-blossom">
        {text}
      </span>
    );
  }

  return <Badge variant={color}>{text}</Badge>;
}
