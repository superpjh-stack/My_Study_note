import type { SoundType } from '@/lib/types';

let audioCtx: AudioContext | null = null;

export function initAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// ── 클래식벨: 880Hz + 1100Hz 사인파 교차 ──
function playClassicBell(ctx: AudioContext, volume: number) {
  const freqs = [880, 1100, 880, 1100];
  const on = 0.15;
  const gap = 0.05;
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * (on + gap);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.01);
    gain.gain.linearRampToValueAtTime(0, t + on);
    osc.start(t);
    osc.stop(t + on + 0.05);
  });
}

// ── 디지털: 1000Hz 사각파 비프 × 3 ──
function playDigitalBeep(ctx: AudioContext, volume: number) {
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 1000;
    const t = ctx.currentTime + i * 0.2;
    gain.gain.setValueAtTime(volume * 0.5, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.1);
    osc.start(t);
    osc.stop(t + 0.15);
  }
}

// ── 새소리: 주파수 스윕 ──
function playBirdSong(ctx: AudioContext, volume: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.linearRampToValueAtTime(1600, now + 0.1);
  osc.frequency.linearRampToValueAtTime(800, now + 0.2);
  osc.frequency.linearRampToValueAtTime(1400, now + 0.3);
  osc.frequency.linearRampToValueAtTime(700, now + 0.4);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.8, now + 0.02);
  gain.gain.linearRampToValueAtTime(0, now + 0.45);
  osc.start(now);
  osc.stop(now + 0.5);
}

// ── 피아노: C장조 화음 (삼각파 자연감쇠) ──
function playPianoChord(ctx: AudioContext, volume: number) {
  [262, 330, 392].forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume / 3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    osc.start(now);
    osc.stop(now + 1.6);
  });
}

export const SOUND_PLAY_MAP: Record<SoundType, (ctx: AudioContext, vol: number) => void> = {
  classic: playClassicBell,
  digital: playDigitalBeep,
  bird:    playBirdSong,
  piano:   playPianoChord,
};

/** 소리 한 번 재생 (미리듣기용) */
export function previewSound(soundType: SoundType, volume: number) {
  try {
    const ctx = initAudioContext();
    SOUND_PLAY_MAP[soundType](ctx, volume);
  } catch {
    // AudioContext 생성 실패 무시
  }
}
