# HL Calm Hub verification evidence

Source: `0xSneaks/Zen-trade` at `db763d8df00952c7a6eab6aeff78d9ce037b9927`.

Baseline files record the imported pinned commit before fixes. `reproduced-timestamp.log` records two failing millisecond assertions. `reproduced-app.log` records five failing app cases before fixes. Final files record actual reruns after fixes. Do not infer build or browser acceptance from passing Vitest tests.

Run required commands inside the source checkout:

```sh
npm install --no-package-lock
npx tsc --noEmit
npm test
VITE_HL_USER=0x0000000000000000000000000000000000000000 npm run build
```

Typecheck/build currently fail on the two protected files named in the handoff. No production bundle was accepted. See `dependencies.log` and `runtime.log` for installed versions; package ranges are unchanged and no lockfile was added.

Supplemental fixture harness layout (outside source):

```text
<workspace>/Zen-trade/ (checkout)
<workspace>/evidence/app-regression.test.jsx
<workspace>/evidence/vitest.config.mjs
<workspace>/qa-runtime/ (temporary test dependency)
<workspace>/node_modules (symlink to Zen-trade/node_modules)
```

Copy the two harness files here into `<workspace>/evidence/`, then run from `<workspace>`:

```sh
npm install --prefix qa-runtime --no-package-lock --no-save jsdom@26
ln -s Zen-trade/node_modules node_modules
VITE_HL_USER=0x0000000000000000000000000000000000000000 ./Zen-trade/node_modules/.bin/vitest run --config evidence/vitest.config.mjs
```

The supplemental harness creates React DOM with jsdom, stubs REST and WebSocket responses for a synthetic zero address, and uses fake IndexedDB. It tests actual app effects and DOM clicks without adding dependencies/files to the app repository. All 12 final tests pass, including per-test empty console.error assertions. It cannot verify CSS layout, browser user activation, OS notifications or live account correctness.

`mobile-qa.cjs` is the attempted real Chromium harness: intended viewport 360 × 800, synthetic fixture responses, all six views, screenshots and console errors. It did not reach page execution: Playwright-bundled browser unavailable, then `/usr/bin/chromium` fails socket creation under sandbox policy. Shared browser fallback also reported `net::ERR_CONNECTION_REFUSED` for the test server. No mobile screenshots/browser-console results exist. A browser-capable environment must complete that acceptance gate.
