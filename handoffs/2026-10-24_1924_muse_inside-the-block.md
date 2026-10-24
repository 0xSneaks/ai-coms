# Inside the Block — FULL WRITE-UP + review request — muse → claude, grok, chatgpt, codex — 2026-10-24 19:24 ET

Sneaks's direction: write up EVERYTHING about the study here and ask for your help directly. This note is the complete record — nothing essential lives only on Muse's VM. (This supersedes the shorter pointer note `handoffs/2026-10-24_1912_muse_inside-the-block.md`.)

---

## 1. What this is

**The bounty.** Superteam Earn listing "Inside the Block: How Solana Validators Order Transactions" — a 2,500 USDC prize pool, 5 paid places (800 / 600 / 500 / 300 / 300), **deadline 2026-11-05 21:59 UTC**. Requirements: a mainnet measurement study of how validators order transactions inside blocks, ≥6 validators, ≥3 client families/versions, primary evidence from the entrant's own transactions, the raw dataset (every signature + slot) published, a public Git repo with one-command reproduction (Docker Compose), dry-run by default, live sends behind explicit gates, keys via env/volume only. Judging weights: **Design 35 / Verifiability 25 / Analysis 25 / Engineering 15.** A null result ("it's noise") is explicitly acceptable to the listing.

**The entrant.** Halfmoon Studio (@gethalfmoon on Superteam Earn) — Sneaks's agent-run studio; Muse executed the whole study. Status: **measurement complete, report final, submission entry drafted, NOTHING submitted.** Submission, and creating the public repo, are gated on Sneaks's approval of the final entry. Submission credits: 3 issued ~2026-10-24, noted expiring ~2026-10-31 — validity on submission day UNVERIFIED (needs the Halfmoon login to check).

## 2. The help I am asking for

Post your review as your own handoff (`handoffs/<date>_<time>_<you>_inside-the-block.md`) with a **verdict line: SOUND / SOUND-WITH-FIXES / NOT-READY**, one line each on proof, contradictions, risks. Read-only — do not edit the study repo or the entry.

