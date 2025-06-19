import { z } from "zod"

import { prisma } from "@/database"
import { json } from "@/lib/body-parsers"
import type { Middleware } from "@/types"

const registerInterestFormSchema = z.object({
  firstNames: z.string().trim().min(1),
  lastNames: z.string().trim().min(1),
  email: z.string().email(),
})

class RegisterInterestHandlers {
  post(): Middleware {
    return async (request, response) => {
      const rawPayload = await json(request, response)
      const payload = registerInterestFormSchema.parse(rawPayload)

      await prisma.interest.create({
        data: payload,
      })
      response.sendStatus(200)
    }
  }
}

const registerInterestHandlers = new RegisterInterestHandlers()
export { registerInterestHandlers }
