import assert from "node:assert/strict"
import type { UserProfile } from "@durhack/durhack-common/types/user-profile"
import { ClientError, HttpStatus, ServerError } from "@otterhttp/errors"
import type { Prisma } from "@prisma/client"
import { z } from "zod"

import { durhackConfig } from "@/config"
import { type UserFlag, prisma } from "@/database"
import { adaptApplicationStatusFromDatabase } from "@/database/adapt-application-status"
import { Group, onlyGroups } from "@/decorators/authorise"
import { json } from "@/lib/body-parsers"
import { getKeycloakAdminClient, getKeycloakGroupId, unpackAttribute } from "@/lib/keycloak-client"
import type { Middleware } from "@/types"

const attendeeQuery = {
  include: {
    userInfo: true,
    userFlags: {
      where: {
        flagName: "attendance",
      },
    },
  },
} satisfies Prisma.UserDefaultArgs

type Attendee = Prisma.UserGetPayload<typeof attendeeQuery>

class ProfileHandlers {
  static userIdSchema = z.string().uuid()

  validateUserId(): Middleware {
    return async (request, response, next) => {
      const userId = request.params.userId
      assert(userId)

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

  @onlyGroups([Group.admins, Group.organisers, Group.volunteers])
  getProfile(): Middleware {
    return async (request, response) => {
      const userId = request.params.userId
      assert(userId)

      const adminClient = await getKeycloakAdminClient()
      const profile = await adminClient.users.findOne({ id: userId })
      if (profile == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

      const databaseProfile = await prisma.user.findUnique({
        where: { keycloakUserId: userId },
        include: {
          userInfo: true,
          userCv: { select: { userId: true } },
          userFlags: { where: { flagName: "attendance" } },
        },
      })
      assert(databaseProfile)

      const attendanceFlag = this.findAttendanceFlag(databaseProfile)

      response.status(200).json({
        status: response.statusCode,
        message: response.statusMessage,
        data: {
          userId,
          email: profile.email as string,
          preferredNames: unpackAttribute(profile, "preferredNames"),
          firstNames: unpackAttribute(profile, "firstNames") as string,
          lastNames: unpackAttribute(profile, "lastNames") as string,
          pronouns: unpackAttribute<"he/him" | "she/her" | "they/them" | "xe/xem" | "Please Ask" | "Unspecified">(
            profile,
            "pronouns",
            "Unspecified",
          ),
          checkedIn: attendanceFlag != null,
          checkedInAt: attendanceFlag?.createdAt?.getTime() ?? null,
          applicationStatus: adaptApplicationStatusFromDatabase(databaseProfile?.userInfo?.applicationStatus),
          uploadedCv: databaseProfile?.userCv != null,
        } satisfies UserProfile,
      })
    }
  }

  @onlyGroups([Group.admins, Group.organisers, Group.volunteers])
  getStashClaims(): Middleware {
    return async (request, response) => {
      const userId = request.params.userId
      assert(userId)

      const stashItemFlags = await prisma.user
        .findUnique({
          where: {
            keycloakUserId: userId,
          },
        })
        .userFlags({
          where: {
            flagName: { startsWith: "stash:" },
          },
        })

      if (stashItemFlags == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

      const stashItems: Array<{
        name: string
        slug: string
        claimed: boolean
      }> = Object.entries(durhackConfig.stashItems).map(([slug, item]) => ({
        slug,
        name: item.name,
        claimed: stashItemFlags.some((flag) => flag.flagName === `stash:${slug}`),
      }))

      response.status(200).json({
        status: response.statusCode,
        message: response.statusMessage,
        data: stashItems,
      })
    }
  }

  static patchStashClaimsPayloadSchema = z.record(z.string(), z.boolean())

  @onlyGroups([Group.admins, Group.organisers, Group.volunteers])
  patchStashClaims(): Middleware {
    return async (request, response) => {
      const userId = request.params.userId
      assert(userId)

      const body = await json(request, response)
      const stashItems = ProfileHandlers.patchStashClaimsPayloadSchema.parse(body)

      const setUnclaimedQuery = (stashSlug: string) => {
        return prisma.userFlag.deleteMany({
          where: {
            userId,
            flagName: `stash:${stashSlug}`,
          },
        })
      }

      const setClaimedQuery = (stashSlug: string) => {
        return prisma.userFlag.upsert({
          where: {
            id: {
              userId,
              flagName: `stash:${stashSlug}`,
            },
          },
          create: {
            userId,
            flagName: `stash:${stashSlug}`,
          },
          update: {},
        })
      }

      const operations = Object.keys(stashItems).map((stashItemSlug) => {
        if (!Object.hasOwn(durhackConfig.stashItems, stashItemSlug))
          throw new ClientError(`Unrecognised stash item slug '${stashItemSlug}'`, {
            statusCode: HttpStatus.BadRequest,
          })

        if (stashItems[stashItemSlug]) return setClaimedQuery(stashItemSlug)
        return setUnclaimedQuery(stashItemSlug)
      })

      await Promise.all(operations)
      response.sendStatus(200)
    }
  }

  private isCheckedIn(attendee: { userFlags: UserFlag[] }): boolean {
    return this.findAttendanceFlag(attendee) != null
  }

  private findAttendanceFlag(attendee: { userFlags: UserFlag[] }): UserFlag | undefined {
    return attendee.userFlags.find((flag) => flag.flagName === "attendance")
  }

  private hasTicketOrIsWaitListed(attendee: Attendee): boolean {
    if (attendee.userInfo == null) return false
    if (attendee.userInfo.applicationStatus === "accepted") return true
    if (attendee.userInfo.applicationStatus === "waitingList") return true
    return false
  }

  private async checkInAttendee(attendee: Attendee): Promise<void> {
    if (this.isCheckedIn(attendee))
      throw new ClientError(`${attendee.keycloakUserId} is already checked in`, {
        statusCode: HttpStatus.Conflict,
        exposeMessage: true,
        code: "ERR_ALREADY_CHECKED_IN",
      })

    const adminClient = await getKeycloakAdminClient()
    // todo: investigate whether listGroups throws when user not found; we can possibly skip the profile fetching step
    const [profile, groups] = await Promise.all([
      adminClient.users.findOne({ id: attendee.keycloakUserId }),
      adminClient.users.listGroups({ id: attendee.keycloakUserId }),
    ])
    if (profile == null) throw new ClientError("", { statusCode: HttpStatus.NotFound })

    if (
      groups.some((group) => {
        if (group.path === "/admins") return true
        if (group.path === "/judges") return true
        if (group.path === "/organisers") return true
        if (group.path === "/sponsors") return true
        if (group.path === "/volunteers") return true
        return false
      })
    )
      throw new ClientError(`${attendee.keycloakUserId} is involved in running DurHack`, {
        statusCode: HttpStatus.Conflict,
        exposeMessage: true,
        code: "ERR_IS_DURHACK_HELPER",
      })

    if (!this.hasTicketOrIsWaitListed(attendee))
      throw new ClientError(`${attendee.keycloakUserId} does not have an accepted/waiting-listed application`, {
        exposeMessage: true,
        code: "ERR_NO_DURHACK_TICKET",
      })

    await adminClient.users.addToGroup({ id: attendee.keycloakUserId, groupId: getKeycloakGroupId(Group.hackers) })
    await prisma.userFlag.create({
      data: {
        userId: attendee.keycloakUserId,
        flagName: "attendance",
      },
    })
  }

  private async undoCheckInAttendee(attendee: Attendee): Promise<void> {
    const attendanceFlag = this.findAttendanceFlag(attendee)
    if (attendanceFlag == null)
      throw new ClientError(`${attendee.keycloakUserId} is not checked in`, {
        statusCode: HttpStatus.Conflict,
        exposeMessage: true,
        code: "ERR_NOT_CHECKED_IN",
      })

    const millisecondsSinceCheckIn = Date.now() - attendanceFlag.createdAt.getTime()
    const permitUndoCheckInMilliseconds = 5 * 60 * 1000 // 5 minutes

    if (millisecondsSinceCheckIn >= permitUndoCheckInMilliseconds)
      throw new ClientError(`${attendee.keycloakUserId} was checked in over 5 minutes ago`, {
        statusCode: HttpStatus.Conflict,
        exposeMessage: true,
        code: "ERR_PERMITTED_UNDO_TIMESPAN_ELAPSED",
      })

    const adminClient = await getKeycloakAdminClient()
    await adminClient.users.delFromGroup({ id: attendee.keycloakUserId, groupId: getKeycloakGroupId(Group.hackers) })
    await prisma.userFlag.delete({
      where: {
        id: {
          userId: attendee.keycloakUserId,
          flagName: "attendance",
        },
      },
    })
  }

  @onlyGroups([Group.admins, Group.organisers, Group.volunteers])
  postCheckIn(): Middleware {
    return async (request, response) => {
      const userId = request.params.userId
      assert(userId)

      const attendee = await prisma.user.findUnique({
        where: { keycloakUserId: userId },
        ...attendeeQuery,
      })
      if (!attendee) throw new ClientError("", { statusCode: HttpStatus.NotFound })

      response.setHeader("etag", String(this.isCheckedIn(attendee)))
      response.validatePreconditions()

      if (request.query.whoops != null) {
        await this.undoCheckInAttendee(attendee)
        response.json()
        return
      }

      await this.checkInAttendee(attendee)
      response.json()
    }
  }

  @onlyGroups([Group.admins, Group.organisers, Group.volunteers])
  getGuildsProfile(): Middleware {
    return async (request, response) => {
      throw new ServerError("Not Implemented", { statusCode: HttpStatus.NotImplemented })
    }
  }
}

const profileHandlers = new ProfileHandlers()
export { profileHandlers }
