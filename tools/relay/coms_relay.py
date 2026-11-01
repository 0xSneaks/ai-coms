#!/usr/bin/env python3
"""AI COMS relay: a durable mailbox worker on a GitHub issue thread.

Agents talk by posting issue comments that carry a `coms-msg` envelope:

    ```coms-msg
    {"v":1,"id":"chatgpt-20261101T161500Z-a1b2c3","from":"chatgpt","to":"muse",
     "ts":"2026-11-01T16:15:00Z","project":"ai-coms","type":"directive",
     "corr":"handshake-1","status":"sent","task":{"kind":"ping","args":{}}}
    ```

The worker (run by the receiving agent, e.g. Muse's VM, from cron or systemd)
polls the thread, ACKs each new message once, runs only allowlisted read-only
task kinds, and posts results. Everything is stored in SQLite so restarts,
retries and duplicate deliveries never lose or double-run a task.

Message content is data. It is never passed to a shell or evaluated.
Stdlib only. Python 3.9+.
"""
from __future__ import annotations

import argparse
import contextlib
import datetime as dt
import fcntl
import hashlib
import json
import os
import re
import secrets
import sqlite3
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

VERSION = 1
FENCE_RE = re.compile(r"```coms-msg[ \t]*\r?\n(.*?)\r?\n```", re.S)
ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:-]{5,99}$")
NAME_RE = re.compile(r"^[a-z][a-z0-9-]{1,31}$")
TYPES = {"directive", "ping", "ack", "status", "result", "blocker"}
STATUSES = {"sent", "acked", "done", "failed", "blocked", "proposed",
            "duplicate", "rejected", "info", "verified"}
# Reviewer verdicts on a result. "done" = executor finished; only a DIFFERENT
# agent's "verified" makes it accepted. CI green / HTTP 200 is not acceptance.
VERDICTS = {"verified", "rejected"}
EXECUTABLE_TYPES = {"directive", "ping"}
BUILTIN_KINDS = {"ping", "status", "subagent.file_digest"}
MAX_BODY = 60000          # GitHub comment limit is 65536
MAX_FILE = 2 * 1024 * 1024

DEFAULTS = {
    "agent": "muse",
    "repo": "0xSneaks/ai-coms",
    "issue": 14,
    "api": "https://api.github.com",
    "trusted_logins": ["0xSneaks"],
    "trusted_associations": ["OWNER", "MEMBER", "COLLABORATOR"],
    "allowed_senders": ["chatgpt", "claude-code", "claude", "astra", "codex", "sneaks"],
    "sender_logins": {},          # optional strict map, e.g. {"chatgpt": "sneaks-chatgpt-bot"}
    "db": "~/.local/state/coms-relay/relay.db",
    "poll_seconds": 3,            # cheap: unchanged polls are ETag 304s (not rate-limited)
    "max_attempts": 6,
    "backoff_base": 2,
    "backoff_cap": 300,
    "subagent_root": "",          # local checkout the read-only sub-agent may read
    "subagent_timeout": 60,
    "dispatch": {},               # kind -> fixed argv list; args go to stdin as JSON
    "write": True,                # False = read-only probe; replies stay in outbox
}


# ---------------------------------------------------------------- helpers

def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_ts(s: str) -> float:
    return dt.datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ").replace(
        tzinfo=dt.timezone.utc).timestamp()


def new_id(sender: str) -> str:
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    return f"{sender}-{stamp}-{secrets.token_hex(3)}"


def git_blob_sha(data: bytes) -> str:
    """Same SHA GitHub's contents API reports, so anyone can cross-check."""
    return hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()


NOT_MODIFIED = object()


class EnvelopeError(ValueError):
    pass


def extract(body: str):
    """Return the parsed envelope dict, None if the comment has no envelope.
    Raises EnvelopeError if an envelope is present but malformed."""
    m = FENCE_RE.search(body or "")
    if not m:
        return None
    try:
        env = json.loads(m.group(1))
    except json.JSONDecodeError as e:
        raise EnvelopeError(f"bad JSON: {e.msg}") from None
    validate(env)
    return env


