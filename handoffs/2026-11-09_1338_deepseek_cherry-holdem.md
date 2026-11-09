# DeepSeek handoff — Cherry Hold'em, Stage 1 (scaffold + hand evaluator + tests)

- Date/time: 2026-11-09 13:38 ET (run completed ~13:36 ET)
- Chat: https://chat.deepseek.com/a/chat/s/deeacb07-0d9d-4226-b172-b8526935355c ("Cherry Holdem Stage 1 scaffold")
- DeepThink: ON
- Account: White Sneaks (signed in via Google, completed by Sneaks in the secure sign-in flow)
- Label: UNVERIFIED — DeepSeek output, not yet run/tested by muse or codex

DeepSeek's entire Stage 1 reply, verbatim (repo file tree, then each file as one fenced block headed by its path):

---


cherry-holdem-build/
├── .env.example              # CHERRY_APP_ID, DATABASE_URL, SESSION_SECRET, SOL_ENABLED=false
├── .gitignore                # node_modules, .next, .env*, coverage, .DS_Store
├── README.md                 # stage plan (1–4), run/test commands, no-real-money notice
├── package.json              # next, react, typescript, vitest, @cherrydotfun/miniapp-sdk
├── tsconfig.json             # strict TS, "@/*" path alias to ./src/*
├── next.config.mjs           # CSP frame-ancestors for cherry.fun, no X-Frame-Options
├── middleware.ts             # injects security headers on every HTML response
├── vitest.config.ts          # node environment, src/**/*.test.ts include glob
├── public/
│   └── .well-known/
│       └── cherry-app.json   # {"appId": "<CHERRY_APP_ID>"} static app manifest
├── src/
│   ├── app/
│   │   ├── layout.tsx        # dark mobile-first shell, 360px width, viewport meta
│   │   ├── globals.css       # dark theme tokens, 44px touch targets, skeleton shimmer
│   │   ├── page.tsx          # lobby placeholder; skeleton on first frame
│   │   └── api/
│   │       ├── health/
│   │       │   └── route.ts  # GET /api/health -> { ok: true, solEnabled: false }
│   │       ├── auth/
│   │       │   └── route.ts  # stage-1 stub: returns 501, verifyLaunchToken wired in stage 2
│   │       └── credits/
│   │           └── route.ts  # stage-1 stub: returns 501, 10,000-credit grant in stage 2
│   ├── lib/
│   │   ├── env.ts            # typed env reader: CHERRY_APP_ID, SOL_ENABLED forced false
│   │   ├── session.ts        # stage-1 stub: Authorization-header session shape, no cookies
│   │   ├── sol.ts            # SOL_ENABLED=false stub interface: no wallet, no signing, no payouts
│   │   ├── db.ts             # Neon Postgres client (stage-1 stub: throws if no DATABASE_URL)
│   │   └── types.ts          # shared types: Player, Tournament, TableState, Card, HandResult
│   └── poker/
│       ├── evaluate.ts       # pure hand evaluator (5–7 cards -> best 5, rank + tiebreaks)
│       └── evaluate.test.ts  # vitest: all ranks, kickers, wheel, ties, split pots
├── worker/
│   ├── package.json          # worker deps: @cloudflare/workers-types only
│   ├── wrangler.toml         # DO binding: TABLE, migrations, compatibility date
│   └── src/
│       ├── index.ts          # worker entry: routes /table/:id -> TableDurableObject
│       └── table.ts          # stage-1 stub: DO skeleton, dealer/timers wired in stage 3
└── db/
    ├── schema.sql            # players, credits_ledger, tournaments, registrations, hand_history
    └── migrations/
        └── 0001_init.sql     # v1 schema (stage-1 placeholder, applied in stage 2)

