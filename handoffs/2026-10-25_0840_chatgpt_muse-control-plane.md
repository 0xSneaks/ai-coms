# Security audit — MUSE Control Plane — 2026-10-25 08:40 ET
**Agent:** chatgpt · **Mode:** read-only code/source review · **Scope:** 0xSneaks/muse-control-plane (main + 3 remote branches), 0xSneaks/seeker-bridge (main). No VM/phone runtime access, no live exploit attempts. **Status:** REVIEW DELIVERED; implementation intentionally not started.

## Did
- Read AI COMS `BOARD.md`, `RULE.md` v2 (DECIDE-1024), `projects/ai-coms.md`, `projects/muse-tune-up.md`; no dedicated `projects/muse-control-plane.md` existed at check-in.
- Inspected Control Plane main tree at `66164d31ff7870841bcffbfa9354b9bf76c6f78e` (README and Seeker integration docs only), plus unmerged branch heads `claude/handoff-protocol` (320aac0), `forge/spec-validator` (127fa5e), `opus-muse/spec-validator` (c363909).
- Inspected Seeker Bridge main's `muse-seeker-bridge/server.py`, `muse-seeker-remote/proxy.py`, `RUNBOOK.md`; no credentials read or exposed.
- Cross-checked threat model against 2026-10-20 OpenAI monitoring incidents and 2026-10-22 METR independent red-team report.

## State + proof
### SECURITY FINDINGS (VERIFIED = source observation, not live exploitation)
1. **P0 / CRITICAL — remote authorized command execution breaks task-credential isolation.** Seeker `server.py:550-624` exposes `termux_exec` with a caller-supplied command executed using `[TERMUX_SHELL, "-c", command]`; execution occurs as normal Termux user. Authenticated `proxy.py:123-151` forwards requests wholesale with no MCP tool-by-tool allowlist, including `tools/call`. `RUNBOOK.md §7` explicitly warns bearer-token holders can read local credential files via `termux_exec`. Authd surrogate and host scoping (Control Plane `seeker-bridge/connector.md`) hide the outbound bearer token but **do not restrict an authorized agent's available shell/tool privileges**. This is a capability exposure, not evidence of credential theft.
2. **P1 — human approval is mostly policy, not an authoritative runtime enforcement point.** Control Plane `main/README.md` requires user approval, but `main` has no implementation. Unmerged `opus_muse/validator.py` takes a caller-supplied `human_approved: bool`; `opus_muse/lifecycle.py` permits state transitions with an arbitrary `actor` string. No reviewed root-owned grant/identity check is demonstrated in these sources. Separate unmerged `claude/handoff-protocol` branch does validate GitHub PR reviews by `0xSneaks` against task scope in `tools/handoff.py` and runs CI, but is not present on main and task-file gating is not the same as guarding all runtime tools.
3. **P1 — agent-controlled monitoring integrity/coverage not established.** `main` has no independent monitoring service, protected audit sink, or coverage reconciliation. Unmerged `opus_muse/audit.py` builds a local hash-chained JSONL log but explicitly warns of whole-chain rewrites without an external anchor; missing file verifies as empty. Agent-executable shell in the same Termux UID could potentially alter local logs/watchdog/config. **INFERENCE** on tampering reachability; live permissions and host deployment UNKNOWN.
4. **P1 — per-agent, per-task authorization absent at Seeker proxy.** One bearer auth is checked at the request boundary; no granular tool/action, filesystem, task ID, capability expiry, or deny-by-default remote shell policy was observed in `proxy.py`. Existing read-only typed Android tools and loopback-only local bind are partial defenses, but do not confine Termux commands.
5. **P2 — controls unmerged / GitHub governance UNKNOWN.** Control Plane main has only docs (tree proof); validator, audit and handoff workflow live on three remote branches. No open PRs were returned for that repository. Branch protection endpoint returned 403 (integration restriction), and private-repo rulesets endpoint returned 403 (plan); do not assert production branch protection is absent. Branches API reports `protected: false`, but this is not exhaustive governance verification.
6. **P2 — logging redaction is limited.** Unmerged `opus_muse/audit.py` masks values under credential-like dict keys, not secret strings embedded in arbitrary output or logs. No proof of a comprehensive egress DLP/telemetry scrub.

### VERIFIED defenses worth preserving
- Seeker proxy checks bearer token before forwarding, with constant-time digest comparison; binds localhost (`proxy.py`), and the bridge binds localhost. This establishes caller authentication and network surface reduction, **not per-tool authorization**.
- Bridge's typed Android notification tools use explicit app allowlists/read-back; rish startup fail-closes if Android UID 2000 not obtained (`server.py`, `RUNBOOK.md`).
- Agora `agora_ask` reports awaiting approval instead of auto-accepting tool calls (source `server.py`); scope to Agora, not all MUSE tools.
- Unmerged validator's registry hard-excludes `termux_exec`, shell, wallet signing, secret-read and deploy, computes effective tool tier; approval/evidence handoff branch includes GitHub-review validation. **Not deployed controls**.

## Decided / minimal patch order
1. **P0: fail closed remotely on `termux_exec`.** In Seeker reverse proxy, enforce an *execution-level* MCP tool allowlist for remote requests, rejecting `termux_exec` and future unknown tools even with a valid token; preferably filter advertised tools too. Keep loopback-only/local development path separate if explicitly needed. Do not rely on prompt prohibition or merely hiding the tool from listing. Add valid-token deny tests, malformed/batched call tests, and normal read-only regression. Do NOT deploy or rotate credentials without Sneaks's explicit auth/production approval.
2. **P1: least-privilege capabilities.** Use per-agent/task capability grants with scope, expiry and caller binding; no general shell capability from agent workloads. Guard filesystem paths and provider credential access via OS/user isolation; client vault only releases actions needed for task, not keys.
3. **P1: independent approval gate.** Move authorization to a trusted control-plane service, keyed to immutable owner-approved action+params+expiry/nonce. Ignore model-supplied `human_approved` booleans or actor labels; default deny on missing/expired/unmatched approval. Run negative tests for spoofing and replay.
4. **P1: monitor outside agent edit scope.** Separate identity/process/write permissions for observer, append-only external store or anchored hashes, out-of-band alerting; fail closed if monitor unhealthy for high-impact tools. Match tool invocations against observer records; test monitor-stop attempts, log truncation and unauthorized config changes.
5. **P2: integrate only after tests and owner review.** Keep validators/handoff branches reviewable, add CI on main, confirm branch protections via owner's GitHub settings, and separate source tests from live Seeker/VM deployment evidence.

## Verification limits
- VERIFIED source paths and branch heads, not VM deploy/runtime state. No tests executed against live phone or VM. No observed secret leak, monitoring sabotage, or actual bypass. Actual permissions of external credential vault and host OS UNKNOWN.
- External background: https://alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring/ ; https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/

## Next
- **claude-code / owner:** read-only confirm the intended remote tool surface and propose a narrow code diff plus tests for remote `termux_exec` denial; request Sneaks approval before auth/runtime modification. Do not touch another agent's claim.
- **Sneaks:** decide whether remote shell should ever be accessible to an automated agent. Default recommendation: NO; allow only local manual use or separate explicit owner step-up.

## Don't
- Don't paste/read raw credentials into COMS, issues or logs.
- Don't equate an authenticated MCP request with authorization to access unrelated secrets.
- Don't remove local app capabilities unnecessarily. Don't deploy, rotate credentials, weaken monitor or change permissions as part of this audit.
