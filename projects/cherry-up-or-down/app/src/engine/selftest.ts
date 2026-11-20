import { houseBook, quote, midFromNd } from './math';
import { settleWindow } from './settlement';
import type { Sample, WindowBounds } from './types';
import { FIFTEEN_MS } from './windows';
import { createPlayCredits, DAILY_GRANT, SOFT_CAP } from './currency';
import { GameLedger } from './ledger';
import { memoryKV } from './store';
import { bookExposure, checkCaps, circuitBreaker } from './risk';
import { RISK, type RiskConfig } from '../config/risk';
import { ASSETS, PAIRS, isAsset } from '../config/pairs';
import { APP_IDS, LISTINGS, isPlaceholder } from '../config/apps';
import { readPythApiKey } from './pricing';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import {
  verifyCherryUser,
  requireCherryUser,
  CherryAuthError,
  userKeyFromClaims,
} from '../../server/auth';

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}
function almost(a: number, b: number, eps = 1e-6): boolean {
  return Math.abs(a - b) < eps;
}

// House book fit to the spec table (integer 3-credit overround).
const cases = [
  { m: 30, yes: 32, no: 71 },
  { m: 23, yes: 25, no: 78 },
  { m: 27, yes: 29, no: 74 },
  { m: 34, yes: 36, no: 67 },
];
for (const c of cases) {
  const book = houseBook(c.m / 100, true);
  assert(book.yesAsk === c.yes && book.noAsk === c.no, `book mid ${c.m}: got ${book.yesAsk}/${book.noAsk}`);
  assert(book.yesAsk + book.noAsk === 103, 'overround 103');
  assert(almost(book.upMult, 100 / c.yes), 'up mult');
  assert(almost(book.downMult, 100 / c.no), 'down mult');
}

const fb = houseBook(0.5, false);
assert(fb.yesAsk === 53 && fb.noAsk === 52, 'undefined-σ wider overround');

const mid = midFromNd(100, 100, 0.001, 15);
assert(almost(mid.pUp, 0.5, 1e-3), 'N(d) ATM is ~50/50');

const q = quote(100, 100, 0.001, 15);
assert(q.yesAsk >= 1 && q.yesAsk <= 99, 'ask clamp');

// Settlement: 60 one-second prints for K and C. Up iff C >= K. Incomplete → void.
const start = 1_700_000_000_000;
const bounds: WindowBounds = { start, end: start + FIFTEEN_MS, duration: FIFTEEN_MS, interval: '15m' };
const samples: Sample[] = [];
for (let i = 1; i <= 60; i++) samples.push({ t: start - 60000 + i * 1000, p: 100 });
for (let i = 1; i <= 60; i++) samples.push({ t: bounds.end - 60000 + i * 1000, p: 101 });
const up = settleWindow(samples, bounds, bounds.end + 5 * 60 * 1000);
assert(up.k === 100 && up.c === 101 && up.result === 'up' && up.confirmed, 'Up when C > K after confirm');

const tieSamples = samples.map((s) => ({ ...s, p: 100 }));
const tie = settleWindow(tieSamples, bounds, bounds.end + 5 * 60 * 1000);
assert(tie.result === 'up', 'C == K is Up');

const downSamples: Sample[] = [
  ...Array.from({ length: 60 }, (_, i) => ({ t: start - 60000 + (i + 1) * 1000, p: 100 })),
  ...Array.from({ length: 60 }, (_, i) => ({ t: bounds.end - 60000 + (i + 1) * 1000, p: 99 })),
];
const down = settleWindow(downSamples, bounds, bounds.end + 5 * 60 * 1000);
assert(down.result === 'down', 'Down when C < K');

const gap = settleWindow(samples.slice(0, 10), bounds, bounds.end + 5 * 60 * 1000);
assert(gap.result === 'void' && gap.quality === 'incomplete', 'missing prints void');

const pending = settleWindow(samples, bounds, start + 1000);
assert(pending.result === 'pending', 'open window stays pending');

console.log('engine selftest: ok');


const tight: RiskConfig = { ...RISK, bankrollCredits: 600 }; // E_round = 10, E_asset = 20

function fresh(risk: RiskConfig = RISK) {
  const kv = memoryKV();
  const currency = createPlayCredits({ kv, storageKey: 't' });
  const ledger = new GameLedger(currency, 'user-1', { kv, risk });
  return { kv, currency, ledger };
}

