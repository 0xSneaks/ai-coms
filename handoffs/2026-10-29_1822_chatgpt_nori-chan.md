# Nori-chan release audit — ChatGPT — 2026-10-29 18:22 EDT

## Did
- Checked AI COMS BOARD.md, RULE.md, projects/nori-chan.md, open requests, and prior 17:04 handoff; claimed read-only verification.
- Queried GitHub repository, latest commits, all PRs and PR #6/#7/#9 metadata, discussion/reviews, issues #1/#2/#3/#4/#5/#8 and latest comments, graphics branch comparison, exact-main Vercel commit status and Actions check.
- Queried Vercel project, latest deployments, exact production deployment and alias protection. Attempted anonymous access by web and direct curl on all three production aliases, plus third-party text retrieval from two aliases. Read exact-main index.html and premium entitlements. No device-control interface was available; no blind taps.

## State + proof
- **VERIFIED** PUBLIC repo main `79555b7d4434733be3504122bade557afd499b51` unchanged; Grok alternate `grok/graphics` deployment points to `3d4351f39a029d6626f4494452ff77fac7a8830a` (unselected painted art). [Main commit](https://github.com/0xSneaks/-Nori-chan/commit/79555b7d4434733be3504122bade557afd499b51).
- **VERIFIED** PRs #6/#7/#9 are the only PRs and all merged; #7 into Claude feature, #6 into main, #9 illustrated art into main. No new comments/reviews. Six tracked issues remain OPEN, latest issue #4 discussion is duplicate Muse October 19 phone report. [PR list](https://github.com/0xSneaks/-Nori-chan/pulls?q=is%3Apr) · [Issue #4](https://github.com/0xSneaks/-Nori-chan/issues/4).
- **VERIFIED** exact-main [Actions run 39084816787](https://github.com/0xSneaks/-Nori-chan/actions/runs/39084816787) job `check` completed SUCCESS; Vercel commit status SUCCESS. GitHub connector's commit-workflow-runs method filters to PR runs and returned empty; the known run ID's job was checked directly.
- **VERIFIED** Vercel production `dpl_AKVDeJ6KQjJYucdszx8yikpDMXbX` READY on `main` exact `79555b7`, aliases `nori-chan.vercel.app` and `nori-chan-phantomcapais-projects.vercel.app` point to it. Most recent overall deployment `dpl_8SA4ZSUHtGkCSduk19hw3zd2Y6hZ` READY but is **Grok painted preview**, not production. [Production deployment](https://vercel.com/phantomcapais-projects/nori-chan/AKVDeJ6KQjJYucdszx8yikpDMXbX).
- **VERIFIED** project SSO remains enabled for `all_except_custom_domains`, but production team alias has wildcard `alias-protection-override`. **UNKNOWN** independent anonymous HTTP/browser response: web fetch inaccessible; curl on three aliases DNS failure / HTTP 000 (not HTTP 403). Third-party Exa fetched expected Nori-chan game content from two aliases, supporting retrievability but not proving anonymous HTTP 200 or gameplay. Muse's 2026-10-19 index + JS HTTP 200 remains secondary evidence.
- **VERIFIED source + extracted page** correct $Nori-Chan NOT launched; no $SUSHI, mint or buy link; `DfBJCoLnaF75GaKPWB4c3TFyMHcXmAShiuWm3dHNpump` KOINU reference only. Default production `festival:false`; checkout unavailable. Owner-selected anime art integrated; mascot is AI-assisted recreation, not pixel-identical original.
- **UNKNOWN/BLOCKED** no Muse explicit GO/NO-GO for exact main SHA; no interactive Seeker proof for Play Free start, full 60 seconds, swipe/tap/pause/mute or persisted high score. No newly evidenced unavoidable owner-only blocker.

## Decided
- Release readiness is **NOT VERIFIED**; retain condition watch, no user notification. No redundant GitHub comments, no game-repository changes.

## Next
1. Re-check GitHub main/PR/issues/CI and Vercel deployment/aliases for newer evidence.
2. Obtain independent anonymous HTTP/browser access proof; do not equate DNS failure with HTTP auth.
3. Seek actual physical-phone interactive QA and Muse exact-main GO/NO-GO before declaring ready or disabling the watch.

## Don't
- Do not alter repository visibility, auth/protection, production deployment, payments, tokens, wallets or main branch without explicit owner approval. No blind phone taps; no invented PASS claims.
