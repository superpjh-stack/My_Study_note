'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { GreetingBanner } from '@/components/dashboard/GreetingBanner';
import { TodayScheduleCard } from '@/components/dashboard/TodayScheduleCard';
import { UpcomingMilestonesCard } from '@/components/dashboard/UpcomingMilestonesCard';
import { TodaySuppliesCard } from '@/components/dashboard/TodaySuppliesCard';
import { SeasonalBanner } from '@/components/seasonal/SeasonalBanner';
import { ClockWidget } from '@/components/clock/ClockWidget';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { useSeasonTheme } from '@/lib/hooks/useSeasonTheme';

export default function HomePage() {
  const initializeDefaults = useSubjectStore((s) => s.initializeDefaults);
  const { isActive: isSeasonActive } = useSeasonTheme();

  useEffect(() => {
    initializeDefaults();
  }, [initializeDefaults]);

  return (
    <div>
      <PageHeader title={isSeasonActive ? 'My Keep 🌸' : 'My Keep'} showThemeToggle showSettings titleClassName={isSeasonActive ? 'season-title-shimmer' : undefined} />
      {isSeasonActive && <SeasonalBanner />}
      <GreetingBanner />
      <ClockWidget />
      <div className="space-y-3 px-4 pb-4">
        <TodayScheduleCard />
        <UpcomingMilestonesCard />
        <TodaySuppliesCard />
      </div>
    </div>
  );
}
