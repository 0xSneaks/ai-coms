import datetime
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import coms_archive  # noqa: E402

BOARD = """# Board

## 🔒 Active claims



- [muse] a · CLAIMED 2026-11-12: working
- ~~[claude] b · CLAIMED 2026-11-01~~ RELEASED by claude 2026-11-02


- [astra] c · CLAIMED 2026-11-12: working

## 📨 Requests (agent → agent)

_Format note stays._

- [muse → claude-code] x · do it · OPEN · 2026-11-10 → [h](handoffs/a.md)
- [muse → astra] y · done thing · OPEN · 2026-11-09 · astra ✓ DONE → [h](handoffs/b.md)
- [chatgpt → all] z · old · CLOSED · 2026-11-01
- [chatgpt → all] w · still · OPEN · 2026-11-01 · CLOSED part 1
- ~~[claude → muse] v · gone · OPEN~~

## 📬 Latest handoffs (newest first, keep last 10)
- keep me
"""


class ArchiveTest(unittest.TestCase):
    def test_moves_only_finished(self):
        new, reqs, claims = coms_archive.archive(BOARD)
        self.assertEqual(len(reqs), 3)
        self.assertEqual(len(claims), 1)
        self.assertIn("x · do it", new)
        self.assertIn("w · still", new)
        self.assertNotIn("y · done thing", new)
        self.assertNotIn("RELEASED by claude", new)
        self.assertIn("_Format note stays._", new)
        self.assertIn("- keep me", new)
        self.assertNotIn("\n\n\n", new)

    def test_idempotent(self):
        once, _, _ = coms_archive.archive(BOARD)
        twice, r, c = coms_archive.archive(once)
        self.assertEqual(once, twice)
        self.assertEqual((r, c), ([], []))

    def test_relink(self):
        self.assertEqual(coms_archive.relink("x [h](handoffs/a.md) [u](https://e.com)"),
                         "x [h](../handoffs/a.md) [u](https://e.com)")

    def test_index(self):
        new, _, _ = coms_archive.archive(BOARD)
        idx = coms_archive.open_index(new, now=datetime.datetime(2026, 11, 13))
        self.assertIn("2 open request(s).", idx)
        self.assertIn("## claude-code (1)", idx)
        self.assertIn("## all (1)", idx)
        self.assertIn("· 3d ·", idx)

    def test_run_writes_files(self):
        with tempfile.TemporaryDirectory() as d:
            with open(os.path.join(d, "BOARD.md"), "w") as f:
                f.write(BOARD)
            changed, r, c = coms_archive.run(d, check_only=True)
            self.assertTrue(changed)
            coms_archive.run(d, today=datetime.date(2026, 11, 13))
            arch = open(os.path.join(d, "archive", "2026-11.md")).read()
            self.assertIn("../handoffs/b.md", arch)
            self.assertIn("### Released claims", arch)
            self.assertTrue(os.path.exists(os.path.join(d, "OPEN-REQUESTS.md")))
            changed, r, c = coms_archive.run(d, check_only=True)
            self.assertFalse(changed)


if __name__ == "__main__":
    unittest.main()
