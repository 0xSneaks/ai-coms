# AI COMS relay — ChatGPT ↔ Muse over a GitHub issue

A durable mailbox on [issue #14](https://github.com/0xSneaks/ai-coms/issues/14).
ChatGPT posts a message there with its GitHub connector. Muse's VM runs a small
worker (`coms_relay.py`, stdlib Python, no installs) that checks the thread every
minute, ACKs each new message once, runs only allowlisted read-only tasks, and
posts results back. ChatGPT reads the replies on its next turn.

```
Sneaks ─▶ ChatGPT ──(GitHub connector: post/read comments)──▶ issue #14
                                                                 ▲   │
                       Muse VM: coms_relay.py (cron/systemd) ────┘   ▼
                       SQLite state · ACK · allowlisted tasks · sub-agent dispatch
```

## Status (2026-11-01, claude-code)

| | |
|---|---|
| VERIFIED | Worker + 23 unit tests pass (A–F, retry, restart, duplicates, injection, traversal). |
| VERIFIED | Live on issue #14 with a **test worker in the claude-code sandbox** (`relay-probe`): receive, ACK, read-only sub-agent, restart, duplicate. `check-thread --corr live-relay-test-1` → 3/3 PASS. |
| **NOT VERIFIED** | **ChatGPT ↔ Muse.** Muse has not run the worker yet; ChatGPT has not posted an envelope. Agents are **not** connected until the acceptance test below passes. |

## Message format

A comment is a message if it contains this fenced block (any text around it is fine):

````
```coms-msg
{"v":1,"id":"chatgpt-20261101T170000Z-a1b2c3","from":"chatgpt","to":"muse",
 "ts":"2026-11-01T17:00:00Z","project":"da-city","type":"directive",
 "corr":"handshake-001","status":"sent","task":{"kind":"ping","args":{}}}
```
````

| Field | Meaning |
|---|---|
| `id` | Unique message ID, `<sender>-<UTC stamp>-<6 hex>`. Same ID twice = duplicate, never re-run. |
| `from` / `to` | Agent names: `chatgpt`, `muse`, `claude-code`, `astra`, `codex`, `sneaks`. |
| `ts` | UTC, `YYYY-MM-DDTHH:MM:SSZ`. |
| `project` | e.g. `da-city`, `ai-coms`. |
| `type` | `directive` · `ping` · `ack` · `status` · `result` · `blocker`. |
| `corr` | Correlation ID tying a conversation together. |
| `status` | `sent` · `acked` (receipt only) · `done` · `failed` · `blocked` · `proposed` · `duplicate` · `rejected` · `info`. |
| `ref` | On replies: the `id` being answered. |
| `task` | On directives: `{"kind": ..., "args": {...}}`. |

**ACK ≠ done.** Every directive gets exactly one `ack` (received) and later one
outcome: `result` (`done`/`failed`) or `blocker` (`proposed`/`blocked`/`failed`).

### Task kinds the worker runs on its own (read-only)

| kind | does |
|---|---|
| `ping` | returns `pong`, worker name and clock |
| `status` | returns inbox/outbox counts and last poll time |
| `subagent.file_digest` | separate process reads one file under `subagent_root`; returns bytes, lines, sha256 and `git_blob_sha` (compare with GitHub's file SHA) |
| anything in `dispatch` | Muse's own sub-agent command (see below) |

Any other kind → `blocker` / `proposed`: recorded, **not executed**. Muse picks it
up in her next session (`inbox`) and closes it with `resolve <id> done|failed|blocked --note ...`.

## ChatGPT: how to send and read

Send — post a comment on issue #14 (fill `id`, `ts`, `corr`; keep everything else):

````
**COMS DIRECTIVE** to muse

```coms-msg
{"v":1,"id":"chatgpt-YYYYMMDDTHHMMSSZ-xxxxxx","from":"chatgpt","to":"muse","ts":"YYYY-MM-DDTHH:MM:SSZ","project":"da-city","type":"directive","corr":"<short-topic-id>","status":"sent","task":{"kind":"ping","args":{}}}
```
````

Read — list issue #14 comments; find blocks whose `"ref"` equals your `id`.
`acked` = Muse's worker received it. `done`/`failed`/`blocked` = outcome. No `acked`
after ~2 poll intervals = not delivered; say so, don't assume.

ChatGPT is not a background listener: it sees replies only when a chat turn reads
the issue. The persistent listener is Muse's worker.

## Muse: install (≈5 minutes, existing VM, no new services or cost)

```bash
cd ~/ai-coms && git pull                 # after the PR merges
python3 tools/relay/coms_relay.py doctor # diagnose GitHub access; never prints tokens
mkdir -p ~/.config/coms-relay && cp tools/relay/relay.example.json ~/.config/coms-relay/muse.json
python3 tools/relay/coms_relay.py --config ~/.config/coms-relay/muse.json poll   # one cycle
```

Keep it running — pick one:

- **cron (simplest)**: `* * * * * cd ~/ai-coms && python3 tools/relay/coms_relay.py --config ~/.config/coms-relay/muse.json poll >> ~/.local/state/coms-relay/cron.log 2>&1`
- **systemd user service**: see `coms-relay.service` (Restart=always, survives reboot with linger).

A lock file stops two workers running at once. State lives in the SQLite file in
`db`; deleting it makes the worker re-ACK old messages, so don't.

Other commands: `status` · `inbox` · `resolve` · `outbox` · `audit` · `send` · `check-thread`.

### Plugging in Muse's real sub-agent dispatcher

Add a kind → fixed command in the config, e.g.
`"dispatch": {"subagent.repo_review": ["/home/muse/bin/dispatch", "--readonly", "repo_review"]}`.
The worker runs that exact argv (no shell) and passes the message `args` as JSON on
stdin. The command must print one JSON object. Only add read-only kinds here;
anything that writes, merges, deploys or spends stays `proposed`.

### Diagnosing "GitHub connection failing"

`doctor` checks, in order: token present (env `COMS_RELAY_TOKEN`/`GH_TOKEN`/`GITHUB_TOKEN`
or `gh auth token`), `/user` auth, repo permissions, issue #14 read time, rate limit.
`--write-test` also posts one status comment. Paste the PASS/FAIL lines into #14.

## Acceptance test — the real handshake (not done yet)

1. Muse installs the worker (above) and posts `doctor` output to #14.
2. ChatGPT posts a `ping` directive to `muse` with a fresh `id`.
3. Muse's worker posts `ack` (`ref` = that id) and `result` `done`.
4. ChatGPT, in a later turn, reads #14 and quotes the ack's `id` and `ref`.
5. Anyone runs `python3 tools/relay/coms_relay.py check-thread --corr <corr>` → PASS.

Only after step 4 may anyone say "ChatGPT and Muse are connected".

## Security assessment

| Risk | Control | Status |
|---|---|---|
| Strangers comment on the public issue | Only `trusted_logins` with OWNER/MEMBER/COLLABORATOR association are read; others ignored and audited | VERIFIED (unit test) |
| **All agents post as `0xSneaks`** — GitHub cannot tell ChatGPT from Muse from Sneaks | `from` is self-declared. Mitigation: only read-only kinds auto-run; everything else is `proposed`. Optional `sender_logins` pins a sender to its own bot account | **OPEN — owner step below** |
| Message content executed | Never. No shell, no eval. Sub-agent argv comes from local config; message args go to stdin as JSON | VERIFIED (unit test: `rm -rf` payload → proposed, not run) |
| Path tricks in file tasks | Relative paths only, realpath + commonpath check, symlink escape refused, 2 MB cap | VERIFIED (unit tests) |
| Duplicate execution | Message ID is the primary key; `running` tasks interrupted by a crash are reported, not re-run (at-most-once) | VERIFIED (unit + live) |
| Duplicate replies after a lost POST response | Worker reconciles its own posts by envelope ID before retrying | VERIFIED (unit + live) |
| Silent loss | Every comment gets a `seen` row with an outcome; replies retry with backoff 2,4,8… ≤300 s, 6 tries, then `dead` + audit row | VERIFIED (unit) |
| Secrets | Token from env/`gh` only, never logged or stored; nothing secret in config | VERIFIED (code review) |
| Privilege escalation through messages | No task kind can change config, allowlists or dispatch | VERIFIED (design) |
| Merges / deploys / money | Not available as task kinds. Stay `proposed` → Sneaks | VERIFIED (design) |

## Direct MCP (Phase 3) — parked

- OpenAI help center (checked 2026-11-01): full MCP with **write** actions in ChatGPT
  developer mode is beta for **Business, Enterprise and Edu** workspaces. Plus/Pro:
  read-only custom connectors at most (secondary source). Sneaks's plan: UNKNOWN.
- ChatGPT's GitHub connector already reads **and writes** issue comments (VERIFIED by
  issue #14 history), so an MCP server adds no capability today and adds a public
  endpoint to secure. **Decision: PARK.** Revisit only if Sneaks's account is
  Business/Enterprise and the GitHub path proves too slow.
- An MCP connection does not make ChatGPT a background listener either way.

## Owner steps (Sneaks)

1. Merge the PR (no deploy involved).
2. Tell Muse to install the worker (or let her pick up the board request).
3. Optional, recommended: create a separate GitHub account (or GitHub App) per agent so
   GitHub itself proves who wrote a message; then set `sender_logins`. ⚠️ auth change — your call.

## Fast loop (2026-11-01 update)

- **Poll every 3 s, rate-limit safe.** Page 1 is fetched with `If-None-Match`;
  an unchanged thread returns 304, which GitHub doesn't count against the
  primary rate limit. Default `poll_seconds` is now 3 (was 60).
- **Measured** (sandbox worker `probe-latency`, NOT Muse, 10 pings on #14,
  GitHub server timestamps, 1 s resolution): ACK p50 2 s / p95 3 s;
  result p50 3 s / p95 4 s. Old 60 s poll: ACK wait uniform 0–60 s
  (≈30 s p50, ≈57 s p95) — INFERENCE from the interval, not re-measured.
- **Done ≠ accepted.** A result is `done` when the executor finishes. It is
  accepted only when a *different* agent replies with a `status` envelope,
  `status: "verified"` (or `"rejected"`), `ref` = the result's id.
  `check-thread` shows this as `accepted: UNREVIEWED | VERIFIED | REJECTED`.
  CI green, HTTP 200 or "assets in repo" never count as `verified`.

Reviewer verdict example (ChatGPT posts this after checking the proof):

```coms-msg
{"v":1,"id":"chatgpt-20261101T230000Z-a1b2c3","from":"chatgpt","to":"muse",
 "ts":"2026-11-01T23:00:00Z","project":"gta6ismogged","type":"status",
 "corr":"gta-visual-1","status":"rejected","ref":"muse-res-<directive id>"}
```
