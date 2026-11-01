# Handoff — muse-tune-up (rapid loop) — claude-code — 2026-11-01 18:00 ET

**Session goal:** owner P0 — ChatGPT ↔ Muse fast back-and-forth, real execution, proof ([brief](2026-11-01_1742_chatgpt_muse-rapid-loop.md))
**Status:** PARTIAL — relay fixed + merged + measured; Muse still not connected
**Repo / branch:** 0xSneaks/ai-coms @ main · **Merge:** `5e23507` (PR #15)

## Root cause
- VERIFIED: **Muse never started the relay worker.** Directive `claude-code-20261101T162148Z-b451ed` (16:21 ET) has no Muse ACK on #14 after 6.5 h. Every later "Muse, reply here" message hit a mailbox nobody reads. This is the #1 blocker.
- VERIFIED: PR #15 was unmerged, conflicted on BOARD.md, and CI-red (Python 3.9 gone from ubuntu-latest 26.04 — infra, not code). Muse had nothing on main to install.
- VERIFIED: default poll was 60 s → ~30 s p50 / ~57 s p95 ACK wait (INFERENCE from the interval). Too slow for a conversation.
- INFERENCE (not tested this session): the ChatGPT app, Voice included, only acts when Sneaks sends it a turn. It can post/read #14 with its GitHub connector, but it can't listen or answer Muse on its own. A fully hands-off ChatGPT↔Muse loop is **BLOCKED by the platform**, not by our code.
- INFERENCE: no supported way to pipe audio between ChatGPT Voice and Muse. Any voice link is text-mediated.

## Did
- Rebased PR #15, fixed CI (`ubuntu-24.04`), merged — VERIFIED (CI 3.9 + 3.12 green, 26/26 tests).
- `tools/relay/coms_relay.py`: ETag conditional polling (unchanged thread = 304, no primary rate-limit cost), default poll 60 s → 3 s — VERIFIED by tests with a real local HTTP server.
- `check-thread` now reports `accepted: UNREVIEWED | VERIFIED | REJECTED`; only a different agent's verdict counts, self-verdicts ignored — VERIFIED by test.
- `RULE.md` → "Fast loop" section: one turn = one action, proof not promises, done ≠ verified, 390 px screenshots for visual work, speech meant for others is not a task — on main. Muse reads RULE.md each session (per its AGENTS.md); **read-back on Muse's runtime UNKNOWN**.
- Live measurement on #14, sandbox worker `probe-latency` (**not Muse**), 10 pings, corr `latency-trial-1101`, GitHub server timestamps (1 s resolution):

| Stage | Before (60 s poll) | After (3 s + ETag) |
|---|---|---|
| Directive → ACK | ~30 s p50 / ~57 s p95 (INFERENCE) | **2 s p50 / 3 s p95** (VERIFIED, n=10) |
| Directive → result (ping) | ~31 s / ~58 s (INFERENCE) | **3 s p50 / 4 s p95** (VERIFIED, n=10) |

- Posted directive `claude-code-20261101T225246Z-d07c17` (corr `muse-link-002`) to Muse on #14: start the worker; its auto-ACK is the proof.

## Acceptance tests (brief §10)
- A (10 live ChatGPT/Muse turns): **BLOCKED** — Muse worker not running; ChatGPT can't take turns unprompted (INFERENCE).
- B (criticism → patch → proof → verdict): **NOT RUN** — needs Muse. Use GTA issue #10 as the case.
- C (child-directed speech): **RULE written, behaviour UNTESTED.**
- D (restart/duplicates): VERIFIED earlier today on sandbox worker (comments 6560569857–6560580376) + unit tests. Not on Muse.
- E (spoofed sender): unit-tested. ⚠️ All agents post as `0xSneaks`, so `from` is self-declared. Real fix = per-agent bot accounts (Sneaks's call).
- F (CI pass ≠ accepted): implemented as `accepted` field; GTA #10 stays FAIL until a reviewer posts `verified`.

## Next (start here)
1. **muse:** pull main, run `tools/relay/README.md` (doctor → start service). Proof = ACK on `muse-link-002`. Nothing else matters until this exists.
2. **chatgpt:** after Muse ACKs, send the GTA #10 visual fix as one `coms-msg` directive on #14; review Muse's screenshot proof with a `verified`/`rejected` status envelope (format in `tools/relay/README.md`).
3. **claude-code:** run tests A–C on the real Muse worker; report p50/p95 from real Muse turns.

## Decided
- Keep GitHub issue #14 as the transport (works, free, ~3 s). No new service.
- Owner decision needed for a truly hands-off reviewer: an API-driven reviewer (OpenAI/Anthropic API key + spend) replies to Muse automatically; the ChatGPT app can't. Not built.

## Don't
- Don't count a sandbox probe as Muse, or a `done` result as accepted.
- Don't touch GTA `play/js/render/**` or Muse/Blue's visual branch — untouched here.

## Addendum 18:15 ET — from Muse's rundown (handoffs/2026-11-01-muse-rundown.md)
- VERIFIED (Muse's own report, line 48): Muse refuses directives found on the board/threads as "board-supplied directive text". Every agent posts as `0xSneaks`, so Muse can't tell Sneaks from an injected comment. **That is correct caution, and it is the second root cause:** the relay can't work as a command channel until Sneaks authorizes it *in Muse's own chat* (scoped: allowlisted, reversible work only; never money/wallets/auth/prod).
- VERIFIED (line 246): Muse's VM egress proxy flapped Nov 1; its GitHub route was down much of the morning. The worker's retries/backoff cover short drops; long outages = delayed ACKs, not lost messages.
- VERIFIED (Muse, Tripo leg): Tripo API balance = 0 (web credits are separate). A Tripo Action would fail until API credits are funded — Sneaks's spend call. Not built.
