import { TokenSet as ClientTokenSet } from "openid-client"

import type { TokenSet as PrismaTokenSet } from "@/database"

export function adaptTokenSetToClient(tokenSet: PrismaTokenSet): ClientTokenSet {
  return new ClientTokenSet({
    token_type: tokenSet.tokenType ?? undefined,
    access_token: tokenSet.accessToken ?? undefined,
    id_token: tokenSet.idToken ?? undefined,
    refresh_token: tokenSet.refreshToken ?? undefined,
    scope: tokenSet.scope ?? undefined,
    expires_at: tokenSet.accessExpiry != null ? Math.floor(tokenSet.accessExpiry.getTime() / 1000) : undefined,
    session_state: tokenSet.sessionState ?? undefined,
  })
}

export function adaptTokenSetToDatabase(tokenSet: ClientTokenSet): Omit<PrismaTokenSet, "userId"> {
  return {
    tokenType: tokenSet.token_type ?? null,
    accessToken: tokenSet.access_token ?? null,
    idToken: tokenSet.id_token ?? null,
    refreshToken: tokenSet.refresh_token ?? null,
    scope: tokenSet.scope ?? null,
    accessExpiry: tokenSet.expires_at != null ? new Date(tokenSet.expires_at * 1000) : null,
    sessionState: tokenSet.session_state ?? null,
  }
}
