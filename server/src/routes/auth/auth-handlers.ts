import { frontendOrigin } from "@/config"
import { getSession } from "@/lib/session"
import type { Request, Response } from "@/types"

export class AuthHandlers {
  static redirectUri = new URL("/dashboard", frontendOrigin).toString()

  handleLoginSuccess() {
    return async (request: Request, response: Response) => {
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
