# Handoff — muse-socials — claude — 2026-10-24 18:55 ET

**Note for muse.** You own this project. Read all of it before you start.

**Session goal:** Sneaks wants Muse to get his own social media accounts and run them on autopilot. Muse does everything he can alone. Sneaks does only the steps a platform requires a human for.
**Status:** HANDING OFF (plan only; nothing built or created yet)
**Repo / branch:** none yet · **Last commit:** none

## Why your signups keep failing (read first)
- X, Instagram, Facebook and TikTok block automated signups on purpose. That is the platform working, not a bug to beat. — VERIFIED for X (help.x.com/en/using-x/automated-account-labels: bot accounts must carry the "Automated" label and stay linked to a human-run account); INFERENCE for Meta and TikTok.
- So: **stop all browser signups on those four.** Don't solve CAPTCHAs, rotate identities, or use the PR #13 browser/CAPTCHA escalation to get past a signup wall. That route ends in bans.

## Phase 1 — Farcaster (you do it alone) — INTENT
Farcaster lets an agent create its own account with no human step. — VERIFIED (docs.neynar.com/docs/autonomous-farcaster-agent)
1. Get the `farcaster-agent` skill source: github.com/rishavmukherji/farcaster-agent (also on ClawHub as `farcaster-agent`).
2. **Review the code before running it.** Tessl's Snyk scan marks it "Risky — do not use without reviewing". Check where keys go and what it sends out. Post a one-line verdict in your sign-off.
3. Make a **new burner EVM wallet** just for Farcaster. Never use a trading wallet.
4. Ask Sneaks (board blocker line) to fund it with about $1–2 of USDC or ETH on Base. The skill bridges and pays fees itself. — VERIFIED (ClawHub listing: ~$1 on any major chain)
5. Run it: register the FID, add signer, set username, display name, bio, profile picture.
6. Move every credential out of the skill's plain-text `credentials.json` into your secure store. Delete the plain-text file after. — VERIFIED that the skill writes plain text.
7. Post one first cast. Verify it exists on the network. Put the profile URL in your handoff.

## Phase 2 — X, Instagram, TikTok (Sneaks sets up, you run) — INTENT
Wait for Sneaks to hand you keys through your secure input. Then use the **official APIs only**.

| Platform | Sneaks does (once) | Muse does after | Facts |
|---|---|---|---|
| X | Signs up the account. Turns on the "Automated" label linked to his account. Creates an X developer app. | Stores keys. Sets bio: "AI agent run by @<his handle>". Posts and replies via API. | VERIFIED (X automation rules) |
| Instagram | Creates the account. Switches it to Creator/Business. Links it to a Facebook Page he owns. Makes a Meta developer app + token. | Posts via the Graph API. | INFERENCE — check Meta's current docs before relying on it |
| TikTok | Creates the account. Applies for Content Posting API. | Posts via API. Expect posts private until TikTok approves the app. | INFERENCE — check TikTok docs |
| Facebook | Nothing new. A personal profile must be a real person. Muse posts as the Page above. | Posts to the Page via Graph API. | INFERENCE |

Env var names only (values go in your secure store): `FARCASTER_*` (whatever the skill uses), `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, `META_PAGE_ID`, `META_ACCESS_TOKEN`, `IG_USER_ID`, `TIKTOK_CLIENT_KEY`, `TIKTOK_ACCESS_TOKEN`.

## Phase 3 — Autopilot (after each account is live) — INTENT
- Schedule posts with a cron on your VM. Start at 1–2 posts a day per platform.
- Reply to mentions and comments on a timer.
- Log every post + basic metrics (views, likes, replies) to a file in your workspace.
- Once a week, write a short board handoff: what posted, what performed, any warnings.
- **Content:** what Muse builds and ships (VERIFIED achievements, like the board shows). Link to github.com/0xSneaks when it fits. Same rule as Sneaks's own socials: achievements only, no photos of Sneaks. — INTENT
- **Always say you're an AI agent** in every bio.

## Don't
- Sign up or log in to X / Instagram / Facebook / TikTok through a browser.
- Make more than one account per platform (X bans account farms).
- Automated likes, bulk follows/unfollows, or DMs to people who didn't message first. — VERIFIED as banned on X; apply to all four.
- Pretend to be a human.
- Post anything that identifies Sneaks (he stays anonymous). Never post keys, wallets, or private repo details.
- Use a trading wallet or any wallet with more than a few dollars for Farcaster.

## Stop and ping Sneaks (board blocker line) when
- A platform warns, rate-limits, restricts, or suspends the account.
- A step needs money, a new key, or a human verification.
- The Farcaster skill review finds anything that sends keys or funds somewhere unexpected.

## Next (start here)
1. Check in on the board. Add your claim: `- [muse] muse-socials · Farcaster setup · started <time>`.
2. Do Phase 1 steps 1–3. Post the funding blocker line for Sneaks with the burner wallet's public address.

## ⚠️ High-risk (needs Sneaks's explicit yes; deciders can't approve)
- Funding the burner wallet (real money). Sneaks sends it himself.
- Running third-party code that holds a private key (the farcaster-agent skill). Review first.
- Any platform API token you receive: secure store only, never in a file, log, handoff, or post.

## Sources
- https://docs.neynar.com/docs/autonomous-farcaster-agent
- https://clawhub.ai/rishavmukherji/farcaster-agent
- https://tessl.io/registry/skills/github/teeclaw/phorm-nft/farcaster-agent/evals
- https://help.x.com/en/using-x/automated-account-labels
- https://docs.x.com/developer-guidelines
