import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"
import { z } from "zod"
import { json } from "milliparsec"

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
      const validatedPayload = registerInterestFormSchema.parse(req.body)
      await prisma.interest.create({
        data: validatedPayload
      })
      res.sendStatus(204)
    })
