# Handoff — muse-control-plane P0 `termux_exec` — claude-code — 2026-10-25 23:00 ET

**Session goal:** chatgpt → claude-code: READ-ONLY triage of P0 remote `termux_exec`; propose execution-level remote deny + negative tests. No code push, no deploy.
**Status:** DONE (proposal + tests). Not pushed: auth change → needs "✅ Sneaks APPROVED the build".
**Repo:** 0xSneaks/seeker-bridge @ main 540340a (read-only clone; Sneaks approved adding it 2026-10-25)

## Confirmed (VERIFIED, source)
- `muse-seeker-remote/proxy.py` `_forward()` checks the bearer token, then forwards the POST body unread. There is no per-tool check.
- `muse-seeker-bridge/server.py:597` `termux_exec` runs `[sh, "-c", command]` as the Termux user, with any command string → anyone holding the token gets a shell on the phone.
- The bridge exposes **13 tools**. `proxy.py`'s docstring still says "the only exposed tools remain the six read-only ones", which is **stale/wrong** (it now includes `termux_exec` plus 3 notification write tools and `agora_ask`).
- ChatGPT's P0 is accurate.

## Proposal (deny by default at the proxy)
- Before forwarding, parse the POST body as JSON-RPC. For any `tools/call` (single, or anywhere inside a batch) whose `params.name` is not in `REMOTE_TOOL_ALLOWLIST`, return 403 and never forward.
- Refuse non-JSON bodies (400), empty batches (400) and bodies over 1 MiB (413).
- Allowlist (read-only): android_identity, android_model, android_version, android_packages, android_notifications, android_battery, get_app_notification_state, agora_models.
- Denied remotely: termux_exec, mute/unmute/clear notifications, agora_ask, and any tool added later.
- The local path on 127.0.0.1:8765 is unchanged.
- Not included: filtering the `tools/list` response, because it is SSE-streamed and filtering it would mean buffering. The execution-level deny is the control that matters.

## Tests (stdlib unittest, fake upstream records what it receives)
- Patched proxy: **7/7 OK**.
- Unpatched proxy: **4 FAIL** (mutation check: the tests catch the hole).
- Covered:
  - termux_exec with a valid token → 403, nothing forwarded;
  - write and unknown tools → 403;
  - a batch with one denied call → whole batch 403;
  - malformed bodies → 400/403;
  - no token → 401;
  - an allowed tool → forwarded;
  - initialize, tools/list and notifications → forwarded.

## Sneaks decides
1. "✅ Sneaks APPROVED the build" on the request line → I push this to a branch + **draft PR** on seeker-bridge. I won't merge it, restart the phone service or touch the token.
2. Should agora_ask or the mute/unmute/clear tools be reachable remotely? Default: no (not on the list).
3. Deploying it means restarting the proxy on the phone. That's your step.

## Patch (proxy.py)
```diff
--- /home/user/seeker-bridge/muse-seeker-remote/proxy.py	2026-10-26 02:57:58.978494906 +0000
+++ proxy.py	2026-10-26 02:58:23.600928739 +0000
@@ -13,8 +13,13 @@
   - Comparison is constant-time (SHA-256 digests + hmac.compare_digest).
   - Missing/invalid token -> HTTP 401 and the request is NEVER forwarded.
   - The Authorization header is never logged and never sent upstream.
-  - Stdlib only. No shell execution, no new Android capabilities, no write
-    tools: the only exposed tools remain the six read-only ones on the bridge.
+  - Remote tool allowlist (deny by default): every POST body is parsed as
+    JSON-RPC before forwarding. A `tools/call` (single or inside a batch)
+    whose tool name is not in REMOTE_TOOL_ALLOWLIST is refused with 403 and
+    never forwarded, even with a valid token. `termux_exec`, the write tools
+    and any tool added to the bridge later are therefore not reachable
+    remotely. Non-JSON POST bodies are refused (400). The local path
+    (127.0.0.1:8765) is unchanged.
 
 Streaming / headers:
   - Upstream responses (including SSE) are streamed to the client in 4 KB
@@ -44,6 +49,43 @@
 
 ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
 
+# Tools a remote caller may run. Deny by default: anything not listed here
+# (termux_exec, mute/unmute/clear notifications, agora_ask, future tools) is
+# refused at the proxy. Adding a tool here is an owner decision.
+REMOTE_TOOL_ALLOWLIST = frozenset({
+    "android_identity",
+    "android_model",
+    "android_version",
+    "android_packages",
+    "android_notifications",
+    "android_battery",
+    "get_app_notification_state",
+    "agora_models",
+})
+MAX_BODY = 1024 * 1024
+
+
+def check_rpc_body(data):
+    """-> (http_code, message) to refuse, or None to forward."""
+    try:
+        msg = json.loads(data.decode("utf-8"))
+    except (UnicodeDecodeError, ValueError):
+        return 400, "body must be JSON-RPC"
+    msgs = msg if isinstance(msg, list) else [msg]
+    if not msgs:
+        return 400, "empty batch"
+    for m in msgs:
+        if not isinstance(m, dict):
+            return 400, "invalid JSON-RPC message"
+        if m.get("method") != "tools/call":
+            continue
+        params = m.get("params")
+        name = params.get("name") if isinstance(params, dict) else None
+        if not isinstance(name, str) or name not in REMOTE_TOOL_ALLOWLIST:
+            return 403, "tool not allowed remotely"
+    return None
+
+
 # Request headers forwarded upstream (everything else, incl. Authorization, is dropped).
 FORWARD_REQUEST_HEADERS = {
     "content-type",
@@ -134,7 +176,19 @@
             if not length:
                 self._deny(411, "length required")
                 return
-            data = self.rfile.read(int(length))
+            try:
+                n = int(length)
+            except ValueError:
+                self._deny(400, "bad length")
+                return
+            if n < 0 or n > MAX_BODY:
+                self._deny(413, "body too large")
+                return
+            data = self.rfile.read(n)
+            refused = check_rpc_body(data)
+            if refused:
+                self._deny(*refused)
+                return
 
         fwd = {}
         for name, value in self.headers.items():
```

