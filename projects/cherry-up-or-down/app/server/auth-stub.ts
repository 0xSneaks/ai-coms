/**
 * TODO(server): Launch-token verification stub.
 *
 * When a listing is registered, this must run on the server — never trust
 * client context. Each of the 10 listings verifies tokens for ITS OWN appId.
 *
 *   import { verifyLaunchToken } from '@cherrydotfun/miniapp-sdk';
 *   const claims = await verifyLaunchToken(token, { appId: APP_ID });
 *   const userId = claims.cherry_id ?? claims.sub;
 *
 * Credits and cosmetic unlocks are keyed by that userId and shared across
 * all 10 apps. Do not ship this stub. No payment code lives here.
 */
export const APP_ID_PLACEHOLDER = 'TODO_APP_ID';

export async function signInWithCherry_STUB(_token: string, _appId: string) {
  throw new Error(
    'STUB: verifyLaunchToken + appId is not implemented. See projects/cherry-up-or-down.md and this file.',
  );
}
