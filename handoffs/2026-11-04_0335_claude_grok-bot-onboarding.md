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

### 3b. Seeker bridge (Sneaks, 03:36 ET: "use the seeker bridge") — owned by team OPS

Known (board, VERIFIED by muse/claude earlier; re-check live):
- MCP server at `seeker.7ohstore.shop` (Cloudflare tunnel), repo `0xSneaks/seeker-bridge` (`server.py`, `connector.md`, `RESTART.md`), 13 MCP tools incl. `agora_ask` and `agora_models` — that's the path into Sneaky AI's models on the Seeker.
- It has flapped before (Cloudflare 530). Restart lives on muse's VM (`~/workspace/seeker-bridge/RESTART.md`) — that's muse's job; send muse a 📨 Request, don't restart it yourself.
- Known first-call-after-idle flake on `android_identity`/rish: retry once before calling it broken.

Do:
1. Read `connector.md` for how a client connects and authenticates. If it needs a token: 📨 Request to muse for how it's issued. The token goes into `~/.secrets/seeker.env` (Sneaks types it, or muse delivers it out-of-band — never via the board or chat).
2. Add the bridge as an MCP server in Grok Bot. Run `agora_models` and one `agora_ask` on a working model. Record the tool list + latency. That plus 3c is your route to Sneaky AI; the web `/api/proxy` route above is the fallback.
3. ⚠️ The bridge drives Sneaks's actual phone with shell access (uid 2000). **Read-only and `agora_*` calls only by default.** Any tool that taps, installs, changes settings, or opens a wallet/trading/banking app = HIGH-RISK, Sneaks's yes first.
4. Coordinate with muse: muse already drives the bridge. Don't both drive the phone UI at once — claim the bridge on the board before any UI automation.
5. Sneaks wants the bridge to stop depending on Termux long-term. Note anything you find that helps, don't rebuild it.

### 3c. OpenCode (Sneaks, 03:36 ET: "connect to open.code") — owned by team OPS

Known: Sneaks has an **OpenCode Go** subscription. API base `https://opencode.ai/zen/go/v1` (model list at `/models`); requires a per-conversation `x-opencode-session` header. muse runs the CLI `opencode-ai` 1.19.3 on its VM; `opencode run` has hung there before (undiagnosed) and free models share a rate-limited quota. Board agent `opencode` = the `opencode-delegate` GitHub workflow (orders starting `@opencode`, cap 20/day).

Do:
1. Install the CLI in Termux: `npm i -g opencode-ai`. Termux support is UNKNOWN; if it fails, use the HTTP API directly with `curl`.
2. Key: Sneaks types his OpenCode Go key into `~/.secrets/opencode.env` (`OPENCODE_GO_KEY=...`, chmod 600). It goes in your batched ask. Never echo it.
3. Prove it: `opencode models` (or `GET /models`), then one short `opencode run` (or one chat call with the session header) with a 60 s timeout. Record which models answer and the latency.
4. Build `~/sneaks/bin/oc "<prompt>" [model]`. Team members may use it as extra hands for drafts, tests and second opinions — same rules as the team section: OpenCode models never modify signing, wallet, ledger or auth code unreviewed, and free lanes get throwaway prompts only.
5. Check `opencode-delegate` quota before routing work there; don't burn Sneaks's cap.

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

## 6. Your bot teams — REQUIRED (Sneaks, 03:33 ET: "set up a multi-team bot team")

You are the **commander**. Stand up **three teams**, each with a lead and members, all reporting to you. Do this right after section 2 (env), so the teams run sections 3–5 in parallel instead of you doing them one by one.

Name agents `grok-bot/<team>-<role>` in claims, branches and handoffs. Define every agent in `~/sneaks/teams/<team>/<role>.md` (mission, inputs, the one place it writes, what it must never touch, its done-check). Keep a `~/sneaks/teams/ROSTER.md` listing every live agent, so the teams survive sessions.

| Team | Lead | Members | Owns | Writes to |
|---|---|---|---|---|
| **MOG** — Just Mog It bot | `mog-lead` | `builder`, `tester`, `auditor` | section 5 | JustMogIt branch `grok/mogit-bot` (builder); tests + report (tester); PR review comment only (auditor) |
| **INTEL** — catch-up + live X | `intel-lead` | `scout`, `reader` | section 4 + narrative scout | `JustMogIt/packs/drafts/` (scout); the catch-up summary (reader) |
| **OPS** — environment, Seeker bridge, OpenCode, Sneaky AI link | `ops-lead` | `infra`, `coms` | sections 2–3c + board hygiene | `~/sneaks/` + 0x-sneaky-alpha branch (infra); `ai-coms` only (coms) |

**How the teams run**
- **Commander loop:** give each lead a written mission → leads split it to members → members return a report with proof → the lead checks it → you merge it into **one** sign-off and **one** batched ask to Sneaks.
- **One owner per file.** No two agents edit the same file or branch. Hand-offs between teams go through the lead, never member-to-member edits.
- **Builder ≠ auditor, always.** The auditor reviews without seeing the builder's reasoning, checking against SKILL.md and the 4 gates. Money and security paths go builder → tester → auditor → claude-code review.
- **Model fit:** fast or cheap models may scout, draft and test. They never modify signing, wallet, ledger or auth code without review.
- **Every agent inherits** section 0 + the hard stops. None of them holds keys or can pass a HIGH-RISK gate.
- **Scale rule:** spawn an extra member only when it saves real time. Kill idle agents. Max 3 members per team unless Sneaks says otherwise.
- **Proof the teams exist:** `ROSTER.md` + each team's `.md` files + one report per team in your sign-off (what it did, proof, what's next).

## Hard stops (⚠️ HIGH-RISK — Sneaks's explicit yes, every time)

Wallets, private keys, signing, any broadcast/launch, spending, public posts, production deploys, auth changes, destructive git. You never hold launch-wallet keys; muse's vault path signs, and only after Sneaks types `LAUNCH`.

## Done =

- `~/sneaks/GROK.md` + `coms` script + timer exist (show `ls` + `crontab -l`)
- Seeker bridge connected (`agora_models` + one `agora_ask` shown) or exact blocker
- `oc` command works against OpenCode Go (model list + one reply shown)
- `sneaky` command works, or a PR for the missing route
- catch-up summary posted
- JustMogIt bot: surface decided, claim on board, branch/PR with gates + mock tests passing (show output), review request to claude-code
- 3 teams live: `teams/ROSTER.md` + role files + one report per team
- one batched ask to Sneaks (only what truly needs him)
- sign off: handoff + board line + release claim. End with `Coms: signed off → <file>`.
