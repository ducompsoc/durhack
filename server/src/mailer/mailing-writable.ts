import stream from "node:stream"

import { mailgunConfig } from "@/config"
import type { UserInfo } from "@/database"
import { type DurHackEventTimingInfo, getEventTimingInfo } from "@/lib/format-event-timings"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"
import type { Mailer } from "@/lib/mailer"
import { isString } from "@/lib/type-guards"
import type { Template } from "@/mailer/templates"

type AugmentedUserInfo = UserInfo & KeycloakAugments

export class MailingWritable extends stream.Writable {
  private readonly mailer: Mailer
  private readonly messageTitle: string
  private readonly messageTemplate: Template
  private readonly eventTimingInfo: DurHackEventTimingInfo
  sentMailCount: number

  constructor(mailer: Mailer, messageTitle: string, message: Template) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.mailer = mailer
    this.messageTitle = messageTitle
    this.messageTemplate = message
    this.sentMailCount = 0
    this.eventTimingInfo = getEventTimingInfo()
  }

  /**
   * Assign a user a ticket to attend DurHack, and send an email notification.
   */
  async sendTo(userInfo: AugmentedUserInfo): Promise<void> {
    userInfo.preferredNames ??= userInfo.firstNames
    await this.mailer.createMessage({
      from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
      "h:Reply-To": "hello@durhack.com",
      to: userInfo.email,
      subject: this.messageTitle,
      html: this.messageTemplate.render({ ...this.eventTimingInfo, ...userInfo }),
    })
    this.sentMailCount++
  }

  async sendToMany(users: AugmentedUserInfo[]): Promise<void> {
    const applicationStatusUpdatePromises = users.map((user) => this.sendTo(user))
    await Promise.all(applicationStatusUpdatePromises)
  }

  _write(chunk: AugmentedUserInfo[], _encoding: never, callback: (error?: Error | null) => void) {
    this.sendToMany(chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
