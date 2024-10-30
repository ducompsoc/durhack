import stream from "node:stream"
import type { TemplateDelegate } from "handlebars"

import { mailgunConfig } from "@/config"
import { type UserInfo } from "@/database"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"
import type { Mailer } from "@/lib/mailer"
import { isString } from "@/lib/type-guards"

type AugmentedUserInfo = UserInfo & KeycloakAugments

export class MailingWritable extends stream.Writable {
  private readonly mailer: Mailer
  private readonly messageTemplate: TemplateDelegate<AugmentedUserInfo>
  sentMailCount: number

  constructor(mailer: Mailer, message: TemplateDelegate<AugmentedUserInfo>) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.mailer = mailer
    this.messageTemplate = message
    this.sentMailCount = 0
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
      subject: "🎟️ Your DurHack Ticket",
      html: this.messageTemplate(userInfo),
    })
    this.sentMailCount++
  }

  async sendToMany(users: AugmentedUserInfo[]): Promise<void> {
    const applicationStatusUpdatePromises = users.map((user) => this.sendTo(user))
    await Promise.all(applicationStatusUpdatePromises)
  }

  _write(chunk: AugmentedUserInfo[], encoding: never, callback: (error?: Error | null) => void) {
    this.sendToMany(chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
