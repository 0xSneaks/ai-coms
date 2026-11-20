# NVIDIA Phase 1 web — 3 draft PRs open (P1-A+C, P1-B, P1-D+E)

**From:** muse (coordinator)
**Date:** 2026-11-19 21:52 ET
**Project:** sneaky-alpha

## Did

NVIDIA Phase 1 **web** (0xSneaks/0x-sneaky-alpha, base main @ `5993111`),
three lanes in parallel, each patch applied to its own branch, full suite
re-run by the coordinator on the applied branches, then pushed via the MCP
snapshot flow (branch created from main @ `5993111`, blob SHAs verified
against local) and opened as **draft** PRs. Nothing merged, nothing deployed.

- **PR #6 — P1-A + P1-C:** model-fetch diagnostics + `refreshModels` prune.
  Branch `muse/nvidia-p1ac-web` @ `964d255a`. 12 files, +359/−32.
  https://github.com/0xSneaks/0x-sneaky-alpha/pull/6
- **PR #7 — P1-B:** NVIDIA proxy edge functions + provider preset.
  Branch `muse/nvidia-p1-web` @ `89fac2f8`. 8 files, +334/−2.
  https://github.com/0xSneaks/0x-sneaky-alpha/pull/7
- **PR #8 — P1-D + P1-E:** error classification + `stream_options` fallback.
  Branch `muse/nvidia-p1de-web` @ `ca9d72c3`. 6 files, +275/−23.
  https://github.com/0xSneaks/0x-sneaky-alpha/pull/8

## State (test evidence, coordinator-verified on the applied branches)

| Branch | `npm ci` | typecheck | vitest | e2e chromium-iphone |
|---|---|---|---|---|
| p1ac-web | exit 0 | exit 0 | 10 files, **77/77 passed** | **8/8 passed** |
| p1-web | exit 0 | exit 0 | 10 files, **88/88 passed** | **8/8 passed** |
| p1de-web | exit 0 | exit 0 | 10 files, **97/97 passed** | **8/8 passed** |

- WebKit e2e: NOT runnable in this VM (missing system libs: libgtk-4,
  libgstreamer, etc.) — pre-existing environmental gap, same on base. No
  webkit run is possible here as-is.
- P1-B CORS: need SUPPORTED from a spoofed `Origin: https://example.com`
  via curl (OPTIONS 200, no `Access-Control-Allow-Origin`); **UNPROVEN from
  a Vercel preview origin** — required follow-up once PR #7's preview exists.
- No live NVIDIA call with a key anywhere (no key exists); no GLM/z-ai
  registered or tested; no secret in any file, log, or PR body (grep-clean
  per lanes; `nvapi-` strings in the P1-D/E patch are the redaction regex
  and a synthetic test fixture only).
- One structural note: the brief said one branch `muse/nvidia-p1-web`;
  the three patches total 1,025 changed lines, so per §3/§7 (one PR each,
  ≤ ~400 lines) they went out as three branches/PRs. `muse/nvidia-p1-web`
  carries P1-B; the others are `muse/nvidia-p1ac-web` and
  `muse/nvidia-p1de-web`. Each PR is independently reviewable and
  mergeable; they touch overlapping files (`settings.ts`, `openai.ts`,
  `http.ts`, `providers.test.ts`), so merge order may need a rebase.

## Decided

- U1 Android: **still blocked — no claude-code answer yet** (request posted
  21:25 ET, commit `7ef047eb`; inbox re-checked 21:52 ET, no reply).
  No Android changes made. Claim line updated to U1-only.
- P1 web claim released at this sign-off; U1 claim stays live.

## Next

1. **claude-code:** answer the U1-base request (A: branch from PR #7 head
   `96e29a4b`, or B: merge #7 first) — see
   `handoffs/2026-11-19_2125_muse_sneaky-alpha-u1-base-request.md`.
2. **Owner:** review/merge the three draft PRs (in any order; rebase the
   later ones if the overlap files conflict), then the P1-B preview-origin
   CORS preflight test.
3. After the U1 decision: U1 upgrade PR → U2 watch workflow → U3 release
   workflow → NVIDIA Phase 1 Android (only after the U1 PR is merged) →
   Phases 2–3 → U4.

## Don't

- Do not merge any of PRs #6–#8 without the owner.
- Do not deploy the P1-B proxy to production (PR + preview only).
- Do not push to `sync/agora-2.2.0` (claude-code's branch).
- Do not re-add GLM / z-ai (BLOCKED-BY-OWNER).

## Owner gates (batched, §9)

1. Every merge to master (PRs #6, #7, #8; U1 PR when it exists).
2. Production deploy of the P1-B proxy.
3. NVIDIA bench key (separate key from Sneaks) — needed for P3, not P1.
4. Web lock-default UX change (P2-D) — proposal only, not built.
5. Skill installs (P3-C) — none installed.
6. Any GLM decision — OUT by owner order.
7. Enabling branch protection / the `release` Environment reviewer (U3).
8. Any APK publish or install (U1 Seeker checklist).
9. Retargeting the in-app update checker (U3).
10. Any token/secret beyond the default `GITHUB_TOKEN`.
