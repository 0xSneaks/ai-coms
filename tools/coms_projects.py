#!/usr/bin/env python3
"""Generate PROJECTS.md: every project filed by stage on the progression route.

    python3 tools/coms_projects.py     # (also run by tools/coms_archive.py)

Route:  IDEA → SPEC → BUILD → REVIEW → PREVIEW → LIVE   (+ PARKED, DONE)

A project declares where it is with ONE line near the top of projects/<name>.md:

    **Stage:** BUILD · **Owner:** muse · **Next:** exact first step · **Gate:** ⚠️ Sneaks yes before prod

Owner/Next/Gate/Aliases are optional; Aliases = other handoff slugs for this
project (comma-separated), matched exactly or as a "<alias>-..." prefix. Projects without a Stage line are listed as
UNSTAGED, with activity inferred from handoff file names (…_<agent>_<project>.md)
and labelled INFERENCE. Open requests are counted from BOARD.md 📨 Requests
lines whose first field is the project name. Stdlib only.
"""
import datetime
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import coms_check  # noqa: E402

STAGES = ["IDEA", "SPEC", "BUILD", "REVIEW", "PREVIEW", "LIVE", "PARKED", "DONE"]
ROUTE = "IDEA → SPEC → BUILD → REVIEW → PREVIEW → LIVE"
STAGE_HELP = {
    "IDEA": "named, no spec yet",
    "SPEC": "spec filed, nobody building",
    "BUILD": "code being written",
    "REVIEW": "built; waiting on review / cross-check / tests",
    "PREVIEW": "deployed somewhere non-production (Preview, devnet, private)",
    "LIVE": "in production / public / real users",
    "PARKED": "on hold by decision; say why in Next",
    "DONE": "finished, nothing left to do",
}
DORMANT_DAYS = 14
FIELD = re.compile(r"\*\*(Stage|Owner|Next|Gate|Aliases):\*\*\s*(.*?)\s*(?=·\s*\*\*\w+:\*\*|$)")
HANDOFF = re.compile(r"^(\d{4}-\d{2}-\d{2})_\d{4}_[a-z0-9-]+_([a-z0-9.-]+)\.md$")


def parse_project(text):
    for line in text.splitlines()[:30]:
        if "**Stage:**" in line:
            f = {k.lower(): v.strip(" ·") for k, v in FIELD.findall(line)}
            st = (f.get("stage", "").split() or [""])[0].upper().strip("·")
            f["stage"] = st if st in STAGES else "UNSTAGED"
            return f
    return {"stage": "UNSTAGED"}


def title_of(text, fallback):
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def collect(root):
    pdir = os.path.join(root, "projects")
    names = sorted(f[:-3] for f in os.listdir(pdir)
                   if f.endswith(".md") and f != "README.md")
    found = {}
    hdir = os.path.join(root, "handoffs")
    for f in os.listdir(hdir) if os.path.isdir(hdir) else []:
        m = HANDOFF.match(f)
        if m:
            found.setdefault(m.group(2), []).append((m.group(1), f))
    board = coms_check.read(os.path.join(root, "BOARD.md"))
    reqs = {}
    for r in coms_check.parse_requests(board):
        if r["status"] != "OPEN":
            continue
        proj = coms_check.ARROW.match(r["line"]).group(3).split("·")[0].strip().lower()
        reqs[proj] = reqs.get(proj, 0) + 1
    out = []
    for n in names:
        text = coms_check.read(os.path.join(pdir, n + ".md"))
        p = parse_project(text)
        keys = [n] + [a.strip().lower() for a in p.get("aliases", "").split(",") if a.strip()]
        hits = [h for slug, hs in found.items() for h in hs
                if any(slug == k or slug.startswith(k + "-") for k in keys)]
        p.update(name=n, title=title_of(text, n), last=max(hits) if hits else None,
                 open=reqs.get(n, 0))
        out.append(p)
    return out


def render(projects, today):
    def age(p):
        return (today - datetime.date.fromisoformat(p["last"][0])).days if p["last"] else None

    def last_cell(p):
        if not p["last"]:
            return "—"
        return "[%s](handoffs/%s) (%dd)" % (p["last"][0], p["last"][1], age(p))

    staged = [p for p in projects if p["stage"] != "UNSTAGED"]
    unstaged = [p for p in projects if p["stage"] == "UNSTAGED"]
    o = ["# Projects — progression route (generated — do not edit)", "",
         "**Route:** %s  (+ PARKED, DONE)" % ROUTE, "",
         "Move a project by editing the `**Stage:**` line at the top of its "
         "`projects/<name>.md` in your sign-off, then run `python3 tools/coms_archive.py`. "
         "⚠️ Into PREVIEW/LIVE with wallets, signing, money, auth or prod needs Sneaks's explicit yes.", "",
         "| Stage | Means |", "|---|---|"]
    o += ["| %s | %s |" % (s, STAGE_HELP[s]) for s in STAGES]
    o.append("")
    for s in STAGES:
        items = [p for p in staged if p["stage"] == s]
        if not items:
            continue
        o += ["## %s (%d)" % (s, len(items)), "",
              "| Project | Owner | Next | Gate | Open req | Last handoff |",
              "|---|---|---|---|---|---|"]
        for p in items:
            o.append("| [%s](projects/%s.md) | %s | %s | %s | %d | %s |" % (
                p["name"], p["name"], p.get("owner", "—") or "—",
                (p.get("next", "—") or "—").replace("|", "/"),
                (p.get("gate", "—") or "—").replace("|", "/"),
                p["open"], last_cell(p)))
        o.append("")
    if unstaged:
        unstaged.sort(key=lambda p: (p["last"] or ("0000",))[0], reverse=True)
        o += ["## UNSTAGED (%d) — owner: add a Stage line" % len(unstaged), "",
              "_Activity below is INFERENCE from handoff file names; "
              "dormant = no handoff in %d days._" % DORMANT_DAYS, "",
              "| Project | Activity | Open req | Last handoff |", "|---|---|---|---|"]
        for p in unstaged:
            a = age(p)
            act = "no handoffs" if a is None else ("active" if a < DORMANT_DAYS else "dormant")
            o.append("| [%s](projects/%s.md) | %s | %d | %s |" % (
                p["name"], p["name"], act, p["open"], last_cell(p)))
        o.append("")
    return "\n".join(o)


def write(root, today=None):
    today = today or coms_check.now_et().date()
    if not os.path.isdir(os.path.join(root, "projects")):
        return ""
    text = render(collect(root), today)
    with open(os.path.join(root, "PROJECTS.md"), "w", encoding="utf-8") as f:
        f.write(text)
    return text


if __name__ == "__main__":
    write(coms_check.ROOT)
    print("coms_projects: PROJECTS.md written")
