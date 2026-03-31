// === Core Types ===

export type GradeLevel =
  | 'middle-1' | 'middle-2' | 'middle-3'
  | 'high-1' | 'high-2' | 'high-3';

export type Semester = '1' | '2';

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export type MilestoneType = 'exam' | 'assignment' | 'competition' | 'mock-exam' | 'other';

export type ThemeMode = 'light' | 'dark';

// === User Profile ===

export interface UserProfile {
  id: string;
  grade: GradeLevel;
  semester: Semester;
  theme: ThemeMode;
  createdAt: string;
  updatedAt: string;
}

// === Subject ===

export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  classroom?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// === Schedule Slot ===

export interface ScheduleSlot {
  id: string;
  subjectId: string;
  dayOfWeek: DayOfWeek;
  period: number;
  startTime?: string;
  endTime?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// === Milestone ===

export interface Milestone {
  id: string;
  title: string;
  type: MilestoneType;
  subjectId?: string;
  dueDate: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// === Supply Item ===

export interface SupplyItem {
  id: string;
  subjectId: string;
  name: string;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

// === Alarm ===

export type SoundType = 'classic' | 'digital' | 'bird' | 'piano';
export type RepeatType = 'once' | 'daily' | 'weekdays' | 'weekends' | 'custom';
export type AlarmDayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Alarm {
  id: string;
  name: string;
  hour: number;
  minute: number;
  repeatType: RepeatType;
  repeatDays: AlarmDayOfWeek[];
  soundType: SoundType;
  volume: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// === Daily Supply Check ===

export interface DailySupplyCheck {
  id: string;
  date: string;
  supplyItemId: string;
  isChecked: boolean;
  createdAt: string;
  updatedAt: string;
}
