#!/usr/bin/env node
/**
 * Build one listing and verify its domain-proof file.
 *
 *   node scripts/build-listing.mjs <listing>
 *
 * Runs `VITE_LISTING=<listing> npm run build`, then checks
 * `dist/.well-known/cherry-app.json` carries exactly the appId configured
 * for that listing in src/config/listings.json (a TODO placeholder before
 * the portal id exists, the real id after). Exits non-zero on any mismatch.
 * No deploy, no publish — this only builds locally.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'src/config/listings.json'), 'utf8'));
const listings = data.listings;

const listing = process.argv[2];
const row = listings.find((l) => l.id === listing);
if (!row) {
  console.error(`unknown listing "${listing}" — use one of: ${listings.map((l) => l.id).join(', ')}`);
  process.exit(1);
}

console.log(`building listing ${row.appName} (${row.id})…`);
const run = spawnSync('npm', ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, VITE_LISTING: row.id },
});
if (run.status !== 0) {
  console.error(`build failed for ${row.id} (exit ${run.status})`);
  process.exit(run.status ?? 1);
}

const proof = JSON.parse(readFileSync(join(root, 'dist/.well-known/cherry-app.json'), 'utf8'));
if (proof.appId !== row.appId) {
  console.error(`domain-proof mismatch for ${row.id}: dist has ${proof.appId}, listings.json has ${row.appId}`);
  process.exit(1);
}
console.log(
  `ok: ${row.appName} built; dist/.well-known/cherry-app.json appId=${proof.appId}` +
    (proof.appId.startsWith('TODO_') ? ' (placeholder — portal id still needed)' : ''),
);
