import type { Alarm, AlarmDayOfWeek, RepeatType } from '@/lib/types';

// JS getDay() 0=일,1=월,...,6=토 → AlarmDayOfWeek
const JS_DAY_MAP: AlarmDayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/** 오늘 요일이 알람 반복 조건에 해당하는지 */
export function isAlarmActiveToday(alarm: Alarm, date = new Date()): boolean {
  const day = JS_DAY_MAP[date.getDay()];
  const weekdays: AlarmDayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  const weekends: AlarmDayOfWeek[] = ['sat', 'sun'];

  switch (alarm.repeatType) {
    case 'once':     return true; // 항상 체크 (한 번 울리면 비활성화는 스토어에서 처리)
    case 'daily':    return true;
    case 'weekdays': return weekdays.includes(day);
    case 'weekends': return weekends.includes(day);
    case 'custom':   return alarm.repeatDays.includes(day);
  }
}

/** 반복 요일 표시 문자열 (예: "월·화·수·목·금") */
export function formatRepeatLabel(alarm: Alarm): string {
  const dayLabels: Record<AlarmDayOfWeek, string> = {
    mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일',
  };
  switch (alarm.repeatType) {
    case 'once':     return '한 번만';
    case 'daily':    return '매일';
    case 'weekdays': return '평일';
    case 'weekends': return '주말';
    case 'custom':
      return alarm.repeatDays.map((d) => dayLabels[d]).join('·') || '없음';
  }
}

/** "다음 알람까지 N시간 M분" 계산 */
export function getNextAlarmInfo(
  alarms: Alarm[]
): { alarm: Alarm; minutesLeft: number } | null {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const active = alarms.filter((a) => a.isEnabled);
  if (active.length === 0) return null;

  let best: { alarm: Alarm; minutesLeft: number } | null = null;

  for (const alarm of active) {
    const alarmMin = alarm.hour * 60 + alarm.minute;
    // 오늘 아직 안 울린 경우
    let diff = alarmMin - nowMin;
    if (diff <= 0) diff += 24 * 60; // 내일로 넘김
    if (!best || diff < best.minutesLeft) {
      best = { alarm, minutesLeft: diff };
    }
  }
  return best;
}

/** 시간 포맷 (24h → "08:05 AM") */
export function formatAlarmTime(hour: number, minute: number): string {
  const ampm = hour < 12 ? 'AM' : 'PM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const m = String(minute).padStart(2, '0');
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

/** "N시간 M분 후" 포맷 */
export function formatMinutesLeft(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분 후`;
  if (m === 0) return `${h}시간 후`;
  return `${h}시간 ${m}분 후`;
}

/** RepeatType → AlarmDayOfWeek[] 변환 */
export function repeatTypeToDays(type: RepeatType): AlarmDayOfWeek[] {
  switch (type) {
    case 'daily':    return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    case 'weekdays': return ['mon', 'tue', 'wed', 'thu', 'fri'];
    case 'weekends': return ['sat', 'sun'];
    default:         return [];
  }
}
