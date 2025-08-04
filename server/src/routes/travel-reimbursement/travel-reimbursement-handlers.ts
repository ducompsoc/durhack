import { onlyKnownUsers } from "@/decorators/authorise"
import type { Middleware } from "@/types"

class TravelReimbursementHandlers {
  @onlyKnownUsers()
  patch(): Middleware {
    return async (request, response) => {
      response.json({ foo: "hello, world!" })
    }
  }
}

export const travelReimbursementHandlers = new TravelReimbursementHandlers()
