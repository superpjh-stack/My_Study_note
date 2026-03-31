'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-[var(--bg-secondary)] p-4">
        <Icon size={32} className="text-[var(--text-muted)]" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
