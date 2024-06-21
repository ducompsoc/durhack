import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"
import { z, ZodError } from "zod"
import { json } from "milliparsec"
import { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma-client-instance";
import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const registerInterestRoutesApp = new App()

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
    .post(async function (req, res): Promise<void> {
      try {
        const validatedPayload = registerInterestFormSchema.parse(req.body)
        await prisma.interest.create({
          data: validatedPayload
        })
        res.sendStatus(204)
      } catch (error) {
        if (error instanceof ZodError) {
          res.sendStatus(400) // refuse to elaborate hehe
          return;
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") { // https://www.prisma.io/docs/orm/reference/error-reference#p2002
            res.sendStatus(409)
            return;
          }
        }
      }
    })
