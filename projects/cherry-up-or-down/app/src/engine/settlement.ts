import { CLOSE_AVG_MS, CONFIRM_MS, OPEN_AVG_MS } from './windows';
import type { Sample, Settlement, WindowBounds } from './types';

const NEEDED = 60;

function averageIn(samples: Sample[], from: number, to: number): { avg: number | null; count: number } {
  let sum = 0;
  let n = 0;
  for (const s of samples) {
    if (s.t > from && s.t <= to) {
      sum += s.p;
      n++;
    }
  }
  return { avg: n === NEEDED ? sum / n : null, count: n };
}

/**
 * K = simple average of 60 one-second prints in the minute before open.
 * C = simple average of 60 one-second prints in the final minute before close.
 * Up iff C >= K. Incomplete either window → void (do not invent prices).
 * Credits move only after a 5-minute confirm following close.
 */
export function settleWindow(samples: Sample[], bounds: WindowBounds, nowMs: number): Settlement {
  const kRange = averageIn(samples, bounds.start - OPEN_AVG_MS, bounds.start);
  const k = kRange.avg;

  if (nowMs < bounds.end) {
    return { k, c: null, quality: k != null ? 'complete' : 'incomplete', result: 'pending', confirmed: false };
  }

  const cRange = averageIn(samples, bounds.end - CLOSE_AVG_MS, bounds.end);
  const c = cRange.avg;
  const quality: Settlement['quality'] = k != null && c != null ? 'complete' : 'incomplete';

  if (quality === 'incomplete') {
    return { k, c, quality, result: 'void', confirmed: nowMs >= bounds.end + CONFIRM_MS };
  }

  const result: Settlement['result'] = c! >= k! ? 'up' : 'down';
  const confirmed = nowMs >= bounds.end + CONFIRM_MS;
  return { k, c, quality, result, confirmed };
}

/** Opening mark only, for live TO BEAT display. */
export function openingMark(samples: Sample[], windowStart: number): number | null {
  return averageIn(samples, windowStart - OPEN_AVG_MS, windowStart).avg;
}
