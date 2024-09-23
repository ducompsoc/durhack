import assert from "node:assert/strict"

import type { Middleware } from "@/types"

class UserHandlers {
  getUser(): Middleware {
    return async (request, response) => {
      assert(request.user)
      assert(request.userProfile)

      const payload = {
        id: request.user.keycloakUserId,
        email: request.userProfile.email,
        preferred_names: request.userProfile.preferred_names ?? request.userProfile.first_names,
        roles: request.userProfile.groups,
      }

      response.status(200)
      response.json({ status: response.statusCode, message: "OK", data: payload })
    }
  }
}

const userHandlers = new UserHandlers()
export { userHandlers }
