import { ClientError, HttpStatus } from "@otterhttp/errors"

import { origin } from "@/config"
import type { Middleware } from "@/types"

/**
 * Returns a middleware which always throws a {@link ClientError}:
 *  - if the user that initiated the request is known, 403 Forbidden
 *  - if the user that initiated the request is unknown, 401 Unauthorized
 *
 * This middleware is intended to be used as a 'terminator' (registered as the final
 * middleware in an <code>App.route()</code> group).
 */
export function forbiddenOrUnauthorised(): Middleware {
  return (request, response) => {
    if (request.user != null) {
      // Re-authenticating will not allow access (i.e. you are not a high-enough privileged user):
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
      throw new ClientError("Your identity is known, but you don't have permission to access this resource", {
        statusCode: HttpStatus.Forbidden,
        code: "ERR_FORBIDDEN",
        exposeMessage: true,
        expected: true,
      })
    }

    // Lacking any credentials at all:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
    throw new ClientError("Your identity is not known; please login to access this resource", {
      statusCode: HttpStatus.Unauthorized,
      code: "ERR_UNAUTHORIZED",
      exposeMessage: true,
      expected: true,
      extra: {
        login_url: new URL(`/auth/keycloak/login?destination=${encodeURIComponent(request.href)}`, origin).href,
      },
    })
  }
}
