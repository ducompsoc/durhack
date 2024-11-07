import type { NextFunction } from "@otterhttp/app"
import { ClientError } from "@otterhttp/errors"
import { type Client, generators } from "openid-client"
import { z } from "zod"

import { frontendOrigin, origin } from "@/config"
import { prisma } from "@/database"
import { adaptTokenSetToDatabase } from "@/lib/adapt-token-set"
import { keycloakClient } from "@/lib/keycloak-client"
import { type DurHackSession, getSession } from "@/lib/session"
import type { Middleware, Request, Response } from "@/types"

const destinationUrlSchema = z
  .string()
  .transform((value, ctx) => {
    try {
      return new URL(value)
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string, // for some reason this always comes out as 'custom'
        validation: "url",
        message: "Invalid url",
      })
      return z.NEVER
    }
  })
  .refine(
    (value) => value.origin === origin || value.origin === frontendOrigin,
    (value) => ({ message: `Specified destination origin ${value.origin} is not trusted` }),
  )

export class KeycloakHandlers {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  /**
   * 'lazily' log out the user - don't call the keycloak logout endpoint.
   * Just remove the user ID from the user's session.
   *
   * It's important we do this before initiating the keycloak login flow because we downgrade the session cookie to
   * SameSite 'Lax' during the OAuth flow (not implemented yet -
   * requires https://github.com/OtterJS/otterhttp-session/issues/1).
   */
  lazyLogout(response: Response, session: DurHackSession): void {
    if (session.userId == null) return

    session.userId = undefined
    response.sessionDirty = true
  }

  getOrGenerateCodeVerifier(response: Response, session: DurHackSession): string {
    if (typeof session.keycloakOAuth2FlowCodeVerifier === "string") return session.keycloakOAuth2FlowCodeVerifier

    const codeVerifier = generators.codeVerifier()
    session.keycloakOAuth2FlowCodeVerifier = codeVerifier
    response.sessionDirty = true
    return codeVerifier
  }

  beginOAuth2Flow(): Middleware {
    return async (request: Request, response: Response) => {
      const destination =
        request.query.destination != null ? destinationUrlSchema.parse(request.query.destination) : null
      const session = await getSession(request, response)
      session.redirectTo = destination?.href

      this.lazyLogout(response, session)
      const codeVerifier = this.getOrGenerateCodeVerifier(response, session)
      if (response.sessionDirty) await session.commit()

      const codeChallenge = generators.codeChallenge(codeVerifier)

      const url = this.client.authorizationUrl({
        scope: "openid email phone profile",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      })

      response.redirect(url)
    }
  }

  logout(): Middleware {
    return async (request: Request, response: Response) => {
      const session = await getSession(request, response)
      if (session.userId == null) {
        await response.redirect(frontendOrigin)
        return
      }

      session.userId = undefined
      await session.commit()

      if (request.user?.tokenSet?.idToken) {
        const endSessionUrl = keycloakClient.endSessionUrl({
          id_token_hint: request.user?.tokenSet?.idToken,
          post_logout_redirect_uri: frontendOrigin,
        })
        response.redirect(endSessionUrl)
        return
      }

      response.redirect(frontendOrigin)
    }
  }

  static redirectUri = new URL("/auth/keycloak/callback", origin).toString()

  oauth2FlowCallback(): Middleware {
    return async (request: Request, response: Response, next: NextFunction) => {
      const session = await getSession(request, response)
      let codeVerifier: unknown
      try {
        codeVerifier = session.keycloakOAuth2FlowCodeVerifier
        if (typeof codeVerifier !== "string")
          throw new ClientError("Code verifier not initialized", {
            statusCode: 400,
            exposeMessage: false,
          })
      } finally {
        session.keycloakOAuth2FlowCodeVerifier = undefined
        await session.commit()
      }

      const params = this.client.callbackParams(request)
      const tokenSet = await this.client.callback(KeycloakHandlers.redirectUri, params, { code_verifier: codeVerifier })

      const tokenSetClaims = tokenSet.claims()
      const userId = tokenSetClaims.sub
      const serializedTokenSet = adaptTokenSetToDatabase(tokenSet)

      const user = await prisma.user.upsert({
        where: {
          keycloakUserId: userId,
        },
        create: {
          keycloakUserId: userId,
          tokenSet: {
            create: serializedTokenSet,
          },
        },
        update: {
          tokenSet: {
            upsert: {
              create: serializedTokenSet,
              update: serializedTokenSet,
            },
          },
        },
        include: {
          tokenSet: true,
        },
      })

      session.userId = userId
      await session.commit()
      request.user = user

      next()
    }
  }
}

export const keycloakHandlers = new KeycloakHandlers(keycloakClient)
