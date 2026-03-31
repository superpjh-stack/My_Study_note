import type { SoundType } from '@/lib/types';
import { initAudioContext, SOUND_PLAY_MAP } from './alarmAudio';

let intervalId: ReturnType<typeof setInterval> | null = null;
let playing = false;

export const alarmPlayer = {
  start(soundType: SoundType, volume: number) {
    if (playing) return;
    playing = true;
    try {
      const ctx = initAudioContext();
      SOUND_PLAY_MAP[soundType](ctx, volume);
      intervalId = setInterval(() => {
        if (!playing) return;
        const c = initAudioContext();
        SOUND_PLAY_MAP[soundType](c, volume);
      }, 1800);
    } catch {
      playing = false;
    }
  },

  stop() {
    playing = false;
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  },

  get isPlaying() { return playing; },
};
