import { App } from "@otterhttp/app"
import { json } from "@otterhttp/parsec"
import { Prisma } from "@prisma/client"
import { cors } from "corstisol"
import { ZodError, z } from "zod"

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

export const registerInterestRoutesApp = new App<Request, Response>()

const registerInterestFormSchema = z.object({
  firstNames: z.string().trim().min(1),
  lastNames: z.string().trim().min(1),
  email: z.string().email(),
})

registerInterestRoutesApp
  .route("/")
  .all(methodNotAllowed(["OPTIONS", "POST"]))
  .options(cors())
  .post(json())
  .post(async (req, res): Promise<void> => {
    try {
      const validatedPayload = registerInterestFormSchema.parse(req.body)
      await prisma.interest.create({
        data: validatedPayload,
      })
      res.sendStatus(204)
    } catch (error) {
      if (error instanceof ZodError) {
        res.sendStatus(400) // refuse to elaborate hehe
        return
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // https://www.prisma.io/docs/orm/reference/error-reference#p2002
          res.sendStatus(409)
          return
        }
      }
    }
  })
