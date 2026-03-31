'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CherryBlossomParticles } from './CherryBlossomParticles';
import { getSeasonGreeting } from '@/lib/utils/season';

const BANNER_CLOSED_KEY = 'blossom_banner_closed_date';

function isBannerClosedToday(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(BANNER_CLOSED_KEY);
  if (!stored) return false;
  return stored === new Date().toDateString();
}

export function SeasonalBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isBannerClosedToday()) setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem(BANNER_CLOSED_KEY, new Date().toDateString());
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="relative mx-4 mb-3 overflow-hidden rounded-xl px-4 py-3 animate-in slide-in-from-top-2 duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(253,230,138,0.15) 0%, rgba(251,207,232,0.2) 50%, rgba(233,213,255,0.15) 100%)',
        border: '1px solid rgba(244, 114, 182, 0.2)',
      }}
    >
      {/* 파티클 */}
      <CherryBlossomParticles count={4} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {getSeasonGreeting()}
        </p>
        <button
          onClick={handleClose}
          className="ml-3 shrink-0 rounded-full p-1 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          aria-label="배너 닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
