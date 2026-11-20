import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const frameAncestors =
  "frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun";

type ListingRow = { id: string; appName: string; appId: string; origin: string };

function loadListings(): ListingRow[] {
  const here = dirname(fileURLToPath(import.meta.url));
  const raw = readFileSync(join(here, 'src/config/listings.json'), 'utf8');
  return (JSON.parse(raw) as { listings: ListingRow[] }).listings;
}

/**
 * Writes `dist/.well-known/cherry-app.json` for the listing this build
 * serves (VITE_LISTING, default hub). Cherry's portal checks that file on
 * the listing's origin before publish. A TODO_APP_ID_* placeholder is
 * written as-is and warned about loudly — the build must stay green before
 * portal ids exist, but a placeholder proof file proves nothing to Cherry.
 */
function cherryDomainProof(): Plugin {
  return {
    name: 'cherry-domain-proof',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist';
      const listingId = process.env.VITE_LISTING ?? 'hub';
      const row = loadListings().find((l) => l.id === listingId);
      if (!row) {
        throw new Error(`cherry-domain-proof: unknown listing "${listingId}" (VITE_LISTING)`);
      }
      const dir = join(outDir, '.well-known');
      mkdirSync(dir, { recursive: true });
      writeFileSync(
        join(dir, 'cherry-app.json'),
        `${JSON.stringify({ appId: row.appId }, null, 2)}\n`,
        'utf8',
      );
      if (row.appId.startsWith('TODO_')) {
        console.warn(
          `[cherry-domain-proof] ${row.appName}: appId is still ${row.appId} — ` +
            `create the listing in the portal and paste the real id into src/config/listings.json (see PORTAL-CHECKLIST.md).`,
        );
      } else {
        console.log(`[cherry-domain-proof] ${row.appName}: wrote .well-known/cherry-app.json`);
      }
    },
  };
}

export default defineConfig({
  plugins: [cherryDomainProof()],
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
    headers: { 'Content-Security-Policy': frameAncestors },
  },
  preview: {
    port: 4173,
    host: '127.0.0.1',
    headers: { 'Content-Security-Policy': frameAncestors },
  },
});
