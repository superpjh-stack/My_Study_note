import {
  format,
  differenceInCalendarDays,
  startOfDay,
  getDay,
  isToday as isTodayFns,
  addDays,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import type { DayOfWeek } from '@/lib/types';

const DAY_MAP: Record<number, DayOfWeek> = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
};

export function getTodayDayOfWeek(): DayOfWeek | null {
  const dayNum = getDay(new Date());
  return DAY_MAP[dayNum] || null;
}

export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, formatStr, { locale: ko });
}

export function formatDateKorean(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'M월 d일 EEEE', { locale: ko });
}

export function calculateDday(dueDate: string): number {
  const today = startOfDay(new Date());
  const due = startOfDay(new Date(dueDate));
  return differenceInCalendarDays(due, today);
}

export function formatDday(dday: number): string {
  if (dday === 0) return 'D-Day';
  if (dday > 0) return `D-${dday}`;
  return `D+${Math.abs(dday)}`;
}

export function getDdayColor(dday: number): 'danger' | 'warning' | 'success' | 'muted' {
  if (dday < 0) return 'muted';
  if (dday <= 3) return 'danger';
  if (dday <= 7) return 'warning';
  return 'success';
}

export function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour < 6) return { text: '새벽이에요', emoji: '🌙' };
  if (hour < 9) return { text: '좋은 아침이에요', emoji: '🌅' };
  if (hour < 12) return { text: '오전이에요', emoji: '☀️' };
  if (hour < 14) return { text: '점심시간이에요', emoji: '🍚' };
  if (hour < 18) return { text: '오후에요', emoji: '🌤️' };
  if (hour < 21) return { text: '저녁이에요', emoji: '🌆' };
  return { text: '밤이에요', emoji: '🌙' };
}

export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isTodayFns(d);
}

export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getWeekDates(): Date[] {
  const today = new Date();
  const dayNum = getDay(today);
  const mondayOffset = dayNum === 0 ? -6 : 1 - dayNum;
  const monday = addDays(today, mondayOffset);
  return Array.from({ length: 5 }, (_, i) => addDays(monday, i));
}
