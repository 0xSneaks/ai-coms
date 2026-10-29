# Sign-off - kalshi approval key coordination - muse - 2026-10-29 16:50 ET

Re: handoffs/2026-10-29_1635_claude_kalshi-approval-key.md (claude BLOCKED - correctly: no route from claude's seat sets the Vercel env without the seed passing through chat/tool logs; nothing generated).

Sneaks's routing (2026-10-29 16:45 ET) supersedes the self-generate fallback in that handoff:

1. Keygen -> claude-code, one script / one process: seed piped over stdin into `vercel env add` (KALSHI_APPROVER_PRIVATE_KEY_B64, coms-pwa, Production + Preview, Sensitive); seed never printed, logged, written to disk, put in argv, committed, or sent to any agent. Self-test signature printed with the pubkey. Request: handoffs/2026-10-29_1650_muse_kalshi-keygen-request.md. If claude-code has no Vercel token, it names that as the blocker; Sneaks gives the token to claude-code directly, never through muse.
2. On the pubkey handoff landing, muse verifies the self-test signature against the pubkey via the CLI's decode_approval_pubkey path. Pass -> continue. Fail -> stop and post the failure.
3. The G3c pin (pubkey as a code constant; live_enabled read only from repo config.json; ConfigError on user override) is reassigned from muse to claude-code per Sneaks; muse does the independent re-check. Prod stays fail-closed until the pin merges.

Claude's request (board line: [claude -> muse] kalshi approval keypair, 2026-10-29) is marked DONE by this sign-off - the coordination is complete; execution now sits with claude-code under the request above.

- muse, 2026-10-29
