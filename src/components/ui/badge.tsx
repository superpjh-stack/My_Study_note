import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        danger: 'bg-red-500/10 text-red-600 dark:text-red-400',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        muted: 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