// Daily claim once per UTC day, soft cap 2,000.
{
  const { currency } = fresh();
  const day = Date.UTC(2026, 10, 19, 12, 0, 0);
  const a = currency.applyDailyGrant('u', day);
  assert(a.applied && a.granted === DAILY_GRANT && a.balance === 200, 'first daily claim 200');
  const b = currency.applyDailyGrant('u', day + 60_000);
  assert(!b.applied && b.granted === 0 && b.balance === 200, 'second claim same UTC day is idempotent');
  const next = Date.UTC(2026, 10, 20, 0, 0, 0);
  const c = currency.applyDailyGrant('u', next);
  assert(c.applied && c.granted === 200 && c.balance === 400, 'next UTC day claims again');
}

{
  const { currency } = fresh();
  currency.credit('u', 1950, 'seed', 'seed');
  const cap = currency.applyDailyGrant('u', Date.UTC(2026, 10, 19, 1, 0, 0));
  assert(cap.applied && cap.granted === 50 && cap.balance === SOFT_CAP, 'grant clips to soft cap 2000');
  currency.credit('u', 100, 'win', 'win'); // winnings may sit above cap
  assert(currency.getBalance('u') === 2100, 'winnings may exceed soft cap');
  const again = currency.applyDailyGrant('u', Date.UTC(2026, 10, 20, 1, 0, 0));
  assert(again.applied && again.granted === 0 && again.balance === 2100, 'grant paused while at/above cap');
}

// Ledger settle/credit idempotency (keyed by cherry_id ?? sub — here user-1).
{
  const { currency, ledger } = fresh();
  currency.credit('user-1', 200, 'seed', 's');
  const placed = ledger.placeTicket({
    asset: 'BTC',
    interval: '15m',
    windowStart: 1,
    side: 'up',
    stake: 10,
    yesAsk: 32,
    noAsk: 71,
    nowMs: 10,
    id: 't1',
  });
  assert(placed.ok, 'place ticket');
  if (!placed.ok) throw new Error('unreachable');
  const first = ledger.resolve('t1', 'up');
  const bal = currency.getBalance('user-1');
  const second = ledger.resolve('t1', 'up');
  assert(!!first && !!second && first.status === 'won' && second.status === 'won', 'resolve won');
  assert(currency.getBalance('user-1') === bal, 'second resolve does not double credit');
  const dup = ledger.placeTicket({
    asset: 'BTC', interval: '15m', windowStart: 1, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 10, id: 't1',
  });
  assert(!dup.ok && dup.reason === 'duplicate', 'duplicate ticket id rejected');
}

{
  const { currency, ledger } = fresh();
  currency.credit('user-1', 200, 'seed', 's');
  ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 2, side: 'down', stake: 25, yesAsk: 32, noAsk: 71, nowMs: 20, id: 't2' });
  ledger.resolve('t2', 'void');
  const mid = currency.getBalance('user-1');
  ledger.resolve('t2', 'void');
  assert(currency.getBalance('user-1') === mid, 'void refund is idempotent');
  assert(mid === 200, 'void restored the 25 stake');
}

// Exposure caps (credit units; E_round = 10 with tight bankroll 600).
{
  const bets = [
    { side: 'up' as const, stake: 10, multiplier: 3.13, status: 'open' },
    { side: 'down' as const, stake: 8, multiplier: 1.41, status: 'open' },
  ];
  const exp = bookExposure(bets);
  assert(Math.abs(exp.exposureUp - 23.3) < 1e-9, `exposure up ${exp.exposureUp}`);
  assert(Math.abs(exp.exposure - 23.3) < 1e-9, 'exposure is max side');
  const reject = checkCaps(bets, { side: 'up', stake: 10, multiplier: 3.13, status: 'open' }, { eRound: 23.3, eAsset: 100 });
  assert(!reject.ok && reject.reason === 'e-round', 'adding more Up breaches E_round');
  const ok = checkCaps([], { side: 'up', stake: 10, multiplier: 2, status: 'open' }, { eRound: 100, eAsset: 200 });
  assert(ok.ok, 'small bet inside cap');
}

{
  const { currency, ledger } = fresh(tight);
  currency.credit('user-1', 400, 'seed', 's');
  // tight E_round=10, first 10cr at 3.13x → exposure 31.3 > 10, so even one 10cr 3.13x bet is rejected
  const big = ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 3, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 30, id: 'cap1' });
  assert(!big.ok && big.reason === 'e-round', `first 10cr 3.13x should hit e-round, got ${JSON.stringify(big)}`);
}

