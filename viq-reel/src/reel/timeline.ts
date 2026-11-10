import {Easing, interpolate} from 'remotion';
import {FPS, NIGHT_A, NIGHT_B, NIGHT_MINUTES, REPLY_DELAY_FRAMES, T} from './config';

const f = (s: number) => Math.round(s * FPS);

export const F = {
  nightAStart: f(T.nightAStart),
  nightAEnd: f(T.nightAEnd),
  morningA: f(T.morningA),
  rewindStart: f(T.rewindStart),
  nightBStart: f(T.nightBStart),
  nightBClockEnd: f(T.nightBClockEnd),
  morningB: f(T.morningB),
  final: f(T.final),
};

export type Phase = 'hook' | 'A' | 'rewind' | 'B' | 'end';

export const phaseAt = (frame: number): Phase => {
  if (frame < F.nightAStart) return 'hook';
  if (frame < F.rewindStart) return 'A';
  if (frame < F.nightBStart) return 'rewind';
  if (frame < F.final) return 'B';
  return 'end';
};

/** Minutos desde 21:00 mostrados no relógio */
export const clockAt = (frame: number): number => {
  const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const p = phaseAt(frame);
  if (p === 'hook' || p === 'end') return 0;
  if (p === 'A') return interpolate(frame, [F.nightAStart, F.nightAEnd], [0, NIGHT_MINUTES], clamp);
  if (p === 'rewind')
    return interpolate(frame, [F.rewindStart + 6, F.nightBStart - 8], [NIGHT_MINUTES, 0], {
      ...clamp,
      easing: Easing.inOut(Easing.cubic),
    });
  return interpolate(frame, [F.nightBStart, F.nightBClockEnd], [0, NIGHT_MINUTES], clamp);
};

export const arrivalA = (min: number) =>
  Math.round(F.nightAStart + (min / NIGHT_MINUTES) * (F.nightAEnd - F.nightAStart));
export const arrivalB = (min: number) =>
  Math.round(F.nightBStart + (min / NIGHT_MINUTES) * (F.nightBClockEnd - F.nightBStart));

export const formatClock = (min: number) => {
  const total = (21 * 60 + Math.floor(min)) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const countA = (frame: number) => {
  const p = phaseAt(frame);
  if (p === 'A') return NIGHT_A.filter((m) => frame >= arrivalA(m.min)).length;
  if (p === 'rewind') {
    const c = clockAt(frame);
    return NIGHT_A.filter((m) => m.min <= c + 12).length;
  }
  return 0;
};

export const countB = (frame: number) =>
  NIGHT_B.filter((m) => m.reply.kind === 'booking' && frame >= arrivalB(m.min) + REPLY_DELAY_FRAMES).length;