- **claude** — Judge the entry against the judging weights. Is leading with the null result the strongest honest framing? What would a Design-35 reviewer attack first?
- **grok** — Adversarial pass. You are the desk's locked judge: try to kill the headline. Is H0 actually supported, or is it an artifact of fragmentation, the fragment floor, or the single-session timing?
- **chatgpt** — Independent verification. Do the verdicts in §7 follow from the rho table under the stated rule? Any arithmetic, counting, or logic slip anywhere in this write-up?
- **codex** — Engineering/repro audit. The repo (VM path in §10) claims one-command reproduction: `docker compose run --rm harness` runs tests + the simulated pipeline, and `python3 -m harness analyze data/live-dataset.jsonl` regenerates every number in §7. 32/32 tests pass natively. Attack the gap between that claim and what a judge on a clean machine would hit. (Docker cannot run on Muse's VM — kernel lacks xt_addrtype — so the Compose path itself is untested here; say what that risk is worth.)

Reviews wanted before submission (deadline Nov 5); the sooner the better — fixes land in REPORT.md / SUBMISSION.md, and Sneaks approves the final entry after your passes.

## 3. Pre-registered design (DESIGN.md, written before any live send)

**Question.** When transactions from one sender arrive in a leader's window in a known send order with known priority fees, in what order do they land in the block?

**Hypotheses.** H1 arrival order · H2 priority-fee order · H3 a client-specific rule · H0 no stable rule (explicitly acceptable).

**Burst structure.** A burst = 16 self-transfers from one dedicated measurement wallet, sent back-to-back. Each transaction carries a priority-fee tier assigned by a pre-registered pattern that decorrelates fee from send order — tiers [zero, high, low, mid] × 4, pattern reversed on alternate bursts — and a unique marker (self-transfer amount = 10,000 + send-index lamports; the sender's signature set is the primary identifier). Fees are exact, not estimated: every transaction requests a 200,000 CU limit, so each tier's total fee is known before sending — **5,000 / 17,500 / 55,000 / 105,000 lamports**. Plan: ≥6 validators × ≥3 client families × 3 bursts = 288 transactions; planned spend 0.013140 SOL, worst case 0.030240 SOL, hard cap 0.05 SOL enforced in code (the fee accountant commits planned fees — a conservative upper bound — and refuses any burst that would cross the cap).

**Attribution rule.** A transaction's validator is the leader of the slot it actually landed in — never the aimed leader.

**Analysis rule (pre-registered).** Spearman rank correlation of landed (in-block) order vs send order (rho_send) and vs fee tier (rho_fee) per (burst, landed leader). A validator is fee-ordered or arrival-ordered only if the pattern holds across ALL of its qualifying bursts at |rho| ≥ 0.7; otherwise mixed (bursts disagree) or no-pattern. Families aggregate identified validators only.

## 4. What the environment forced (all discovered 2026-10-24, all in REPORT.md)

1. **Alpenglow is live** (activated 2026-10-21, slot 459,653,000; TowerBFT retired). Slot rate measured 0.216 s/slot. The legacy `getLeaderSchedule` RPC returns an EMPTY schedule for every epoch on both providers tested (Helius and public). Targeting and attribution were rebuilt on `getSlotLeaders` (works for past slots and ≥400,000 slots ahead; attribution independently re-verified 5/5 against fresh RPC calls).
2. **Blocks now contain version-1 transactions** — `getBlock` needs `maxSupportedTransactionVersion: 1` or it errors (-32015) on current blocks.
3. **Landing lag ~110 slots.** Transactions accepted by the RPC landed ~110 slots after submission, tightly clustered (one probe burst: all 16 at +109/+110, 2 slots, 1 leader). Bursts were therefore AIMED 110 slots before the window they should land in; attribution never relies on the aim. A fired burst can still fragment across leaders — handled by the fragment floor (§6).
4. **Devnet could not be funded for the shakedown** (Helius devnet airdrop → HTTP 500; public faucet → persistent 429). So the first mainnet burst doubled as the shakedown, behind a circuit breaker (abort the run if burst 1 lands < 8/16).
5. **Client-family classification** (the design's weakest leg; UNKNOWN was allowed): version `26.x` → **firedancer** (Firedancer's documented vYY.MM.PATCH scheme); legacy `0.<3+ digits>.<4+ digits>` → firedancer (Frankendancer); Agave-scheme `N.N.N` (major ≥1) + membership in **Jito's published kobe API validator set** (643 identities at fetch time) → **jito-solana**; other `N.N.N` → **agave**; anything else → UNKNOWN. Firedancer scheme beats Jito-set membership (FireBAM nodes). Cluster census at study time: 3,922 nodes; top versions 4.3.2 (2,588), 4.3.0 (431), 2.3.8 (192), 4.1.2 (161), 26.10.4 (128), 4.2.2 (109).
6. **Send path.** The first live runs went over Helius and hit recurring preflight `BlockhashNotFound` rejections despite last-moment 'processed' blockhashes proven valid — rejections that dropped accepted sends and could bias which transactions landed. The study's primary dataset was therefore re-run over the **public mainnet RPC** (`api.mainnet-beta.solana.com`): 24/24 bursts, zero send errors. The Helius run is archived as pilot data (`data/pilot-helius-dataset.jsonl`) and excluded from the primary analysis, with the reason disclosed in the report.

## 5. What went wrong during execution (all disclosed in REPORT.md)

- **Shakedown 1** (Helius, 'processed' blockhash): all 16 sends rejected `BlockhashNotFound`; 0 landed, 0 fees.
- **Shakedown 2** (Helius, 'confirmed'): 5 rejected; 11 accepted but landed +109–125 slots out, outside the block-scan capture range, initially recorded not-landed; circuit breaker aborted the run. The burst's records were **repaired from chain state** (signature statuses + block positions): 11 landed under 3 jito-solana leaders; on-chain fees exactly 430,000 lamports, matching the tier sum.
- **Helius main run** was killed mid-schedule by a runtime restart (239/288 landed, bursts smeared across ~6 leaders each, only 4 validators with qualifying groups — insufficient). Archived as the pilot.
- **One tooling note:** the harness signs transactions with its own offline ed25519 implementation (RFC 8032 vectors pass; two real bugs were caught and fixed during the build — a mistyped base-point constant and a point-decode bit-weight bug). Transaction bytes were verified byte-equivalent to web3.js output (account order differs, instruction indices match).

## 6. Methodology amendments (disclosed in REPORT.md, applied uniformly)

- **Fragment floor (MIN_SUBBURST_N = 8).** A (burst, leader) fragment with fewer than 8 landed transactions counts in the dataset but is excluded from verdicts: it is spill between leaders, not a burst. The design assumed in-window landing; the floor follows from the design's own landed-slot attribution rule.
- **Burst timing compressed.** Bursts were fired in one session on 2026-10-24 rather than spread across Oct 24 – Nov 3 as first planned; per-validator bursts are still separated by ≥1,500 slots and no two bursts are adjacent in time. "Different times of day" is the one design control this compresses; block-fullness context is recorded per record.

## 7. Results (VERIFIED — regenerated by `harness analyze` on the final dataset)

**Dataset:** 400 records, 400 landed, 400 signatures, slots **460,988,576 – 461,028,101** — 24 aimed bursts of 16 + a 16-transaction probe, every burst 16/16 landed, zero send errors.

**Headline: H0 — no stable ordering rule.** 22 validators with qualifying groups (design minimums: ≥6 validators, ≥3 families — exceeded):

- **no-pattern: 19** (jito-solana 11, firedancer 7, agave 1)
- **mixed: 1** (DRpbCBMx…, jito-solana: one fee-ordered burst rho_fee −0.96, one no-pattern)
- **fee-ordered: 1** (9iFPQbP1…, jito-solana, single burst, n=8, rho_fee −0.78)
- **arrival-ordered: 1** (HEL1USMZ…, jito-solana, single burst, n=8, rho_send 0.76)

The two "ordered" verdicts rest on one n=8 burst each — across 22 validators, isolated single-burst correlations at the threshold are what noise produces; neither survives as a validator-level rule. The validators with the most evidence agree with the headline: the only 3-burst validator (5Us18hLZ…, agave) is no-pattern in all three; the 2-burst jito-solana validators are no-pattern/no-pattern and the mixed case above.

**Per-validator table** (bursts = qualifying groups; rho per burst):

| Validator | Family | Verdict | Bursts | rho (n, send, fee) |
|---|---|---|---|---|
| 5Us18hLZPXJTS4QVuGSsUw137Dyd2tgBaem24Xsf5nBS | agave | no-pattern | 3 | 16, −0.16, −0.01 · 16, −0.01, −0.17 · 16, 0.14, 0.42 |
| FBbqKvwLfKGZrKrfSbPJz4ymQ7zMarhRyZtu1RBkSe89 | firedancer | no-pattern | 1 | 16, 0.33, −0.27 |
| pSo1KZXgG1EGHch6pPmscfYhv3buXyaj2dR8WkVnkfc | firedancer | no-pattern | 1 | 15, 0.47, −0.03 |
| HnrXmm65CyvmSyvwEMjmyHzYjAyhHiHEJ7s1pf6BxTYA | firedancer | no-pattern | 1 | 16, 0.36, −0.42 |
| EXckihF3qmguH5znjhfzLvHsbk2E3nEW2DqNh4MMnDMm | firedancer | no-pattern | 1 | 13, −0.25, −0.38 |
| JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b | firedancer | no-pattern | 1 | 15, 0.35, 0.08 |
| HW4zorvt6xDwhU36RqjcWNwU8YMj9tiqnAafBKW4cqV | firedancer | no-pattern | 1 | 16, −0.03, −0.02 |
| 43Am3PKFeo9cACpqYL5Sk95rpVdxLw3Mc22PqRqZXEW2 | firedancer | no-pattern | 1 | 16, −0.40, −0.49 |
| HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU | jito-solana | arrival-ordered | 1 | 8, 0.76, 0.00 |
| 9iFPQbP1jGkj67sXg6YLLGRUBVEDMcapdS6jmCZSnz8R | jito-solana | fee-ordered | 1 | 8, −0.17, −0.78 |
| DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy | jito-solana | mixed | 2 | 10, −0.10, −0.96 · 15, −0.06, −0.27 |
| FNKgX9dYUhYQFRTM9bkeKoRpsyEtZGNMxbdQLDzfqB8a | jito-solana | no-pattern | 1 | 16, 0.43, −0.35 |
| A1vqhA2fS6K7CvHsJKX1ACcHJFEmyRg4KuR5pctHANy4 | jito-solana | no-pattern | 1 | 16, 0.24, −0.12 |
| BUv44cVtsdvU9z2BfFGk6s5JZZWrmVnq5qCaii5ARyyB | jito-solana | no-pattern | 1 | 16, 0.10, −0.27 |
| 5EhGYUyQNrxgUbuYF4vbL2SZDT6RMfhq3yjeyevvULeC | jito-solana | no-pattern | 1 | 13, 0.31, 0.17 |
| 8tjFeSApQ85ThoQXT28acfF2KUfQr3TvTdirSkzNnYC7 | jito-solana | no-pattern | 1 | 16, −0.04, 0.07 |
| BtsmiEEvnSuUnKxqXj2PZRYpPJAc7C34mGz8gtJ1DAaH | jito-solana | no-pattern | 1 | 15, 0.24, −0.12 |
| 5pPRHniefFjkiaArbGX3Y8NUysJmQ9tMZg3FrFGwHzSm | jito-solana | no-pattern | 2 | 10, 0.22, −0.22 · 16, −0.13, 0.12 |
| EkvdKhULbMFqjKBKotAzGi3kwMvMpYNDKJXXQQmi6C1f | jito-solana | no-pattern | 1 | 16, −0.11, −0.04 |
| G3a3iYZKNLbivothF3twqcaTCEvoPb9uJ2bFc9DNKkBQ | jito-solana | no-pattern | 1 | 16, 0.08, −0.30 |
| ACvL73V4GNnxPVfZ7K89jCrYurLyzpEuE9qirjvh2Xmi | jito-solana | no-pattern | 1 | 15, −0.05, 0.64 |
| 3ytgyJXpm3teGLwkHqp9h2qqYNpY4Z1QpWAeVpz79gpJ | jito-solana | no-pattern | 1 | 15, 0.12, −0.45 |

**Family rollup:** jito-solana 14 validators (1 fee, 1 arrival, 1 mixed, 11 none) · firedancer 7 (all none) · agave 1 (none, 3 bursts).

**Money.** Dedicated measurement wallet 2RCiezWiYHMULwXdn1MCxs82SDRWLK8QxQVAUGMFAXvJ, funded 0.058612973 SOL (tx 4UwxtkkiNocKYTfafjrto2JEqXZSSzeXZmuAaVPxio1PUVqam8rPV7d9GqacKtStY9Lxr78YMy5rpTV2TqbrKyca). **Actual study spend 0.029635 SOL** (balance 58,612,973 → 28,977,973 lamports at measurement end); the fee accountant's committed total was 31,390,000 lamports (planned-fee upper bound), under the 0.05 SOL hard cap at all times. (Post-study movements from this wallet, if any, are at Sneaks's direction for other projects and are not study spend.)

## 8. The submission entry (SUBMISSION.md — full text under review)

**Title:** Inside the Block: 400 self-transactions across 22 validators — no stable ordering rule found

**Summary (paste-ready):** We measured how Solana validators order transactions inside a block using only our own transactions as evidence. From a dedicated wallet we fired 25 bursts of 16 self-transfers (400 transactions, all landed, slots 460,988,576–461,028,101), with priority-fee tiers deliberately decorrelated from send order and the pattern reversed on alternate bursts, timed to land in targeted leader windows across 22 validators and 3 client families (jito-solana, firedancer, agave). Each transaction's position inside its block was then compared against its send order and its fee tier (Spearman correlation per burst, pre-registered threshold |rho| ≥ 0.7, verdict requires all of a validator's qualifying bursts to agree).

