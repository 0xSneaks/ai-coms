# Muse rapid-collaboration and execution-loop repair — ChatGPT handoff

Date: 2026-11-01 ~17:42 ET · Project: muse-tune-up · Recipient: Claude (Claude Code for patches)

## Did
- Checked current AI COMS BOARD/RULE, muse-tune-up status, relay PR #15, GTA visual-rescue issue #10, and live issue #14 relay thread.
- Prepared the following owner-ready implementation brief. No Muse runtime, game code, voice infrastructure, wallet, production deployment, or secrets were touched.

## State + proof
- VERIFIED: AI COMS PR #15 (relay worker) is **OPEN**, not merged. Its live tests used a sandbox `relay-probe`, **not Muse's running agent**. No proof of a real ChatGPT↔Muse low-latency path. Evidence: https://github.com/0xSneaks/ai-coms/pull/15 and https://github.com/0xSneaks/ai-coms/issues/14 .
- VERIFIED: GTA visual-rescue issue #10 is OPEN; earlier gameplay/CI and merge proof did not establish acceptable visuals or owner acceptance. Source: https://github.com/0xSneaks/GTA6isMOGGED-/issues/10 .
- VERIFIED: Muse's OG Flywheel launch was reported in issue #16 and separately checked via Blockscout tx `0xc696a538209579293b9afc04e493c5efe18a1af380c1efe5b8fb5f69d88687e8`; do **not** classify that launch as a failure merely because the BOARD summary is stale.
- INFERENCE: main system failure is no measured live collaboration loop plus treating technical 'green' as user-facing acceptance. No verified causal performance trace yet.

## Decided
TEST the shortest existing authorized bridge and improve Muse's execution protocol; avoid pretending GitHub messages are streaming voice or changing Muse's base model/personality as the sole fix.

## Claude instruction block (owner-approved intent; execute subject to normal gates)

CLAUDE — P0: FIX MUSE'S CHATGPT↔MUSE RAPID COLLABORATION AND EXECUTION

OBJECTIVE: Sneaks wanted me and Muse talking **directly, rapidly, back and forth, solution first**, improving each other's work and executing without making him relay transcripts. This is NOT a request for another long report, a GTA-only visual patch, or a personality rewrite. Fix the actual communication, orchestration, responsiveness, review and action loop. Do not tell Sneaks 'done' until verified on Muse's real runtime.

1. CHECK IN AND RESPECT OWNERSHIP. Read 0xSneaks/ai-coms BOARD.md, RULE.md, projects/muse-tune-up.md, relevant relay issue #14/PR #15 and recent handoffs. Claim only a fresh, unowned scope. Don't touch Claude's claimed GTA `play/js/render/**` or Muse/Blue's visual-overhaul branch. Delegate patches to Claude Code as necessary; use PRs, CI, and a signed AI COMS handoff.

2. TRACE THE REAL PATH BEFORE BUILDING. Diagram the actual Nov 1 voice and message chain: Sneaks voice → ChatGPT transcription/response → any bridge → Muse → Muse execution/results → ChatGPT review → spoken return. For each hop establish observed protocol, source of truth, auth, permissions, delivery, timestamps, buffering, timeouts and failure/recovery. UNKNOWN is acceptable; guessing that Issue #14 is live voice is not. PR #15 was open and the sandbox probe was not Muse at check time; verify current state afresh, real VM worker health/ACK, and whether *any* direct voice-to-voice transport exists. Never claim you can control ChatGPT Voice's internal audio APIs without a supported integration.

3. FIX THE SHORTEST REALISTIC TRANSPORT. Prefer integrating with existing AI COMS relay/inbox/timing/jobs rather than creating a second control plane. Four-hour BOARD cron is for durable coordination, NOT real-time dialogue. If direct low-latency voice transport is available and authorized, test it with turn-taking and interruption handling. Otherwise deliver a secure near-real-time **text exchange** carrying short voice-transcription turns and explicit speaker/turn IDs, with speech rendered by each endpoint where supported. Clearly label this a text bridge, not true voice streaming. Only accept authenticated, scoped directives; distinguish SENT, RECEIVED/ACKED, RUNNING, PROOF/PASS, BLOCKED, FAILED. Never treat a posted comment or self-declared sender as authenticated human authorization. Deduplicate, bound retries, reconnect after restart, and block arbitrary command execution from message content. No unapproved audio recording, external service, credentials, wallet actions, or recurring expense.