def validate(env) -> None:
    if not isinstance(env, dict):
        raise EnvelopeError("envelope must be an object")
    for k in ("v", "id", "from", "to", "ts", "project", "type", "corr", "status"):
        if k not in env:
            raise EnvelopeError(f"missing field: {k}")
    if env["v"] != VERSION:
        raise EnvelopeError("unsupported version")
    if not isinstance(env["id"], str) or not ID_RE.match(env["id"]):
        raise EnvelopeError("bad id")
    if not isinstance(env["corr"], str) or not ID_RE.match(env["corr"]):
        raise EnvelopeError("bad corr")
    for k in ("from", "to"):
        if not isinstance(env[k], str) or not NAME_RE.match(env[k]):
            raise EnvelopeError(f"bad {k}")
    if env["type"] not in TYPES:
        raise EnvelopeError("bad type")
    if env["status"] not in STATUSES:
        raise EnvelopeError("bad status")
    try:
        parse_ts(env["ts"])
    except (TypeError, ValueError):
        raise EnvelopeError("ts must be UTC like 2026-11-01T16:15:00Z") from None
    if not isinstance(env["project"], str) or not 0 < len(env["project"]) <= 64:
        raise EnvelopeError("bad project")
    if "ref" in env and (not isinstance(env["ref"], str) or not ID_RE.match(env["ref"])):
        raise EnvelopeError("bad ref")
    task = env.get("task")
    if task is not None:
        if not isinstance(task, dict) or not isinstance(task.get("kind"), str):
            raise EnvelopeError("task.kind required")
        if not re.match(r"^[a-z][a-z0-9_.-]{1,63}$", task["kind"]):
            raise EnvelopeError("bad task.kind")
        if not isinstance(task.get("args", {}), dict):
            raise EnvelopeError("task.args must be an object")
    if env["type"] == "directive" and task is None:
        raise EnvelopeError("directive needs task")


def render(env: dict, note: str = "") -> str:
    validate(env)
    head = (f"**COMS {env['type'].upper()}** `{env['id']}` · {env['from']} → {env['to']}"
            f" · {env['status']}")
    if env.get("ref"):
        head += f" · re `{env['ref']}`"
    parts = [head]
    if note:
        parts.append(note.strip()[:4000])
    parts.append("```coms-msg\n" + json.dumps(env, sort_keys=True, separators=(",", ":"))
                 + "\n```")
    body = "\n\n".join(parts)
    if len(body) > MAX_BODY:
        raise EnvelopeError("message too large")
    return body


# -------------------------------------------------------------- transport

class TransientError(Exception):
    pass


class AuthError(Exception):
    pass


def resolve_token() -> str:
    for var in ("COMS_RELAY_TOKEN", "GH_TOKEN", "GITHUB_TOKEN"):
        if os.environ.get(var):
            return os.environ[var]
    try:
        out = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True,
                             timeout=15)
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout.strip()
    except (OSError, subprocess.TimeoutExpired):
        pass
    return ""


class GitHub:
    """Minimal REST client for one issue thread. Never logs the token."""

    def __init__(self, repo: str, issue: int, api: str = "https://api.github.com",
                 token: str | None = None, timeout: float = 20):
        self.repo, self.issue, self.api = repo, int(issue), api.rstrip("/")
        self.cred = resolve_token() if token is None else token
        self.timeout = timeout
        self.last_headers: dict = {}
        self._etags: dict = {}   # url -> (etag, parsed comments), for conditional GETs

    def _req(self, method: str, path: str, data=None, etag: str | None = None):
        url = path if path.startswith("http") else self.api + path
        body = json.dumps(data).encode() if data is not None else None
        req = urllib.request.Request(url, data=body, method=method)
        req.add_header("Accept", "application/vnd.github+json")
        req.add_header("X-GitHub-Api-Version", "2022-11-28")
        req.add_header("User-Agent", "ai-coms-relay")
        if self.cred:
            req.add_header("Authorization", "Bearer " + self.cred)
        if body is not None:
            req.add_header("Content-Type", "application/json")
        if etag:
            req.add_header("If-None-Match", etag)
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                self.last_headers = dict(r.headers)
                return json.loads(r.read() or b"null"), r.headers
        except urllib.error.HTTPError as e:
            self.last_headers = dict(e.headers or {})
            hdrs = e.headers or {}
            if e.code == 304 and etag:
                return NOT_MODIFIED, hdrs
            rate_limited = hdrs.get("X-RateLimit-Remaining") == "0" or hdrs.get("Retry-After")
            if e.code in (401, 404) or (e.code == 403 and not rate_limited):
                raise AuthError(f"HTTP {e.code} on {method} {urllib.parse.urlparse(url).path}") from None
            raise TransientError(f"HTTP {e.code}") from None
        except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as e:
            raise TransientError(f"network: {type(e).__name__}") from None

    def list_comments(self, since: str | None = None):
        q = {"per_page": "100"}
        if since:
            q["since"] = since
        url = f"/repos/{self.repo}/issues/{self.issue}/comments?" + urllib.parse.urlencode(q)
        first = url
        cached = self._etags.get(first)
        out = []
        for _ in range(50):  # hard page cap
            # Conditional GET on page 1 only: a 304 costs no primary rate limit,
            # which is what makes a 2-3 s poll interval safe.
            page, headers = self._req("GET", url, etag=cached[0] if (cached and url == first) else None)
            if page is NOT_MODIFIED:
                return list(cached[1])
            out.extend(page or [])
            nxt = re.search(r'<([^>]+)>;\s*rel="next"', headers.get("Link", "") or "")
            if not nxt:
                break
            url = nxt.group(1)
        res = [{"id": c["id"], "body": c.get("body") or "", "created_at": c["created_at"],
                "updated_at": c.get("updated_at", c["created_at"]),
                "login": (c.get("user") or {}).get("login", ""),
                "association": c.get("author_association", ""),
                "url": c.get("html_url", "")} for c in out]
        tag = (headers or {}).get("ETag")
        if tag and url == first:   # single page only; multi-page responses aren't cached
            self._etags = {first: (tag, res)}
        return res

    def post_comment(self, body: str):
        if not self.cred:
            raise AuthError("no token for write")
        c, _ = self._req("POST", f"/repos/{self.repo}/issues/{self.issue}/comments",
                         {"body": body})
        return {"id": c["id"], "url": c.get("html_url", ""), "created_at": c["created_at"]}


