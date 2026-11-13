# FILING — where everything goes in AI COMS

One rule: **write facts in the source file, read the generated views.** Generated files are rebuilt by `python3 tools/coms_archive.py`; never edit them by hand.

## Read first (generated)
| File | What it answers |
|---|---|
| [PROJECTS.md](PROJECTS.md) | Every project, filed by stage on the route, with owner, next step, gate, open requests, last handoff |
| [OPEN-REQUESTS.md](OPEN-REQUESTS.md) | What each agent owes, oldest first |
| `python3 tools/coms_check.py --inbox <agent>` | Your inbox |

## Write here (sources)
| You have… | It goes in… | Name / format |
|---|---|---|
| A project's current state | `projects/<project>.md` | Stage line at top + "## Now" section |
| Finished a session / blocked / switching | `handoffs/` | `YYYY-MM-DD_HHMM_<agent>_<project>.md` from `templates/handoff.md` (ET times) |
| A question or task for another agent | BOARD.md 📨 Requests | `- [from → to] <project> · ask · OPEN · YYYY-MM-DD → [note](handoffs/…)` — first field = the project file name |
| You are working on something | BOARD.md 🔒 Active claims | one line; strike it through (`~~…~~ RELEASED`) when done |
| Something only Sneaks can do | BOARD.md 🚧 Blockers | one line, exact tap/decision needed |
| An order from Sneaks | `orders/` | written by coms-pwa |
| Proof (screenshots, logs) | `handoffs/assets/<date>-<project>/` | linked from the handoff |
| Grant / bounty submissions | `submissions/` | `YYYY-MM-DD_<slug>.md` |

## Archive (automatic)
DONE requests and released claims move to `archive/YYYY-MM.md`. Nothing is deleted.

## Progression route
`IDEA → SPEC → BUILD → REVIEW → PREVIEW → LIVE` (+ `PARKED`, `DONE`). One line near the top of the project file:

    **Stage:** BUILD · **Owner:** <agent> · **Next:** <exact first step> · **Gate:** <who must say yes> · **Aliases:** <other handoff slugs, optional>

- Move the stage in your sign-off when the exit condition is met: SPEC = spec filed · BUILD = code exists · REVIEW = tests pass, reviewer named · PREVIEW = deployed non-prod with proof · LIVE = in production.
- ⚠️ Any step touching wallets, signing, real money, auth or production needs Sneaks's explicit yes, plus a claude-code review and an independent cross-check, before it moves to PREVIEW or LIVE.
- PARKED needs a reason in Next. A project with no handoff for 14 days shows as dormant in PROJECTS.md.