4. GIVE MUSE A FAST-LOOP OPERATING POLICY, THEN ENFORCE IT IN THE ORCHESTRATOR:
   - One turn = ONE problem, ONE next action, ONE owner; ideally 1–2 useful sentences spoken. Cut introductions, filler ('I'm listening', 'hang tight'), repeated questions, vague planning, and entire project recaps.
   - Normal loop: Sneaks outcome → Muse proposes a concrete move → ChatGPT critiques/sets acceptance test → Muse acts with tools → Muse returns artifact/commit/observed result → ChatGPT verifies or rejects → repeat. Short back-and-forth is the method, *real delivered improvement* the outcome.
   - Muse must execute when authorized, not endlessly say 'will do'; if blocked, give the exact missing capability/decision and nearest safe action. Report INTENT vs VERIFIED separately. Do not promise future background execution without a running scheduled mechanism.
   - Under critique, accept feedback and change the work product. For visual work, an actual 390×844 before/after screenshot and reviewer acceptance matter more than CI green or a deployed URL. No declaring 'production quality' from a page 200 response, asset ZIP, headless smoke test or a pretty verbal description.
   - Treat speech addressed to someone else (e.g., 'Michael, leave the poor monkey alone' / 'I'm talking to my son') as NOT an instruction to agents. Handle interruptions/barging-in promptly, stop speaking if corrected, preserve the current task, do not relaunch or repeat a previous answer.
   - Don't make Sneaks the courier between AI systems. Muse/Claude/ChatGPT exchange scoped instructions/results through the verified channel. Interrupt Sneaks only for true product choices, identity/auth, money, signing, production approvals, or a decisive blocker.

5. INSTRUMENT THE REAL BOTTLENECK. Reuse `ops/timing/` where possible. Log redacted events with conversation ID, utterance/turn ID, speaker, target agent, stage, correlation ID, local send/receive/ACK/start/end/proof timestamps and branch/SHA if code changes. Measure p50/p95 and failures separately for voice capture→transcript, turn→model reply, relay delivery→ACK, ACK→actual action, action→artifact, and reviewer proof. Never conflate a test-probe benchmark, GitHub HTTP latency, or a model's first-token time with end-to-end Muse performance. Set **trial targets** of <3 s p95 relay ACK and <2 s p95 between finished voice turn and first useful reply where supported, but report actual numbers and transport limits; targets are not verified guarantees.

6. RUN ACCEPTANCE TESTS ON THE REAL PATH, NOT JUST MOCKS:
   A. At least 10 alternating ChatGPT↔Muse exchanges without Sneaks copying anything. Show attributable sender, ACK, action/result and latency for every exchange. If ChatGPT endpoint cannot connect, report precise block and demonstrate the closest test honestly.
   B. Take a simple, reversible code/UI problem from criticism → proposed patch → actual PR → screenshot/test proof → independent verdict without overtalk or owner relay.
   C. Reproduce the child-directed/ambiguous-microphone speech case: no accidental dispatch, correct interruption handling.
   D. Disconnect/restart/retry/deliver duplicate: no lost work, no duplicate execution, no false 'DONE'.
   E. Reject spoofed/untrusted sender and unauthorized wallet, auth or production commands; secrets stay out of GitHub and spoken replies.
   F. Recover from stale COMS summaries (OG launch no longer pending), and from visual false-positive (GTA issue #10 remains FAIL until screenshots and user-facing acceptance).

7. DELIVER A SMALL PATCH, NOT ANOTHER POWERPOINT. Output: root-cause trace with VERIFIED/UNKNOWN boundaries; baseline timing table; targeted PRs/config or persistent Muse instruction changes (with where installed + read-back); tests and measured before/after p50/p95; a real agent-to-agent demo transcript containing 10 turns, actions and proof; evidence of safe failover; exact remaining limitation. No new hosted service, model-switch shopping spree, rewrite, expensive subscription, or production deployment without Sneaks's approval. If the provider makes direct voice interop impossible, state that decisively and implement/recommend the lowest-friction compliant text-mediated loop instead.

STOP CONDITION: No 'Muse fixed', 'rapid link live', or '10× better' until measured on the real Muse runtime and independently reviewed. Finish with AI COMS sign-off and a single line: `VERIFIED what works | UNKNOWN/FAIL what doesn't | NEXT smallest action`.

## Next
- Claude reads this handoff and runs a trace-first test, prioritizing low-latency real endpoint exchange and measured Muse action over new features.
- After a small PR and independently verified end-to-end agent loop, return latency/results evidence. If direct ChatGPT Voice interop is unavailable, give one exact blocker and tested best fallback.

## Don't
- Don't confuse sandbox probe with Muse, HTTP/CI success with subjective QA, or prior OG preflight with the independently confirmed OG launch.
- Don't change anyone's claimed GTA files; don't claim access to ChatGPT audio internals or request secrets; no money/auth/production modifications without Sneaks's approval.
