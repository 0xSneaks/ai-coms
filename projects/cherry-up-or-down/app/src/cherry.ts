import { CherryMiniApp, isInsideCherry } from '@cherrydotfun/miniapp-sdk';

let app: CherryMiniApp | null = null;
let userKey = 'standalone-local';

/**
 * Call immediately on load. The SDK answers cherry:init with cherry:ready
 * within 5s. Do not gate this behind splash, assets, or a wallet check.
 * Standalone (local vite) skips init so we don't wait on a missing host.
 */
export function startCherryHandshake(): void {
  if (!isInsideCherry()) return;
  app = new CherryMiniApp();
  void app
    .init()
    .then(() => {
      // TODO(server): POST launchToken to /auth/cherry (see server/auth-stub.ts)
      // verifyLaunchToken(token, { appId }) and key users by cherry_id ?? sub.
      const claims = (app as unknown as { claims?: { cherry_id?: string; sub?: string } }).claims;
      const ctx = (app as unknown as { context?: { cherryId?: string } }).context;
      userKey = claims?.cherry_id ?? ctx?.cherryId ?? claims?.sub ?? 'standalone-local';
    })
    .catch((err) => {
      console.warn('Cherry init failed (ok in standalone)', err);
    });
}

export function getUserKey(): string {
  return userKey;
}

export function getCherry(): CherryMiniApp | null {
  return app;
}

/** Live chat → navigate.openRoom. Standalone is a no-op stub (no room host). */
export async function openRoomStub(): Promise<'opened' | 'standalone'> {
  if (!app) return 'standalone';
  const nav = (app as unknown as { navigate?: { openRoom?: (p: { roomId?: string }) => Promise<void> } }).navigate;
  if (nav?.openRoom) {
    await nav.openRoom({});
    return 'opened';
  }
  return 'standalone';
}

/** Result share. Never claims cash or a Kalshi payout. */
export async function shareResultStub(text: string): Promise<'shared' | 'standalone'> {
  if (!app) return 'standalone';
  const share = (app as unknown as { share?: (p: unknown) => Promise<void> }).share;
  if (share) {
    await share({ text });
    return 'shared';
  }
  return 'standalone';
}
