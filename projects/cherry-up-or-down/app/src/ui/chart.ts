import type { Sample } from '../engine/types';

export function drawChart(
  canvas: HTMLCanvasElement,
  opts: {
    points: Sample[];
    k: number | null;
    color: string;
    now: number;
    from: number;
    to: number;
  },
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 328;
  const cssH = canvas.clientHeight || 220;
  if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const pts = opts.points.filter((p) => p.t >= opts.from && p.t <= opts.to);
  if (pts.length < 2) return;

  const prices = pts.map((p) => p.p);
  if (opts.k != null) prices.push(opts.k);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pad = (max - min) * 0.18 || Math.abs(max) * 0.002 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const left = 8;
  const right = cssW - 52;
  const top = 22;
  const bottom = cssH - 10;
  const x = (t: number) => left + ((t - opts.from) / (opts.to - opts.from)) * (right - left);
  const y = (p: number) => top + ((hi - p) / (hi - lo)) * (bottom - top);

  const last = pts[pts.length - 1]!;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const X = x(p.t);
    const Y = y(p.p);
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  const lastX = x(last.t);
  ctx.lineTo(lastX, bottom);
  ctx.lineTo(x(pts[0]!.t), bottom);
  ctx.closePath();
  const fill = ctx.createLinearGradient(0, top, 0, bottom);
  fill.addColorStop(0, hexAlpha(opts.color, 0.45));
  fill.addColorStop(1, hexAlpha(opts.color, 0.02));
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.save();
  ctx.shadowColor = opts.color;
  ctx.shadowBlur = 16;
  ctx.beginPath();
  pts.forEach((p, i) => {
    if (i === 0) ctx.moveTo(x(p.t), y(p.p));
    else ctx.lineTo(x(p.t), y(p.p));
  });
  ctx.strokeStyle = opts.color;
  ctx.lineWidth = 2.2;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();

  if (opts.k != null) {
    const ky = y(opts.k);
    ctx.save();
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, ky);
    ctx.lineTo(right + 8, ky);
    ctx.stroke();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(lastX, y(last.p), 4.5, 0, Math.PI * 2);
  ctx.fillStyle = opts.color;
  ctx.shadowColor = opts.color;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  ctx.font = '500 10px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.textAlign = 'right';
  const ticks = [hi - (hi - lo) * 0.15, (hi + lo) / 2, lo + (hi - lo) * 0.15];
  for (const t of ticks) {
    ctx.fillText(formatAxis(t), cssW - 6, y(t) + 3);
  }
}

function formatAxis(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function hexAlpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
