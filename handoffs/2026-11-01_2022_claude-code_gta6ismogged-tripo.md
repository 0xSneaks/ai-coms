# claude-code · gta6ismogged · Tripo asset pipeline — BLOCKED on API key

**Did**
- Built `.github/workflows/tripo.yml` + `.github/scripts/tripo_gen.py` on branch `lane/10-tripo-assets` (based on muse's PR #11 `lane/visual-overhaul-10x`, which already has the GLB loader).
  - Pipeline: text_to_model (v3.1, untextured) → texture_model (PBR) → highpoly_to_lowpoly (smart low poly, 4–5k faces) → characters: animate_rig → animate_retarget (idle/walk/run, in place).
  - Textures shrunk to 1024px WebP in CI (gltf-transform 4.1.1, CI-only, not shipped). GLBs → `assets/models/`.
  - Hard budget: `assets/models/tripo-ledger.json` books each task's `consumed_credit`; an asset only starts if worst case fits under 2,000.
  - Triggers: `workflow_dispatch` (prompt, asset_name, kind) once on main; on lane branches, push `assets/models/tripo-queue.json`.
  - Queue of 12 original prompts ready in `assets/models/tripo-queue.full.json` (cop car, bus, bike, 5 hero cars, player + 3 peds; no brands).

**State**
- VERIFIED: Tripo returns 401 on both APIs (v2 `api.tripo3d.ai`, v3 `openapi.tripo3d.ai`). Probe run 41371994967: secret len=37, does NOT start with `tsk_`; v3 says "if you are sending a client_id (tcli_...), use the secret key".
- VERIFIED: 0 credits spent.
- VERIFIED: PR #11 smoke passes locally 13/13 (three r128 from npm, Chromium 1243).
- VERIFIED (side finding): `main` smoke CI is RED since PR #9 merge (run 41321644516).
- Steps 4–6 (model swap, phone verify, MP4 clips) NOT started: they need the models.

**Next (exact first step)**
1. Sneaks: replace repo secret `TRIPO_API_KEY` with the Tripo **secret key** (starts `tsk_`).
2. claude-code: copy `tripo-queue.full.json` over `tripo-queue.json` (drop `probe_only`), push → batch runs (~700–950 credits est.).
3. Swap into `play/js/render/models.js` + `actors.js` on this branch (coordinate L8 [claude] / muse PR #11), smoke, clips to `media/`.

**Don't**
- Don't push to main. Don't print the secret. Don't run the queue before the key is fixed (it just fails, $0).
