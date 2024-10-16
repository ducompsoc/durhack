import stream from 'node:stream'

import { durhackConfig, mailgunConfig, frontendOrigin } from "@/config"
import { prisma, type UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"
import { mailgunClient } from "@/lib/mailgun"
import { getKeycloakAdminClient, unpackAttribute } from "@/lib/keycloak-client"

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

    // biome-ignore lint/style/noNonNullAssertion: it is impossible to create a keycloak account without first names
    const preferredNames = unpackAttribute(profile, "preferredNames") ?? unpackAttribute(profile, "firstNames")!
    const profileUrl = new URL(`/profile/${profile.id}`, frontendOrigin)
    const profileQrCodeSearchParams = new URLSearchParams({
      format: "svg",
      data: profileUrl.href,
    })
    const profileQrCodeUrl = new URL(`/v1/create-qr-code/?${profileQrCodeSearchParams}`, "https://api.qrserver.com")

    await mailgunClient.messages.create(mailgunConfig.domain, {
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: profile.email,
      subject: "🎟️ Your DurHack Ticket",
      html: [
        '<html lang="en-GB">',
        '<head><meta charset="utf-8"></head>',
        "<body>",
        `<p>Hey ${preferredNames},</p>`,
        "<br/>",
        "<p>Congratulations; Your place at DurHack 2024 has been confirmed! 🎉</p>",
        "<p>If you have any questions regarding the venue or event timings, please check",
        "   <a href=\"https://durhack.com#faqs\">our FAQs</a> or reply to this email.</p>",
        "<br/>",
        "<p>Keep this email handy - you will need the following QR code to check in to DurHack.</p>",
        "<p>Don't worry too much, though; your QR code can also be viewed at <a href=\"https://durhack.com/dashboard\">durhack.com</a>.</p>",
        "<br/>",
        `<img src="${profileQrCodeUrl}" alt="DurHack check in QR code" />`,
        "<br/>",
        "<p>We look forward to seeing you at DurHack! 💜</p>",
        "<br/>",
        "<p>Thanks,</p>",
        "<p>The DurHack Team</p>",
        "</body>",
        "</html>",
      ].join("\n"),
    })
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

    // biome-ignore lint/style/noNonNullAssertion: it is impossible to create a keycloak account without first names
    const preferredNames = unpackAttribute(profile, "preferredNames") ?? unpackAttribute(profile, "firstNames")!

    await mailgunClient.messages.create(mailgunConfig.domain, {
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: profile.email,
      subject: "⏳😭 DurHack at capacity... ",
      html: [
        '<html lang="en-GB">',
        '<head><meta charset="utf-8"></head>',
        "<body>",
        `<p>Hey ${preferredNames},</p>`,
        "<br/>",
        "<p>You're on the waiting list for a place at DurHack 2024 ⏰.</p>",
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
