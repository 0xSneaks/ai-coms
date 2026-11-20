import { startCherryHandshake, getUserKey, openRoomStub, shareResultStub } from './cherry';
import { ASSETS, PAIRS, isAsset, type Asset } from './config/pairs';
import { CURRENT_ASSET, HUB_APP_NAME } from './config/apps';
import {
  PriceEngine,
  GameLedger,
  createPlayCredits,
  quote,
  realizedSigma,
  openingMark,
  settleWindow,
  windowBounds,
  previousWindow,
  minutesRemaining,
  CONFIRM_MS,
} from './engine';
import type { Interval, TicketSize } from './engine';
import { renderHubList, type HubCardModel } from './ui/hub';
import {
  fillTickets,
  renderChips,
  renderAlso,
  updatePairHeader,
  updatePrices,
  updateChart,
  updatePast,
  setActivity,
  pushWin,
  setCredits,
  setFeedFlag,
  toast,
} from './ui/market';

startCherryHandshake();

const prices = new PriceEngine();
const currency = createPlayCredits();
const ledger = new GameLedger(currency, getUserKey());

let hubInterval: Interval = '15m';
let marketAsset: Asset = 'BTC';
let marketInterval: Interval = '15m';
let ticket: TicketSize = 10;
let view: 'hub' | 'market' = 'hub';
let lastWinAt = 0;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const toastEl = $<HTMLElement>('toast');

