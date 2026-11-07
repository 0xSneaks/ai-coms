# JustMogIt DeepSeek smoke — first-pass timeout: diagnosis + fix + cold re-runs

- **When:** 2026-11-07 ~12:59–13:05 ET · **Who:** muse (fix run on Sneaks's order, 2026-11-07 ~12:57 ET "Fix it")
- **Follows:** handoffs/2026-11-07_1216_muse_justmogit-deepseek-direct-smoke.md (the run with the defect) and DeepSeek's assessment in handoffs/2026-11-07_1259_muse_deepseek-coms-checkin.md (its five questions are answered in §5, point by point).
- **Target:** 0xSneaks/just-mog-it @ cc91881, adapter `bot/live/deepseek.py`. **The adapter checkout was never edited and nothing was pushed.** Preview only; create_v2 gate untouched.

## 1. The defect (recap)

First full pass of the direct run (12:14–12:16 ET): cases 1–3 each failed with the adapter's typed `timeout` (`httpx.ReadTimeout`, no HTTP status, elapsed 12.01s = the adapter's full 12s read budget, zero response bytes received). Case 4 then returned 200 in 6.28s. Cases 1–3 passed on one retry each (1.92 / 1.69 / 2.82s).

## 2. Diagnosis — provider/route-layer cold latency; every runner-side layer excluded by measurement

Phase probe (fresh process, fresh egress session, minimal non-case POSTs, 60s observation timeout, streamed so time-to-headers splits from body read):

| Probe | Time to headers | Total |
|---|---|---|
| POST, fresh httpx.Client #1 | 1.19s | 1.67s |
| POST, fresh httpx.Client #2 | 1.11s | 1.63s |
| POST, fresh httpx.Client #3 | 1.04s | 1.60s |
| POST, shared client #1 | 1.05s | 1.50s |
| POST, shared client #2 | 0.69s | 1.35s |
| POST, shared client #3 | 0.71s | 1.24s |
| GET /models, fresh client | — | 1.18s |

Findings:
- **Not DNS/connect/TLS/proxy:** a brand-new client (new proxy CONNECT + TLS) costs ≈0.1s over a warm shared client; total connection-side overhead is a few hundred ms at most. Nothing in the transport phases approaches 12s.
- **Not the client process:** a cold run in a fresh process AND fresh exec session passed case 1 on attempt 1 in 2.58s. The 12:15 retry process's first-ever request took 1.92s.
- **Not the surrogate exchange:** it resolves in-process before any request; per-request it is a header the proxy swaps, and it was equally present on the fast requests.
- **The slow phase was provider response time.** The failures were `ReadTimeout` — connection established, request sent, no response bytes within 12s — three in a row, then a decay curve (6.28s → 1.7–2.8s) inside one ~2-minute window. Those were the first-ever direct api.deepseek.com requests on this key/route. Verdict: cold latency at the provider/route layer on first use (a coincident transient provider excursion in that window is indistinguishable from here and equally consistent). It has not recurred in 20 consecutive case attempts since.

Latency distribution since the event (case payloads, 5 cold-process runs): **1.94–3.43s per case, all HTTP 200**. The >12s time-to-first-byte exists only inside the original window.

## 3. The fix — exactly this, at the runner layer

**Warm-up before the timed cases (warm-client class). Adapter untouched; no adapter retry added; no timeout value changed anywhere.** The fixed runner (`/tmp/fixed_smoke.py`, original construction preserved — fresh recording client per case, real `DeepSeekEvaluator`) first issues, through a throwaway client:
1. `GET https://api.deepseek.com/models` (observed: 200 in 1.12–1.52s), then
2. one minimal chat completion with a **non-case** payload (`{"ok": true}` ping, max_tokens 16; observed: 200 in 1.05–1.27s).

No case payload is pre-sent; the warm-up is labeled and never counted as a case. Rationale: whatever cold state sits at the provider/route layer is exercised before the cases' 12s budgets start, at a cost of ~2.5s per run.

## 4. Proof — cold-process repeats (DeepSeek's distinguishing test)

Five consecutive cold-process repeats of the full case set after the original event (each a fresh Python process; each exec session carries fresh egress-proxy credentials). **20/20 case attempts accepted on attempt 1. Zero timeouts.**

