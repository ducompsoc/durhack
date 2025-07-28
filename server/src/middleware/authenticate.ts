import assert from "node:assert/strict"
import { ServerError } from "@otterhttp/errors"
import type { UserinfoResponse } from "openid-client"

import { prisma } from "@/database"
import { adaptTokenSetToClient, adaptTokenSetToDatabase } from "@/lib/adapt-token-set"
import { isNetworkError } from "@/lib/is-network-error"
import { type KeycloakUserInfo, keycloakClient } from "@/lib/keycloak-client"
import { getSession } from "@/lib/session"
// biome-ignore lint/correctness/noUnusedImports: 'Request' type is used in JSDoc annotations
import type { Middleware, Request } from "@/types"

/**
 * Returns a middleware which assigns {@link Request.user}, {@link Request.userTokenSet} and {@link Request.userProfile}
 * for requests that include appropriate valid credentials.
 *
 * This middleware is pass-through and performs no authorisation - it will always invoke <code>next</code> provided
 * that no unexpected error occurs.
 *
 * 'Appropriate valid credentials' in this context consist of a session cookie meeting the following conditions:
 *  - the session cookie's associated session record must have a <code>userId</code> member
 *  - a user with the session record's <code>userId</code> must exist in persistent storage (the database)
 *  - the user must have an associated token set in persistent storage
 *  - if the set's access token has expired, Keycloak must accept the set's refresh token in exchange for a
 *    fresh token set
 *  - Keycloak must accept the (potentially refreshed) token set's access token as credentials for its
 *    OpenID Connect <code>userinfo</code> endpoint
 */
export function authenticate(): Middleware {
  return async (request, response, next) => {
    const session = await getSession(request, response)
    if (session.userId == null) return next()
    const user = await prisma.user.findUnique({
      where: { keycloakUserId: session.userId },
      include: { tokenSet: true },
    })

    if (user == null || user.tokenSet == null) {
      session.userId = undefined
      await session.commit()
      return next()
    }

    // if the token set has expired, we try to refresh it
    let tokenSet = adaptTokenSetToClient(user.tokenSet)
    if (tokenSet.expired() && tokenSet.refresh_token != null) {
      try {
        tokenSet = await keycloakClient.refresh(tokenSet.refresh_token)
        await prisma.tokenSet.update({
          where: { userId: user.keycloakUserId },
          data: adaptTokenSetToDatabase(tokenSet),
        })
      } catch (error) {
        if (isNetworkError(error)) {
          throw new ServerError("Encountered network error while attempting to refresh a token set", {
            statusCode: 500,
            exposeMessage: false,
            cause: error,
          })
        }
      }
    }

    // if the token set is still expired, the user needs to log in again
    if (tokenSet.expired() || tokenSet.access_token == null) {
      session.userId = undefined
      await session.commit()
      return next()
    }

    // use the token set to get the user profile
    let profile: UserinfoResponse<KeycloakUserInfo> | undefined
    try {
      profile = await keycloakClient.userinfo<KeycloakUserInfo>(tokenSet.access_token)
    } catch (error) {
      if (isNetworkError(error)) {
        throw new ServerError("Encountered network error while attempting to fetch profile info", {
          statusCode: 500,
          exposeMessage: false,
          cause: error,
        })
      }

      assert(error instanceof Error)
      console.error(`Failed to fetch profile info for ${tokenSet.claims().email}: ${error.stack}`)

      // if the access token is rejected, the user needs to log in again
      session.userId = undefined
      await session.commit()
      return next()
    }

    request.userProfile = profile
    request.userTokenSet = tokenSet
    request.user = user
    next()
  }
}
