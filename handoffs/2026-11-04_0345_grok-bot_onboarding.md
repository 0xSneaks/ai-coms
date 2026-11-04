# Handoff — grok-bot (commander) — onboarding — 2026-11-04 03:45 ET
Order: [claude onboarding note](2026-11-04_0335_claude_grok-bot-onboarding.md) + Sneaks override (3 teams). Lane: speed + live X. No DA CITY work.

## Tools proven (§1)
| Tool | Result |
|---|---|
| Shell | VERIFIED Linux x86_64 box (Grok Bot VM), python3, node, jq, gh (unauthed). **Not Termux** — `pkg`, crond, termux-notification UNKNOWN/absent here |
| GitHub MCP | VERIFIED read + push (this commit, JustMogIt branch) |
| Live X | VERIFIED (X news search, 24 h) |
| Web/RPC | VERIFIED (Solana mainnet RPC read-only, Vercel route probe) |
| Scheduled runs | UNKNOWN for me directly; parent can create a 4 h app routine (INTENT) |

## Team reports
### OPS (infra lead, coms)
- VERIFIED box home `/home/box/sneaks/{bin,repos,scratch,logs,scripts,teams}` + `GROK.md` (RULE v2 short + LYRA PRIME GOLD + LG efficiency + lane + hard stops). Termux mirror path `~/sneaks/` — needs Sneaks's phone to install.
- VERIFIED `bin/coms` runs (pull + `coms_check.py --inbox grok-bot`, notification if OPEN to grok-bot). Timer: cron line + app-routine text in GROK.md; not installed yet → ROLLCALL timer column stays "pending".
- Sneaky AI: VERIFIED programmatic route exists: `POST https://0x-sneaky-alpha.vercel.app/api/proxy/chat/completions` (+ `GET /api/proxy/models` 200), forwards Authorization (user's own OpenCode key) + `x-opencode-session`. Probe without key → 401 "Go requires a credential" in 0.25 s. `bin/sneaky "<prompt>" [model]` built; end-to-end answer + latency UNVERIFIED until `OPENCODE_API_KEY` is typed by Sneaks into `~/.secrets/opencode.env`. No new route/PR needed.
### MOG (builder lead, tester, auditor)
- Claimed + built on `0xSneaks/JustMogIt` branch `grok-bot/bot-core` (commits cceac1f, d32065b, 34f3fd7). Draft PR form opened for Sneaks to submit (UNVERIFIED as created).
- Gate 1 ledger file cap ($30), missing ledger = refuse, commit only after success · Gate 2 simulate + cost on confirm card · Gate 3 raw-byte guard pinned from real SA + TREMP create txs (mainnet RPC read 2026-11-04): program `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`, disc `8c55d7b06636684f`, 16 accounts, launch wallet `2LYQUArYnaYR2YTePK99mUiYU5mFXn1qZqe5b3xGsvHt`, fixed idx 0,1,2,4,9–15 · Gate 4 tests mock-only (socket blocked).
- VERIFIED `python3 -m unittest discover -s tests` → **Ran 16 tests OK**. Tester broke the guard once (IndexError on malformed tx escaped as non-GuardError) → fixed.
- Auditor: independent review NOT done yet (needs a separate session on diff + SKILL.md only). Then claude-code review (request below).
- Not wired: surface, Mogz adapter, vault `execution.sign_mogz`, real ledger (muse holds), image verifier. Nothing can sign/send.
### INTEL (scout lead, reader)
- Catch-up (reader): DA CITY Fri 11/06 gate RED, roles set — not mine. PRIORITIES: ATH, REAL OR BS, MusePad. muse holds anonpad SPEED ORDER (Wed sims 12:00/16:00). claude-code holds sneaky-alpha `sync/agora-2.2.0` + gta6 Tripo (BLOCKED 0 credits, spend ON HOLD). Model bench: default claude-haiku-5-5. 2026-11-01 "get grok online or replace": **grok-bot is the answer** — scheduled, can push; standing crew once the 4 h routine is installed. Cherry-miner rig = muse + claude-code read-only; not mine. 26 stale `→ all` lines in my inbox are already answered by others; no action from me.
- Scout (live X, last 24 h): top narratives = $AMD/pump.fun insider-promo backlash, $ANSEM -90%, Bubblemaps "bundling" forgery fight, SOL < $100 / "post office" fee debate. **No drafts written**: most involve real people/tragedy (one is memecoins on a footballer's death — hard no). Candidate safe themes (not packs): "Post Office Chain", "Unbundled". Sneaks yes needed before any pack.

## Decided
- Interim surface = transport-agnostic core + CLI; real surface waits on Sneaks (recommend Telegram).
## Next (exact first step)
1. Sneaks: batch ask (surface, OPENCODE key, Termux install, PR submit). 2. grok-bot/auditor reviews PR diff blind. 3. claude-code reviews.
## Don't
- Don't wire signing/vault or use real ledger without claude-code review + Sneaks yes. No DA CITY. No GLM.

Coms: signed off → handoffs/2026-11-04_0345_grok-bot_onboarding.md
