import type { Asset } from './pairs';

/**
 * Each of the 10 listings later gets its own appId and its own
 * /.well-known/cherry-app.json on its own origin. Placeholders only.
 * Never hardcode a receiving wallet here.
 */
export const APP_IDS = {
  hub: 'TODO_APP_ID_HUB',
  BTC: 'TODO_APP_ID_BTC',
  ETH: 'TODO_APP_ID_ETH',
  SOL: 'TODO_APP_ID_SOL',
  ZEC: 'TODO_APP_ID_ZEC',
  XRP: 'TODO_APP_ID_XRP',
  NEAR: 'TODO_APP_ID_NEAR',
  HYPE: 'TODO_APP_ID_HYPE',
  DOGE: 'TODO_APP_ID_DOGE',
  BNB: 'TODO_APP_ID_BNB',
} as const;

export type ListingId = keyof typeof APP_IDS;

/** This local scaffold is served as the hub origin. */
export const CURRENT_LISTING: ListingId = 'hub';

export function appIdForPair(asset: Asset): string {
  return APP_IDS[asset];
}

export const HUB_APP_NAME = 'Up or Down';