function routeFromHash(): void {
  const raw = (location.hash.replace(/^#/, '') || '/').replace(/^\//, '');
  if (!raw) {
    // A pair listing opens directly on its own pair screen; the hub opens
    // the Coins list. Hash routing still wins when a link names a pair.
    if (CURRENT_ASSET) {
      marketAsset = CURRENT_ASSET;
      marketInterval = '15m';
      showMarket();
      return;
    }
    showHub();
    return;
  }
  const parts = raw.split('/');
  const a = parts[0]!.toUpperCase();
  if (isAsset(a)) {
    marketAsset = a;
    if (parts[1] === '1h') marketInterval = '1h';
    else marketInterval = '15m';
    showMarket();
  } else {
    showHub();
  }
}

function go(asset?: Asset, interval?: Interval): void {
  if (!asset) {
    location.hash = '#/';
    return;
  }
  const iv = interval ?? marketInterval;
  location.hash = `#/${asset.toLowerCase()}${iv === '1h' ? '/1h' : ''}`;
}

function showHub(): void {
  view = 'hub';
  $('view-hub').hidden = false;
  $('view-market').hidden = true;
  document.title = HUB_APP_NAME;
  paint();
}

function showMarket(): void {
  view = 'market';
  $('view-hub').hidden = true;
  $('view-market').hidden = false;
  bindMarketChrome();
  paint();
}

function model(asset: Asset, interval: Interval, now: number): HubCardModel {
  const bounds = windowBounds(now, interval);
  const samples = prices.getSamples(asset);
  const k = openingMark(samples, bounds.start);
  const s = prices.price(asset);
  const sigma = realizedSigma(prices.minuteCloses(asset, now));
  const q = k == null ? quote(s, s, null, minutesRemaining(bounds.end, now)) : quote(s, k, sigma, minutesRemaining(bounds.end, now));
  const spark = prices.series(asset, bounds.start, Math.min(now, bounds.end));
  return {
    asset,
    k,
    s,
    quote: q,
    bounds,
    volume: ledger.windowVolume(asset, interval, bounds.start),
    messages: 3 + (spark.length % 7),
    spark: spark.length > 1 ? spark : prices.series(asset, now - bounds.duration, now),
  };
}

function allDeltas(interval: Interval, now: number) {
  const out: Partial<Record<Asset, { d: number; k: number | null }>> = {};
  for (const a of ASSETS) {
    const m = model(a, interval, now);
    out[a] = { d: m.k == null ? 0 : m.s - m.k, k: m.k };
  }
  return out;
}

function settleDue(now: number): void {
  const st = ledger.state();
  for (const p of st.positions) {
    if (p.status !== 'open' && p.status !== 'pending-confirm') continue;
    const bounds = { start: p.windowStart, end: p.windowStart + (p.interval === '15m' ? 15 * 60 * 1000 : 60 * 60 * 1000), duration: p.interval === '15m' ? 15 * 60 * 1000 : 60 * 60 * 1000, interval: p.interval };
    const breaker = prices.breaker(p.asset, now);
    const result = settleWindow(prices.getSamples(p.asset), bounds, now);
    if (result.result === 'pending') continue;
    if (!result.confirmed) {
      ledger.markPending(p.id);
      continue;
    }
    const outcome = breaker.voidOnSettle || result.result === 'void' ? 'void' : result.result;
    ledger.resolve(p.id, outcome);
  }
}

function updateEconomy(now: number): void {
  setCredits($('credits-pill'), ledger.balance(), currency.symbol);
  const claim = ledger.claimStatus(now);
  const btn = $('btn-claim') as HTMLButtonElement;
  if (claim.reason === 'ready') {
    btn.disabled = false;
    btn.textContent = `Claim ${claim.grant} cr`;
  } else if (claim.reason === 'capped') {
    btn.disabled = true;
    btn.textContent = 'At 2,000 cap';
  } else {
    btn.disabled = true;
    btn.textContent = 'Claimed today';
  }
  const grant = document.getElementById('grant-label');
  if (grant) grant.textContent = claim.reason === 'claimed' ? 'claimed' : `${claim.grant || 200} cr`;

  const brk = prices.breaker(view === 'market' ? marketAsset : 'BTC', now);
  const banner = $('breaker-banner');
  if (brk.haltNew) {
    banner.hidden = false;
    banner.className = 'banner is-halt';
    banner.textContent = brk.reason === 'stale'
      ? 'Feed stale — new tickets halted; open rounds will void if still stale at settlement.'
      : 'Vol spike — new tickets halted. Open rounds still settle.';
  } else {
    banner.hidden = true;
    banner.textContent = '';
  }
  const up = document.getElementById('btn-up') as HTMLButtonElement | null;
  const down = document.getElementById('btn-down') as HTMLButtonElement | null;
  if (up) up.disabled = brk.haltNew;
  if (down) down.disabled = brk.haltNew;
}

function latestNote(asset: Asset, interval: Interval): string | undefined {
  const rows = ledger.resultsFor(asset, interval);
  const done = rows.find((p) => p.status === 'won' || p.status === 'lost' || p.status === 'refunded' || p.status === 'open' || p.status === 'pending-confirm');
  if (!done) return undefined;
  if (done.status === 'won') return `Won +${done.payout} cr`;
  if (done.status === 'lost') return `Lost ${done.stake} cr`;
  if (done.status === 'refunded') return `Refunded ${done.stake} cr`;
  if (done.status === 'pending-confirm') return 'Pending confirm';
  return `${done.side === 'up' ? 'Up' : 'Down'} ${done.stake} cr`;
}

function showResultBanner(): void {
  const banner = $('result-banner');
  if (view !== 'market') {
    const any = ASSETS.map((a) => latestNote(a, hubInterval)).find((n) => n && (n.startsWith('Won') || n.startsWith('Lost') || n.startsWith('Refunded')));
    if (!any) { banner.hidden = true; return; }
    banner.hidden = false;
    banner.className = 'banner ' + (any.startsWith('Won') ? 'is-win' : any.startsWith('Lost') ? 'is-loss' : 'is-refund');
    banner.textContent = any;
    return;
  }
  const note = latestNote(marketAsset, marketInterval);
  if (!note || note.includes(' cr') && note.startsWith('Up') || note.startsWith('Down') || note === 'Pending confirm') {
    if (note === 'Pending confirm') {
      banner.hidden = false;
      banner.className = 'banner is-refund';
      banner.textContent = 'Result pending — 5 min confirm after close.';
      return;
    }
    if (note && (note.startsWith('Up') || note.startsWith('Down'))) {
      banner.hidden = false;
      banner.className = 'banner is-refund';
      banner.textContent = `Ticket live: ${note}. Pays after 5-min confirm.`;
      return;
    }
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  banner.className = 'banner ' + (note.startsWith('Won') ? 'is-win' : note.startsWith('Lost') ? 'is-loss' : 'is-refund');
  banner.textContent = note;
}

function pastMarks(asset: Asset, interval: Interval, now: number): Array<'up' | 'down' | 'void'> {
  const out: Array<'up' | 'down' | 'void'> = [];
  let b = previousWindow(windowBounds(now, interval));
  for (let i = 0; i < 4; i++) {
    const s = settleWindow(prices.getSamples(asset), b, Math.max(now, b.end + CONFIRM_MS));
    if (s.result === 'up' || s.result === 'down' || s.result === 'void') out.unshift(s.result);
    b = previousWindow(b);
  }
  return out;
}

function paint(): void {
  ledger.setUser(getUserKey());
  const now = Date.now();
  settleDue(now);
  updateEconomy(now);
  showResultBanner();
  setFeedFlag($('feed-flag'), prices.sourceNote, prices.source !== 'pyth');

  if (view === 'hub') {
    const cards = ASSETS.map((a) => {
      const m = model(a, hubInterval, now);
      m.note = latestNote(a, hubInterval);
      return m;
    });
    renderHubList($('hub-list'), hubInterval, cards, now, (a) => go(a, hubInterval), (a) => go(a, hubInterval));
    return;
  }

  const m = model(marketAsset, marketInterval, now);
  updatePairHeader(marketAsset, marketInterval, m.bounds.end, now);
  updatePrices(marketAsset, m.s, m.k, m.quote);
  updateChart(
    $('chart') as HTMLCanvasElement,
    m.spark,
    m.k,
    PAIRS[marketAsset].color,
    m.bounds.start,
    m.bounds.end,
    now,
  );
  updatePast($('past-marks'), pastMarks(marketAsset, marketInterval, now));
  const deltas = allDeltas(marketInterval, now);
  renderChips($('chip-strip'), marketAsset, deltas, (a) => go(a, marketInterval));
  renderAlso($('also-rail'), marketAsset, deltas, (a) => go(a, marketInterval));

  const open = ledger.openFor(marketAsset, marketInterval, m.bounds.start);
  const act = open
    ? `You picked <b class="${open.side}">${open.side === 'up' ? 'Up' : 'Down'}</b> · ${open.stake} cr · confirming 5 min after close`
    : `Room activity is local/demo — not a Kalshi feed.`;
  setActivity($('activity'), act);
  $('streak').textContent = String(ledger.state().streak);

  if (now - lastWinAt > 4000) {
    lastWinAt = now;
    const amt = [8, 12, 25, 50][Math.floor(Math.random() * 4)];
    pushWin($('win-stream'), `+${amt} cr`);
  }
}

function bindMarketChrome(): void {
  const render = (): void => {
    fillTickets($('tickets'), ticket, (s) => {
      ticket = s;
      render();
    });
  };
  render();
  document.querySelectorAll('.view-market .tab[data-tab]').forEach((btn) => {
    const iv = (btn as HTMLElement).dataset.tab as Interval;
    btn.classList.toggle('is-active', iv === marketInterval);
  });
}

function place(side: 'up' | 'down'): void {
  const now = Date.now();
  const m = model(marketAsset, marketInterval, now);
  if (m.k == null) {
    toast(toastEl, 'No opening mark yet — waiting on a complete 60-second sample.');
    return;
  }
  const brk = prices.breaker(marketAsset, now);
  const placed = ledger.placeTicket({
    asset: marketAsset,
    interval: marketInterval,
    windowStart: m.bounds.start,
    side,
    stake: ticket,
    yesAsk: m.quote.yesAsk,
    noAsk: m.quote.noAsk,
    nowMs: now,
    halted: brk.haltNew,
  });
  if (!placed.ok) {
    const msg: Record<string, string> = {
      insufficient: `Need ${ticket} ${currency.symbol} (play credits only — not for sale).`,
      halted: 'Tickets halted — feed stale or vol spike.',
      'e-round': 'Round exposure cap reached.',
      'e-asset': 'Asset exposure cap reached.',
      duplicate: 'Already recorded that ticket.',
    };
    toast(toastEl, msg[placed.reason] ?? placed.reason);
    return;
  }
  toast(toastEl, `Picked ${side === 'up' ? 'Up' : 'Down'} · ${ticket} cr · pays ${side === 'up' ? m.quote.upMult.toFixed(2) : m.quote.downMult.toFixed(2)}x if it wins`);
  paint();
}

function bind(): void {
  $('hub-back').addEventListener('click', () => history.length > 1 && history.back());
  $('mkt-back').addEventListener('click', () => go());
  document.querySelectorAll('.hub-tab[data-interval]').forEach((btn) => {
    btn.addEventListener('click', () => {
      hubInterval = (btn as HTMLElement).dataset.interval as Interval;
      document.querySelectorAll('.hub-tab[data-interval]').forEach((b) => b.classList.toggle('is-on', b === btn));
      paint();
    });
  });
  document.querySelectorAll('.view-market .tab[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iv = (btn as HTMLElement).dataset.tab as Interval;
      go(marketAsset, iv);
    });
  });
  $('btn-up').addEventListener('click', () => place('up'));
  $('btn-down').addEventListener('click', () => place('down'));
  $('live-chat').addEventListener('click', () => {
    void openRoomStub().then((r) => {
      toast(toastEl, r === 'standalone' ? 'Live chat would open the Cherry room via navigate.openRoom.' : 'Opening room…');
    });
  });
  $('btn-armory').addEventListener('click', () => {
    toast(toastEl, 'Armory: $0.99 / $2.99 / $4.99 cosmetics — purchase stubbed, no payment code.');
  });
  $('btn-board').addEventListener('click', () => {
    toast(toastEl, `Room board (local): ${ledger.state().boardPoints} pts · resets 00:00 UTC`);
  });
  $('btn-share').addEventListener('click', () => {
    const m = model(marketAsset, marketInterval, Date.now());
    const text = `${PAIRS[marketAsset].appName} · ${m.k == null ? '—' : m.k} to beat vs ${m.s} now · play credits only`;
    void shareResultStub(text).then((r) => {
      toast(toastEl, r === 'standalone' ? 'Share is a cherry.share stub in standalone.' : 'Shared.');
    });
  });
  $('btn-claim').addEventListener('click', () => {
    const r = ledger.claimDaily(Date.now());
    toast(toastEl, r.granted > 0 ? `Claimed ${r.granted} play credits.` : r.applied ? 'At the 2,000 soft cap — grant paused.' : 'Already claimed today.');
    paint();
  });
  window.addEventListener('hashchange', routeFromHash);
}

prices.start();
ledger.setUser(getUserKey());
bind();
routeFromHash();
prices.on(() => paint());
paint();
