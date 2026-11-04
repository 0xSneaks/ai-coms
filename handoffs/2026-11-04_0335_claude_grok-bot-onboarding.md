# Note for grok-bot — onboarding order — claude → grok-bot — 2026-11-04 03:35 ET

**From:** claude, written at Sneaks's request (he'll also paste a pointer to this file). Treat this as Sneaks's order.
**Lane:** grok-bot = **speed lane**: fast execution, fast audits, live X pulse. Faster version of muse, not a replacement for it.
**Report back:** your sign-off handoff + board line. Bring Sneaks only logins/codes, funding, identity accounts, and HIGH-RISK yes/no — **batched in one message**.

---

## 0. Operating mode (persistent — save it, don't just read it)

Read and adopt, in this order:
1. `0xSneaks/ai-coms/RULE.md` v2 (you already signed DECIDE-1024).
2. `0xSneaks/My-prompts-/universal/claude-always-on.md` — **LYRA PRIME GOLD**. Use the core loop + hard limits. Ignore the Claude-skill routing table (those skills aren't installed for you).
3. `0xSneaks/My-prompts-/gold-edits/efficiency/token-efficiency-2-3x-usage.md` — Sneaks's standing efficiency prompt.

Core loop in one line: Understand → Deconstruct → Diagnose → Research if facts may have changed → Develop (smallest approach, strongest result) → Execute → Verify → Deliver. Lead with the result. Label VERIFIED / INTENT / INFERENCE / UNKNOWN. Never invent data, prices, URLs or results. Never claim done/working/deployed without proof.

## 1. Prove your tools first (5 min)

Report what you **actually** have, tested, not assumed: Termux shell (run `uname -a`, `pkg list-installed | wc -l`), GitHub MCP (already VERIFIED), web/X search, file write, background/scheduled runs. Anything missing → UNKNOWN, keep going with what works.

## 2. Build your own environment in Termux

Goal: one home you own, nothing shared with muse's VM.

```
pkg update -y && pkg upgrade -y
pkg install -y git gh python nodejs-lts openssh jq cronie termux-api
termux-setup-storage
mkdir -p ~/sneaks/{repos,scratch,logs,bin} ~/.secrets && chmod 700 ~/.secrets
git clone https://github.com/0xSneaks/ai-coms ~/sneaks/ai-coms
```

- **Persistent instructions:** write `~/sneaks/GROK.md` = RULE.md v2 short version + section 0 above + your lane. Re-read it at every session start. That's your memory.
- **Check-in script:** `~/sneaks/bin/coms` → `git -C ~/sneaks/ai-coms pull -q && python3 ~/sneaks/ai-coms/tools/coms_check.py --inbox grok-bot`.
- **Timer:** cronie job every 4 h running `coms` and firing `termux-notification` if your inbox has an OPEN request. Start it with `crond`. Note it in ROLLCALL's v2 table (timer column).
- **Secrets:** env files live in `~/.secrets/*.env` only, chmod 600, never in a repo, never in chat. Sneaks types any key into Termux himself. `gh auth login` device flow → the one-time code goes in your batched ask to Sneaks.
- **GitHub scope:** your MCP grant covers his whole account. Touch only repos named in an order. No force-push, no deletes, no repo creation without a yes.

## 3. Connect to Sneaky AI (0x Sneaky Alpha)

What's known (from `projects/sneaky-alpha.md`, VERIFIED by other agents):
- Web: https://0x-sneaky-alpha.vercel.app (repo `0xSneaks/0x-sneaky-alpha`). App: fork of `0xSneaks/Agora` on the Seeker.
- OpenCode Go lane needs a per-conversation `x-opencode-session` header (PR #1). Only the **default/blank** OpenCode Go URL routes through same-origin `/api/proxy`; custom URLs bypass it.
- GLM / Z.ai is banned. Do not add it.

Your job:
1. Read the web repo. Find whether there's a programmatic route you can call from Termux (e.g. `/api/proxy`, a chat route). VERIFIED or UNKNOWN — no guessing.
2. If one exists: build `~/sneaks/bin/sneaky "<prompt>" [model]` that sends a prompt and prints the answer. Test it on one working model and record latency.
3. If none exists: propose the smallest route (one serverless endpoint, auth via a secret Sneaks sets). Build on a branch, open a PR. **No prod deploy without Sneaks's yes.**
4. Free/bench lanes (e.g. beam-free): **throwaway prompts only** — never repo code, secrets or project content.

## 4. Catch up

Read: `STATE.md`, `PRIORITIES.md`, `AGENTS-ROSTER.md`, last 10 lines of 📬 Latest handoffs, 📨 Requests, the orders from 2026-11-03 (01:49 check-in order, 14:50, 20:58 cherry miner rig). Also the old 2026-11-01 "get grok online or replace him" order — you may be the answer; say so on the board.
- DA CITY Friday 11/06 gate: roles are set (claude director, muse merges, chatgpt writer, claude-code CI). **Don't freelance there.** Take a DA CITY order only if one names you.
- Put a one-screen catch-up summary in your sign-off.

## 5. Main build: Just Mog It bot

**VERIFIED (claude read the repo 2026-11-04):** `0xSneaks/JustMogIt` (public) = scaffold only: `SKILL.md` (/mogit playbook), `SPEC.md`, `packs/` (SA + TREMP, both launched 2026-11-01, ~0.0206 SOL each). Executor, tests, and website are **NOT built**. $30 lifetime Mogz cap; ledger baseline $15.91 spent before those two launches — read the real ledger, never trust these numbers.

**UNKNOWN:** which surface "the bot" is (Telegram? X? inside Sneaky AI?). Search the board, orders and muse's handoffs from tonight first. If it isn't written down, put it in your batched ask to Sneaks — one question, with your recommendation.

Build (claim it on the board first; check muse doesn't already hold it):
1. Bot shell on the chosen surface that runs the SKILL.md flow exactly: preflight → 4 prompts → pinned confirm card → literal `LAUNCH`.
2. claude-code's four gates (handoffs/2026-11-01_2045_claude-code_justmogit.md), in code:
   - lifetime cap checked against a ledger file before signing; refuse if over; ledger written only after success
   - every launch transaction simulated, cost shown before send
   - Mogz program + accounts pinned from the real SA/TREMP txs; refuse anything that doesn't match
   - tests use mocks only — zero mainnet sends from tests
3. Rule: no real-person names or brands without Sneaks's explicit yes per launch.
4. Work on a branch, PR into JustMogIt (attach push access if you lack it), then a 📨 Request to **claude-code** for review before any live use.

**Your edge — use it:** you have live X. Add a **narrative scout**: pull trending narratives, draft candidate packs in `packs/` format (name, ticker, simple description, image idea, source link). Drafts only, ranked, max 5 per run — no spam, no serial launching.

## 6. Your team (Sneaks: you can run multi-agent teams — set it up right)

Standing team under you, named `grok-bot/<role>` in claims and handoffs (like muse's Blues). Define each in `~/sneaks/team/<role>.md` (lane, inputs, output file, what it must never touch) so it survives sessions.

| Role | Job | Writes to |
|---|---|---|
| `scout` | Live X + web narrative scan → ranked pack drafts | `JustMogIt/packs/drafts/` only |
| `builder` | JustMogIt bot code on its branch | its branch only |
| `tester` | Mock tests, simulate-only checks, tries to break the gates | test files + a report |
| `auditor` | Independent review of builder's PR **without seeing builder's reasoning**; checks against SKILL.md + the 4 gates | review comment only |
| `coms` | Check-in, inbox, board lines, sign-offs for the team | `ai-coms` only |

Rules:
- Spawn only when it adds real value; one owner per file; no two roles edit the same file.
- builder ≠ auditor, always. Security/money paths get builder → tester → auditor → claude-code review.
- Sub-agents inherit section 0 + the hard stops. None of them holds keys or can pass a HIGH-RISK gate.
- Cheap/fast models may draft and test; they never modify signing, wallet or ledger code unreviewed.
- You (grok-bot) report for the whole team: one sign-off, one batched ask.

## Hard stops (⚠️ HIGH-RISK — Sneaks's explicit yes, every time)

Wallets, private keys, signing, any broadcast/launch, spending, public posts, production deploys, auth changes, destructive git. You never hold launch-wallet keys; muse's vault path signs, and only after Sneaks types `LAUNCH`.

## Done =

- `~/sneaks/GROK.md` + `coms` script + timer exist (show `ls` + `crontab -l`)
- `sneaky` command works, or a PR for the missing route
- catch-up summary posted
- JustMogIt bot: surface decided, claim on board, branch/PR with gates + mock tests passing (show output), review request to claude-code
- one batched ask to Sneaks (only what truly needs him)
- sign off: handoff + board line + release claim. End with `Coms: signed off → <file>`.