// Use a looser book to accept then reject the second
{
  const kv = memoryKV();
  const currency = createPlayCredits({ kv, storageKey: 't' });
  const loose: RiskConfig = { ...RISK, bankrollCredits: 2000 }; // E_round ≈ 33.3
  const ledger = new GameLedger(currency, 'user-1', { kv, risk: loose });
  currency.credit('user-1', 400, 'seed', 's');
  const first = ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 4, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 40, id: 'a' });
  assert(first.ok, 'first ticket under 31 cap');
  const second = ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 4, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 41, id: 'b' });
  assert(!second.ok && second.reason === 'e-round', 'second ticket breaches E_round');
}

// Feed-stale circuit breaker
{
  const now = 1_000_000;
  const stale = circuitBreaker({ nowMs: now, lastTickMs: now - 5001, last1mLogReturn: null, sigma60m: 0.001, sigma15m: null, medianSigma24h: null });
  assert(stale.reason === 'stale' && stale.haltNew && stale.voidOnSettle, 'stale > 5s halts and voids');
  const freshFeed = circuitBreaker({ nowMs: now, lastTickMs: now - 1000, last1mLogReturn: 0.0001, sigma60m: 0.001, sigma15m: 0.001, medianSigma24h: 0.001 });
  assert(freshFeed.reason === 'ok' && !freshFeed.haltNew && !freshFeed.voidOnSettle, 'fresh feed is ok');
  const spike = circuitBreaker({ nowMs: now, lastTickMs: now, last1mLogReturn: 0.005, sigma60m: 0.001, sigma15m: null, medianSigma24h: null });
  assert(spike.reason === 'vol-spike' && spike.haltNew && !spike.voidOnSettle, '4σ vol spike halts new but does not void');
  const { currency, ledger } = fresh();
  currency.credit('user-1', 200, 'seed', 's');
  // use default RISK (large cap) via a new ledger... tight cap may reject. use default.
}

{
  const kv = memoryKV();
  const currency = createPlayCredits({ kv, storageKey: 't' });
  const ledger = new GameLedger(currency, 'user-1', { kv }); // default caps
  currency.credit('user-1', 200, 'seed', 's');
  const halted = ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 5, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 50, id: 'h', halted: true });
  assert(!halted.ok && halted.reason === 'halted', 'halted breaker rejects new tickets');
  const live = ledger.placeTicket({ asset: 'BTC', interval: '15m', windowStart: 5, side: 'up', stake: 10, yesAsk: 32, noAsk: 71, nowMs: 50, id: 'h2', halted: false });
  assert(live.ok, 'unhalted ticket accepted');
  if (live.ok) ledger.resolve(live.position.id, 'void');
}

// Settlement already covered above; one more: missing prints void, and Up iff C>=K.
// (existing tests)

console.log('credits economy tests: ok');

// ---- v1 fill-out: pair-config completeness (all 9 pairs + hub) ----
{
  assert(Object.keys(LISTINGS).length === 10, 'exactly 10 listings');
  assert(APP_IDS.hub === LISTINGS.hub.appId, 'hub appId matches listings.json');
  for (const a of ASSETS) {
    assert(isAsset(a), `${a} resolves as a pair route`);
    const p = PAIRS[a];
    assert(p.appName === `${a} Up or Down`, `${a} app name`);
    assert(/^[0-9a-f]{64}$/.test(p.pythId), `${a} Pyth feed id is 64 hex chars`);
    assert(p.color.startsWith('#') && p.mockSeed > 0, `${a} has a color and mock seed`);
    assert(APP_IDS[a] === LISTINGS[a].appId, `${a} appId matches listings.json`);
    assert(LISTINGS[a].appName === p.appName, `${a} listing name matches pair config`);
  }
  // Pre-portal: every appId is still a TODO placeholder — no real id invented.
  for (const id of Object.keys(LISTINGS)) {
    assert(isPlaceholder(APP_IDS[id as keyof typeof APP_IDS]), `${id} appId still a TODO placeholder`);
  }
}

// ---- v1 fill-out: Pyth key is read from env only, never committed ----
{
  assert(readPythApiKey({}) === undefined, 'no key without env');
  assert(readPythApiKey({ VITE_PYTH_API_KEY: '   ' }) === undefined, 'blank key is unset');
  assert(readPythApiKey({ VITE_PYTH_API_KEY: '  test-key  ' }) === 'test-key', 'key is trimmed');
}

console.log('pair config + pyth env tests: ok');

