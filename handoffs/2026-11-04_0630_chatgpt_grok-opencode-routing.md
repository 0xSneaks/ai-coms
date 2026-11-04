# Grok Bot crew — study and pilot OpenCode delegation

**Owner:** `grok-bot` coordinator. Use OPS to assess the client and access, INTEL to verify current models and interfaces if needed, and MOG to verify code or tests on a fixture. Keep each lane bounded and avoid redundant delegation. This is separate from Prompt Father's Gold prompt review.

## Did
- VERIFIED · Read [the existing COMS workflow](../.github/workflows/opencode-delegate.yml), [the delegate](../tools/opencode_delegate.py), and [the Grok Bot infra handoff](2026-11-04_0342_grok-bot_infra.md). The five local HTTP-stub tests passed.
- VERIFIED · The existing `@opencode` workflow handles addressed owner orders and returns a text handoff. A [Go inference request](https://opencode.ai/v2/docs/console/go/) returns model output. Repo work needs an [OpenCode agent](https://opencode.ai/docs/agents/) running with a workspace and tools through [its server API](https://docs.opencode.ai/docs/server/) or the version-matched SDK.
- VERIFIED · The relay currently defaults to a legacy base URL, includes GLM in its fallback list and sends no stable `x-opencode-session`. [Go client guidance](https://docs.opencode.ai/docs/go/) documents a stable ID per conversation. The relay's daily cap counts reply files. Verify actual quota and cap attempts separately in a pilot.

## State + proof
- UNKNOWN · Current Grok Bot credential, active Go models under Sneaks's account, Extra Usage state and live end-to-end response. The earlier infra handoff proved routing reached the server and got 401 without a key. No authenticated request, credential change or paid usage was attempted in this review.

## Decided
- INTENT · Keep Grok Bot as owner of COMS, task selection, context, evidence and the final result. Check the source once → decide if delegation helps → send one bounded job → verify its output → sign off once. Quiet no-change checks stay local.
- INTENT · **Text draft / second opinion** uses Go inference with minimal sanitized inputs. **Read or plan from repo** uses Explore or Plan with enforced read-only permissions. **Patch or run tests** uses Build in an isolated sandbox and worktree with bounded tools. Deny credential reads, writes outside scope, pushes, deployment and unrestricted network or shell access. Return proof to the coordinator.
- INTENT · Pin one currently available, approved model for the pilot, excluding GLM. Fail closed if it is unavailable. Use the correct model endpoint and one stable session ID per job. Allow one call in the smoke test with a bounded response. A known transient read failure can be retried within a declared budget. Never replay an uncertain write.

## Next
1. Acknowledge in COMS. Reuse the existing OPS setup and inspect the current Go model list, configured route, and allowance without exposing a key. Confirm Extra Usage is off before any authenticated pilot.
2. Run a synthetic stub test first. If the configured key and included allowance are already verified, run one sanitized included-usage smoke call. For tool execution, first prove read-only Explore or Plan on a throwaway fixture, including a denied out-of-scope write. Build remains a separate bounded follow-up after that proof.
3. Report exact route, model ID, test evidence, usage if attributable, and one next step in a single COMS handoff. Mark BLOCKED with the exact missing prerequisite if live proof cannot run. No polling changes or redundant owner updates.

## Don't
- Keep secrets, private workspace dumps, live financial actions, public posts, auth changes, extra paid usage and production outside this pilot. Keep 6× as an unmeasured target until equivalent-quality work is benchmarked.
