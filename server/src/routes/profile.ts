import { App } from "@otterhttp/app"
import { ClientError, HttpStatus } from "@otterhttp/errors"
import { json } from "@otterhttp/parsec"
import { cors } from "corstisol"
import { z } from "zod"

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

const userFlagSchema = z.object({
  userFlags: z.object({}).catchall(z.boolean()),
})

const legalFlagNames = new Set(["attendance", "mlhCodeOfConduct", "mlhPolicies", "mlhMarketing"])

export const profileApp = new App<Request, Response>()
profileApp.use(json())

profileApp
  .route("/:user_id")
  .all(methodNotAllowed(["OPTIONS", "GET"]))
  .options(cors())
  .get(async (req, res): Promise<void> => {
    const userId = req.params.user_id as string
    const userInfo = await prisma.userInfo.findUnique({
      where: {
        userId: userId,
      },
    })
    if (userInfo == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })
    res.status(200).json(userInfo)
  })

profileApp
  .route("/:user_id/flags")
  .all(methodNotAllowed(["OPTIONS", "GET", "PATCH"]))
  .options(cors())
  .patch(async (req, res): Promise<void> => {
    const validatedPayload = userFlagSchema.parse(req.body)
    const flags = validatedPayload.userFlags

    const userId = req.params.user_id

    const removeFlagQuery = (flagName: string) => {
      return prisma.userFlag.deleteMany({
        where: {
          userId: userId,
          name: flagName,
        },
      })
    }

    const setFlagQuery = (flagName: string) => {
      return prisma.userFlag.upsert({
        where: {
          id: {
            userId: userId,
            name: flagName,
          },
        },
        create: {
          userId: userId,
          name: flagName,
        },
        update: {},
      })
    }

    const operations = Object.keys(flags).map((flagName) => {
      if (!legalFlagNames.has(flagName))
        throw new ClientError(`Unrecognised flag name '${flagName}'`, { statusCode: HttpStatus.BadRequest })

      if (flags[flagName]) return setFlagQuery(flagName)
      return removeFlagQuery(flagName)
    })

    await prisma.$transaction(operations)
    res.sendStatus(200)
  })

  .get(async (req, res): Promise<void> => {
    const userId = req.params.user_id as string
    const specificUserFlags = await prisma.user
      .findUnique({
        where: {
          keycloakUserId: userId,
        },
      })
      .userFlags()

    if (specificUserFlags == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

    const userFlagArray = specificUserFlags.map((flag) => flag.name)
    res.status(200).json(userFlagArray)
  })