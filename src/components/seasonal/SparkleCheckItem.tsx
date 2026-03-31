'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

interface SparkleCheckItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  subjectColor?: string;
}

interface BurstParticle {
  id: number;
  dx: number;
  dy: number;
  color: string;
}

const BURST_COLORS = ['#FBCFE8', '#FDE68A', '#E9D5FF'];

export function SparkleCheckItem({ label, checked, onChange, subjectColor }: SparkleCheckItemProps) {
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!checked) {
      // 체크 완료 시 burst
      const burst: BurstParticle[] = [
        { id: Date.now(), dx: -8, dy: -10, color: BURST_COLORS[0] },
        { id: Date.now() + 1, dx: 10, dy: -8, color: BURST_COLORS[1] },
        { id: Date.now() + 2, dx: 0, dy: 12, color: BURST_COLORS[2] },
      ];
      setParticles(burst);
      setTimeout(() => setParticles([]), 500);
    }
    onChange();
  };

  return (
    <button
      ref={containerRef}
      onClick={handleClick}
      className={cn(
        'relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all',
        'hover:bg-[var(--bg-secondary)]',
        checked && 'opacity-60'
      )}
    >
      {/* burst 파티클 */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="burst-particle"
          style={{
            left: '20px',
            top: '50%',
            backgroundColor: p.color,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      ))}

      <div
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
          checked
            ? 'border-pink-400 bg-pink-400'
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
