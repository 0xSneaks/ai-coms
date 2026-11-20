import { ASSETS, PAIRS, type Asset } from '../config/pairs';
import { RISK } from '../config/risk';
import { circuitBreaker, type Breaker } from './risk';
import { realizedSigma } from './math';
import type { FeedSource, Sample } from './types';

const HERMES = 'https://hermes.pyth.network';
const MAX_SAMPLES = 3 * 60 * 60; // 3h of 1s prints
const HISTORY_MS = 2 * 60 * 60 * 1000;

export type PriceListener = () => void;

function apiKey(): string | undefined {
  const key = (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_PYTH_API_KEY;
  return key && key.trim() ? key.trim() : undefined;
}

function parsePythPrice(p: { price: string; expo: number }): number {
  return Number(p.price) * 10 ** p.expo;
}

/**
 * Pyth USD spots, with an offline mock fallback.
 * Hermes has required a Bearer API key since 2026-08-26; if VITE_PYTH_API_KEY
 * is missing or the request 401s, we run a labeled mock. Never invent prices
 * for a live settlement window that has a feed gap (see settlement.ts).
 */
export class PriceEngine {
  source: FeedSource = 'mock';
  sourceNote = 'MOCK — no Pyth API key (Hermes requires one since 2026-08-26)';
  private last: Record<Asset, number> = {} as Record<Asset, number>;
  private samples = new Map<Asset, Sample[]>();
  private listeners = new Set<PriceListener>();
  private timer: number | null = null;
  private poll: number | null = null;
  private started = false;
  lastTickMs: Partial<Record<Asset, number>> = {};
  /** For tests: pretend the feed paused. */
  staleOverrideMs: number | null = null;

  constructor() {
    for (const a of ASSETS) {
      this.last[a] = PAIRS[a].mockSeed;
      this.lastTickMs[a] = 0;
      this.samples.set(a, []);
    }
  }

  start(): void {
    if (this.started) return;
    this.started = true;
    this.seedMockHistory(Date.now());
    const key = apiKey();
    if (key) {
      void this.tryPyth(key);
    } else {
      this.source = 'mock';
      this.sourceNote = 'MOCK — VITE_PYTH_API_KEY not set; Hermes is key-gated';
    }
    this.timer = window.setInterval(() => this.tick(Date.now()), 1000);
  }

  stop(): void {
    if (this.timer != null) window.clearInterval(this.timer);
    if (this.poll != null) window.clearInterval(this.poll);
    this.timer = this.poll = null;
    this.started = false;
  }

  on(fn: PriceListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  price(asset: Asset): number {
    return this.last[asset];
  }

  getSamples(asset: Asset): Sample[] {
    return this.samples.get(asset) ?? [];
  }

  /** One-minute closes over the last hour, for realized σ. */
  minuteCloses(asset: Asset, nowMs = Date.now()): number[] {
    const samples = this.getSamples(asset);
    const from = nowMs - 60 * 60 * 1000;
    const buckets = new Map<number, Sample>();
    for (const s of samples) {
      if (s.t < from) continue;
      const minute = Math.floor(s.t / 60000) * 60000;
      const prev = buckets.get(minute);
      if (!prev || s.t >= prev.t) buckets.set(minute, s);
    }
    return [...buckets.keys()].sort((a, b) => a - b).map((k) => buckets.get(k)!.p);
  }

  series(asset: Asset, fromMs: number, toMs: number): Sample[] {
    return this.getSamples(asset).filter((s) => s.t >= fromMs && s.t <= toMs);
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }

  private push(asset: Asset, t: number, p: number): void {
    this.last[asset] = p;
    this.lastTickMs[asset] = t;
    const arr = this.samples.get(asset)!;
    arr.push({ t, p });
    const cutoff = t - HISTORY_MS;
    while (arr.length > MAX_SAMPLES || (arr[0] && arr[0].t < cutoff)) arr.shift();
  }

  private tick(now: number): void {
    if (this.source === 'mock') {
      for (const a of ASSETS) {
        const prev = this.last[a];
        const shock = (Math.random() - 0.49) * prev * 0.00025;
        this.push(a, now, Math.max(prev * 0.0001, prev + shock));
      }
    } else {
      for (const a of ASSETS) this.push(a, now, this.last[a]);
    }
    this.emit();
  }

  /** Build 2h of 1s mock prints so opening marks, vol, and Past can render. */
  private seedMockHistory(now: number): void {
    for (const a of ASSETS) {
      const seed = PAIRS[a].mockSeed;
      let p = seed;
      const start = now - HISTORY_MS;
      const arr: Sample[] = [];
      for (let t = start; t < now; t += 1000) {
        p = Math.max(p * 0.0001, p + (Math.random() - 0.5) * seed * 0.0002);
        arr.push({ t, p });
      }
      this.samples.set(a, arr);
      this.last[a] = p;
      this.lastTickMs[a] = now;
    }
  }

  private async tryPyth(key: string): Promise<void> {
    try {
      const ids = ASSETS.map((a) => `ids[]=${PAIRS[a].pythId}`).join('&');
      const url = `${HERMES}/v2/updates/price/latest?${ids}&parsed=true`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (!res.ok) {
        this.source = 'mock';
        this.sourceNote = `MOCK — Pyth Hermes HTTP ${res.status}`;
        return;
      }
      this.applyPyth(await res.json(), Date.now());
      this.source = 'pyth';
      this.sourceNote = 'VERIFIED Pyth Hermes';
      this.poll = window.setInterval(() => {
        void this.pollPyth(key);
      }, 1000);
    } catch (err) {
      this.source = 'mock';
      this.sourceNote = `MOCK — Pyth fetch failed (${(err as Error).message})`;
    }
  }

  private async pollPyth(key: string): Promise<void> {
    try {
      const ids = ASSETS.map((a) => `ids[]=${PAIRS[a].pythId}`).join('&');
      const url = `${HERMES}/v2/updates/price/latest?${ids}&parsed=true`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (!res.ok) return;
      this.applyPyth(await res.json(), Date.now());
    } catch {
      /* keep last mid; 1s ticker still records it */
    }
  }

  private applyPyth(body: { parsed?: Array<{ id: string; price: { price: string; expo: number } }> }, now: number): void {
    const parsed = body.parsed ?? [];
    for (const item of parsed) {
      const id = item.id.replace(/^0x/, '');
      const asset = ASSETS.find((a) => PAIRS[a].pythId === id);
      if (!asset) continue;
      const price = parsePythPrice(item.price);
      if (Number.isFinite(price) && price > 0) {
        this.last[asset] = price;
        this.lastTickMs[asset] = now;
      }
    }
  }

  last1mLogReturn(asset: Asset, nowMs = Date.now()): number | null {
    const closes = this.minuteCloses(asset, nowMs);
    if (closes.length < 2) return null;
    const a = closes[closes.length - 2]!;
    const b = closes[closes.length - 1]!;
    if (a <= 0 || b <= 0) return null;
    return Math.log(b / a);
  }

  sigma15m(asset: Asset, nowMs = Date.now()): number | null {
    const closes = this.minuteCloses(asset, nowMs).slice(-16);
    return realizedSigma(closes);
  }

  breaker(asset: Asset, nowMs = Date.now()): Breaker {
    const last = this.staleOverrideMs ?? this.lastTickMs[asset] ?? null;
    return circuitBreaker({
      nowMs,
      lastTickMs: last || null,
      last1mLogReturn: this.last1mLogReturn(asset, nowMs),
      sigma60m: realizedSigma(this.minuteCloses(asset, nowMs)),
      sigma15m: this.sigma15m(asset, nowMs),
      medianSigma24h: this.sigma15m(asset, nowMs),
      cfg: RISK,
    });
  }
}
