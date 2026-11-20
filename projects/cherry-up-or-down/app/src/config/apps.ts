import listingsData from './listings.json';
import type { Asset } from './pairs';

/**
 * The 10 listings, from the single source of truth `listings.json`.
 * Each listing is its own Cherry mini app with its own `appId` and its own
 * `/.well-known/cherry-app.json` on its own origin. Portal-created appIds do
 * NOT exist yet — every entry is a TODO_APP_ID_* placeholder until Sneaks
 * creates the listing in the portal and pastes the real id into
 * `listings.json` (see PORTAL-CHECKLIST.md). Never invent a real id.
 * Never hardcode a receiving wallet here.
 */
export type ListingId = 'hub' | Asset;

export type ListingConfig = {
  id: ListingId;
  appName: string;
  /** Portal appId, or a TODO_APP_ID_* placeholder while unregistered. */
  appId: string;
  /** Listing origin, or a TODO_ORIGIN_* placeholder while unhosted. */
  origin: string;
};

type ListingsFile = {
  listings: ListingConfig[];
};

const parsed = listingsData as unknown as ListingsFile;

export const LISTINGS: Record<ListingId, ListingConfig> = Object.fromEntries(
  parsed.listings.map((l) => [l.id, l]),
) as Record<ListingId, ListingConfig>;

export const APP_IDS: Record<ListingId, string> = Object.fromEntries(
  parsed.listings.map((l) => [l.id, l.appId]),
) as Record<ListingId, string>;

export const LISTING_ORIGINS: Record<ListingId, string> = Object.fromEntries(
  parsed.listings.map((l) => [l.id, l.origin]),
) as Record<ListingId, string>;

export function isPlaceholder(value: string): boolean {
  return value.startsWith('TODO_');
}

/** True once Sneaks has pasted a real portal appId for this listing. */
export function isConfiguredAppId(id: ListingId): boolean {
  return !isPlaceholder(APP_IDS[id]);
}

export function listingConfig(id: ListingId): ListingConfig {
  const cfg = LISTINGS[id];
  if (!cfg) throw new Error(`Unknown listing: ${id}`);
  return cfg;
}

/**
 * Which listing this build serves. Set at build time with
 * `VITE_LISTING=<hub|BTC|ETH|...>` (see scripts/build-listing.mjs).
 * Defaults to the hub. Pair listings open directly on their pair screen.
 */
export function currentListingId(): ListingId {
  const raw = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_LISTING;
  if (raw && raw in LISTINGS) return raw as ListingId;
  if (raw) console.warn(`VITE_LISTING=${raw} is not a known listing; serving the hub.`);
  return 'hub';
}

export const CURRENT_LISTING: ListingId = currentListingId();

/** The asset this listing serves, or null for the hub. */
export const CURRENT_ASSET: Asset | null =
  CURRENT_LISTING === 'hub' ? null : (CURRENT_LISTING as Asset);

export function appIdForPair(asset: Asset): string {
  return APP_IDS[asset];
}

export const HUB_APP_NAME = 'Up or Down';
