#!/usr/bin/env node
/**
 * Generate the Cherry domain-proof file for one listing.
 *
 *   node scripts/gen-domain-proof.mjs <listing> [--write <dir>] [--all]
 *
 * Prints the exact JSON that must be served at
 *   https://<origin>/.well-known/cherry-app.json
 * for that listing, and with --write writes it to
 *   <dir>/.well-known/cherry-app.json
 *
 * Reads src/config/listings.json (single source of truth). A TODO_APP_ID_*
 * placeholder is printed as-is — it proves nothing to Cherry until Sneaks
 * pastes the real portal appId into listings.json.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'src/config/listings.json'), 'utf8'));
const listings = data.listings;

function usage(fail = false) {
  const ids = listings.map((l) => l.id).join(', ');
  console.error(`usage: node scripts/gen-domain-proof.mjs <listing> [--write <dir>] [--all]\nlistings: ${ids}`);
  process.exit(fail ? 1 : 0);
}

const args = process.argv.slice(2);
const all = args.includes('--all');
const writeIdx = args.indexOf('--write');
const outDir = writeIdx >= 0 ? args[writeIdx + 1] : null;
if (writeIdx >= 0 && !outDir) usage(true);
const target = args.find((a) => !a.startsWith('--') && a !== outDir);
if (!all && !target) usage(true);

const picked = all ? listings : listings.filter((l) => l.id === target);
if (!picked.length) {
  console.error(`unknown listing "${target}"`);
  usage(true);
}

for (const row of picked) {
  const body = `${JSON.stringify({ appId: row.appId }, null, 2)}\n`;
  if (outDir) {
    const dir = join(outDir, '.well-known');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'cherry-app.json'), body, 'utf8');
  }
  const origin = row.origin.startsWith('TODO_') ? `<${row.origin} — set at hosting time>` : row.origin;
  console.log(`--- ${row.appName} (${row.id}) ---`);
  console.log(`serve at: ${origin}/.well-known/cherry-app.json`);
  if (row.appId.startsWith('TODO_')) {
    console.log(`WARNING: appId is still ${row.appId} — create the listing in the portal first (see PORTAL-CHECKLIST.md).`);
  }
  console.log(body.trimEnd());
}
