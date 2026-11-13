import datetime
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import coms_projects  # noqa: E402


class ProjectsTest(unittest.TestCase):
    def test_parse_stage_line(self):
        p = coms_projects.parse_project(
            "# X\n\n**Stage:** preview · **Owner:** muse · **Next:** do a · b · **Gate:** ⚠️ Sneaks yes\n")
        self.assertEqual(p["stage"], "PREVIEW")
        self.assertEqual(p["owner"], "muse")
        self.assertEqual(p["next"], "do a · b")
        self.assertEqual(p["gate"], "⚠️ Sneaks yes")

    def test_unknown_or_missing(self):
        self.assertEqual(coms_projects.parse_project("# X\n")["stage"], "UNSTAGED")
        self.assertEqual(coms_projects.parse_project("**Stage:** soon\n")["stage"], "UNSTAGED")

    def test_render(self):
        with tempfile.TemporaryDirectory() as d:
            os.makedirs(os.path.join(d, "projects"))
            os.makedirs(os.path.join(d, "handoffs"))
            with open(os.path.join(d, "projects", "a.md"), "w") as f:
                f.write("# A\n**Stage:** BUILD · **Owner:** muse\n")
            with open(os.path.join(d, "projects", "b.md"), "w") as f:
                f.write("# B\n")
            open(os.path.join(d, "handoffs", "2026-11-01_1200_muse_b.md"), "w").close()
            open(os.path.join(d, "handoffs", "2026-11-12_1200_muse_a.md"), "w").close()
            with open(os.path.join(d, "BOARD.md"), "w") as f:
                f.write("## 📨 Requests\n- [x → muse] a · do · OPEN · 2026-11-12\n")
            t = coms_projects.write(d, today=datetime.date(2026, 11, 20))
            self.assertIn("## BUILD (1)", t)
            self.assertIn("| [a](projects/a.md) | muse | — | — | 1 |", t)
            self.assertIn("| [b](projects/b.md) | dormant | 0 |", t)

    def test_aliases(self):
        with tempfile.TemporaryDirectory() as d:
            for x in ("projects", "handoffs"):
                os.makedirs(os.path.join(d, x))
            with open(os.path.join(d, "projects", "long-name.md"), "w") as f:
                f.write("# L\n**Stage:** REVIEW · **Aliases:** pd\n")
            open(os.path.join(d, "handoffs", "2026-11-12_2317_muse_pd-secrets.md"), "w").close()
            open(os.path.join(d, "handoffs", "2026-11-10_0100_muse_pdx.md"), "w").close()
            open(os.path.join(d, "BOARD.md"), "w").close()
            t = coms_projects.write(d, today=datetime.date(2026, 11, 13))
            self.assertIn("2026-11-12_2317_muse_pd-secrets.md", t)


if __name__ == "__main__":
    unittest.main()
