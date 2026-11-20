/**
 * Server-side Cherry launch-token verification.
 *
 * SERVER ONLY — never import this from client code. The browser never sees
 * a verified identity; it only carries the launch token. Every request that
 * moves credits, reads a balance, or touches a cosmetic unlock must pass
 * through `verifyCherryUser` (or `requireCherryUser`) first.
 *
 * Each of the 10 listings verifies tokens for ITS OWN appId. The appId comes
 * from server config (env CHERRY_APP_ID, one value per listing deployment),
 * never from the client. Credits and cosmetic unlocks are keyed by
 * `userKey = claims.cherry_id ?? claims.sub` and are shared across all 10
 * listings. A token whose `aud` is present is always checked against the
 * listing's appId by the SDK; pass `requireAudience: true` once all traffic
 * carries `aud`.
 *
 * Verification is RS256 against Cherry's JWKS
 * (https://chat.cherry.fun/.well-known/jwks.json). If the JWKS cannot be
 * fetched the token is REJECTED — never accept on a fetch failure.
 *
 * Minimal wiring (any Node server; no framework assumed):
 *
 *   import { requireCherryUser } from './server/auth.js';
 *   const user = await requireCherryUser(req.headers, process.env.CHERRY_APP_ID!);
 *   // user.userKey — use it for the ledger, never req.body.userId.
 *
 * No payment code lives here. No wallet address is configured here.
 */
import { verifyLaunchToken, LaunchTokenError } from '@cherrydotfun/miniapp-sdk';
import type { LaunchTokenPayload } from '@cherrydotfun/miniapp-sdk';

export type VerifiedCherryUser = {
  /** Key every user record by this: `cherry_id` when present, else `sub`. */
  userKey: string;
  /** Stable Cherry person id, or null when the wallet has none. */
  cherryId: string | null;
  /** Wallet address the person is using in the app. */
  sub: string;
  /** The listing this token was minted for (must equal the server's appId). */
  appId: string;
  roomId: string;
  claims: LaunchTokenPayload;
};

export class CherryAuthError extends Error {
  readonly code: string;
  constructor(code: string, message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'CherryAuthError';
    this.code = code;
    if (options?.cause !== undefined) (this as { cause?: unknown }).cause = options.cause;
  }
}

export function userKeyFromClaims(
  claims: Pick<LaunchTokenPayload, 'cherry_id' | 'sub'>,
): string {
  return claims.cherry_id ?? claims.sub;
}

/** Fail fast when a listing has no real portal appId configured yet. */
export function assertRealAppId(appId: string): void {
  if (!appId || appId.startsWith('TODO_')) {
    throw new CherryAuthError(
      'INVALID_OPTIONS',
      `No real portal appId configured (got "${appId}"). Create the listing in the portal and set CHERRY_APP_ID — see PORTAL-CHECKLIST.md.`,
    );
  }
}

export type VerifyOptions = {
  issuer?: string | readonly string[];
  jwksUrl?: string;
  /** Local key set instead of fetching the JWKS — tests / offline pinning only. */
  jwks?: import('jose').JSONWebKeySet;
  requireAudience?: boolean;
  scope?: 'launch' | 'inline' | 'fullscreen' | readonly ('launch' | 'inline' | 'fullscreen')[];
  clockTolerance?: number;
};

/**
 * Verify a Cherry launch token and return the authenticated user.
 * Throws CherryAuthError on every failure — treat every throw as
 * "unauthenticated" and never fall back to client-supplied identity.
 */
export async function verifyCherryUser(
  token: string,
  appId: string,
  options?: VerifyOptions,
): Promise<VerifiedCherryUser> {
  assertRealAppId(appId);
  if (!token || typeof token !== 'string' || !token.trim()) {
    throw new CherryAuthError('TOKEN_INVALID', 'Missing launch token.');
  }
  let claims: LaunchTokenPayload;
  try {
    claims = await verifyLaunchToken(token.trim(), { appId, ...options });
  } catch (err) {
    if (err instanceof LaunchTokenError) {
      throw new CherryAuthError(err.code, `Launch token rejected (${err.code}).`, {
        cause: err,
      });
    }
    throw new CherryAuthError('JWKS_UNAVAILABLE', 'Could not verify launch token.', {
      cause: err,
    });
  }
  return {
    userKey: userKeyFromClaims(claims),
    cherryId: claims.cherry_id ?? null,
    sub: claims.sub,
    appId,
    roomId: claims.room_id,
    claims,
  };
}

export type HeaderBag = Record<string, string | string[] | undefined>;

/**
 * Framework-free request helper: read `Authorization: Bearer <token>` and
 * verify it for this listing's appId. `appId` must come from server config,
 * never from headers or the request body.
 */
export async function requireCherryUser(
  headers: HeaderBag,
  appId: string,
  options?: VerifyOptions,
): Promise<VerifiedCherryUser> {
  assertRealAppId(appId);
  const raw = headers.authorization ?? headers.Authorization;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const token =
    typeof value === 'string' && value.toLowerCase().startsWith('bearer ')
      ? value.slice(7).trim()
      : undefined;
  if (!token) {
    throw new CherryAuthError(
      'TOKEN_INVALID',
      'Missing Authorization: Bearer <launch-token> header.',
    );
  }
  return verifyCherryUser(token, appId, options);
}