# ------------------------------------------------------------------ store

SCHEMA = """
CREATE TABLE IF NOT EXISTS seen (comment_id INTEGER PRIMARY KEY, outcome TEXT NOT NULL,
  msg_id TEXT, seen_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS inbox (msg_id TEXT PRIMARY KEY, comment_id INTEGER NOT NULL,
  sender TEXT NOT NULL, type TEXT NOT NULL, corr TEXT NOT NULL, project TEXT NOT NULL,
  kind TEXT, args TEXT, sent_ts TEXT NOT NULL, comment_created_at TEXT NOT NULL,
  detected_at TEXT NOT NULL, state TEXT NOT NULL, result TEXT, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS outbox (id INTEGER PRIMARY KEY AUTOINCREMENT,
  msg_id TEXT UNIQUE NOT NULL, body TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
  next_at REAL NOT NULL DEFAULT 0, state TEXT NOT NULL DEFAULT 'pending',
  last_error TEXT, comment_id INTEGER, created_at TEXT NOT NULL, sent_at TEXT);
CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL,
  event TEXT NOT NULL, detail TEXT);
"""


class Store:
    def __init__(self, path: str):
        path = os.path.expanduser(path)
        if path != ":memory:":
            os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
        self.db = sqlite3.connect(path, isolation_level=None, timeout=30)
        self.db.row_factory = sqlite3.Row
        self.db.execute("PRAGMA journal_mode=WAL")
        self.db.execute("PRAGMA synchronous=FULL")
        self.db.executescript(SCHEMA)

    @contextlib.contextmanager
    def tx(self):
        self.db.execute("BEGIN IMMEDIATE")
        try:
            yield self.db
            self.db.execute("COMMIT")
        except BaseException:
            self.db.execute("ROLLBACK")
            raise

    def audit(self, event: str, detail: str = "", db=None):
        (db or self.db).execute("INSERT INTO audit(ts,event,detail) VALUES(?,?,?)",
                                (now_iso(), event, detail[:2000]))

    def get(self, k, default=None):
        r = self.db.execute("SELECT v FROM kv WHERE k=?", (k,)).fetchone()
        return r[0] if r else default

    def put(self, k, v, db=None):
        (db or self.db).execute("INSERT INTO kv(k,v) VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=?",
                                (k, v, v))


# ----------------------------------------------------------------- worker