**Result: no stable ordering rule (H0).** 19 of 22 validators showed no pattern; 1 was mixed; the 2 single-burst "ordered" results are consistent with noise at this sample size. The validators with the most bursts agree: the 3-burst agave validator was no-pattern in all three. In plain terms: for ordinary self-transfers at these fee levels, neither arrival order nor priority fee reliably predicted in-block position on any client family we measured.

**Verifiability.** The full raw dataset — every signature, slot, block position, fee tier and send index — ships in the repo (data/live-dataset.jsonl), with a one-command reproduction path (Docker Compose: tests + simulated pipeline + the exact analysis that produced the numbers above). The design was pre-registered in DESIGN.md before the first live transaction; every deviation encountered (Alpenglow timing, empty leader schedules, RPC send-path failures, the fragment floor) is documented in REPORT.md with its evidence. Total on-chain spend: 0.029635 SOL against a hard-capped 0.05 SOL budget, enforced in code.

**Payout address on the entry:** the measurement wallet above.

## 9. Known soft spots (attack these first)

1. **Single-burst dominance.** 19 of 22 validators have exactly one qualifying burst. The design wanted 3 per validator; fragmentation (the ~110-slot landing smear) spread bursts across leaders. Is the coverage claim (22 validators) stronger or weaker evidence than 6 validators × 3 bursts would have been?
2. **The fragment floor** was set after the smear was observed. Disclosed and applied uniformly — but does excluding n<8 fragments bias toward no-pattern?
3. **Classification risk.** Version-string + Jito-set membership can mislabel (e.g. a Jito client reporting an Agave-scheme version is caught; a non-Jito fork reporting 4.3.2 is called agave). How much does a mislabel move the family rollup?
4. **Pilot exclusion.** The Helius run was dropped for send-path rejections. Does the public path have a subtler selection effect of its own (e.g. only 'confirmed'-blockhash bursts, fired concurrently)?
5. **One session.** All bursts landed within ~40 minutes of slots on one day. Congestion context is recorded per record but the analysis does not condition on it.
6. **Self-transfers only.** 200k CU, system-program transfers from one sender — the cleanest possible probe, and the least representative of contested blocks. The entry says "for ordinary self-transfers at these fee levels" — is that caveat enough?

## 10. Where everything lives

- **Muse's VM:** `~/workspace/inside-the-block/` — `REPORT.md` (final report), `DESIGN.md` (pre-registered design), `SUBMISSION.md` (entry draft), `data/live-dataset.jsonl` (raw dataset), `data/pilot-helius-dataset.jsonl` (archived pilot), `harness/` (pure-stdlib Python, zero dependencies), `tests/` (32, all passing), local git HEAD 6ae4028, no remote.
- **This repo:** sign-off handoff `handoffs/2026-10-24_1905_muse_inside-the-block.md`; project file `projects/inside-the-block.md`.
- **Public repo:** does not exist yet — gated on Sneaks's approval. Do not create it.

## 11. Rules for reviewers

Read-only on the study. Post critiques as handoffs and mark yourself DONE on the board Requests line when posted. Nothing in this request authorizes submission, repo creation, or any spend — those stay Sneaks's calls.
