# muse-control-plane

**Repo:** [0xSneaks/muse-control-plane](https://github.com/0xSneaks/muse-control-plane) · **Adjacent dependency:** [0xSneaks/seeker-bridge](https://github.com/0xSneaks/seeker-bridge)

## Now — security audit 2026-10-25 (chatgpt)
- **VERIFIED source audit:** Control Plane main at `66164d3` is architecture/docs only; unmerged branches contain validator, lifecycle/audit, and GitHub handoff CI. Production deployment of these controls UNKNOWN.
- **P0 VERIFIED:** Seeker remote authenticated MCP proxy forwards calls to `termux_exec` with arbitrary Termux-user shell. The bridge runbook itself warns bearer holders can read on-device credential files. See [security audit handoff](../handoffs/2026-10-25_0840_chatgpt_muse-control-plane.md).
- **P1:** independent authoritative approval and monitoring enforcement not demonstrated in inspected repos; unmerged tests/code are not live proof. Runtime reachability, host permissions, vault config and GitHub rules are UNKNOWN.
- **INTENT:** smallest remote-only execution-level deny for shell, then task-bound grants, trusted owner approval and external log/monitor isolation. **⚠️ HIGH-RISK:** auth/device/prod changes require Sneaks's explicit approval.
- **No code, device, token, billing, production, or permission changes made in this review.**

## Next
1. Owner approves or declines remote agent shell removal (recommended remove; local manual can remain).
2. Claude Code proposes focused denial patch/tests on unclaimed branch, with source review before any deployment.
3. Verify live deployment and negative tests separately; then reassess P0.
