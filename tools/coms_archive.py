#!/usr/bin/env python3
"""Keep BOARD.md short: archive finished lines, generate the open-requests index.

    python3 tools/coms_archive.py           # archive + regenerate OPEN-REQUESTS.md
    python3 tools/coms_archive.py --check   # exit 1 if anything would change (CI / pre-push)

What moves to archive/YYYY-MM.md (month of the run, appended, never deleted):
  * 📨 Requests lines the checker counts as finished: DONE anywhere in the line,
    struck through (`- ~~...`), or CLOSED / SUPERSEDED / WITHDRAWN / ANSWERED with
    no OPEN left in the line.
  * 🔒 Active claims lines that are struck through (`- ~~...~~ RELEASED ...`).
Nothing else in BOARD.md is touched, except runs of blank lines inside those two
sections are collapsed to one. Links in archived lines are rewritten to work from
archive/.

OPEN-REQUESTS.md is generated from BOARD.md every run: open requests grouped by
addressee, oldest first. Do not edit it by hand. Stdlib only.
"""
import argparse
import datetime
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import coms_check  # noqa: E402
import coms_projects  # noqa: E402

ROOT = coms_check.ROOT
CLOSED_WORDS = re.compile(r"\b(CLOSED|SUPERSEDED|WITHDRAWN|ANSWERED)\b")
REL_LINK = re.compile(r"\]\((?!https?:|#|\.\./|/|mailto:)([^)]+)\)")


def _bounds(lines, title_start):
    """(first body line, end) indexes of the ## section whose title starts with title_start."""
    start = None
    for i, l in enumerate(lines):
        if l.startswith("## ") and start is None and l[3:].lstrip("📨🔒📬📁🚧📣 ").startswith(title_start):
            start = i + 1
        elif l.startswith("## ") and start is not None:
            return start, i
    return (start, len(lines)) if start is not None else (None, None)


def request_finished(line):
    s = line.strip()
    if not s.startswith("- "):
        return False
    if s.startswith("- ~~"):
        return True
    if not coms_check.ARROW.match(s):
        return False
    if re.search(r"\bDONE\b", s):
        return True
    return bool(CLOSED_WORDS.search(s)) and not re.search(r"\bOPEN\b", s)


def claim_released(line):
    return line.strip().startswith("- ~~")


def _split(lines, start, end, finished):
    keep, moved, blank = [], [], False
    for l in lines[start:end]:
        if finished(l):
            moved.append(l.strip())
            continue
        if not l.strip():
            if blank:
                continue
            blank = True
        else:
            blank = False
        keep.append(l)
    return keep, moved


def relink(line):
    return REL_LINK.sub(lambda m: "](../%s)" % m.group(1), line)


def archive(board_text):
    """Return (new_board_text, moved_requests, moved_claims)."""
    lines = board_text.split("\n")
    out_req, out_claim = [], []
    # Requests first (later in file), then claims, so indexes stay valid.
    for title, finished, sink in (("Requests", request_finished, out_req),
                                  ("Active claims", claim_released, out_claim)):
        s, e = _bounds(lines, title)
        if s is None:
            continue
        keep, moved = _split(lines, s, e, finished)
        lines[s:e] = keep
        sink.extend(moved)
    return "\n".join(lines), out_req, out_claim


def open_index(board_text, now=None):
    now = now or coms_check.now_et()
    reqs = [r for r in coms_check.parse_requests(board_text) if r["status"] == "OPEN"]
    by = {}
    for r in reqs:
        for t in r["to"]:
            by.setdefault(t.lower(), []).append(r)
    out = ["# Open requests (generated — do not edit)", "",
           "Built by `python3 tools/coms_archive.py` from BOARD.md 📨 Requests. "
           "Edit the line in BOARD.md, then re-run. `all` and `deciders` "
           "(claude-code + astra) are listed under their own heading.", "",
           "%d open request(s)." % len(reqs), ""]
    for who in sorted(by):
        items = sorted(by[who], key=lambda r: r["date"] or "9999")
        out.append("## %s (%d)" % (who, len(items)))
        out.append("")
        for r in items:
            age = ""
            if r["date"]:
                d = (now.date() - datetime.date.fromisoformat(r["date"])).days
                age = " · %dd" % d
            ask = coms_check.ARROW.match(r["line"]).group(3)
            ask = re.sub(r"\s+", " ", ask)
            if len(ask) > 220:
                ask = ask[:217].rstrip() + "…"
            out.append("- **%s**%s · %s" % (r["from"], age, ask))
        out.append("")
    return "\n".join(out)


def run(root, check_only=False, today=None):
    today = today or coms_check.now_et().date()
    bpath = os.path.join(root, "BOARD.md")
    board = coms_check.read(bpath)
    new_board, reqs, claims = archive(board)
    index = open_index(new_board)
    ipath = os.path.join(root, "OPEN-REQUESTS.md")
    old_index = coms_check.read(ipath) if os.path.exists(ipath) else ""
    # The index carries ages, so only the request lines decide "stale".
    strip_age = lambda t: re.sub(r" · \d+d · ", " · ", t)
    changed = new_board != board or strip_age(index) != strip_age(old_index)
    if check_only:
        return changed, reqs, claims
    if reqs or claims:
        adir = os.path.join(root, "archive")
        os.makedirs(adir, exist_ok=True)
        apath = os.path.join(adir, today.strftime("%Y-%m") + ".md")
        head = "" if os.path.exists(apath) else "# Archive %s\n\nFinished requests and released claims moved off BOARD.md by `tools/coms_archive.py`.\n" % today.strftime("%Y-%m")
        with open(apath, "a", encoding="utf-8") as f:
            f.write(head + "\n## Archived %s\n" % today.isoformat())
            if reqs:
                f.write("\n### Requests\n\n" + "\n".join(relink(l) for l in reqs) + "\n")
            if claims:
                f.write("\n### Released claims\n\n" + "\n".join(relink(l) for l in claims) + "\n")
    if new_board != board:
        with open(bpath, "w", encoding="utf-8") as f:
            f.write(new_board)
    with open(ipath, "w", encoding="utf-8") as f:
        f.write(index)
    coms_projects.write(root, today)
    return changed, reqs, claims


def main(argv=None):
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("--check", action="store_true", help="exit 1 if a run would change files")
    a.add_argument("--root", default=ROOT)
    args = a.parse_args(argv)
    changed, reqs, claims = run(args.root, check_only=args.check)
    if args.check:
        print("coms_archive: %s (%d request(s), %d claim(s) to archive)" %
              ("needs a run" if changed else "clean", len(reqs), len(claims)))
        return 1 if changed else 0
    print("coms_archive: archived %d request(s), %d claim(s); OPEN-REQUESTS.md + PROJECTS.md written" %
          (len(reqs), len(claims)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
