import assert from "node:assert/strict"
import { ClientError, HttpStatus } from "@otterhttp/errors"
import { z } from "zod"

import { prisma } from "@/database"
import { Group, onlyGroups } from "@/decorators/authorise"
import { json } from "@/lib/body-parsers"
import { getKeycloakAdminClient, unpackAttribute } from "@/lib/keycloak-client"
import type { Middleware } from "@/types"

class ProfileHandlers {
  static userIdSchema = z.string().uuid()

  validateUserId(): Middleware {
    return async (request, response, next) => {
      const userId = request.params.userId
      try {
        ProfileHandlers.userIdSchema.parse(userId)
      } catch (error) {
        assert(error instanceof Error)
        throw new ClientError("Malformed user ID", {
          statusCode: HttpStatus.BadRequest,
          exposeMessage: true,
          expected: true,
          cause: error,
        })
      }
      next()
    }
  }

  @onlyGroups([Group.admins, Group.volunteers])
  getProfile(): Middleware {
    return async (request, response) => {
      const userId = request.params.userId

      const adminClient = await getKeycloakAdminClient()
      const profile = await adminClient.users.findOne({ id: userId })
      if (profile == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

      const databaseProfile = await prisma.user.findUnique({
        where: { keycloakUserId: userId },
        include: {
          userInfo: true,
          userCv: { select: { userId: true } },
        }
      })

      response.status(200).json({
        status: response.statusCode,
        message: response.statusMessage,
        data: {
          userId,
          preferredNames: unpackAttribute(profile, "preferredNames"),
          firstNames: unpackAttribute(profile, "firstNames"),
          lastNames: unpackAttribute(profile, "lastNames"),
          pronouns: unpackAttribute<"he/him" | "she/her" | "they/them" | "xe/xem" | "Please Ask" | "Unspecified">(profile, "pronouns", "Unspecified"),
          hasAttendeeTicket: databaseProfile?.userInfo?.applicationStatus === "accepted",
          uploadedCv: databaseProfile?.userCv != null,
        },
      })
    }
  }

  @onlyGroups([Group.admins, Group.volunteers])
  getProfileFlags(): Middleware {
    return async (request, response) => {
      const userId = request.params.user_id
      const specificUserFlags = await prisma.user
        .findUnique({
          where: {
            keycloakUserId: userId,
          },
        })
        .userFlags()

      if (specificUserFlags == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

      const userFlagArray: string[] = specificUserFlags.map((flag) => flag.flagName)
      response.status(200).json({
        status: response.statusCode,
        message: response.statusMessage,
        data: userFlagArray,
      })
    }
  }

  static patchProfileFlagsPayloadSchema = z.record(z.string(), z.boolean())
  static legalFlagNames = new Set(["attendance"])

  @onlyGroups([Group.admins, Group.volunteers])
  patchProfileFlags(): Middleware {
    return async (request, response) => {
      const body = await json(request, response)
      const flags = ProfileHandlers.patchProfileFlagsPayloadSchema.parse(body)

      const userId = request.params.user_id

      const removeFlagQuery = (flagName: string) => {
        return prisma.userFlag.deleteMany({
          where: {
            userId,
            flagName,
          },
        })
      }

      const setFlagQuery = (flagName: string) => {
        return prisma.userFlag.upsert({
          where: {
            id: {
              userId,
              flagName,
            },
          },
          create: {
            userId,
            flagName,
          },
          update: {},
        })
      }

      const operations = Object.keys(flags).map((flagName) => {
        if (!ProfileHandlers.legalFlagNames.has(flagName))
          throw new ClientError(`Unrecognised flag name '${flagName}'`, { statusCode: HttpStatus.BadRequest })

        if (flags[flagName]) return setFlagQuery(flagName)
        return removeFlagQuery(flagName)
      })

      await prisma.$transaction(operations)
      response.sendStatus(200)
    }
  }
}

const profilesHandlers = new ProfileHandlers()
export { profilesHandlers }
