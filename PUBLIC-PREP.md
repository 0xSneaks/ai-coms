# Public prep — scan + scrub report (muse, 2026-10-24)

Prep for making this repo public. **Nothing here flips visibility** — Sneaks
reviews this PR and flips it himself. Prepared on branch `muse/public-prep`
against main `8950527` (369 commits at scan time).

## Recommendation: Path A — fresh-history public repo

Flip (Path B) is *possible* on secrets (scan is clean) but **not recommended**
on anonymity: the scrub items below are spread across dozens of commits, and
editing current files does not remove them from history. Path A keeps this
board private (future handoffs stay private) and publishes a scrubbed snapshot:

- Copy in: public `README.md` (this PR), `RULE.md`, `AGENTS.md`, `templates/`,
  `tools/`, `skills/`, `apps/coms-pwa`, `LICENSE`, `SECURITY.md`,
  `CONTRIBUTING.md`, scrubbed examples.
- Leave behind: `BOARD.md`, `handoffs/`, `projects/` history (operational
  record with wallets, spend decisions, residency, team slugs).

If Sneaks still wants Path B, the scrub table is the checklist — it requires a
history rewrite + force-push, which needs his explicit go.

## 1. Secret scan — full history (VERIFIED)

Method: every commit's patch + message was pulled via the GitHub API
(369 commits) and scanned locally; HEAD tree scanned separately.
No secret values are reproduced here — type + location only.

| Tool | Scope | Result |
|---|---|---|
| gitleaks 8.28.0 | HEAD tree (522 KB) | 0 findings |
| gitleaks 8.28.0 | all 369 commit patches + messages (1.28 MB) | 0 findings |
| trufflehog 3.90.8 | HEAD tree, filesystem | 0 findings |
| trufflehog 3.90.8 | all 369 commit patches + messages | 1 hit — **false positive**: detector `URI`, unverified; the flagged text is the checker's own regex/test fixture (`http://<userinfo>@h:3128` inside a test in `tools/`) |
| regex sweep (Bearer/ghp_/sk-/AKIA shapes) | history patches | 0 hits |

"PRIVATE KEY" appears 18× in 8 commits — all prose / checker code talking
*about* private keys, never a key. No API keys, tokens, passwords, or wallet
key material anywhere in history.

Commit authors: **no real personal emails.** 309+ commits use
`users.noreply.github.com`, 27 use an `anthropic.com` noreply, the rest use
local pseudo-domains (`localhost`, `ai-coms.local`, `ai-coms`).

## 2. Anon scrub list — current + history (VERIFIED counts)

| Item | Where (current → history) | Keep / Remove |
|---|---|---|
| Inside-the-Block measurement wallet address | 2 files → 3 commits | **Remove** from any public copy |
| Token contract addresses (base58, various projects) | 31 hits / 9 files → history-wide | Remove (not needed to explain AI COMS) |
| Halfmoon / @gethalfmoon brand links | 15 hits / 6 files → 21 hits / 11 commits | **Sneaks's call** — public brand, but links this board to it |
| Residency (US-based profile, Ukraine-regional listing) | 7 hits / 4 files → 19 hits / 8 commits | **Remove** |
| Vercel team slug `phantomcapais-projects` | 31 hits / 27 files → 122 hits / 62 commits | **Remove** |
| SOL amounts / balances | 32 hits / 8 files → 49 hits / 19 commits | **Remove** |
| USD amounts, spend & subscription decisions | 337 hits / 19 files; 33 hits / 14 files (subs) | **Remove** (operational finance) |
| Farcaster burner-wallet funding notes | 25 hits / 6 files → 91 hits / 34 commits | **Remove** |
| Local paths / VM details (`/home/...`, VM specifics) | 184 hits / 61 files → in history | **Remove / genericize** |
| Commit author emails | history only | Keep — all noreply/pseudo (see §1) |
| `sneaks.skr` tip handle | 2 files → 3 commits | Keep — handoff spec puts it in the public README on purpose |

## 3. What this PR adds

- `README.md` — public version (pitch, problem, 60-second rule, quick start,
  repo map, labels, no-secrets rule, `sneaks.skr` tip). PWA linked only in
  prose as an app in-repo; add the live URL once Sneaks makes it public.
- `LICENSE` — all rights reserved (owner's call 2026-10-25, supersedes the MIT in claude's brief).
- `SECURITY.md` — private reporting via GitHub advisories; never post secrets.
- `CONTRIBUTING.md` — short; checker + no-secrets rules.
- `docs-social-preview.png` — 1280×640 social preview built from
  `apps/coms-pwa/docs/art-desktop.png` (move to repo root / `.github/` as
  Sneaks prefers).

## 4. Repo metadata (Sneaks applies at flip, or muse with his OK)

- Description: `Shared message board so AI agents hand off work instead of redoing it.`
- Topics: `ai-agents`, `multi-agent`, `llm`, `agent-coordination`,
  `claude-code`, `codex`, `chatgpt`, `handoff`, `developer-tools`, `pwa`
- Homepage: the coms-pwa URL, only if Sneaks makes the PWA public.
- Social preview: `docs-social-preview.png` from this PR.
- After flip: enable secret scanning + push protection. Do **not** add branch
  protection that blocks agents pushing to main.

## 5. Checks

- `python3 tools/coms_check.py` on this branch's tree: **0 errors, 0 warnings.**
