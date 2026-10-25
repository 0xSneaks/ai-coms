"""Tests for coms_check.py.  cd tools && python3 -m unittest -v"""
import datetime
import os
import shutil
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import coms_check  # noqa: E402

ROSTER = """| Name | What |
|---|---|
| `claude-code` | x |
| `astra` | x |
| `muse` | x |
| `chatgpt` | x |
| ~~`glm`~~ | removed |
"""


def board(claims="", requests="", latest=""):
    return """# BOARD

## 🔒 Active claims

%s

_Format: `- [agent] project · files · started YYYY-MM-DD HH:MM`_

---

## 📨 Requests (agent → agent)

_Format: `- [from → to] project · ask · OPEN · date → [note](handoffs/...)`_

%s

---

## 📬 Latest handoffs (newest first, keep last 10)

%s

---
""" % (claims, requests, latest)


class ComsCheckTest(unittest.TestCase):
    def setUp(self):
        self.root = tempfile.mkdtemp()
        self.addCleanup(shutil.rmtree, self.root, True)
        os.makedirs(os.path.join(self.root, "handoffs"))
        self.write("AGENTS-ROSTER.md", ROSTER)
        self.write("handoffs/2026-10-24_1745_claude-code_muse-tune-up.md", "note")
        self.now = datetime.datetime(2026, 10, 24, 18, 0)

    def write(self, rel, text):
        with open(os.path.join(self.root, rel), "w") as f:
            f.write(text)

    def run_check(self, **kw):
        self.write("BOARD.md", board(**kw))
        return coms_check.check(self.root, now=self.now)

    def test_clean_board_passes(self):
        e, w = self.run_check(latest="- x → [h](handoffs/2026-10-24_1745_claude-code_muse-tune-up.md)")
        self.assertEqual((e, w), ([], []))

    def test_broken_link_and_cap(self):
        latest = "\n".join("- l%d → [h](handoffs/2026-10-24_1745_claude-code_muse-tune-up.md)" % i
                           for i in range(11))
        e, _ = self.run_check(latest=latest + "\n- gone → [h](handoffs/nope.md)")
        self.assertTrue(any("missing file: handoffs/nope.md" in x for x in e))
        self.assertTrue(any("12 lines (max 10)" in x for x in e))

    def test_bad_handoff_name(self):
        self.write("handoffs/notes from muse.md", "x")
        e, _ = self.run_check()
        self.assertTrue(any("notes from muse.md" in x for x in e))

    def test_stale_claim_uses_updated_time(self):
        _, w = self.run_check(claims="- [muse] p · f · started 2026-10-22 10:00 ET")
        self.assertTrue(any("stale claim" in x for x in w))
        _, w = self.run_check(claims="- [muse] p · f · started 2026-10-22 10:00 ET · updated 2026-10-24 12:00 ET")
        self.assertEqual(w, [])

    def test_requests_overdue_unknown_and_roster(self):
        req = "\n".join([
            "- [muse → claude-code] p · recent · OPEN · 2026-10-24 → [n](handoffs/2026-10-24_1745_claude-code_muse-tune-up.md)",
            "- [muse → claude-code] p · old · OPEN · 2026-10-22",
            "- [muse → claude-code] p · ask · DONE · 2026-10-20",
            "- [muse → grok] p · ask · OPEN · 2026-10-24",
            "- [muse → chatgpt] p · ask · 2026-10-24",
        ])
        _, w = self.run_check(requests=req)
        self.assertTrue(any("42h old" in x and "· old ·" in x for x in w))  # no note: end of 10-22
        self.assertFalse(any("· recent ·" in x for x in w))  # note 17:45, now 18:00 -> 15 min
        self.assertTrue(any("'grok', not on AGENTS-ROSTER" in x for x in w))
        self.assertTrue(any("without OPEN/DONE" in x for x in w))
        self.assertFalse(any("2026-10-20" in x for x in w))  # DONE never nags

    def test_inbox_routing_including_deciders(self):
        req = "\n".join([
            "- [muse → claude-code] p · a1 · OPEN · 2026-10-24",
            "- [muse → deciders] p · a2 · OPEN · 2026-10-24",
            "- [claude-code → muse, chatgpt] p · a3 · OPEN · 2026-10-24",
            "- [muse → astra] p · a4 · DONE · 2026-10-24",
            "- ~~[muse → astra] p · a5 · OPEN · 2026-10-24~~",
        ])
        self.write("BOARD.md", board(requests=req))
        got = lambda a: [r["line"].split("·")[1].strip() for r in coms_check.inbox(self.root, a)]
        self.assertEqual(got("claude-code"), ["a1", "a2"])
        self.assertEqual(got("astra"), ["a2"])
        self.assertEqual(got("muse"), ["a3"])
        self.assertEqual(got("chatgpt"), ["a3"])

    def test_secret_scan_reports_location_not_value(self):
        fake = "ghp_" + "A1b2C3d4E5f6G7h8I9j0K1l2"
        self.write("handoffs/2026-10-24_1800_muse_x.md", "token used: %s\n" % fake)
        self.write("handoffs/2026-10-24_1801_muse_y.md", "proxy http://u:hunter2pw@h:3128\n")
        self.write("handoffs/2026-10-24_1802_muse_z.md", "see env var GITHUB_TOKEN; host:port only\n")
        e, _ = self.run_check()
        joined = "\n".join(e)
        self.assertIn("GitHub token) at handoffs/2026-10-24_1800_muse_x.md:1", joined)
        self.assertIn("credential in URL) at handoffs/2026-10-24_1801_muse_y.md:1", joined)
        self.assertNotIn("1802", joined)
        self.assertNotIn(fake, joined)
        self.assertNotIn("hunter2pw", joined)

    def test_now_is_eastern_not_utc(self):
        et = coms_check.now_et()
        utc = datetime.datetime.utcnow()
        self.assertTrue(3.5 <= (utc - et).total_seconds() / 3600 <= 5.5)

    def test_format_example_links_ignored(self):
        e, _ = self.run_check()
        self.assertFalse(any("handoffs/..." in x for x in e))


if __name__ == "__main__":
    unittest.main()
