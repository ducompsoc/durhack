import stream from 'node:stream'

import { durhackConfig } from "@/config"
import { prisma, type UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"
import { mailgunClient } from "@/lib/mailgun"

export class TicketAssigningWritable extends stream.Writable {
  totalAssignedTicketCount: number

  constructor(totalAssignedTicketCount: number) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.totalAssignedTicketCount = totalAssignedTicketCount
  }

  async assignTicket(user: UserInfo): Promise<void> {
    if (user.applicationStatus === "accepted") return
    if (user.applicationStatus === "unsubmitted") throw new Error(`Can't assign ticket to ${user.userId} as their application is unsubmitted`)

    try {
      this.totalAssignedTicketCount += 1
      const now = new Date()
      await prisma.userInfo.update({
        where: { userId: user.userId },
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

  async waitingList(user: UserInfo): Promise<void> {
    if (user.applicationStatus === "waitingList") return
    if (user.applicationStatus === "unsubmitted") throw new Error(`Can't waiting list ${user.userId} as their application is unsubmitted`)
    if (user.applicationStatus === "accepted") throw new Error(`Can't waiting list ${user.userId} as their application has been accepted`)

    const now = new Date()
      await prisma.userInfo.update({
        where: { userId: user.userId },
        data: {
          applicationStatus: "waitingList",
          applicationStatusUpdatedAt: now,
        },
      })
  }

  async updateApplicationStatus(user: UserInfo): Promise<void> {
    if (this.totalAssignedTicketCount < durhackConfig.maximumTicketAssignment) {
      await this.assignTicket(user)
      return
    }
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
