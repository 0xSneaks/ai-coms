import { HUB_CARD_ORDER, PAIRS, formatUsd, type Asset } from '../config/pairs';
import { formatMult } from '../engine/math';
import { formatCountdown, intervalLabel } from '../engine/windows';
import type { Interval, Quote, Sample, WindowBounds } from '../engine/types';
import { assetGlyph } from './icons';

export type HubCardModel = {
  asset: Asset;
  k: number | null;
  s: number;
  quote: Quote;
  bounds: WindowBounds;
  volume: number;
  messages: number;
  spark: Sample[];
  note?: string;
};

function pie(frac: number, color: string): string {
  const p = Math.max(0, Math.min(1, frac));
  return `<span class="pie" style="--p:${p};--c:${color}"></span>`;
}

function sparkline(asset: Asset, pts: Sample[]): string {
  if (pts.length < 2) return '';
  const w = 200, h = 52, pad = 3;
  const ys = pts.map((p) => p.p);
  const lo = Math.min(...ys), hi = Math.max(...ys);
  const span = hi - lo || 1;
  const d = pts
    .map((p, i) => {
      const x = pad + (i / (pts.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (p.p - lo) / span) * (h - pad * 2);
      return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const last = pts[pts.length - 1]!;
  const lx = w - pad;
  const ly = pad + (1 - (last.p - lo) / span) * (h - pad * 2);
  const color = PAIRS[asset].color;
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="${lx}" cy="${ly.toFixed(1)}" r="3.2" fill="${color}"/>
  </svg>`;
}

export function renderHubList(
  el: HTMLElement,
  interval: Interval,
  cards: HubCardModel[],
  now: number,
  onOpen: (asset: Asset) => void,
  onLeader: (asset: Asset) => void,
): void {
  const parts: string[] = [];
  const ranked = [...cards].sort((a, b) => b.quote.upMult - a.quote.upMult);
  const top2 = ranked.slice(0, 2);

  for (const card of cards) {
    if (card.asset === 'BNB') {
      parts.push(leaderCard(interval, top2, now, onLeader));
    }
    parts.push(pairCard(interval, card, now));
  }
  el.innerHTML = parts.join('');
  el.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => onOpen(btn.dataset.open as Asset));
  });
  el.querySelectorAll<HTMLButtonElement>('[data-leader]').forEach((btn) => {
    btn.addEventListener('click', () => onLeader(btn.dataset.leader as Asset));
  });
}

function pairCard(interval: Interval, card: HubCardModel, now: number): string {
  const cfg = PAIRS[card.asset];
  const left = Math.max(0, card.bounds.end - now);
  const frac = left / card.bounds.duration;
  const down = card.k != null && card.s < card.k;
  const delta = card.k != null ? card.s - card.k : 0;
  const dir = down ? 'down' : 'up';
  const arrow = down ? '↓' : '↑';
  const title = `${card.asset} ${intervalLabel(interval, 'hub')}`;
  return `<button class="pair-card" type="button" data-open="${card.asset}">
    <div class="card-top">
      ${assetGlyph(card.asset, 32)}
      <div class="card-title">${title}</div>
      <div class="card-time" style="color:${cfg.color}">${formatCountdown(left)} ${pie(frac, cfg.color)}</div>
    </div>
    <div class="card-prices">
      <div>
        <div class="k-label">Price to beat</div>
        <div class="k-val">${card.k == null ? '—' : formatUsd(card.asset, card.k)}</div>
      </div>
      <div>
        <div class="s-label ${dir}">Current ${arrow} ${card.k == null ? '—' : formatUsd(card.asset, Math.abs(delta))}</div>
        <div class="s-val ${dir}">${formatUsd(card.asset, card.s)}</div>
      </div>
      <div></div>
    </div>
    <div class="card-mid">
      ${sparkline(card.asset, card.spark)}
      <div class="pills">
        <span class="pill up">${card.quote.midUp}%</span>
        <span class="pill down">${100 - card.quote.midUp}%</span>
      </div>
    </div>
    <div class="card-bot">
      <span class="vol">${fmtVol(card.volume)} cr</span>
      <span class="msgs">${card.note ? card.note + ' · ' : ''}💬 ${fmtCount(card.messages)}</span>
    </div>
  </button>`;
}

function leaderCard(interval: Interval, top2: HubCardModel[], _now: number, _onLeader: (a: Asset) => void): string {
  const label = interval === '15m' ? '15 minutes' : '1 hour';
  const rows = top2
    .map((c) => {
      const max = Math.max(...top2.map((x) => x.quote.upMult), 0.01);
      const w = (c.quote.upMult / max) * 100;
      return `<button class="leader-row" type="button" data-leader="${c.asset}">
        <span>${c.asset}</span>
        <span class="leader-bar"><i style="width:${w.toFixed(0)}%"></i></span>
        <span class="leader-mult">${formatMult(c.quote.upMult)}</span>
        <span class="pill up">${c.quote.midUp}%</span>
      </button>`;
    })
    .join('');
  const vol = top2.reduce((n, c) => n + c.volume, 0);
  return `<article class="leader-card" aria-label="Crypto Leader">
    <div class="leader-head">Crypto Leader — ${label}</div>
    ${rows || '<div class="muted">No race data yet</div>'}
    <div class="vol">${fmtVol(vol)} cr · playable race is v2</div>
  </article>`;
}

function fmtVol(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toLocaleString('en-US');
}
function fmtCount(n: number): string {
  if (n >= 1_000) return `${(n / 1000).toFixed(n >= 10_000 ? 0 : 2)}K`.replace('.00K', 'K');
  return String(n);
}
