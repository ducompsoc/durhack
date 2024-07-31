import type { NextFunction, Request, Response } from "@tinyhttp/app"
import createHttpError from "http-errors"
import { type Client, generators } from "openid-client"

import { getSession } from "@/lib/session"
import { hostname } from "@/config"
import { type User, prisma } from "@/database"
import type { Middleware } from "@/types/middleware"

import { adaptTokenSetToDatabase } from "@/lib/adapt-token-set"
import { keycloakClient } from "./keycloak-client"

export class KeycloakHandlers {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  beginOAuth2Flow(): Middleware {
    return async (request: Request, response: Response) => {
      const codeVerifier = generators.codeVerifier()
      const session = await getSession(request, response)
      session.keycloakOAuth2FlowCodeVerifier = codeVerifier
      await session.commit()

      const codeChallenge = generators.codeChallenge(codeVerifier)

      const url = this.client.authorizationUrl({
        scope: "openid email profile roles",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      })

      response.redirect(url)
    }
  }

  static redirectUri = new URL("/auth/keycloak/callback", hostname).toString()

  oauth2FlowCallback(): Middleware {
    return async (request: Request & { user?: User }, response: Response, next: NextFunction) => {
      const session = await getSession(request, response)
      let codeVerifier: unknown
      try {
        codeVerifier = session.keycloakOAuth2FlowCodeVerifier
        if (typeof codeVerifier !== "string") throw new createHttpError.BadRequest()
      } finally {
        session.keycloakOAuth2FlowCodeVerifier = undefined
        await session.commit()
      }

      const params = this.client.callbackParams(request)
      // todo: get URL from `req` once tinyhttp is fixed
      const tokenSet = await this.client.callback(KeycloakHandlers.redirectUri, params, { code_verifier: codeVerifier })

      const userId = tokenSet.claims().sub
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
      })

      session.userId = userId
      await session.commit()
      request.user = user

      next()
    }
  }
}

export const keycloakHandlers = new KeycloakHandlers(keycloakClient)
