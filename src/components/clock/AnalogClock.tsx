'use client';

import { useClock } from '@/lib/hooks/useClock';
import { useAlarmStore } from '@/lib/store/useAlarmStore';

// 각도(도) → SVG 좌표 (12시 = -90도 보정)
function toXY(angleDeg: number, r: number, cx = 100, cy = 100) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// 12개 시각 눈금 생성
function HourTicks() {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        const outer = toXY(angle, 88);
        const inner = toXY(angle, 80);
        return (
          <line key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
            stroke="var(--clock-tick, currentColor)" strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
        );
      })}
    </>
  );
}

// 60개 분 눈금 (시간 눈금 위치 제외)
function MinuteTicks() {
  return (
    <>
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const angle = i * 6;
        const outer = toXY(angle, 88);
        const inner = toXY(angle, 84);
        return (
          <line key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
            stroke="var(--clock-tick-min, currentColor)" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
        );
      })}
    </>
  );
}

// 12, 3, 6, 9 숫자
function HourNumbers() {
  const labels = [{ h: 12, a: 0 }, { h: 3, a: 90 }, { h: 6, a: 180 }, { h: 9, a: 270 }];
  return (
    <>
      {labels.map(({ h, a }) => {
        const pos = toXY(a, 68);
        return (
          <text key={h} x={pos.x} y={pos.y}
            textAnchor="middle" dominantBaseline="central"
            fontSize={13} fontWeight={700}
            fill="var(--clock-number, currentColor)" opacity={0.85}>
            {h}
          </text>
        );
      })}
    </>
  );
}

// 알람 마커 (삼각형)
function AlarmMarkers() {
  const alarms = useAlarmStore((s) => s.alarms.filter((a) => a.isEnabled));
  return (
    <>
      {alarms.map((alarm) => {
        const angle = (alarm.hour % 12) * 30 + alarm.minute * 0.5;
        const tip   = toXY(angle, 78);
        const left  = toXY(angle - 6, 71);
        const right = toXY(angle + 6, 71);
        return (
          <polygon key={alarm.id}
            points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`}
            fill="#F59E0B" opacity={0.9} />
        );
      })}
    </>
  );
}

export function AnalogClock({ size = 200 }: { size?: number }) {
  const { hours, minutes, seconds } = useClock();

  const hourAngle   = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const hourTip   = toXY(hourAngle, 52);
  const minuteTip = toXY(minuteAngle, 72);
  const secondTip = toXY(secondAngle, 82);
  const secondTail = toXY(secondAngle + 180, 18); // 초침 꼬리

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-label="아날로그 시계">
      {/* 외곽 링 */}
      <circle cx={100} cy={100} r={92}
        fill="var(--clock-face, white)"
        stroke="var(--primary, #6366F1)" strokeWidth={3} />

      {/* 배경 원 (그림자) */}
      <circle cx={100} cy={100} r={88}
        fill="var(--clock-face, white)" />

      <MinuteTicks />
      <HourTicks />
      <HourNumbers />
      <AlarmMarkers />

      {/* 시침 */}
      <line x1={100} y1={100} x2={hourTip.x} y2={hourTip.y}
        stroke="var(--clock-hand-hour, #1E293B)" strokeWidth={4.5} strokeLinecap="round" />

      {/* 분침 */}
      <line x1={100} y1={100} x2={minuteTip.x} y2={minuteTip.y}
        stroke="var(--primary, #6366F1)" strokeWidth={3} strokeLinecap="round" />

      {/* 초침 */}
      <line x1={secondTail.x} y1={secondTail.y} x2={secondTip.x} y2={secondTip.y}
        stroke="#EF4444" strokeWidth={1.5} strokeLinecap="round" />

      {/* 중심 원 */}
      <circle cx={100} cy={100} r={5}
        fill="var(--primary, #6366F1)" />
      <circle cx={100} cy={100} r={2}
        fill="white" />
    </svg>
  );
}
