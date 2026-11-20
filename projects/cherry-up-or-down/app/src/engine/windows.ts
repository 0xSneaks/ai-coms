import type { Interval, WindowBounds } from './types';

export const FIFTEEN_MS = 15 * 60 * 1000;
export const HOUR_MS = 60 * 60 * 1000;
export const CONFIRM_MS = 5 * 60 * 1000;
export const OPEN_AVG_MS = 60 * 1000;
export const CLOSE_AVG_MS = 60 * 1000;

export function durationMs(interval: Interval): number {
  return interval === '15m' ? FIFTEEN_MS : HOUR_MS;
}

/** Windows align to :00/:15/:30/:45 (15m) or the hour (1h). Same UTC epoch grid everywhere. */
export function windowBounds(nowMs: number, interval: Interval): WindowBounds {
  const duration = durationMs(interval);
  const start = Math.floor(nowMs / duration) * duration;
  return { start, end: start + duration, duration, interval };
}

export function previousWindow(bounds: WindowBounds): WindowBounds {
  return {
    start: bounds.start - bounds.duration,
    end: bounds.start,
    duration: bounds.duration,
    interval: bounds.interval,
  };
}

export function formatCountdown(msLeft: number): string {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

/** Display a window close time in America/New_York. */
export function formatEtTime(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(ms));
}

export function minutesRemaining(endMs: number, nowMs: number): number {
  // Spec: t is minutes remaining, never less than a 1-second floor.
  return Math.max(1 / 60, (endMs - nowMs) / 60000);
}

export function intervalLabel(interval: Interval, style: 'hub' | 'pair'): string {
  if (style === 'hub') return interval === '15m' ? '15 MIN' : '1 HOUR';
  return interval === '15m' ? '15 min' : '1 hour';
}
