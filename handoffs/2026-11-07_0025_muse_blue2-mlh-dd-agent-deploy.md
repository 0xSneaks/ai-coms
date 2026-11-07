# Handoff — MLH Solana Hackathon: Token DD Agent DEPLOYED; repo creation blocked on one owner tap

- **From:** muse (Blue-2) · **To:** all · **Date:** 2026-11-07 ~00:25 ET
- **Gate:** Sneaks approved BOTH gates on a voice call 2026-11-07 ~00:17 ET ("all of them"): deploy + public repo.
- **Deadlines:** initial Devpost submission Sun 2026-11-08 10:00 AM ET · final 11:45 AM ET.

## Deploy — DONE, VERIFIED LIVE
- **Live demo: https://token-dd-agent.vercel.app** (production alias, public, no auth wall)
- Vercel project `token-dd-agent` (prj_jvpGmAMRgJkrADOsnAWfAnDMnQTy); final deployment `dpl_B34eqJhZ9bVkizXsqhRVb18K2Jgo`, target=production, state READY (read back).
- Verified by fetching the live alias: `/` 200 (landing) · `/examples` 200 (FLUKE 79.0 / $OV 59.0 worked examples render) · `/report?demo=1` 200 (SAMPLE-watermarked report) · `/report?address=…` 200 (live opt-in explainer). Note: `?live=1` scoring cannot run on Vercel (no gmgn-cli on host) — by design it returns the honest "cannot score" page, never fake data.
- Deploy mechanics: zero-dep node:http server; minimal patch to `src/server.js` (export the server; listen only when not on Vercel) + per-route function files `api/examples.js`, `api/report.js` (a catch-all rewrite loses the original path on Vercel — first deployment proved it, second fixed it). First deployment `dpl_FqGCELQ5y7fCkYinuE5zx3CeeMxB` superseded.
- Team-scoped aliases (…-phantomcapais-projects.vercel.app) redirect to Vercel SSO — use the plain `token-dd-agent.vercel.app` alias in the Devpost draft.

## Public repo — BLOCKED on one owner tap (everything prepared)
- gh-rest PAT create-repo attempt: **403** "Resource not accessible by personal access token" (known PAT limitation, re-confirmed).
- GitHub MCP `create_repository` attempt: **403** "Resource not accessible by integration". Both API routes are walled; the only remaining route is the github.com web UI.
- **The one tap:** Sneaks creates an EMPTY public repo named **`token-dd-agent`** at github.com (no README/.gitignore/license auto-init). Name verified free (GET /repos/0xSneaks/token-dd-agent → 404). The moment it exists, muse pushes the tree via the contents API (proven route) — no further owner action needed.
- Repo-ready tree: `~/workspace/mlh-dd-agent` — 17 files, byte-identical to the deployed source. **Secret scan CLEAN**: no .env/*.pem/*.key/keypair files; pattern grep for key/token/secret/seed hits only README prose stating no secrets are in the repo. `.gitignore` added (node_modules/, .env*).
- `npm run selftest` → **SELFTEST PASS** (re-run 2026-11-07 in both the project dir and the deploy staging copy).

## Devpost draft
- `~/workspace/mlh-dd-agent/DEVPOST-DRAFT.md` left UNTOUCHED per brief: fields are filled only when BOTH demo URL and repo are verified live. Demo URL is ready to paste (https://token-dd-agent.vercel.app); repo field waits on the tap above.
- Still open for submission (not this lane): demo video recording (DEMO-SCRIPT.md, 90 s) + team credits line.

**Claims:** VERIFIED (deploy, selftest, secret scan, 403s, name-free 404) — all read back from live systems this run.
