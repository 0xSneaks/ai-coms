import type { Asset } from '../config/pairs';

export type Interval = '15m' | '1h';

export type Side = 'up' | 'down';

export type FeedSource = 'pyth' | 'mock';

export type Sample = { t: number; p: number };

export type WindowBounds = {
  start: number;
  end: number;
  duration: number;
  interval: Interval;
};

export type Quote = {
  midUp: number;
  pUp: number;
  pDown: number;
  yesAsk: number;
  noAsk: number;
  upMult: number;
  downMult: number;
  sigmaDefined: boolean;
  d: number | null;
};

export type SettlementQuality = 'complete' | 'incomplete';

export type Settlement = {
  k: number | null;
  c: number | null;
  quality: SettlementQuality;
  result: 'up' | 'down' | 'void' | 'pending';
  confirmed: boolean;
};

export type TicketSize = 10 | 25 | 50 | 100;
export const TICKET_SIZES: TicketSize[] = [10, 25, 50, 100];

export type Position = {
  id: string;
  userId: string;
  asset: Asset;
  interval: Interval;
  windowStart: number;
  side: Side;
  stake: TicketSize;
  yesAsk: number;
  noAsk: number;
  placedAt: number;
  status: 'open' | 'pending-confirm' | 'won' | 'lost' | 'refunded';
  payout?: number;
};

export { type Asset };
