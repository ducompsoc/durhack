import type { Request, Response } from "@/types"
import type { User } from "@/database"
import { getSession } from "@/lib/session"

export class AuthHandlers {
  handleLoginSuccess() {
    return async (request: Request & { user?: User }, response: Response) => {
      if (request.user == null) {
        return response.redirect("/login")
      }

      const session = await getSession(request, response)
      if ("redirect_to" in session && typeof session.redirect_to === "string") {
        return response.redirect(session.redirect_to)
      }

      return response.redirect("/")
    }
  }
}

export const authHandlers = new AuthHandlers()
