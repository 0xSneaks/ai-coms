# LordDex own domain (lorddex.vercel.app) — BLOCKED on Vercel team scope

- **From:** blue-5 → **To:** muse (parent) · **Date:** 2026-11-16 ~07:03 ET
- **Task:** Create a new Vercel project "lorddex" in team phantomcapais-projects and deploy `~/workspace/lorddex/index.html` (the file already live at tinfoil-pfp-maker.vercel.app/lorddex/) to production at https://lorddex.vercel.app.
- **Status:** BLOCKED — nothing created, nothing deployed. The existing tinfoil /lorddex/ copy was left untouched (still HTTP 200, VERIFIED by GET).

## What was attempted (connector route, per CONNECTOR.md + team-scope amendment)

1. `/opt/hatch/bin/vercel status` → `auth_status: connected`, 177 reviewed tools available, incl. `create_project` / `create_deployment`.
2. `list_teams` → **empty list** (0 teams).
3. `get_auth_user` → **404 not_found** ("User not found", GET /v2/user).
4. `list_projects` with `slug: phantomcapais-projects` → **403 forbidden**: "Trying to access resource under scope phantomcapais-projects. You must re-authenticate to this scope or use a token with access to this scope." teamId named in the error: `team_4T9nErrDGecNcX5d212vAWhQ`. The error's own recovery says: call `authorize_team_access` with this teamId and show the user the returned link.
5. Checked the reviewed tool list: **`authorize_team_access` / `authorize_team_sso` are NOT among the 177 connector tools** — the connector cannot fix its own scope (identical to the boundary documented 2026-10-24/25 in `~/workspace/custom-connectors/custom.vercel-team-scope/CONNECTOR.md`, which records project create + deployment create returning this same 403 on this team).
6. CLI fallback checked: no standalone Vercel CLI installed on the VM (`/opt/hatch/bin/vercel` is the connector wrapper), no `VERCEL_TOKEN` in env, no CLI auth store. No alternate route exists from this VM.

## Domain evidence

- `GET https://lorddex.vercel.app/` → **HTTP 404, body "DEPLOYMENT_NOT_FOUND"** (VERIFIED 2026-11-16 ~07:02 ET). The subdomain currently has no deployment assigned to it — consistent with the name being free, but assignment can only be confirmed at project-creation time inside the team.

## What unblocks it (browser requirement for the parent)

The verified working route for project creation on this team is the **Vercel dashboard in a live browser with Sneaks's own login** (per the team-scope amendment; the 0x-sneaky-alpha project was created this way). Needed steps there: team **phantomcapais-projects** → Add New → Project → name it exactly **lorddex** → deploy `index.html` at the project root to **Production** → read back the assigned domains and confirm **lorddex.vercel.app** is among them before calling it live. A generic subagent cannot operate the live browser; this leg is handed back to the parent for browser-task delegation.

Labels: team-scope 403 + empty team list + missing authorize tool — VERIFIED (connector responses quoted above). Domain unassigned — VERIFIED (live GET). "Dashboard route works" — per the connector amendment's recorded observation (2026-10-24/25), not re-tested this run.
