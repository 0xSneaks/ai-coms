import http.server
import json
import os
import shutil
import tempfile
import threading
import unittest

import opencode_delegate as od

ORDER = """# Order — sneaks → all — 2026-11-03 10:30 ET

**From:** Sneaks, verified by Face ID passkey in coms-pwa · **Kind:** REACT · **Project:** bounty-scout
**Status:** OPEN.

> REACT
>
> --- MATERIAL START ---
> @opencode rank these 3 bounties by fit
> line two
> --- MATERIAL END ---
>
> React to the material above.
"""


class Stub(http.server.BaseHTTPRequestHandler):
    calls = []

    def log_message(self, *a):
        pass

    def _send(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        Stub.calls.append(("GET", self.path, self.headers.get("Authorization")))
        self._send({"data": [{"id": "glm-5"}, {"id": "kimi-k2.5"}]})

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        payload = json.loads(self.rfile.read(n))
        Stub.calls.append(("POST", self.path, self.headers.get("Authorization"), payload))
        self._send({"choices": [{"message": {"content": "1. A\n2. B\nNext step: muse checks."}}]})


class DelegateTest(unittest.TestCase):
    def setUp(self):
        self.root = tempfile.mkdtemp()
        os.makedirs(os.path.join(self.root, "handoffs"))
        os.makedirs(os.path.join(self.root, "orders"))
        with open(os.path.join(self.root, "orders", "o1.md"), "w") as f:
            f.write(ORDER)
        with open(os.path.join(self.root, "orders", "o2.md"), "w") as f:
            f.write(ORDER.replace("@opencode ", ""))
        with open(os.path.join(self.root, "BOARD.md"), "w") as f:
            f.write("- [sneaks → all] bounty-scout · REACT: x · OPEN · 2026-11-03 → [order](orders/o1.md)\n")
        self.srv = http.server.HTTPServer(("127.0.0.1", 0), Stub)
        threading.Thread(target=self.srv.serve_forever, daemon=True).start()
        self.old = (od.ROOT, od.BASE)
        od.ROOT, od.BASE = self.root, "http://127.0.0.1:%d/v1" % self.srv.server_port
        Stub.calls = []
        os.environ["OPENCODE_API_KEY"] = "test-key"
        os.environ.pop("OPENCODE_MODEL", None)
        os.environ["OPENCODE_DAILY_CAP"] = "20"

    def tearDown(self):
        self.srv.shutdown()
        od.ROOT, od.BASE = self.old
        os.environ.pop("OPENCODE_API_KEY", None)
        shutil.rmtree(self.root)

    def test_tagged_order_gets_reply_and_board_mark(self):
        self.assertEqual(od.main(["--orders", "orders/o1.md", "orders/o2.md"]), 0)
        posts = [c for c in Stub.calls if c[0] == "POST"]
        self.assertEqual(len(posts), 1)  # untagged o2 ignored
        self.assertEqual(posts[0][2], "Bearer test-key")
        self.assertEqual(posts[0][3]["model"], "kimi-k2.5")  # preferred from /models
        user = posts[0][3]["messages"][1]["content"]
        self.assertTrue(user.startswith("rank these 3 bounties"))  # tag stripped, material only
        hs = os.listdir(os.path.join(self.root, "handoffs"))
        self.assertEqual(len(hs), 1)
        self.assertRegex(hs[0], r"^\d{4}-\d{2}-\d{2}_\d{4}_opencode_bounty-scout\.md$")
        doc = open(os.path.join(self.root, "handoffs", hs[0])).read()
        self.assertIn("Next step: muse checks.", doc)
        self.assertNotIn("test-key", doc)
        board = open(os.path.join(self.root, "BOARD.md")).read()
        self.assertIn("opencode ✓ replied (kimi-k2.5) → [reply](handoffs/%s)" % hs[0], board)

    def test_daily_cap(self):
        os.environ["OPENCODE_DAILY_CAP"] = "0"
        od.main(["--orders", "orders/o1.md"])
        self.assertEqual([c for c in Stub.calls if c[0] == "POST"], [])

    def test_no_key_is_noop(self):
        os.environ["OPENCODE_API_KEY"] = ""
        self.assertEqual(od.main(["--text", "@opencode hi"]), 0)
        self.assertEqual(Stub.calls, [])

    def test_rejects_paths_outside_orders(self):
        od.main(["--orders", "BOARD.md", "../etc/passwd"])
        self.assertEqual(Stub.calls, [])

    def test_header_addressing(self):
        text = ORDER.replace("sneaks → all", "sneaks → opencode").replace("@opencode ", "")
        self.assertTrue(od.addressed_to_opencode(text))
        self.assertFalse(od.addressed_to_opencode(ORDER.replace("@opencode ", "")))


if __name__ == "__main__":
    unittest.main()
