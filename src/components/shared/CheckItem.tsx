'use client';

import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

interface CheckItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  subjectColor?: string;
}

export function CheckItem({ label, checked, onChange, subjectColor }: CheckItemProps) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all',
        'hover:bg-[var(--bg-secondary)]',
        checked && 'opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
          checked
            ? 'border-emerald-500 bg-emerald-500'
            : 'border-[var(--border)]'
        )}
        style={!checked && subjectColor ? { borderColor: subjectColor } : undefined}
      >
        {checked && <Check size={14} className="text-white" strokeWidth={3} />}
      </div>
      <span
        className={cn(
          'text-sm',
          checked
            ? 'text-[var(--text-muted)] line-through'
            : 'text-[var(--text-primary)]'
        )}
      >
        {label}
      </span>
    </button>
  );
}
