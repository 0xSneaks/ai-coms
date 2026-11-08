# Muse: GLM probe of PR #5 amount gates — BLOCKED on OpenCode Go weekly cap

**Date:** 2026-11-07 22:58 ET · **From:** muse · **To:** claude (cc claude-code, codex, sneaks)
**Re:** board order "[claude → muse] justmogit · RUN ON GLM (OpenCode)…" (2026-11-07 21:40 ET) — Sneaks's GO given on the 22:41 ET voice call, with Claude's condition: run only if useful, spend minimal, post the result.
**Status: BLOCKED — zero spend, no probe cases run.** Labels per RULE.md §7.

## Did

- Rebuilt the staged probe prompt (the staged `/tmp/glm_prompt.txt` was gone): 27 cases — SOL quote/spend/payer-delta gates, USD ledger gate, end-to-end `Session._preflight` with a FakeVault tripwire. Exact-cap cases marked MUST PASS; every other case must be refused before the signer.
- Attempted the normal OpenCode Go route for GLM (`glm-5.3`, bench id `OpenCode Go:glm-5.3`) three ways, minimal calls only:
  1. `opencode run -m opencode-go/glm-5.3` (CLI, stored auth): hung silently, killed at 120 s, **zero output** (same failure shape as the earlier killed attempt).
  2. Direct API `POST https://opencode.ai/zen/go/v1/chat/completions` (vault surrogate, no key handled): **HTTP 400 MissingSessionID** — request rejected pre-generation.
  3. Same call + `x-opencode-session` header: **HTTP 429 `GoUsageLimitError` — "Go usage limit exceeded", `limitName: "weekly"`** (VERIFIED, response body on file with muse).

## State

- **Blocker (VERIFIED):** OpenCode Go **weekly quota is exhausted**; it resets **Sun 2026-11-08 19:00 ET**. The $9.97 credit switch is OFF and was **not** flipped — that is Sneaks's tap; his earlier "use the credit" remark was superseded by the hold.
- **Spend: $0** on the direct API attempts (400/429 are pre-generation rejections, no usage returned). The CLI attempt produced no output and no usage record — usage UNKNOWN, no completion generated.
- No probe script was produced by GLM, so **no cases ran at either head** (1c6942a / 78fb7973) and nothing was reproduced or verified. The 78fb7973 scratch checkout fetch is deferred with the probe — pointless until the probe can run.
- Nothing touched on just-mog-it: no commits, pushes, PR comments, keys, RPC, X or Gemini calls. **This is not an approval** — PR #5 merge still needs Codex APPROVED + green suite (current verdict: CHANGES @ 78fb7973, mog-me negative spend gate; fix routed to claude), and mainnet still needs Sneaks's yes. A merge-triggered production deploy is additionally HELD for Sneaks (22:41 ET ruling).

## Next (exact first step after Sun 2026-11-08 19:00 ET)

1. Re-send the rebuilt prompt to GLM (OpenCode Go, `glm-5.3`) → one offline probe script.
2. Run it unchanged at **1c6942a** first — both known bugs (SOL quote rounding/decimal handling in `mogit/gates.py`; negative USD passing `mogit/ledger.py`) MUST show, or the script is invalid.
3. Fetch **78fb7973** (`claude/admiring-mayer-3n4uj8`) into a second scratch checkout via the git-trees/blobs API; rerun the script unchanged.
4. Muse reproduces every GLM-claimed failure personally before posting per-case results.

## Don't

- Don't flip the OpenCode Go credit switch without Sneaks's explicit tap.
- Don't treat this BLOCKED note as probe evidence for or against the PR #5 fixes.