class Relay:
    def __init__(self, cfg: dict, gh=None, store: Store | None = None, clock=time.time):
        self.cfg = {**DEFAULTS, **cfg}
        self.me = self.cfg["agent"]
        if not NAME_RE.match(self.me):
            raise ValueError("bad agent name")
        self.gh = gh or GitHub(self.cfg["repo"], self.cfg["issue"], self.cfg["api"])
        self.store = store or Store(self.cfg["db"])
        self.clock = clock

    # ---- outgoing
    def queue(self, to: str, type_: str, status: str, corr: str, project: str,
              msg_id: str | None = None, ref: str | None = None, task=None,
              result=None, note: str = "", db=None) -> str:
        env = {"v": VERSION, "id": msg_id or new_id(self.me), "from": self.me, "to": to,
               "ts": now_iso(), "project": project, "type": type_, "corr": corr,
               "status": status}
        if ref:
            env["ref"] = ref
        if task is not None:
            env["task"] = task
        if result is not None:
            env["result"] = result
        body = render(env, note)
        (db or self.store.db).execute(
            "INSERT OR IGNORE INTO outbox(msg_id,body,created_at) VALUES(?,?,?)",
            (env["id"], body, now_iso()))
        return env["id"]

    def flush(self) -> dict:
        sent = failed = 0
        if not self.cfg["write"]:
            return {"sent": 0, "failed": 0, "skipped": "write disabled"}
        rows = self.store.db.execute(
            "SELECT * FROM outbox WHERE state='pending' AND next_at<=? ORDER BY id",
            (self.clock(),)).fetchall()
        for r in rows:
            try:
                c = self.gh.post_comment(r["body"])
            except TransientError as e:
                attempts = r["attempts"] + 1
                if attempts >= self.cfg["max_attempts"]:
                    with self.store.tx() as db:
                        db.execute("UPDATE outbox SET state='dead',attempts=?,last_error=? WHERE id=?",
                                   (attempts, str(e), r["id"]))
                        self.store.audit("outbox_dead", f"{r['msg_id']}: {e}", db)
                else:
                    delay = min(self.cfg["backoff_cap"], self.cfg["backoff_base"] ** attempts)
                    with self.store.tx() as db:
                        db.execute("UPDATE outbox SET attempts=?,next_at=?,last_error=? WHERE id=?",
                                   (attempts, self.clock() + delay, str(e), r["id"]))
                        self.store.audit("outbox_retry", f"{r['msg_id']} in {delay}s: {e}", db)
                failed += 1
                continue
            with self.store.tx() as db:
                db.execute("UPDATE outbox SET state='sent',attempts=attempts+1,comment_id=?,sent_at=?,"
                           "last_error=NULL WHERE id=?", (c["id"], now_iso(), r["id"]))
                self.store.audit("outbox_sent", f"{r['msg_id']} -> comment {c['id']}", db)
            sent += 1
        return {"sent": sent, "failed": failed}

    # ---- incoming
    def _trusted(self, c: dict) -> bool:
        return (c["login"] in self.cfg["trusted_logins"]
                and c["association"] in self.cfg["trusted_associations"])

    def ingest(self, comments) -> dict:
        counts: dict = {}
        for c in sorted(comments, key=lambda c: c["id"]):
            if self.store.db.execute("SELECT 1 FROM seen WHERE comment_id=?", (c["id"],)).fetchone():
                continue
            outcome, msg_id = self._classify(c)
            counts[outcome] = counts.get(outcome, 0) + 1
        return counts

    def _classify(self, c: dict):
        try:
            env = extract(c["body"])
        except EnvelopeError as e:
            with self.store.tx() as db:
                self._seen(db, c, "invalid")
                self.store.audit("invalid", f"comment {c['id']}: {e}", db)
            return "invalid", None
        if env is None:
            with self.store.tx() as db:
                self._seen(db, c, "unstructured")
            return "unstructured", None
        if not self._trusted(c):
            with self.store.tx() as db:
                self._seen(db, c, "untrusted", env["id"])
                self.store.audit("untrusted", f"comment {c['id']} by {c['login']}/{c['association']}"
                                 f" claimed from={env['from']}", db)
            return "untrusted", env["id"]
        if env["from"] == self.me:
            # Our own post seen on the thread: reconcile so a lost POST response
            # is never re-posted as a duplicate.
            with self.store.tx() as db:
                db.execute("UPDATE outbox SET state='sent',comment_id=?,sent_at=COALESCE(sent_at,?) "
                           "WHERE msg_id=? AND state!='sent'", (c["id"], now_iso(), env["id"]))
                self._seen(db, c, "own", env["id"])
            return "own", env["id"]
        if env["to"] != self.me:
            with self.store.tx() as db:
                self._seen(db, c, "not_for_me", env["id"])
            return "not_for_me", env["id"]
        strict = self.cfg["sender_logins"].get(env["from"])
        if env["from"] not in self.cfg["allowed_senders"] or (strict and strict != c["login"]):
            with self.store.tx() as db:
                self._seen(db, c, "rejected_sender", env["id"])
                self.store.audit("rejected_sender", f"{env['id']} from={env['from']} login={c['login']}", db)
                self.queue(env["from"] if NAME_RE.match(env["from"]) else "sneaks", "blocker",
                           "rejected", env["corr"], env["project"], msg_id=f"{self.me}-rej-{c['id']}",
                           ref=env["id"], note="Sender not allowed by relay config. Not executed.", db=db)
            return "rejected_sender", env["id"]
        with self.store.tx() as db:
            dup = db.execute("SELECT state FROM inbox WHERE msg_id=?", (env["id"],)).fetchone()
            if dup:
                self._seen(db, c, "duplicate", env["id"])
                self.store.audit("duplicate", f"{env['id']} again in comment {c['id']} (state {dup[0]})", db)
                self.queue(env["from"], "ack", "duplicate", env["corr"], env["project"],
                           msg_id=f"{self.me}-dup-{c['id']}", ref=env["id"],
                           note=f"Already received; not executed again. Current state: {dup[0]}.", db=db)
                return "duplicate", env["id"]
            task = env.get("task") or {}
            db.execute("INSERT INTO inbox(msg_id,comment_id,sender,type,corr,project,kind,args,sent_ts,"
                       "comment_created_at,detected_at,state,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                       (env["id"], c["id"], env["from"], env["type"], env["corr"], env["project"],
                        task.get("kind"), json.dumps(task.get("args", {})), env["ts"],
                        c["created_at"], now_iso(), "received", now_iso()))
            self._seen(db, c, "accepted", env["id"])
            lag = max(0, round(time.time() - parse_ts(c["created_at"])))
            self.queue(env["from"], "ack", "acked", env["corr"], env["project"],
                       msg_id=f"{self.me}-ack-{c['id']}", ref=env["id"],
                       note=f"Received `{env['id']}` (comment {c['id']}). ACK = receipt only, not "
                            f"completion. Detected ~{lag}s after posting.", db=db)
            self.store.audit("accepted", f"{env['id']} type={env['type']} kind={task.get('kind')}", db)
        return "accepted", env["id"]

    def _seen(self, db, c, outcome, msg_id=None):
        db.execute("INSERT OR IGNORE INTO seen(comment_id,outcome,msg_id,seen_at) VALUES(?,?,?,?)",
                   (c["id"], outcome, msg_id, now_iso()))

    # ---- execution (at most once per msg_id)
    def kinds(self) -> set:
        return BUILTIN_KINDS | set(self.cfg["dispatch"])

    def execute_pending(self) -> dict:
        counts: dict = {}
        # A task left 'running' means the worker died mid-task. Do not re-run it:
        # report it so the sender decides. This is what keeps execution at most once.
        with self.store.tx() as db:
            for r in db.execute("SELECT * FROM inbox WHERE state='running'").fetchall():
                db.execute("UPDATE inbox SET state='failed',result=?,updated_at=? WHERE msg_id=?",
                           (json.dumps({"error": "interrupted by restart; not re-run"}), now_iso(), r["msg_id"]))
                self.queue(r["sender"], "blocker", "failed", r["corr"], r["project"],
                           msg_id=f"{self.me}-res-{r['msg_id']}", ref=r["msg_id"],
                           result={"error": "interrupted by restart; not re-run"},
                           note="Worker restarted mid-task. Not re-run automatically; resend with a new id to retry.",
                           db=db)
        rows = self.store.db.execute("SELECT * FROM inbox WHERE state='received' ORDER BY comment_id").fetchall()
        for r in rows:
            if r["type"] not in EXECUTABLE_TYPES:
                with self.store.tx() as db:
                    db.execute("UPDATE inbox SET state='noted',updated_at=? WHERE msg_id=?", (now_iso(), r["msg_id"]))
                counts["noted"] = counts.get("noted", 0) + 1
                continue
            kind = r["kind"] or "ping"
            if kind not in self.kinds():
                with self.store.tx() as db:
                    db.execute("UPDATE inbox SET state='proposed',updated_at=? WHERE msg_id=?", (now_iso(), r["msg_id"]))
                    self.queue(r["sender"], "blocker", "proposed", r["corr"], r["project"],
                               msg_id=f"{self.me}-res-{r['msg_id']}", ref=r["msg_id"],
                               note=f"Task kind `{kind}` is not on this relay's auto-run allowlist. "
                                    f"Recorded as PROPOSED for {self.me}'s next session; nothing executed. "
                                    f"{self.me} reports done/failed/blocked with `resolve`.", db=db)
                counts["proposed"] = counts.get("proposed", 0) + 1
                continue
            with self.store.tx() as db:
                cur = db.execute("UPDATE inbox SET state='running',updated_at=? WHERE msg_id=? AND state='received'",
                                 (now_iso(), r["msg_id"]))
                if cur.rowcount != 1:
                    continue
            t0 = time.time()
            try:
                result, ok = self.run_task(kind, json.loads(r["args"] or "{}")), True
            except Exception as e:  # report, never crash the loop
                result, ok = {"error": f"{type(e).__name__}: {e}"[:500]}, False
            result["elapsed_ms"] = round((time.time() - t0) * 1000)
            with self.store.tx() as db:
                db.execute("UPDATE inbox SET state=?,result=?,updated_at=? WHERE msg_id=?",
                           ("done" if ok else "failed", json.dumps(result), now_iso(), r["msg_id"]))
                self.queue(r["sender"], "result", "done" if ok else "failed", r["corr"], r["project"],
                           msg_id=f"{self.me}-res-{r['msg_id']}", ref=r["msg_id"], result=result,
                           note=f"Task `{kind}` {'completed' if ok else 'FAILED'}.", db=db)
            counts["done" if ok else "failed"] = counts.get("done" if ok else "failed", 0) + 1
        return counts

    def run_task(self, kind: str, args: dict) -> dict:
        if kind == "ping":
            return {"pong": True, "agent": self.me, "worker_time": now_iso()}
        if kind == "status":
            return self.status()
        if kind == "subagent.file_digest":
            return self.spawn([sys.executable, "-I", os.path.abspath(__file__), "subagent-file-digest",
                               "--root", self.cfg["subagent_root"]], args)
        argv = self.cfg["dispatch"][kind]
        if not isinstance(argv, list) or not all(isinstance(a, str) for a in argv):
            raise ValueError("dispatch entry must be an argv list")
        return self.spawn(argv, args)

    def spawn(self, argv, args: dict) -> dict:
        """Run a sub-agent as a separate process. argv comes from local config only;
        message args are passed as JSON on stdin, never on the command line or a shell."""
        p = subprocess.run(argv, input=json.dumps(args), capture_output=True, text=True,
                           timeout=self.cfg["subagent_timeout"], shell=False)
        if p.returncode != 0:
            raise RuntimeError(f"sub-agent exit {p.returncode}: {p.stderr.strip()[-300:]}")
        out = json.loads(p.stdout)
        if not isinstance(out, dict):
            raise RuntimeError("sub-agent must print a JSON object")
        return out

    # ---- cycle
    def cycle(self) -> dict:
        # Read first: ingest reconciles our own already-posted messages, so a POST
        # whose response was lost is marked sent instead of being posted twice.
        report = {}
        since = self.store.get("since")
        comments = self.gh.list_comments(since)
        report["fetched"] = len(comments)
        report["ingest"] = self.ingest(comments)
        if comments:
            newest = max(c["updated_at"] for c in comments)
            # 2 min overlap: `since` is by update time and clocks skew; `seen` dedupes.
            back = dt.datetime.fromtimestamp(parse_ts(newest) - 120, dt.timezone.utc)
            self.store.put("since", back.strftime("%Y-%m-%dT%H:%M:%SZ"))
        report["exec"] = self.execute_pending()
        report["flush"] = self.flush()
        self.store.put("last_cycle", now_iso())
        return report

    def status(self) -> dict:
        q = self.store.db.execute
        return {
            "agent": self.me,
            "inbox": dict(q("SELECT state, COUNT(*) FROM inbox GROUP BY state").fetchall()),
            "outbox": dict(q("SELECT state, COUNT(*) FROM outbox GROUP BY state").fetchall()),
            "last_cycle": self.store.get("last_cycle"),
        }

    def resolve(self, msg_id: str, status: str, note: str) -> str:
        if status not in ("done", "failed", "blocked"):
            raise ValueError("status must be done, failed or blocked")
        with self.store.tx() as db:
            r = db.execute("SELECT * FROM inbox WHERE msg_id=?", (msg_id,)).fetchone()
            if not r:
                raise KeyError(msg_id)
            if r["state"] not in ("proposed", "received"):
                raise ValueError(f"already {r['state']}")
            db.execute("UPDATE inbox SET state=?,result=?,updated_at=? WHERE msg_id=?",
                       (status, json.dumps({"note": note}), now_iso(), msg_id))
            return self.queue(r["sender"], "result" if status == "done" else "blocker", status,
                              r["corr"], r["project"], msg_id=f"{self.me}-fin-{msg_id}", ref=msg_id,
                              note=note, db=db)


