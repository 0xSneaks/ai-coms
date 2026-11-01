# Handoff — ai-coms (ChatGPT ↔ Muse link) — claude-code — 2026-11-01 11:21 ET

**Session goal:** Sneaks (priority task, ChatGPT directing): a reliable, persistent ChatGPT ↔ Muse channel without Sneaks relaying.
**Status:** PARTIAL — relay built + tested live with a sandbox test worker; **ChatGPT ↔ Muse handshake NOT verified** (Muse has not installed the worker).
**Repo / branch:** 0xSneaks/ai-coms @ `claude/ai-coms-muse-link` (PR, not main)

## Did
- `tools/relay/coms_relay.py` — GitHub-issue mailbox worker, stdlib Python: structured `coms-msg` envelope (id, from, to, ts, project, type, corr, status, ref), SQLite state, ACK separate from outcome, at-most-once execution, bounded retry (2^n s ≤ 300 s, 6 tries → `dead`), lost-response reconciliation, single-instance lock, `doctor` (access diagnosis, never prints tokens), `check-thread` audit, allowlisted read-only task kinds + sub-agent dispatch by fixed argv (args on stdin, no shell). VERIFIED (tests).
- `tools/relay/test_coms_relay.py` — 23 tests incl. TEST A–F, retry, restart, duplicates, injection, path traversal, symlink escape. VERIFIED: `python3 -W error::ResourceWarning -m unittest discover -s tools/relay` → OK.
- `tools/relay/README.md` (setup, protocol, ChatGPT send/read template, security assessment, MCP finding, owner steps), `relay.example.json`, `coms-relay.service`, `.github/workflows/relay-tests.yml` (py 3.9 + 3.12).
- Live run on [issue #14](https://github.com/0xSneaks/ai-coms/issues/14), comments 6560561723 → 6560580376, corr `live-relay-test-1`.
- Posted first directive to Muse's worker: `claude-code-20261101T162148Z-b451ed` (comment 6560599672, corr `muse-link-001`).

## State + proof
| Test | Result | Evidence |
|---|---|---|
| A ChatGPT→Muse msg + ACK | **UNVERIFIED** (Muse/ChatGPT not run). Sandbox probe: PASS | probe ACK 6560567080 for 6560561723 |
| B Muse status → ChatGPT | **UNVERIFIED** live. Unit PASS | `test_B_…` |
| C read-only sub-agent | Probe PASS: separate process (pid 465), `git_blob_sha` 7c9a2b0f… = `git rev-parse HEAD:README.md` | result 6560568812 |
| D restart | Probe PASS: worker killed 16:19:39Z, msg posted 16:19:48Z, fresh process picked it up once | 6560576577 → ACK 6560579791, result 6560580376 |
| E duplicate | Probe PASS: same id redelivered → duplicate-ACK only, no re-run | 6560569857 → 6560579327 |
| F bad auth / untrusted | Unit PASS. **Live INVALID here**: sandbox proxy injects real GitHub creds, so a bad token still authenticates. Must run on Muse VM | `test_F_*` |
| G latency | Probe, 5 s poll: detect 1 s / 5 s / 7 s (7 s incl. worker downtime); issue read 283–321 ms | probe DB + `doctor` |
- `check-thread --corr live-relay-test-1` → 3/3 PASS (exit 0).
- Probe replies were posted **by claude-code via the GitHub tool, verbatim from the probe's outbox** (probe had no write token). On Muse's VM the worker posts itself via `gh auth token`.
- Muse GitHub access: Muse merged gta6ismogged PRs + pushed ai-coms `62d9e2a` ~10:17 ET today → VM gh write worked then (VERIFIED from commits). INFERENCE: #14 went unanswered because nothing on Muse's side watches issue comments (her cron reads BOARD inbox every 4 h), not broken auth. UNKNOWN until Muse runs `doctor`.
- Secrets: none written; token-pattern scan of tools/relay clean.

## Decided
- GitHub issue relay is the channel; Muse's VM worker is the only persistent listener — claude-code (decider). No new VPS, no paid service.
- Direct MCP: **PARK**. OpenAI help center: MCP write actions = Business/Enterprise/Edu beta; Plus/Pro read-only. ChatGPT's GitHub connector already writes comments, so MCP adds no capability now.
- Only read-only kinds auto-run. Everything else → `proposed`, Muse resolves; merges/deploys/money never via relay.
- ⚠️ All agents post as `0xSneaks`, so GitHub can't prove sender. Fix = per-agent bot accounts + `sender_logins` — Sneaks's call (auth change).

## Next (start here)
1. Sneaks merges the PR.
2. Muse: `git pull` → `python3 tools/relay/coms_relay.py doctor` → post output to #14 → config + cron/systemd per `tools/relay/README.md` → worker ACKs `claude-code-20261101T162148Z-b451ed`.
3. Muse: `COMS_RELAY_TOKEN=bad python3 tools/relay/coms_relay.py doctor` → expect FAIL (live TEST F); kill + restart worker (live TEST D on VM).
4. ChatGPT: post a `ping` directive to `muse` (template in README), then in a later turn quote Muse's ACK `id` + `ref`. Only then: "connected".
5. Anyone: `check-thread --corr <corr>` → PASS.

## Don't
- Don't say ChatGPT and Muse are connected until step 4 is on #14.
- Don't run a bad-token test from a claude-code cloud sandbox (proxy re-authenticates).
- Don't delete the worker's SQLite DB (it would re-ACK old messages).
- Don't add write/merge/deploy kinds to `dispatch`.

## ⚠️ High-risk
- Per-agent GitHub identities (auth change) need Sneaks's yes.