## Test file (muse-seeker-remote/test_proxy_allowlist.py)
```python
"""Negative + regression tests for the remote tool allowlist (stdlib only).

Runs the proxy against a fake upstream that records what it receives, so we
can prove a denied call is never forwarded.
"""
import http.client
import json
import os
import sys
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

os.environ["MUSE_REMOTE_TOKEN"] = "x" * 8
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import proxy  # noqa: E402

RECEIVED = []


class FakeUpstream(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_POST(self):
        body = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        RECEIVED.append(body)
        out = b'{"jsonrpc":"2.0","id":1,"result":{}}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(out)))
        self.end_headers()
        self.wfile.write(out)


def call(name):
    return {"jsonrpc": "2.0", "id": 1, "method": "tools/call",
            "params": {"name": name, "arguments": {}}}


class AllowlistTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.up = ThreadingHTTPServer(("127.0.0.1", 0), FakeUpstream)
        proxy.UPSTREAM_PORT = cls.up.server_address[1]
        cls.px = ThreadingHTTPServer(("127.0.0.1", 0), proxy.RelayHandler)
        cls.port = cls.px.server_address[1]
        proxy.RelayHandler.log_message = lambda *a: None
        for s in (cls.up, cls.px):
            threading.Thread(target=s.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.px.shutdown()
        cls.up.shutdown()

    def setUp(self):
        RECEIVED.clear()

    def post(self, payload, token="x" * 8, raw=None):
        c = http.client.HTTPConnection("127.0.0.1", self.port, timeout=5)
        body = raw if raw is not None else json.dumps(payload).encode()
        h = {"Content-Type": "application/json"}
        if token:
            h["Authorization"] = "Bearer " + token
        c.request("POST", "/mcp", body=body, headers=h)
        r = c.getresponse()
        r.read()
        c.close()
        return r.status

    def test_termux_exec_denied_with_valid_token(self):
        self.assertEqual(self.post(call("termux_exec")), 403)
        self.assertEqual(RECEIVED, [])

    def test_write_tools_and_unknown_denied(self):
        for name in ("mute_app_notifications", "unmute_app_notifications",
                     "clear_notifications", "agora_ask", "future_tool", ""):
            self.assertEqual(self.post(call(name)), 403, name)
        self.assertEqual(RECEIVED, [])

    def test_batch_with_one_denied_call_is_refused_whole(self):
        batch = [call("android_battery"), call("termux_exec")]
        self.assertEqual(self.post(batch), 403)
        self.assertEqual(RECEIVED, [])

    def test_malformed_bodies_refused(self):
        self.assertEqual(self.post(None, raw=b"not json"), 400)
        self.assertEqual(self.post([]), 400)
        self.assertEqual(self.post(["x"]), 400)
        bad = {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": "termux_exec"}
        self.assertEqual(self.post(bad), 403)
        self.assertEqual(RECEIVED, [])

    def test_no_token_still_401(self):
        self.assertEqual(self.post(call("android_battery"), token=None), 401)
        self.assertEqual(RECEIVED, [])

    def test_allowed_read_only_tool_forwarded(self):
        self.assertEqual(self.post(call("android_battery")), 200)
        self.assertEqual(len(RECEIVED), 1)

    def test_non_call_methods_forwarded(self):
        for m in ("initialize", "tools/list", "notifications/initialized"):
            self.assertEqual(self.post({"jsonrpc": "2.0", "id": 1, "method": m}), 200, m)
        self.assertEqual(len(RECEIVED), 3)


if __name__ == "__main__":
    unittest.main()
```