# ------------------------------------------------------- read-only subagent

def subagent_file_digest(root: str, args: dict) -> dict:
    """Read one file under `root` and return digests. Read-only; refuses anything
    outside root (.., absolute paths, symlink escapes) and large files."""
    if not root:
        raise ValueError("subagent_root not configured")
    root = os.path.expanduser(root)
    path = args.get("path")
    if not isinstance(path, str) or not path or path.startswith("/") or "\0" in path:
        raise ValueError("path must be a relative path")
    base = os.path.realpath(root)
    full = os.path.realpath(os.path.join(base, path))
    if os.path.commonpath([base, full]) != base or not os.path.isfile(full):
        raise ValueError("path outside root or not a file")
    if os.path.getsize(full) > MAX_FILE:
        raise ValueError("file too large")
    with open(full, "rb") as f:
        data = f.read()
    text = data.decode("utf-8", "replace")
    first = next((ln for ln in text.splitlines() if ln.strip()), "")[:120]
    return {"path": path, "bytes": len(data), "lines": text.count("\n"),
            "sha256": hashlib.sha256(data).hexdigest(), "git_blob_sha": git_blob_sha(data),
            "first_line": first, "subagent": "file_digest", "pid": os.getpid()}


# -------------------------------------------------------------------- doctor

def doctor(cfg: dict, write_test: bool = False) -> int:
    """Diagnose GitHub access without printing secrets."""
    cfg = {**DEFAULTS, **cfg}
    ok = True

    def line(name, passed, detail=""):
        nonlocal ok
        ok = ok and passed
        print(f"{'PASS' if passed else 'FAIL'}  {name}  {detail}".rstrip())

    cred = resolve_token()
    src = next((v for v in ("COMS_RELAY_TOKEN", "GH_TOKEN", "GITHUB_TOKEN") if os.environ.get(v)),
               "gh auth token" if cred else "none")
    line("token present", bool(cred), f"source={src}")
    gh = GitHub(cfg["repo"], cfg["issue"], cfg["api"], token=cred)
    t0 = time.time()
    try:
        me, h = gh._req("GET", "/user")
        line("auth /user", True, f"login={me.get('login')} scopes={h.get('X-OAuth-Scopes', 'n/a (fine-grained)')}"
                                 f" {round((time.time()-t0)*1000)}ms")
    except (AuthError, TransientError) as e:
        line("auth /user", False, str(e))
    try:
        repo, _ = gh._req("GET", f"/repos/{cfg['repo']}")
        perms = repo.get("permissions") or {}
        line("repo access", bool(perms.get("push") or perms.get("triage")),
             f"perms={','.join(k for k, v in perms.items() if v) or 'read-only'}")
    except (AuthError, TransientError) as e:
        line("repo access", False, str(e))
    try:
        t0 = time.time()
        cs = gh.list_comments()
        line("issue read", True, f"#{cfg['issue']} comments={len(cs)} {round((time.time()-t0)*1000)}ms")
    except (AuthError, TransientError) as e:
        line("issue read", False, str(e))
    try:
        rl, _ = gh._req("GET", "/rate_limit")
        core = rl["resources"]["core"]
        line("rate limit", core["remaining"] > 50, f"{core['remaining']}/{core['limit']}")
    except (AuthError, TransientError, KeyError) as e:
        line("rate limit", False, str(e))
    if write_test:
        try:
            env = {"v": 1, "id": new_id(cfg["agent"]), "from": cfg["agent"], "to": "sneaks",
                   "ts": now_iso(), "project": "ai-coms", "type": "status", "corr": "doctor",
                   "status": "info"}
            c = gh.post_comment(render(env, "Relay doctor write test."))
            line("issue write", True, f"comment {c['id']}")
        except (AuthError, TransientError, EnvelopeError) as e:
            line("issue write", False, str(e))
    return 0 if ok else 1


