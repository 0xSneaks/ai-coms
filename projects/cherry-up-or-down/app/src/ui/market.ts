import { ASSETS, PAIRS, formatUsd, type Asset } from '../config/pairs';
import { formatMult } from '../engine/math';
import { formatCountdown, formatEtTime, intervalLabel } from '../engine/windows';
import type { Interval, Quote, Sample, TicketSize } from '../engine/types';
import { TICKET_SIZES } from '../engine/types';
import { assetGlyph } from './icons';
import { drawChart } from './chart';

export function fillTickets(el: HTMLElement, current: TicketSize, onPick: (s: TicketSize) => void): void {
  el.innerHTML = TICKET_SIZES.map(
    (s) => `<button class="ticket${s === current ? ' is-on' : ''}" type="button" data-stake="${s}">${s} cr</button>`,
  ).join('');
  el.querySelectorAll<HTMLButtonElement>('[data-stake]').forEach((btn) => {
    btn.addEventListener('click', () => onPick(Number(btn.dataset.stake) as TicketSize));
  });
}

export function renderChips(
  el: HTMLElement,
  current: Asset,
  deltas: Partial<Record<Asset, { d: number; k: number | null }>>,
  onOpen: (a: Asset) => void,
): void {
  el.innerHTML = ASSETS.map((a) => {
    const info = deltas[a];
    const down = info && info.k != null ? info.d < 0 : false;
    const chg =
      info && info.k != null
        ? `<span class="chg ${down ? 'down' : 'up'}">${down ? '▼' : '▲'} ${formatUsd(a, Math.abs(info.d))}</span>`
        : '';
    return `<button class="chip${a === current ? ' is-on' : ''}" type="button" data-open="${a}">
      ${assetGlyph(a, 22)} <b>${a}</b> ${chg}
    </button>`;
  }).join('');
  el.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => onOpen(btn.dataset.open as Asset));
  });
}

export function renderAlso(
  el: HTMLElement,
  current: Asset,
  deltas: Partial<Record<Asset, { d: number; k: number | null }>>,
  onOpen: (a: Asset) => void,
): void {
  el.innerHTML = ASSETS.filter((a) => a !== current)
    .map((a) => {
      const info = deltas[a];
      const down = info && info.k != null ? info.d < 0 : false;
      const chg =
        info && info.k != null
          ? `<span class="chg ${down ? 'down' : 'up'}">${down ? '▼' : '▲'} ${formatUsd(a, Math.abs(info.d))}</span>`
          : '';
      return `<button class="chip" type="button" data-open="${a}">${assetGlyph(a, 20)} <b>${a}</b> ${chg}</button>`;
    })
    .join('');
  el.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => onOpen(btn.dataset.open as Asset));
  });
}

export function updatePairHeader(asset: Asset, interval: Interval, end: number, now: number): void {
  const glyph = document.getElementById('title-glyph')!;
  glyph.innerHTML = assetGlyph(asset, 32);
  document.getElementById('market-title')!.textContent = `${asset} ${intervalLabel(interval, 'pair')}`;
  document.getElementById('countdown')!.textContent = formatCountdown(end - now);
  document.getElementById('target-time')!.textContent = formatEtTime(end);
  document.title = PAIRS[asset].appName;
}

export function updatePrices(asset: Asset, s: number, k: number | null, quote: Quote): void {
  document.getElementById('now-price')!.textContent = formatUsd(asset, s);
  document.getElementById('target-price')!.textContent = k == null ? '—' : formatUsd(asset, k);
  const deltaEl = document.getElementById('now-delta')!;
  const pctEl = document.getElementById('now-pct')!;
  if (k == null) {
    deltaEl.textContent = '';
    pctEl.textContent = '';
  } else {
    const d = s - k;
    const pct = (d / k) * 100;
    const dir = d < 0 ? 'down' : 'up';
    const arrow = d < 0 ? '▼' : '▲';
    deltaEl.className = `delta ${dir}`;
    pctEl.className = `delta ${dir}`;
    deltaEl.textContent = `${arrow} ${formatUsd(asset, Math.abs(d))}`;
    pctEl.textContent = `(${pct >= 0 ? '+' : ''}${pct.toFixed(3)}%)`;
  }
  document.getElementById('up-pct')!.textContent = `${quote.midUp}%`;
  document.getElementById('down-pct')!.textContent = `${100 - quote.midUp}%`;
  document.getElementById('up-mult')!.textContent = formatMult(quote.upMult);
  document.getElementById('down-mult')!.textContent = formatMult(quote.downMult);
  document.getElementById('chance-mid')!.textContent = `${quote.midUp}%`;
  document.getElementById('chance-down')!.textContent = `Down ${100 - quote.midUp}%`;
}

export function updateChart(
  canvas: HTMLCanvasElement,
  points: Sample[],
  k: number | null,
  color: string,
  from: number,
  to: number,
  now: number,
): void {
  drawChart(canvas, { points, k, color, from, to, now });
}

export function updatePast(el: HTMLElement, results: Array<'up' | 'down' | 'void'>): void {
  el.innerHTML = results
    .map((r) =>
      r === 'void' ? '<span title="void">·</span>' : `<span class="tri-${r}" title="${r}">${r === 'up' ? '▲' : '▼'}</span>`,
    )
    .join('');
}

export function setActivity(el: HTMLElement, text: string): void {
  el.innerHTML = text;
}

export function pushWin(stream: HTMLElement, text: string): void {
  const row = document.createElement('div');
  row.textContent = text;
  stream.prepend(row);
  while (stream.children.length > 6) stream.lastElementChild?.remove();
}

export function setCredits(el: HTMLElement, n: number, symbol: string): void {
  el.textContent = `${n.toLocaleString('en-US')} ${symbol}`;
}

export function setFeedFlag(el: HTMLElement, note: string, mock: boolean): void {
  el.hidden = false;
  el.textContent = note;
  el.style.opacity = mock ? '1' : '0.7';
}

export function toast(el: HTMLElement, msg: string): void {
  el.hidden = false;
  el.textContent = msg;
  window.setTimeout(() => {
    el.hidden = true;
  }, 2400);
}
