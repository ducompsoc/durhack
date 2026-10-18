import stream from "node:stream"

import { durhackConfig, mailgunConfig } from "@/config"
import { prisma, type UserInfo } from "@/database"
import { type DurHackEventTimingInfo, getEventTimingInfo } from "@/lib/format-event-timings"
import { isExternalApplicant } from "@/lib/is-external-applicant"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"
import type { Mailer } from "@/lib/mailer"
import { isString } from "@/lib/type-guards"
import { profileQrCodeImgTag } from "@/mailer/profile-qr-code"
import type { Template } from "@/mailer/templates"
import { durhackInvite } from "@/routes/calendar/calendar-event"

type AugmentedUserInfo = UserInfo & KeycloakAugments

type ICounter = {
  increment: () => void
  decrement: () => void
  hasCapacity: () => boolean
}

class Counter implements ICounter {
  private count: number
  private readonly capacity: number

  constructor(count: number, capacity: number) {
    this.count = count
    this.capacity = capacity
  }

  increment(): void {
    this.count += 1
  }
  decrement(): void {
    this.count -= 1
  }
  hasCapacity(): boolean {
    return this.count < this.capacity
  }
  get(): number {
    return this.count
  }
}

class MultiCounter implements ICounter {
  private readonly counters: Counter[]

  constructor(counters: Counter[]) {
    this.counters = counters
  }

  increment(): void {
    for (const counter of this.counters) counter.increment()
  }
  decrement(): void {
    for (const counter of this.counters) counter.decrement()
  }
  hasCapacity(): boolean {
    return this.counters.every((counter) => counter.hasCapacity())
  }
}

export class TicketAssigningWritable extends stream.Writable {
  totalAssignedTicketCounter: Counter
  totalAssignedExternalTicketCounter: Counter
  private readonly mailer: Mailer
  private readonly ticketMessageTemplate: Template
  private readonly waitingListMessageTemplate: Template
  private readonly eventTimingInfo: DurHackEventTimingInfo

  constructor(
    mailer: Mailer,
    acceptedTemplate: Template,
    waitingListTemplate: Template,
    totalAssignedTicketCount: number,
    totalAssignedExternalTicketCount: number,
  ) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.mailer = mailer
    this.ticketMessageTemplate = acceptedTemplate
    this.waitingListMessageTemplate = waitingListTemplate
    this.totalAssignedTicketCounter = new Counter(totalAssignedTicketCount, durhackConfig.maximumTicketAssignment)
    this.totalAssignedExternalTicketCounter = new Counter(
      totalAssignedExternalTicketCount,
      durhackConfig.maximumExternalTicketAssignment,
    )
    this.eventTimingInfo = getEventTimingInfo()
  }

  getTicketCounterFor(userInfo: AugmentedUserInfo): ICounter {
    const counters: Counter[] = [this.totalAssignedTicketCounter]
    if (isExternalApplicant(userInfo)) counters.push(this.totalAssignedExternalTicketCounter)
    if (counters.length === 1) return counters[0]
    return new MultiCounter(counters)
  }

  /**
   * Assign a user a ticket to attend DurHack, and send an email notification.
   */
  async assignTicket(userInfo: AugmentedUserInfo): Promise<void> {
    if (userInfo.applicationStatus === "accepted") return
    if (userInfo.applicationStatus === "unsubmitted")
      throw new Error(`Can't assign ticket to ${userInfo.userId} as their application is unsubmitted`)

    const ticketCounter = this.getTicketCounterFor(userInfo)

    try {
      ticketCounter.increment()
      const now = new Date()
      await prisma.userInfo.update({
        where: { userId: userInfo.userId },
        data: {
          applicationStatus: "accepted",
          applicationAcceptedAt: now,
          applicationStatusUpdatedAt: now,
        },
      })
    } catch (e) {
      ticketCounter.decrement()
      throw e
    }

    userInfo.preferredNames ??= userInfo.firstNames
    await this.mailer.createMessage({
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: userInfo.email,
      subject: this.ticketMessageTemplate.metadata.messageTitle,
      html: this.ticketMessageTemplate.render({
        ...this.eventTimingInfo,
        ...userInfo,
        isRemoteAttendee: userInfo.university !== "Durham University",
        profileQrCode: profileQrCodeImgTag(userInfo.userId),
      }),
      attachment: [{ filename: "invite.ics", data: durhackInvite }],
    })
  }

  /**
   * Move a user's application to the waiting list for a DurHack ticket, and send an email notification for the event.
   */
  async waitingList(userInfo: AugmentedUserInfo): Promise<void> {
    if (userInfo.applicationStatus === "waitingList") return
    if (userInfo.applicationStatus === "unsubmitted")
      throw new Error(`Can't waiting list ${userInfo.userId} as their application is unsubmitted`)
    if (userInfo.applicationStatus === "accepted")
      throw new Error(`Can't waiting list ${userInfo.userId} as their application has been accepted`)

    const now = new Date()
    await prisma.userInfo.update({
      where: { userId: userInfo.userId },
      data: {
        applicationStatus: "waitingList",
        applicationStatusUpdatedAt: now,
      },
    })

    userInfo.preferredNames ??= userInfo.firstNames
    await this.mailer.createMessage({
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: userInfo.email,
      subject: this.waitingListMessageTemplate.metadata.messageTitle,
      html: this.waitingListMessageTemplate.render({
        ...this.eventTimingInfo,
        ...userInfo,
      }),
    })
  }

  /**
   * If DurHack still has ticket capacity to allocate, assign an attendee ticket to the provided user.
   * Otherwise, move the user to the ticket waiting list.
   */
  async updateApplicationStatus(userInfo: AugmentedUserInfo): Promise<void> {
    const ticketCounter = this.getTicketCounterFor(userInfo)
    if (ticketCounter.hasCapacity()) {
      await this.assignTicket(userInfo)
      return
    }

    await this.waitingList(userInfo)
  }

  async updateManyApplicationStatus(users: AugmentedUserInfo[]): Promise<void> {
    const applicationStatusUpdatePromises = users.map((user) => this.updateApplicationStatus(user))
    await Promise.all(applicationStatusUpdatePromises)
  }

  _write(chunk: AugmentedUserInfo[], _encoding: never, callback: (error?: Error | null) => void) {
    this.updateManyApplicationStatus(chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