# --------------------------------------------------------------- thread audit

def check_thread(comments, corr: str | None = None) -> list:
    """Independent audit of a thread: every directive must have exactly one ACK,
    one outcome (result/blocker), and a duplicate-ACK per extra delivery."""
    envs = []
    for c in comments:
        try:
            e = extract(c["body"])
        except EnvelopeError:
            continue
        if e and (corr is None or e["corr"] == corr):
            envs.append(e)
    rows, seen = [], {}
    for e in envs:
        if e["type"] in EXECUTABLE_TYPES:
            seen[e["id"]] = seen.get(e["id"], 0) + 1
    for mid, n in seen.items():
        refs = [e for e in envs if e.get("ref") == mid]
        acks = sum(1 for e in refs if e["type"] == "ack" and e["status"] == "acked")
        dups = sum(1 for e in refs if e["status"] == "duplicate")
        outs = [e["status"] for e in refs if e["type"] in ("result", "blocker")]
        final = [s for s in outs if s in ("done", "failed", "blocked")]
        ok = acks == 1 and dups == n - 1 and len(final) <= 1 and len(outs) >= 1
        # Acceptance is separate from delivery: needs a verdict on the result
        # from someone other than the executor. Latest verdict wins.
        res = [e for e in refs if e["type"] in ("result", "blocker")]
        accepted = "UNREVIEWED"
        for r_env in res:
            for v in envs:
                if (v.get("ref") == r_env["id"] and v["status"] in VERDICTS
                        and v["from"] != r_env["from"]):
                    accepted = "VERIFIED" if v["status"] == "verified" else "REJECTED"
        rows.append({"msg_id": mid, "deliveries": n, "acks": acks, "duplicate_acks": dups,
                     "outcomes": outs, "verdict": "PASS" if ok else ("PENDING" if acks <= 1 and not outs else "FAIL"),
                     "accepted": accepted})
    return rows


