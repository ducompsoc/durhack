import { NextFunction } from "@otterhttp/app"

import type { User } from "@/database"
import { getSession } from "@/lib/session"
import type { Request, Response } from "@/types"
import { frontendHostname } from "@/config"

export class AuthHandlers {
  static redirectUri = new URL("/details", frontendHostname).toString()

  handleLoginSuccess() {
    return async (request: Request & { user?: User }, response: Response) => {
      if (request.user == null) {
        return response.redirect("/auth/keycloak/login")
      }

      const session = await getSession(request, response)
      if (session.redirectTo != null) {
        const redirectTo = session.redirectTo
        session.redirectTo = undefined
        await response.redirect(redirectTo)
        return
      }

      return await response.redirect(AuthHandlers.redirectUri)
    }
  }
}

export const authHandlers = new AuthHandlers()
