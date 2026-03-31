import type { DayOfWeek, GradeLevel, MilestoneType } from '@/lib/types';

// === Storage Keys ===

export const STORAGE_KEYS = {
  PROFILE: 'mykeep_profile',
  SUBJECTS: 'mykeep_subjects',
  SCHEDULE: 'mykeep_schedule',
  MILESTONES: 'mykeep_milestones',
  SUPPLIES: 'mykeep_supplies',
  DAILY_CHECKS: 'mykeep_daily_checks',
} as const;

// === Subject Default Colors ===

export const SUBJECT_COLORS: Record<string, string> = {
  korean: '#EF4444',
  math: '#3B82F6',
  english: '#10B981',
  social: '#F59E0B',
  science: '#8B5CF6',
  pe: '#EC4899',
  music: '#14B8A6',
  art: '#F97316',
  tech: '#6366F1',
  other: '#64748B',
};

export const SUBJECT_COLOR_LIST = [
  '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#64748B',
];

// === Days ===

export const DAYS_OF_WEEK: { key: DayOfWeek; label: string; shortLabel: string }[] = [
  { key: 'mon', label: '월요일', shortLabel: '월' },
  { key: 'tue', label: '화요일', shortLabel: '화' },
  { key: 'wed', label: '수요일', shortLabel: '수' },
  { key: 'thu', label: '목요일', shortLabel: '목' },
  { key: 'fri', label: '금요일', shortLabel: '금' },
];

// === Periods ===

export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const PERIOD_TIMES: Record<number, { start: string; end: string }> = {
  1: { start: '09:00', end: '09:50' },
  2: { start: '10:00', end: '10:50' },
  3: { start: '11:00', end: '11:50' },
  4: { start: '12:00', end: '12:50' },
  5: { start: '13:40', end: '14:30' },
  6: { start: '14:40', end: '15:30' },
  7: { start: '15:40', end: '16:30' },
  8: { start: '16:40', end: '17:30' },
};

// === Grade Labels ===

export const GRADE_LABELS: Record<GradeLevel, string> = {
  'middle-1': '중학교 1학년',
  'middle-2': '중학교 2학년',
  'middle-3': '중학교 3학년',
  'high-1': '고등학교 1학년',
  'high-2': '고등학교 2학년',
  'high-3': '고등학교 3학년',
};

// === Milestone Types ===

export const MILESTONE_TYPE_LABELS: Record<MilestoneType, string> = {
  exam: '시험',
  assignment: '과제',
  competition: '대회',
  'mock-exam': '모의고사',
  other: '기타',
};

export const MILESTONE_TYPE_ICONS: Record<MilestoneType, string> = {
  exam: 'BookOpen',
  assignment: 'FileText',
  competition: 'Trophy',
  'mock-exam': 'ClipboardList',
  other: 'Flag',
};

// === Default Subject Presets ===

export const DEFAULT_SUBJECTS = [
  { name: '국어', color: '#EF4444' },
  { name: '수학', color: '#3B82F6' },
  { name: '영어', color: '#10B981' },
  { name: '사회', color: '#F59E0B' },
  { name: '과학', color: '#8B5CF6' },
  { name: '체육', color: '#EC4899' },
  { name: '음악', color: '#14B8A6' },
  { name: '미술', color: '#F97316' },
  { name: '기술가정', color: '#6366F1' },
];