src/poker/evaluate.ts
```typescript
/**
 * Cherry Hold'em — pure hand evaluator (Stage 1).
 *
 * No dependencies. Deterministic: the same 5–7 cards always produce the
 * same result. Suits never break a tie — equal categories and tiebreakers
 * are a genuine tie (split pot).
 *
 * Card encoding: rank letter + suit letter, e.g. 'As' = ace of spades,
 * 'Td' = ten of diamonds. Ranks: 2–9, T=10, J=11, Q=12, K=13, A=14.
 */

export type Suit = 's' | 'h' | 'd' | 'c';

export type RankLetter =
  | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

export type Card = `${RankLetter}${Suit}`;

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type HandCategory =
  | 'high-card'
  | 'one-pair'
  | 'two-pair'
  | 'three-of-a-kind'
  | 'straight'
  | 'flush'
  | 'full-house'
  | 'four-of-a-kind'
  | 'straight-flush';

export const HAND_CATEGORIES: HandCategory[] = [
  'high-card',
  'one-pair',
  'two-pair',
  'three-of-a-kind',
  'straight',
  'flush',
  'full-house',
  'four-of-a-kind',
  'straight-flush',
];

export const CATEGORY_RANK: Record<HandCategory, number> = {
  'high-card': 0,
  'one-pair': 1,
  'two-pair': 2,
  'three-of-a-kind': 3,
  'straight': 4,
  'flush': 5,
  'full-house': 6,
  'four-of-a-kind': 7,
  'straight-flush': 8,
};

export const CATEGORY_NAMES: Record<HandCategory, string> = {
  'high-card': 'High Card',
  'one-pair': 'One Pair',
  'two-pair': 'Two Pair',
  'three-of-a-kind': 'Three of a Kind',
  'straight': 'Straight',
  'flush': 'Flush',
  'full-house': 'Full House',
  'four-of-a-kind': 'Four of a Kind',
  'straight-flush': 'Straight Flush',
};

export interface HandResult {
  /** The best 5 cards, sorted by rank descending (wheel: A, 5, 4, 3, 2). */
  bestFive: Card[];
  category: HandCategory;
  /** 0 = high card … 8 = straight flush. Compare this first. */
  rank: number;
  /**
   * Tiebreak values, highest first, compared lexicographically after
   * `rank`. Examples: four of a kind [quadRank, kicker], full house
   * [tripRank, pairRank], flush / high card [all 5 ranks descending].
   */
  tiebreakers: number[];
  /** e.g. "Straight Flush", "Two Pair". */
  name: string;
}

const RANK_VALUE: Record<RankLetter, Rank> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

const VALID_CARD = /^[2-9TJQKA][shdc]$/;

/** Parse and validate a single card string. */
export function parseCard(card: string): Card {
  if (!VALID_CARD.test(card)) throw new Error(`Invalid card: ${card}`);
  return card as Card;
}

function rankOf(card: Card): Rank {
  return RANK_VALUE[card[0] as RankLetter];
}

function suitOf(card: Card): Suit {
  return card[1] as Suit;
}

function sortDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => rankOf(b) - rankOf(a));
}

/**
 * Return the high card of a straight in `ranks`, or null if there is none.
 * Wheel (A-2-3-4-5) counts as a 5-high straight.
 */
function straightHigh(ranks: number[]): number | null {
  const unique = [...new Set(ranks)].sort((a, b) => b - a);
  // Wheel: A-5-4-3-2.
  if (
    unique.includes(14) &&
    unique.includes(5) &&
    unique.includes(4) &&
    unique.includes(3) &&
    unique.includes(2)
  ) {
    return 5;
  }
  for (let i = 0; i + 4 < unique.length; i++) {
    if (unique[i] - unique[i + 4] === 4) return unique[i];
  }
  return null;
}

/** For a wheel straight, order the best five as A, 5, 4, 3, 2. */
function wheelFive(sorted: Card[], straight: number | null): Card[] {
  if (straight !== 5) return sorted;
  const ace = sorted.find((c) => rankOf(c) === 14)!;
  const rest = sorted.filter((c) => rankOf(c) !== 14);
  return [ace, ...rest];
}

/** Evaluate exactly 5 cards. */
function evaluateFive(cards: Card[]): HandResult {
  const sorted = sortDesc(cards);
  const ranks = sorted.map(rankOf);
  const isFlush = cards.every((c) => suitOf(c) === suitOf(cards[0]));
  const straight = straightHigh(ranks);

  // Count ranks, most common first, then highest rank first.
  const counts = new Map<number, number>();
  for (const r of ranks) counts.set(r, (counts.get(r) ?? 0) + 1);
  const groups = [...counts.entries()].sort(
    ([r1, c1], [r2, c2]) => c2 - c1 || r2 - r1,
  );
  const [first, second] = groups;

  const make = (
    category: HandCategory,
    tiebreakers: number[],
    bestFive: Card[] = sorted,
  ): HandResult => ({
    bestFive,
    category,
    rank: CATEGORY_RANK[category],
    tiebreakers,
    name: CATEGORY_NAMES[category],
  });

  // Straight flush (a royal is just a 14-high straight flush).
  if (isFlush && straight !== null) {
    return make('straight-flush', [straight], wheelFive(sorted, straight));
  }
  if (first[1] === 4) {
    return make('four-of-a-kind', [first[0], second[0]]);
  }
  if (first[1] === 3 && second[1] === 2) {
    return make('full-house', [first[0], second[0]]);
  }
  if (isFlush) return make('flush', ranks);
  if (straight !== null) {
    return make('straight', [straight], wheelFive(sorted, straight));
  }
  if (first[1] === 3) {
    const kickers = groups.filter(([, c]) => c === 1).map(([r]) => r);
    return make('three-of-a-kind', [first[0], ...kickers]);
  }
  if (first[1] === 2 && second[1] === 2) {
    const kicker = groups.find(([, c]) => c === 1)![0];
    return make('two-pair', [first[0], second[0], kicker]);
  }
  if (first[1] === 2) {
    const kickers = groups.filter(([, c]) => c === 1).map(([r]) => r);
    return make('one-pair', [first[0], ...kickers]);
  }
  return make('high-card', ranks);
}

function combinations<T>(items: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (items.length === 0) return [];
  const [head, ...tail] = items;
  return [
    ...combinations(tail, k - 1).map((rest) => [head, ...rest]),
    ...combinations(tail, k),
  ];
}

/**
 * Evaluate 5–7 cards and return the best 5-card hand.
 * Throws on fewer than 5 or more than 7 cards, on a duplicate card,
 * or on a malformed card string.
 */
export function evaluateHand(cards: readonly Card[]): HandResult {
  if (cards.length < 5 || cards.length > 7) {
    throw new Error(`Expected between 5 and 7 cards, got ${cards.length}`);
  }
  const seen = new Set<string>();
  for (const card of cards) {
    parseCard(card);
    if (seen.has(card)) throw new Error(`Duplicate card: ${card}`);
    seen.add(card);
  }
  if (cards.length === 5) return evaluateFive([...cards]);

  // 6–7 cards: try every 5-card combination and keep the best.
  let best: HandResult | null = null;
  for (const combo of combinations([...cards], 5)) {
    const result = evaluateFive(combo);
    if (best === null || compareHands(result, best) > 0) best = result;
  }
  return best!;
}

/**
 * Compare two evaluated hands. Returns > 0 if `a` wins, < 0 if `b`
 * wins, and 0 for an exact tie (a split pot — suits never break it).
 */
export function compareHands(a: HandResult, b: HandResult): number {
  if (a.rank !== b.rank) return a.rank - b.rank;
  for (let i = 0; i < Math.min(a.tiebreakers.length, b.tiebreakers.length); i++) {
    if (a.tiebreakers[i] !== b.tiebreakers[i]) {
      return a.tiebreakers[i] - b.tiebreakers[i];
    }
  }
  return 0;
}

/**
 * Split `pot` credits among `hands` (one entry per player, in seat order).
 * Winners split evenly; any odd chips go to the earliest winners in order.
 * Returns one payout per hand, in the same order as `hands`.
 */
export function splitPot(hands: readonly HandResult[], pot: number): number[] {
  if (hands.length === 0) return [];
  if (!Number.isInteger(pot) || pot < 0) {
    throw new Error(`Invalid pot: ${pot}`);
  }
  let best = hands[0];
  for (const h of hands) if (compareHands(h, best) > 0) best = h;
  const winners = hands
    .map((h, i) => (compareHands(h, best) === 0 ? i : -1))
    .filter((i) => i >= 0);
  const share = Math.floor(pot / winners.length);
  const remainder = pot - share * winners.length;
  const payouts = new Array<number>(hands.length).fill(0);
  winners.forEach((winnerIndex, i) => {
    payouts[winnerIndex] = share + (i < remainder ? 1 : 0);
  });
  return payouts;
}
```

