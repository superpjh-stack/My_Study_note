'use client';

import { useState } from 'react';
import { X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAlarmStore } from '@/lib/store/useAlarmStore';
import { previewSound } from '@/lib/audio/alarmAudio';
import {
  SOUND_LABELS, REPEAT_LABELS, ALARM_DAY_LABELS, ALARM_PRESETS,
} from '@/lib/constants';
import type { SoundType, RepeatType, AlarmDayOfWeek, Alarm } from '@/lib/types';

interface AlarmFormProps {
  onClose: () => void;
  editAlarm?: Alarm;
}

const ALL_DAYS: AlarmDayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const REPEAT_OPTIONS: RepeatType[] = ['once', 'daily', 'weekdays', 'weekends', 'custom'];
const SOUND_OPTIONS: SoundType[] = ['classic', 'digital', 'bird', 'piano'];

export function AlarmForm({ onClose, editAlarm }: AlarmFormProps) {
  const { addAlarm, updateAlarm } = useAlarmStore();

  const [hour, setHour] = useState(editAlarm?.hour ?? 7);
  const [minute, setMinute] = useState(editAlarm?.minute ?? 0);
  const [name, setName] = useState(editAlarm?.name ?? '');
  const [repeatType, setRepeatType] = useState<RepeatType>(editAlarm?.repeatType ?? 'weekdays');
  const [customDays, setCustomDays] = useState<AlarmDayOfWeek[]>(editAlarm?.repeatDays ?? []);
  const [soundType, setSoundType] = useState<SoundType>(editAlarm?.soundType ?? 'classic');
  const [volume, setVolume] = useState(editAlarm?.volume ?? 0.8);

  const ampm = hour < 12 ? 'AM' : 'PM';

  const toggleDay = (day: AlarmDayOfWeek) => {
    setCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const applyPreset = (preset: typeof ALARM_PRESETS[number]) => {
    setHour(preset.hour);
    setMinute(preset.minute);
    setName(preset.name);
    setRepeatType(preset.repeatType);
  };

  const handleSave = () => {
    const data = {
      name: name || '알람',
      hour,
      minute,
      repeatType,
      repeatDays: repeatType === 'custom' ? customDays : [],
      soundType,
      volume,
      isEnabled: true,
    };
    if (editAlarm) {
      updateAlarm(editAlarm.id, data);
    } else {
      addAlarm(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-t-2xl bg-[var(--bg-primary)] max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)] sticky top-0 bg-[var(--bg-primary)]">
          <h2 className="text-base font-bold">⏰ {editAlarm ? '알람 편집' : '알람 추가'}</h2>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>저장</Button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* 시간 피커 */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="flex flex-col items-center">
              <button onClick={() => setHour((h) => (h + 1) % 24)} className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] text-xl">▲</button>
              <span className="text-5xl font-extrabold tabular-nums w-20 text-center text-[var(--text-primary)]">
                {String(hour % 12 === 0 ? 12 : hour % 12).padStart(2, '0')}
              </span>
              <button onClick={() => setHour((h) => (h - 1 + 24) % 24)} className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] text-xl">▼</button>
            </div>
            <span className="text-5xl font-extrabold text-[var(--primary)]">:</span>
            <div className="flex flex-col items-center">
              <button onClick={() => setMinute((m) => (m + 1) % 60)} className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] text-xl">▲</button>
              <span className="text-5xl font-extrabold tabular-nums w-20 text-center text-[var(--text-primary)]">
                {String(minute).padStart(2, '0')}
              </span>
              <button onClick={() => setMinute((m) => (m - 1 + 60) % 60)} className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] text-xl">▼</button>
            </div>
            <button
              onClick={() => setHour((h) => (h + 12) % 24)}
              className="ml-2 rounded-lg bg-[var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              {ampm}
            </button>
          </div>

          {/* 프리셋 */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">빠른 설정</p>
            <div className="flex flex-wrap gap-2">
              {ALARM_PRESETS.map((p) => (
                <button key={p.name} onClick={() => applyPreset(p)}
                  className="rounded-full bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors">
                  {p.emoji} {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 알람 이름 */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5">알람 이름</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 수업 시작"
              maxLength={20}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            />
          </div>

          {/* 반복 */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">반복</p>
            <div className="flex flex-wrap gap-2">
              {REPEAT_OPTIONS.map((r) => (
                <button key={r} onClick={() => setRepeatType(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    repeatType === r
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                  }`}>
                  {REPEAT_LABELS[r]}
                </button>
              ))}
            </div>
            {repeatType === 'custom' && (
              <div className="flex gap-1.5 mt-2">
                {ALL_DAYS.map((day) => (
                  <button key={day} onClick={() => toggleDay(day)}
                    className={`h-9 w-9 rounded-full text-xs font-medium transition-colors ${
                      customDays.includes(day)
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                    }`}>
                    {ALARM_DAY_LABELS[day]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 소리 선택 */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">알람 소리</p>
            <div className="space-y-1.5">
              {SOUND_OPTIONS.map((s) => (
                <div key={s} className="flex items-center justify-between rounded-lg bg-[var(--bg-secondary)] px-3 py-2.5">
                  <button onClick={() => setSoundType(s)} className="flex items-center gap-2.5 flex-1 text-left">
                    <div className={`h-4 w-4 rounded-full border-2 transition-colors ${
                      soundType === s ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--border)]'
                    }`} />
                    <span className="text-sm text-[var(--text-primary)]">{SOUND_LABELS[s]}</span>
                  </button>
                  <button onClick={() => previewSound(s, volume)}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                    <Play size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 볼륨 */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">볼륨</p>
            <div className="flex items-center gap-3">
              <span className="text-base">🔈</span>
              <input type="range" min={0.3} max={1} step={0.05}
                value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-[var(--primary)]" />
              <span className="text-base">🔊</span>
              <span className="text-xs text-[var(--text-muted)] w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
