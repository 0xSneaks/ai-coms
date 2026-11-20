/**
 * Shared cosmetics catalog. Revenue is Sales of one-time cosmetic unlocks.
 * Credits are not for sale. Purchase fulfillment is STUBBED — no payment
 * code, no receiving wallet, no on-chain calls.
 *
 * Day-1 prices from the spec: $0.99 tick skin, $2.99 jeweled frame, $4.99 pack.
 * A real purchase must verify the launch token, then a one-time payment with
 * withAppReference for the listing the user is in, then unlock only after
 * on-chain confirmation. That path is not implemented here.
 */

export type CosmeticItem = {
  sku: string;
  name: string;
  kind: 'skin' | 'frame' | 'pack';
  /** Display price in USD. Not charged by this stub. */
  usd: 0.99 | 2.99 | 4.99;
};

export const CATALOG: CosmeticItem[] = [
  { sku: 'tick-skin', name: 'Asset tick skin', kind: 'skin', usd: 0.99 },
  { sku: 'jeweled-frame', name: 'Jeweled frame', kind: 'frame', usd: 2.99 },
  { sku: 'crest-pack', name: 'Crest pack (skin + frame + crest)', kind: 'pack', usd: 4.99 },
];

export function purchaseCosmetic_STUB(_sku: string): never {
  throw new Error(
    'STUB: cosmetics sales are not implemented. No payment code and no receiving wallet. Money path for credits/stakes is on hold; cosmetics remain a later, separate one-time Sales flow after Sneaks confirms the wallet.',
  );
}
