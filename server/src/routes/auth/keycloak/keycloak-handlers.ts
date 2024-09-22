import type { NextFunction, Request as OtterRequest, Response } from "@otterhttp/app"
import { ClientError } from "@otterhttp/errors"
import { type Client, generators } from "openid-client"

import { adaptTokenSetToDatabase } from "@/lib/adapt-token-set"
import { keycloakClient } from "@/lib/keycloak-client"
import { getSession } from "@/lib/session"
import { frontendOrigin, origin } from "@/config"
import { type User, prisma } from "@/database"
import type { Middleware, Request } from "@/types"

export class KeycloakHandlers {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  async getOrGenerateCodeVerifier(request: Request, response: Response): Promise<string> {
    const session = await getSession(request, response)
    if (typeof session.keycloakOAuth2FlowCodeVerifier === "string") return session.keycloakOAuth2FlowCodeVerifier

    const codeVerifier = generators.codeVerifier()
    session.keycloakOAuth2FlowCodeVerifier = codeVerifier
    await session.commit()
    return codeVerifier
  }

  beginOAuth2Flow(): Middleware {
    return async (request: Request, response: Response) => {
      const codeVerifier = await this.getOrGenerateCodeVerifier(request, response)
      const codeChallenge = generators.codeChallenge(codeVerifier)

      const url = this.client.authorizationUrl({
        scope: "openid email profile roles",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      })

      response.redirect(url)
    }
  }

  logout(): Middleware {
    return async (request: Request, response: Response) => {
      const session = await getSession(request, response)
      session.userId = undefined
      await session.commit()

      if (request.user?.tokenSet?.idToken) {
        const endSessionUrl = keycloakClient.endSessionUrl({
          id_token_hint: request.user?.tokenSet?.idToken,
          post_logout_redirect_uri: frontendOrigin
        });
        response.redirect(endSessionUrl)
        return
      }

      response.redirect(frontendOrigin)
    }
  }

  static redirectUri = new URL("/auth/keycloak/callback", origin).toString()

  oauth2FlowCallback(): Middleware {
    return async (request: OtterRequest & { user?: User }, response: Response, next: NextFunction) => {
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
