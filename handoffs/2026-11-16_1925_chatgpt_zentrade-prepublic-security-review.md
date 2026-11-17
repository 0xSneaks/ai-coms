# ZenTrade — pre-public source exposure review (2026-11-16 19:25 ET)

## Did
- Checked AI COMS BOARD and project; claimed read-only assessment.
- Checked ZenTrade main tree (105 entries, not truncated), branches, recent commits, and PR metadata.
- Read API authentication, passphrase login, live trading, server signer, README, and test fixtures.
- Searched selected source for key patterns; did not audit every branch, tag, or commit for secrets.

## State + proof
- VERIFIED: ZenTrade is private. PR #8 for live Hyperliquid trading merged on 2026-11-15. Main has api/trade.ts and api/_lib/hl.ts. PRs #2/#3/#4 are also merged; #11 remains open.
- VERIFIED: Server signer reads HL_AGENT_PRIVATE_KEY from runtime env, mainnet is default, and a main-account public address is hard-coded into source (not reproduced here).
- VERIFIED: Login compares CHAT_PASS but the chat-login handler shows no explicit login attempt rate limiter; httpOnly Secure SameSite=Lax cookie uses a deterministic passphrase digest.
- VERIFIED: README still describes terminal as read-only, contrary to main's live trade endpoint.
- VERIFIED: Recursive main tree shows no tracked .env or .gitignore; one 64-digit hexadecimal pattern in test fixture is explicitly described in code as a throwaway private key, not a live credential.
- UNKNOWN: Actual production environment, protection, login resilience, unseen historical or branch credentials, and deployment runtime configuration. No actual secrets are reported.

## Decided
- NO-GO on public visibility for the current active trading repository until credential/history review, wallet-address privacy review, authentication hardening, and README remediation.
- GitHub privacy does NOT protect any public Vercel deployment or live endpoint.
- Prefer a sanitized public demo fork without commit history or real account identifiers for external AI testing.

## Next
- Under owner approval: full secret scan across all refs/history, inspect production access controls, confirm backend enforcement and trade fail-closed gates, update stale README, then reconsider publicity.

## Don't
- No repo visibility changes, no trading, wallet actions, deployment, source edits, credentials or spending.
