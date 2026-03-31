import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthGuard } from '@/components/layout/AuthGuard';
import { AlarmRinging } from '@/components/clock/AlarmRinging';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Keep - Study Planner',
  description: '중고등학생을 위한 스터디 플래너',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366F1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-primary)] antialiased">
        <ThemeProvider>
          <AuthGuard>
            <main className="mx-auto max-w-lg pb-safe">{children}</main>
            <BottomNav />
            <AlarmRinging />
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
