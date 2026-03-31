'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { GreetingBanner } from '@/components/dashboard/GreetingBanner';
import { TodayScheduleCard } from '@/components/dashboard/TodayScheduleCard';
import { UpcomingMilestonesCard } from '@/components/dashboard/UpcomingMilestonesCard';
import { TodaySuppliesCard } from '@/components/dashboard/TodaySuppliesCard';
import { useSubjectStore } from '@/lib/store/useSubjectStore';

export default function HomePage() {
  const initializeDefaults = useSubjectStore((s) => s.initializeDefaults);

  useEffect(() => {
    initializeDefaults();
  }, [initializeDefaults]);

  return (
    <div>
      <PageHeader title="My Keep" showThemeToggle showSettings />
      <GreetingBanner />
      <div className="space-y-3 px-4 pb-4">
        <TodayScheduleCard />
        <UpcomingMilestonesCard />
        <TodaySuppliesCard />
      </div>
    </div>
  );
}