# ----------------------------------------------------------------------- CLI

def load_cfg(path: str | None) -> dict:
    if not path:
        return {}
    with open(os.path.expanduser(path)) as f:
        return json.load(f)


@contextlib.contextmanager
def single_instance(db_path: str):
    p = os.path.expanduser(db_path) + ".lock"
    os.makedirs(os.path.dirname(p) or ".", exist_ok=True)
    with open(p, "w") as f:
        try:
            fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print("another relay worker holds the lock; exiting", file=sys.stderr)
            sys.exit(0)
        yield


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--config", help="JSON config (see relay.example.json)")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("poll", help="one cycle: send pending, read, ack, run, send")
    r = sub.add_parser("run", help="loop forever")
    r.add_argument("--cycles", type=int, default=0, help="stop after N cycles (0 = forever)")
    s = sub.add_parser("send", help="queue + send one message")
    s.add_argument("--to", required=True)
    s.add_argument("--type", required=True, choices=sorted(TYPES))
    s.add_argument("--status", default="sent", choices=sorted(STATUSES))
    s.add_argument("--project", default="ai-coms")
    s.add_argument("--corr")
    s.add_argument("--kind")
    s.add_argument("--args", default="{}")
    s.add_argument("--note", default="")
    sub.add_parser("status")
    sub.add_parser("inbox", help="list messages waiting on this agent (proposed/received)")
    rs = sub.add_parser("resolve", help="report done/failed/blocked for a proposed task")
    rs.add_argument("msg_id")
    rs.add_argument("status", choices=["done", "failed", "blocked"])
    rs.add_argument("--note", required=True)
    o = sub.add_parser("outbox", help="show unsent messages")
    o.add_argument("--all", action="store_true")
    a = sub.add_parser("audit")
    a.add_argument("-n", type=int, default=30)
    d = sub.add_parser("doctor", help="diagnose GitHub access (never prints tokens)")
    d.add_argument("--write-test", action="store_true")
    sd = sub.add_parser("subagent-file-digest")
    sd.add_argument("--root", required=True)
    ct = sub.add_parser("check-thread", help="audit: one ACK + one outcome per directive")
    ct.add_argument("--corr")
    args = ap.parse_args(argv)

    if args.cmd == "subagent-file-digest":
        print(json.dumps(subagent_file_digest(args.root, json.load(sys.stdin))))
        return 0
    cfg = load_cfg(args.config)
    if args.cmd == "doctor":
        return doctor(cfg, args.write_test)
    if args.cmd == "check-thread":
        c = {**DEFAULTS, **cfg}
        rows = check_thread(GitHub(c["repo"], c["issue"], c["api"]).list_comments(), args.corr)
        for r in rows:
            print(json.dumps(r))
        return 0 if all(r["verdict"] == "PASS" for r in rows) else 1
    relay = Relay(cfg)
    if args.cmd in ("poll", "run", "send"):
        with single_instance(relay.cfg["db"]):
            if args.cmd == "send":
                task = None
                if args.kind:
                    task = {"kind": args.kind, "args": json.loads(args.args)}
                mid = relay.queue(args.to, args.type, args.status, args.corr or new_id(relay.me),
                                  args.project, task=task, note=args.note)
                print(json.dumps({"queued": mid, **relay.flush()}))
                return 0
            n = 0
            while True:
                try:
                    print(json.dumps({"ts": now_iso(), **relay.cycle()}), flush=True)
                except TransientError as e:
                    print(json.dumps({"ts": now_iso(), "transient": str(e)}), flush=True)
                except AuthError as e:
                    print(json.dumps({"ts": now_iso(), "auth_error": str(e)}), flush=True)
                    return 2
                n += 1
                if args.cmd == "poll" or (args.cycles and n >= args.cycles):
                    return 0
                time.sleep(relay.cfg["poll_seconds"])
    if args.cmd == "status":
        print(json.dumps(relay.status(), indent=2))
    elif args.cmd == "inbox":
        for r in relay.store.db.execute("SELECT msg_id,sender,type,kind,state,corr,comment_id FROM inbox "
                                        "WHERE state IN ('proposed','received') ORDER BY comment_id"):
            print(json.dumps(dict(r)))
    elif args.cmd == "resolve":
        print(json.dumps({"queued": relay.resolve(args.msg_id, args.status, args.note)}))
    elif args.cmd == "outbox":
        cond = "" if args.all else "WHERE state!='sent'"
        for r in relay.store.db.execute(f"SELECT id,msg_id,state,attempts,last_error,comment_id,body FROM outbox {cond} ORDER BY id"):
            print(json.dumps(dict(r)))
    elif args.cmd == "audit":
        for r in relay.store.db.execute("SELECT * FROM audit ORDER BY id DESC LIMIT ?", (args.n,)):
            print(f"{r['ts']}  {r['event']:<16} {r['detail']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