// ---- v1 fill-out: server launch-token verify (server/auth.ts) ----
await (async () => {
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  const jwk = await exportJWK(publicKey);
  jwk.kid = 'test-key-1';
  jwk.alg = 'RS256';
  const jwks = { keys: [jwk] };
  const TEST_APP_ID = '11111111-1111-4111-8111-111111111111';

  const baseClaims = {
    iss: 'https://chat.cherry.fun',
    sub: 'wallet-abc',
    app_id: TEST_APP_ID,
    aud: TEST_APP_ID,
    room_id: 'room-1',
    origin: 'https://example.invalid',
    jti: 'test-jti-1',
  };
  const sign = (claims: Record<string, unknown>, expSeconds = 300) =>
    new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256', kid: 'test-key-1' })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + expSeconds)
      .sign(privateKey);

  // Valid token with a cherry_id → keyed by cherry_id.
  const good = await sign({ ...baseClaims, cherry_id: 'cherry-user-7' });
  const u = await verifyCherryUser(good, TEST_APP_ID, { jwks });
  assert(u.userKey === 'cherry-user-7', 'userKey is cherry_id when present');
  assert(u.cherryId === 'cherry-user-7' && u.sub === 'wallet-abc', 'claims carried through');
  assert(u.appId === TEST_APP_ID && u.roomId === 'room-1', 'app + room carried through');

  // No cherry_id → fall back to sub.
  const noId = await sign({ ...baseClaims, jti: 'test-jti-2' });
  const u2 = await verifyCherryUser(noId, TEST_APP_ID, { jwks });
  assert(u2.userKey === 'wallet-abc', 'userKey falls back to sub');
  assert(userKeyFromClaims({ sub: 'wallet-abc' }) === 'wallet-abc', 'userKeyFromClaims fallback');
  assert(
    userKeyFromClaims({ cherry_id: 'c1', sub: 'wallet-abc' }) === 'c1',
    'userKeyFromClaims prefers cherry_id',
  );

  // Bearer-header helper.
  const viaHeader = await requireCherryUser(
    { authorization: `Bearer ${good}` },
    TEST_APP_ID,
    { jwks },
  );
  assert(viaHeader.userKey === 'cherry-user-7', 'requireCherryUser reads Bearer header');
  await requireCherryUser({}, TEST_APP_ID, { jwks }).then(
    () => {
      throw new Error('missing header should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'TOKEN_INVALID', 'missing header → TOKEN_INVALID');
    },
  );

  // Wrong app → rejected. A token carrying `aud` fails on audience first;
  // one without `aud` fails on the app_id claim.
  await verifyCherryUser(good, '22222222-2222-4222-8222-222222222222', { jwks }).then(
    () => {
      throw new Error('wrong appId should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'AUDIENCE_MISMATCH', 'wrong appId (aud present) → AUDIENCE_MISMATCH');
    },
  );
  const { aud: _aud, ...noAudClaims } = baseClaims;
  const noAud = await sign({ ...noAudClaims, jti: 'test-jti-2b' });
  await verifyCherryUser(noAud, '22222222-2222-4222-8222-222222222222', { jwks }).then(
    () => {
      throw new Error('wrong appId should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'APP_ID_MISMATCH', 'wrong appId (no aud) → APP_ID_MISMATCH');
    },
  );
  const expired = await sign({ ...baseClaims, jti: 'test-jti-3' }, -60);
  await verifyCherryUser(expired, TEST_APP_ID, { jwks }).then(
    () => {
      throw new Error('expired token should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'TOKEN_EXPIRED', 'expired → TOKEN_EXPIRED');
    },
  );
  await verifyCherryUser('not-a-jwt', TEST_APP_ID, { jwks }).then(
    () => {
      throw new Error('garbage token should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'TOKEN_INVALID', 'garbage → TOKEN_INVALID');
    },
  );
  const sigParts = good.split('.');
  const tampered =
    sigParts.length === 3
      ? `${sigParts[0]}.${sigParts[1]}.${sigParts[2]!.startsWith('A') ? 'B' : 'A'}${sigParts[2]!.slice(1)}`
      : `${good.slice(0, -2)}AA`;
  await verifyCherryUser(tampered, TEST_APP_ID, { jwks }).then(
    () => {
      throw new Error('tampered token should reject');
    },
    (err: unknown) => {
      assert(
        err instanceof CherryAuthError && err.code === 'SIGNATURE_INVALID',
        'tampered signature → SIGNATURE_INVALID',
      );
    },
  );
  await verifyCherryUser(good, 'TODO_APP_ID_BTC', { jwks }).then(
    () => {
      throw new Error('placeholder appId should reject');
    },
    (err: unknown) => {
      assert(err instanceof CherryAuthError && err.code === 'INVALID_OPTIONS', 'placeholder appId → INVALID_OPTIONS');
    },
  );
})();

console.log('launch-token verify tests: ok');
