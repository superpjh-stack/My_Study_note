import type { DayOfWeek, GradeLevel, MilestoneType, SoundType, RepeatType, AlarmDayOfWeek } from '@/lib/types';

// === Storage Keys ===

export const STORAGE_KEYS = {
  PROFILE: 'mykeep_profile',
  SUBJECTS: 'mykeep_subjects',
  SCHEDULE: 'mykeep_schedule',
  MILESTONES: 'mykeep_milestones',
  SUPPLIES: 'mykeep_supplies',
  DAILY_CHECKS: 'mykeep_daily_checks',
  ALARMS: 'mykeep_alarms',
} as const;

// === Alarm Sound Labels ===

export const SOUND_LABELS: Record<SoundType, string> = {
  classic: '클래식벨',
  digital: '디지털',
  bird: '새소리',
  piano: '피아노',
};

// === Alarm Repeat Labels ===

export const REPEAT_LABELS: Record<RepeatType, string> = {
  once: '한 번만',
  daily: '매일',
  weekdays: '평일',
  weekends: '주말',
  custom: '직접 선택',
};

// === Alarm Day Labels ===

export const ALARM_DAY_LABELS: Record<AlarmDayOfWeek, string> = {
  mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일',
};

// === Alarm Presets ===

export const ALARM_PRESETS: { name: string; hour: number; minute: number; repeatType: RepeatType; emoji: string }[] = [
  { name: '기상 알람',   hour: 7,  minute: 0,  repeatType: 'weekdays', emoji: '🌅' },
  { name: '등교 준비',   hour: 7,  minute: 40, repeatType: 'weekdays', emoji: '🚌' },
  { name: '자습 시작',   hour: 16, minute: 0,  repeatType: 'weekdays', emoji: '📚' },
  { name: '쉬는 시간',   hour: 17, minute: 0,  repeatType: 'daily',    emoji: '☕' },
  { name: '취침 준비',   hour: 23, minute: 0,  repeatType: 'daily',    emoji: '🌙' },
];

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
  'univ-1':  '대학교 1학년',
  'univ-2':  '대학교 2학년',
  'univ-3':  '대학교 3학년',
  'univ-4':  '대학교 4학년',
  'graduate': '대학원생',
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
