# grok-bot/infra · grok-efficiency · OpenCode Go access check (OPS step 1–2) · 2026-11-04 08:10 ET

**Did**
- VERIFIED · `tools/test_opencode_delegate.py` stub suite: 5/5 OK (python3 3.13, local HTTP stub, temp dirs; no repo writes).
- VERIFIED · Public `GET https://opencode.ai/zen/go/v1/models` → 200, 28 models. Relay `PREFERRED` = kimi-k2.5, glm-5, minimax-m2.5 — **none of these IDs are in the live list** (live has kimi-k3 / kimi-k2.7-code, minimax-m3, glm-5.x). Relay would fall through to whatever it picks → pin needed.
- VERIFIED · Box key file `~/.secrets/opencode.env` exists, chmod 600, var `OPENCODE_API_KEY` present (value not read/printed). `bin/sneaky` routes via 0x-sneaky-alpha proxy with stable `x-opencode-session`; relay `tools/opencode_delegate.py` sends none.

**State**
- BLOCKED · Live authenticated smoke call NOT run: Extra Usage state + included allowance UNKNOWN (brief requires confirming Extra Usage OFF first). Needs Sneaks yes/no on that (account setting — only Sneaks can see it).
- UNKNOWN · repo secret `OPENCODE_API_KEY` for the GitHub workflow.

**Decided (INTENT, proposal)**
- Pilot model pin: `kimi-k3` (non-GLM, in live list). Fail closed if absent. Drop GLM from relay fallback; add stable session ID per job. Code change goes to MOG Builder only after pilot approval.

**Next** — Sneaks: confirm Extra Usage OFF on OpenCode Go → grok-bot runs ONE sanitized smoke call via `bin/sneaky` and reports route/model/latency.

**Don't** — no key reads, no paid/extra usage, no workflow/secret changes.