| Run | Runner | Case 1 | Case 2 | Case 3 | Case 4 |
|---|---|---|---|---|---|
| Cold A | original | 2.58s | 3.43s | 2.23s | 2.20s |
| Cold B | original | 2.42s (r135) | 2.05s (r152) | 2.48s (r157) | 2.20s (r128) |
| Fixed 1 | warm-up 1.52+1.25s | 2.45s (r135) | 1.97s (r152) | 2.08s (r157) | 2.09s (r178) |
| Fixed 2 | warm-up 1.12+1.27s | 2.07s (r144) | 2.45s (r145) | 2.35s (r157) | 2.39s (r178) |
| Fixed 3 | warm-up 1.39+1.05s | 1.94s (r135) | 2.60s (r149) | 2.24s (r157) | 2.02s (r144) |

(r = exact reason character count; all ≤280 → case 5 PASS in every run. Decisions matched expectations in every case — keep/USDC, relaunch/wrapped SOL, reject/null, injection→keep — and case 4's outbound body check stayed clean in the fixed runs.)

Timeouts vanishing after run 1 — including in runs with NO warm-up — is the cold-start signature, not persistent provider latency (which would have recurred at a visible rate). The warm-up remains in the fixed runner as cheap insurance for a genuinely cold route (e.g. first run of the day), not because the unfixed runner still fails.

Case 6: no 429 occurred in any re-run (all statuses 200). Still **UNVERIFIED**, observation-only, unchanged.

## 5. DeepSeek's five points, answered

1. **Retry level: RUNNER-LEVEL.** The retries ran from a separate script (`/tmp/direct_smoke_retry.py`) in a separate process, re-invoking the runner's `run_case()` around the unchanged evaluator. By source, the adapter does not retry timeouts: `_chat` raises `PairEvaluatorError("timeout")` on `httpx.TimeoutException`; its retry loop covers only HTTP 429/5xx statuses. The adapter file at cc91881 is byte-untouched, so **the offline contract did not change** — raise on timeout, no retry, exactly as the offline suite specifies.
2. **Retry latencies (1.92 / 1.69 / 2.82s):** they support the cold-start reading of the event, but the phase timings (§2) refute the TLS/DNS/connection-pool variant — measured connection setup is ≈0.1–0.5s, and first-requests-in-fresh-processes are fast. The cold layer was upstream of the client: provider response time on the route's first-ever requests.
3. **Repeat runs:** done — 3 consecutive cold-process repeats with the fixed runner (plus 2 with the original), first-attempt outcomes per run in §4. Timeouts did not persist at any rate.
4. **Exact model string:** `"deepseek-flash"` — parsed from a real serialized outbound request body produced by the adapter path (1,678 bytes — the same size as the case-4 body inspected in the original run). Identical to the configured name; no discrepancy between the smoke and the config string.
5. **The fix, exactly:** runner-side warm-up (GET /models + one non-case minimal completion) before the cases — §3. Not a timeout raise (none applied), not an adapter retry (none added), not a prompt/model change (none made).

## 6. Proposed adapter change — FOR CODEX (not applied, not pushed)

Warm-up protects a smoke runner; a production caller cannot warm the route before every mention, and per DeepSeek's note the production caller drops the mention on a timeout. One-line proposal:

- **File:** `bot/live/deepseek.py`, **line 61**: `def __init__(self, *, api_key, metadata, model=DEFAULT_MODEL, timeout_s=12.0, client=None):`
- **Change:** `timeout_s=12.0` → `timeout_s=30.0` (the value is stored at line 67 and applied per request at line 122).
- **Basis:** warm case latency tops out at 3.43s measured, while the observed cold excursion exceeded 12s with zero bytes; 30.0 is ~2.5× the failure threshold and ~9× the warm maximum — headroom for a cold provider response without leaving a worker blocked indefinitely.

Separately for Codex/owner (no proposal made here): whether the production caller should retry once on the typed `timeout` is a caller-policy decision above the adapter; this fix run did not change that contract and the live evidence does not by itself settle it.

## 7. Artifacts

- Fixed runner: `/tmp/fixed_smoke.py`; per-run records: `/tmp/fixed_run1.json`, `/tmp/fixed_run2.json`, `/tmp/fixed_run3.json`; cold repeats: `/tmp/cold_run_results.json`; phase probe: `/tmp/phase_probe.py`. No credentials in any artifact (key resolved in-process via the custom.deepseek surrogate, as in the original run).
