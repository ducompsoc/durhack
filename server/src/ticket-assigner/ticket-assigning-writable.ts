import stream from "node:stream"

import { durhackConfig, frontendOrigin, mailgunConfig } from "@/config"
import { prisma, type UserInfo } from "@/database"
import { getEventTimingInfo } from "@/lib/format-event-timings"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"
import type { Mailer } from "@/lib/mailer"
import { isString } from "@/lib/type-guards"
import { durhackInvite } from "@/routes/calendar/calendar-event"

type AugmentedUserInfo = UserInfo & KeycloakAugments

export class TicketAssigningWritable extends stream.Writable {
  totalAssignedTicketCount: number
  private readonly mailer: Mailer

  constructor(mailer: Mailer, totalAssignedTicketCount: number) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.mailer = mailer
    this.totalAssignedTicketCount = totalAssignedTicketCount
  }

  private profileQrCodeImgTag(userId: string): string {
    const profileUrl = new URL(`/profile/${userId}`, frontendOrigin)

    const svgProfileQrCodeSearchParams = new URLSearchParams({
      format: "svg",
      data: profileUrl.href,
    })
    const svgProfileQrCodeUrl = new URL(
      `/v1/create-qr-code/?${svgProfileQrCodeSearchParams}`,
      "https://api.qrserver.com",
    )

    const pngProfileQrCodeSearchParams = new URLSearchParams({
      format: "png",
      size: "600x600",
      data: profileUrl.href,
    })
    const pngProfileQrCodeUrl = new URL(
      `/v1/create-qr-code/?${pngProfileQrCodeSearchParams}`,
      "https://api.qrserver.com",
    )

    return `<img src="${pngProfileQrCodeUrl}" srcset="${svgProfileQrCodeUrl}" alt="DurHack check in QR code" style="max-width: 20rem;" />`
  }

  /**
   * Assign a user a ticket to attend DurHack, and send an email notification.
   */
  async assignTicket(userInfo: AugmentedUserInfo): Promise<void> {
    if (userInfo.applicationStatus === "accepted") return
    if (userInfo.applicationStatus === "unsubmitted")
      throw new Error(`Can't assign ticket to ${userInfo.userId} as their application is unsubmitted`)

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
    } catch (e) {
      this.totalAssignedTicketCount -= 1
      throw e
    }

    const {
      currentEventYear,
      startMonth,
      startDate,
      startDateOrdinalSuffix,
      startDay,
      endMonth,
      endDate,
      endDateOrdinalSuffix,
      endDay,
    } = getEventTimingInfo()

    const preferredNames = userInfo.preferredNames ?? userInfo.firstNames
    await this.mailer.createMessage({
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: userInfo.email,
      subject: "🎟️ Your DurHack Ticket",
      html: [
        '<html lang="en-GB">',
        '<head><meta charset="utf-8"></head>',
        "<body>",
        `<p>Hey ${preferredNames},</p>`,
        "<br/>",
        `<p>Congratulations; Your place at DurHack ${currentEventYear} has been confirmed! 🎉</p>`,
        "<p>",
        "DurHack is taking place at <strong>Durham University's Teaching and Learning Centre</strong>.",
        `Check-in is from 09:30-10:30 (AM) ${startDay} ${startDate}<sup>${startDateOrdinalSuffix}</sup> ${startMonth};`,
        `DurHack is expected to wrap up by around 16:30 on ${endDay} ${endDate}<sup>${endDateOrdinalSuffix}</sup> ${endMonth}.`,
        "</p>",
        "<p>",
        "If you have any questions regarding the venue or event timings, please check",
        '<a href="https://durhack.com#faqs">our FAQs</a> or reply to this email.</p>',
        "<br/>",
        "<p>",
        "Keep this email handy - you will need the following QR code to check in to DurHack.",
        'It can also be viewed at <a href="https://durhack.com/dashboard">durhack.com</a>.',
        "</p>",
        "<br/>",
        this.profileQrCodeImgTag(userInfo.userId),
        "<br/>",
        "<p>We look forward to seeing you at DurHack! 💜</p>",
        "<br/>",
        "<p>Happy Hacking,</p>",
        "<p>The DurHack Team</p>",
        "</body>",
        "</html>",
      ].join("\n"),
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

    const currentEventYear = durhackConfig.currentEventStart.getFullYear()

    const preferredNames = userInfo.preferredNames ?? userInfo.firstNames
    await this.mailer.createMessage({
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: userInfo.email,
      subject: "⏳😭 DurHack at capacity...",
      html: [
        '<html lang="en-GB">',
        '<head><meta charset="utf-8"></head>',
        "<body>",
        `<p>Hey ${preferredNames},</p>`,
        "<br/>",
        `<p>You're on the waiting list for a place at DurHack ${currentEventYear} ⏰.</p>`,
        "<p>We assign places on a first-come, first-served basis, so if our capacity increases",
        "or someone with a ticket lets us know they can't attend, you may be assigned a place.</p>",
        "<p>We will notify you by email if so! 😎</p>",
        "<br/>",
        "<p>Thanks,</p>",
        "<p>The DurHack Team</p>",
        "</body>",
        "</html>",
      ].join("\n"),
    })
  }

  /**
   * If DurHack still has ticket capacity to allocate, assign an attendee ticket to the provided user.
   * Otherwise, move the user to the ticket waiting list.
   */
  async updateApplicationStatus(userInfo: AugmentedUserInfo): Promise<void> {
    if (this.totalAssignedTicketCount < durhackConfig.maximumTicketAssignment) {
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
