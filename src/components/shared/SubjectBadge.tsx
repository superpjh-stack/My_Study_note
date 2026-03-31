'use client';

import { cn } from '@/lib/utils/cn';

interface SubjectBadgeProps {
  name: string;
  color: string;
  size?: 'sm' | 'md';
}

export function SubjectBadge({ name, color, size = 'md' }: SubjectBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <span
        className={cn(
          'rounded-full',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'
        )}
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  );
}
