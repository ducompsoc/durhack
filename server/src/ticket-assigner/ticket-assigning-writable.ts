import stream from 'node:stream'

import { durhackConfig } from "@/config"
import { prisma, type UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"
import { mailgunClient } from "@/lib/mailgun"
import {getKeycloakAdminClient} from "@/lib/keycloak-client";
import {ClientError, HttpStatus} from "@otterhttp/errors";

export class TicketAssigningWritable extends stream.Writable {
  totalAssignedTicketCount: number

  constructor(totalAssignedTicketCount: number) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.totalAssignedTicketCount = totalAssignedTicketCount
  }

  /**
   * Assign a user a ticket to attend DurHack, and send an email notification.
   */
  async assignTicket(userInfo: UserInfo): Promise<void> {
    if (userInfo.applicationStatus === "accepted") return
    if (userInfo.applicationStatus === "unsubmitted") throw new Error(`Can't assign ticket to ${userInfo.userId} as their application is unsubmitted`)

    const adminClient = await getKeycloakAdminClient()
    const profile = await adminClient.users.findOne({ id: userInfo.userId })
    if (profile == null) return  // the user account does not exist - so do nothing

    try {
      this.totalAssignedTicketCount += 1
      const now = new Date()
      await prisma.userInfo.update({
        where: { userId: userInfo.userId },
        data: {
          applicationStatus: "accepted",
          applicationAcceptedAt: now,
          applicationStatusUpdatedAt: now,
        },
      })
    }
    catch (e) {
      this.totalAssignedTicketCount -= 1
      throw e
    }
  }

  /**
   * Move a user's application to the waiting list for a DurHack ticket, and send an email notification for the event.
   */
  async waitingList(userInfo: UserInfo): Promise<void> {
    if (userInfo.applicationStatus === "waitingList") return
    if (userInfo.applicationStatus === "unsubmitted") throw new Error(`Can't waiting list ${userInfo.userId} as their application is unsubmitted`)
    if (userInfo.applicationStatus === "accepted") throw new Error(`Can't waiting list ${userInfo.userId} as their application has been accepted`)

    const adminClient = await getKeycloakAdminClient()
    const profile = await adminClient.users.findOne({ id: userInfo.userId })
    if (profile == null) return  // the user account does not exist - so do nothing

    const now = new Date()
      await prisma.userInfo.update({
        where: { userId: userInfo.userId },
        data: {
          applicationStatus: "waitingList",
          applicationStatusUpdatedAt: now,
        },
      })
  }

  /**
   * If DurHack still has ticket capacity to allocate, assign an attendee ticket to the provided user.
   * Otherwise, move the user to the ticket waiting list.
   *
   * Note that, because of asynchronous IO in {@link assignTicket} (namely, the HTTP request that fetches
   * the user profile from Keycloak), {@link totalAssignedTicketCount} is not incremented before this comparison
   * is evaluated for concurrent executions of this function.
   *
   * In practise, this means that all users in a 'chunk' of {@link UserInfo} consumed by a {@link TicketAssigningWritable} will
   * be assigned a ticket if {@link totalAssignedTicketCount} is below capacity when the chunk is received, even if
   * such an assignment exceeds the configured ticket capacity.
   *
   * At time of writing, chunks are always of size <= 10, so if the configured maximum ticket assignment is 900, it is
   * actually possible that this program will assign 909 tickets.
   */
  async updateApplicationStatus(userInfo: UserInfo): Promise<void> {
    if (this.totalAssignedTicketCount < durhackConfig.maximumTicketAssignment) {
      await this.assignTicket(userInfo)
      return
    }

    await this.waitingList(userInfo)
  }

  async updateManyApplicationStatus(users: UserInfo[]): Promise<void> {
    const applicationStatusUpdatePromises = users.map(
      (user) => this.updateApplicationStatus(user)
    )
    await Promise.all(applicationStatusUpdatePromises)
  }

  _write(chunk: UserInfo[], encoding: never, callback: (error?: (Error | null)) => void) {
    this.updateManyApplicationStatus(chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }

  _writev(chunks: Array<{ chunk: UserInfo[]; encoding: never }>, callback: (error?: (Error | null)) => void) {
    const combined_chunk = chunks
      .flatMap((chunk) => chunk.chunk)
    this.updateManyApplicationStatus(combined_chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