src/poker/evaluate.test.ts
```typescript
import { describe, expect, it } from 'vitest';
import { compareHands, evaluateHand, splitPot } from './evaluate';
import type { Card } from './evaluate';

/** Build a HandResult from a list of card strings, e.g. hand('As', 'Kd'). */
function hand(...cards: Card[]) {
  return evaluateHand(cards);
}

describe('evaluateHand — every rank', () => {
  it('royal flush is a 14-high straight flush', () => {
    const r = hand('As', 'Ks', 'Qs', 'Js', 'Ts');
    expect(r.category).toBe('straight-flush');
    expect(r.rank).toBe(8);
    expect(r.tiebreakers).toEqual([14]);
    expect(r.name).toBe('Straight Flush');
  });

  it('straight flush, 9-high', () => {
    const r = hand('9s', '8s', '7s', '6s', '5s');
    expect(r.category).toBe('straight-flush');
    expect(r.tiebreakers).toEqual([9]);
  });

  it('four of a kind, ace quad with king kicker', () => {
    const r = hand('As', 'Ah', 'Ad', 'Ac', 'Kd');
    expect(r.category).toBe('four-of-a-kind');
    expect(r.tiebreakers).toEqual([14, 13]);
  });

  it('full house, aces full of kings', () => {
    const r = hand('As', 'Ah', 'Ad', 'Kc', 'Kd');
    expect(r.category).toBe('full-house');
    expect(r.tiebreakers).toEqual([14, 13]);
  });

  it('flush, ace high with all ranks as tiebreakers', () => {
    const r = hand('As', 'Js', '9s', '7s', '5s');
    expect(r.category).toBe('flush');
    expect(r.tiebreakers).toEqual([14, 11, 9, 7, 5]);
  });

  it('straight, 10-high', () => {
    const r = hand('Ts', '9d', '8h', '7c', '6s');
    expect(r.category).toBe('straight');
    expect(r.tiebreakers).toEqual([10]);
  });

  it('wheel straight (A-2-3-4-5) is 5-high', () => {
    const wheel = hand('As', '2d', '3h', '4c', '5s');
    expect(wheel.category).toBe('straight');
    expect(wheel.tiebreakers).toEqual([5]);
    expect(wheel.bestFive).toEqual(['As', '2d', '3h', '4c', '5s']);
  });

  it('wheel straight flush is a 5-high straight flush', () => {
    const r = hand('As', '2s', '3s', '4s', '5s');
    expect(r.category).toBe('straight-flush');
    expect(r.tiebreakers).toEqual([5]);
  });

  it('three of a kind, queens with king and 9 kickers', () => {
    const r = hand('Qs', 'Qh', 'Qd', 'Ks', '9c');
    expect(r.category).toBe('three-of-a-kind');
    expect(r.tiebreakers).toEqual([12, 13, 9]);
  });

  it('two pair, aces and kings with queen kicker', () => {
    const r = hand('As', 'Ad', 'Kh', 'Kc', 'Qs');
    expect(r.category).toBe('two-pair');
    expect(r.tiebreakers).toEqual([14, 13, 12]);
  });

  it('one pair, aces with K-Q-J kickers', () => {
    const r = hand('As', 'Ah', 'Kd', 'Qc', 'Js');
    expect(r.category).toBe('one-pair');
    expect(r.tiebreakers).toEqual([14, 13, 12, 11]);
  });

  it('high card, ace high', () => {
    const r = hand('As', 'Kd', 'Qc', 'Jh', '9s');
    expect(r.category).toBe('high-card');
    expect(r.tiebreakers).toEqual([14, 13, 12, 11, 9]);
  });
});

describe('evaluateHand — 7 cards (best 5 of 7)', () => {
  it('picks the royal flush from 7 cards', () => {
    const r = hand('As', 'Ks', 'Qs', 'Js', 'Ts', '9s', '2d');
    expect(r.category).toBe('straight-flush');
    expect(r.tiebreakers).toEqual([14]);
    expect(r.bestFive).toEqual(['As', 'Ks', 'Qs', 'Js', 'Ts']);
  });

  it('picks the best full house from 7 cards', () => {
    const r = hand('As', 'Ah', 'Ad', 'Kc', 'Kd', 'Qh', 'Qd');
    expect(r.category).toBe('full-house');
    expect(r.tiebreakers).toEqual([14, 13]);
  });

  it('picks the best straight from 7 cards', () => {
    const r = hand('As', 'Kd', 'Qc', 'Jh', 'Ts', '9s', '8d');
    expect(r.category).toBe('straight');
    expect(r.tiebreakers).toEqual([14]);
  });

  it('does not count a 4-card flush', () => {
    const r = hand('As', 'Ks', 'Qs', 'Js', '2d', '3c', '4h');
    expect(r.category).toBe('high-card');
  });

  it('a 6-card hand can make a flush', () => {
    const r = hand('As', 'Ks', 'Qs', 'Js', '9s', '2d');
    expect(r.category).toBe('flush');
    expect(r.tiebreakers).toEqual([14, 13, 12, 11, 9]);
  });
});

describe('kickers', () => {
  it('breaks one pair by the kicker', () => {
    const better = hand('As', 'Ad', 'Kh', 'Qc', 'Js');
    const worse = hand('Ah', 'Ac', 'Kd', 'Qd', 'Ts');
    expect(compareHands(better, worse)).toBeGreaterThan(0);
  });

  it('breaks two pair with the kicker', () => {
    const better = hand('As', 'Ad', 'Kh', 'Kc', 'Qs');
    const worse = hand('Ah', 'Ac', 'Kd', 'Kd'.replace('Kd', 'Ks'), 'Js');
    expect(compareHands(better, worse)).toBeGreaterThan(0);
  });

  it('breaks a flush by the lowest kicker', () => {
    const better = hand('As', 'Ks', 'Qs', 'Js', '9s');
    const worse = hand('Ah', 'Kh', 'Qh', 'Jh', '8h');
    expect(compareHands(better, worse)).toBeGreaterThan(0);
  });

  it('wheel straight loses to a 6-high straight', () => {
    const wheel = hand('As', '2d', '3h', '4c', '5s');
    const sixHigh = hand('6s', '5d', '4h', '3c', '2s');
    expect(compareHands(wheel, sixHigh)).toBeLessThan(0);
  });
});

describe('ties and split pots', () => {
  it('identical 5-card hands tie', () => {
    expect(
      compareHands(
        hand('As', 'Kd', 'Qc', 'Jh', 'Ts'),
        hand('Ah', 'Ks', 'Qd', 'Jc', 'Th'),
      ),
    ).toBe(0);
  });

  it('same pair and same kickers tie across suits', () => {
    // Both hold A-A with K-Q-J kickers; suits do not break ties.
    expect(
      compareHands(
        hand('As', 'Ad', 'Kh', 'Qc', 'Js'),
        hand('Ah', 'Ac', 'Kd', 'Qd', 'Jh'),
      ),
    ).toBe(0);
  });

  it('the board plays: both players make the same straight', () => {
    const a = hand('As', 'Kd', 'Qs', 'Jh', 'Ts', '9c', '8d');
    const b = hand('Ah', 'Kc', 'Qd', 'Js', 'Th', '9s', '8c');
    expect(compareHands(a, b)).toBe(0);
  });

  it('splitPot divides evenly between two winners', () => {
    const a = hand('As', 'Kd', 'Qc', 'Jh', 'Ts');
    const b = hand('Ah', 'Ks', 'Qd', 'Jc', 'Th');
    expect(splitPot([a, b], 100)).toEqual([50, 50]);
  });

  it('splitPot gives the odd chip to the first winner', () => {
    const a = hand('As', 'Kd', 'Qc', 'Jh', 'Ts');
    const b = hand('Ah', 'Ks', 'Qd', 'Jc', 'Th');
    expect(splitPot([a, b], 101)).toEqual([51, 50]);
  });

  it('splitPot pays the sole winner everything', () => {
    const a = hand('As', 'Ah', 'Ad', 'Ac', 'Ks');
    const b = hand('Ks', 'Kh', 'Kd', 'Kc', 'Qs');
    expect(splitPot([a, b], 100)).toEqual([100, 0]);
  });

  it('splitPot splits three ways, odd chips to the earliest winners', () => {
    const a = hand('As', 'Kd', 'Qc', 'Jh', 'Ts');
    const b = hand('Ah', 'Ks', 'Qd', 'Jc', 'Th');
    const c = hand('Ac', 'Kh', 'Qs', 'Jd', 'Tc');
    expect(splitPot([a, b, c], 100)).toEqual([34, 33, 33]);
  });
});

describe('validation', () => {
  it('throws on fewer than 5 cards', () => {
    expect(() => hand('As', 'Kd', 'Qc', 'Jh')).toThrow(/5 and 7/);
  });

  it('throws on more than 7 cards', () => {
    expect(() =>
      hand('As', 'Kd', 'Qc', 'Jh', 'Ts', '9c', '8d', '7h'),
    ).toThrow(/5 and 7/);
  });

  it('throws on a duplicate card', () => {
    expect(() => hand('As', 'As', 'Kd', 'Qc', 'Jh')).toThrow(/Duplicate/);
  });

  it('throws on a malformed card', () => {
    expect(() =>
      evaluateHand(['As', 'Kd', 'Qc', 'Jh', '1x' as Card]),
    ).toThrow(/Invalid card/);
  });
});

describe('compareHands properties', () => {
  it('is antisymmetric', () => {
    const a = hand('As', 'Ah', 'Ad', 'Ac', 'Ks');
    const b = hand('Ks', 'Kh', 'Kd', 'Kc', 'Qs');
    expect(compareHands(a, b)).toBe(-compareHands(b, a));
  });

  it('is transitive for a strict ordering', () => {
    const quads = hand('As', 'Ah', 'Ad', 'Ac', 'Ks');
    const boat = hand('Ks', 'Kh', 'Kd', 'Qc', 'Qd');
    const flush = hand('As', 'Js', '9s', '7s', '5s');
    expect(compareHands(quads, boat)).toBeGreaterThan(0);
    expect(compareHands(boat, flush)).toBeGreaterThan(0);
    expect(compareHands(quads, flush)).toBeGreaterThan(0);
  });
});
```

---

Browser fidelity note (from the browser handoff report, not part of DeepSeek's reply): the reply as shown on screen included the odd line `hand('Ah', 'Ac', 'Kd', 'Kd'.replace('Kd', 'Ks'), 'Js')` in the two-pair kicker test, reproduced above as it appeared.
