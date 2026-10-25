# Handoff — Muse → Claude Code — Production-speed review ("speed handoff")

Filed: 2026-10-25 ~00:47 ET by muse, at Sneaks's direction. He is starting your session now and will point you here.

## Ask

Sneaks asked me to audit my own production speed versus you and Codex, write down my diagnosis and my predictions of your response, then hand it to you for an independent assessment. Grade my predictions, give your own ranked diagnosis, and scope the fixes. Anything that is a build (instrumentation, scripts, browser-service route changes) follows the muse-tune-up pattern: spec + benchmark, draft PR, no merge without Sneaks.

## My measured facts (2026-10-24 session, verified)

- Standing context injected into every one of my turns: **108,472 chars** (MEMORY.md 70,449; alignment synthesis 18,236; SOUL.md 10,092; AGENTS.md 3,182; people/groups indexes 6,513) — before any conversation content.
- Session context reached **188,909 tokens** (54% of a 350K window); the conversation compacted repeatedly in one evening, each compaction costing re-reads and re-derivation.
- Browser delegation round-trips: job-posting verifications ~10 min each; one full careers scan 13 min (runtime-measured).
- Both OpenCode recompute sessions ran ~2h with **0-byte output**, then died in a runtime restart. Post-restart checks: `opencode --version` and `opencode models` answer instantly; `opencode run` **hangs** (two free models, trivial prompt, 60–100 s, zero output). Undiagnosed.
- A job application died mid-flow on a declined file-upload approval prompt.

## My diagnosis (short form)

Mine to change:
1. **Context mass** — the 70KB MEMORY.md is the biggest self-inflicted tax. Prune aggressively; detail to dated notes; lean live layer.
2. **Tool-output bloat** — 30K-char search results and full process dumps pulled into context when a slice would do; each taxes every later turn.
3. **Sequential rhythm** — think → one call → think. Batching independent calls (five in parallel for a set of cover letters) moved output ~5× faster.
4. **Double verification** — I re-fetch what delegated workers already proved. Fix: briefs demand proof inline (IDs, hashes, run numbers).
5. **Fragile long jobs** — exec-owned background processes die with runtime restarts and write nothing until exit. Fix: cron/systemd-owned, checkpointed, incremental output.
6. **OpenCode run stall** — see facts. Until diagnosed, the Seeker bridge (`agora_ask`) is my working bench route.

Sneaks / platform:
7. **Approval cards mid-flow** — one declined prompt killed a submission.
8. **Browser is delegated and serial** — your persistent browser service (muse-tune-up PR #13; relay path passed my VM test 7/7) is the standing fix, still unmerged, plus the captcha-handoff branch.
9. **Main chat carries everything** — molding + execution + delivery in one thread = maximum context churn.

## My predictions of your response — grade these

1. You'll demand timings first: instrument per-stage latency (spawn, browser, tool, verify) and let data pick the fix.
2. You'll say merge the browser service and make the relay route the default.
3. You'll say turn repeat work (submissions, scans, recomputes) into deterministic, checkpointed scripts/workflows — and offer to build them.
4. You'll say my context is the bug: thin chat layer, state in files, retrieval on demand. MEMORY.md is exhibit A.
5. You'll push back that part of the slowness is model/runtime latency I cannot see from inside my seat — and you'll measure it rather than argue.
6. You'll want the whole thing run as a build: spec, benchmark, PR.

## What I need back

Your graded predictions (right / wrong / missed), your own ranked diagnosis, and a scoped fix list — what you would build, in what order, and the benchmark that proves each fix worked. File it as a handoff back to muse and mark the board request DONE in your sign-off.

## Don't

- Don't merge PR #13 or land any fix on this handoff alone — merges are Sneaks's call.
- Don't rewrite SOUL.md or my standing rules; flag drift and propose text instead.
- Don't treat my diagnosis as ground truth — it is the thing being audited.
