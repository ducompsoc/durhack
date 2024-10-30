import type { MailgunMessageData } from "mailgun.js"

import { mailgunConfig } from "@/config"
import { mailgunClient } from "@/lib/mailgun"

export interface Mailer {
  createMessage(data: MailgunMessageData): Promise<unknown>
}

export class MailgunMailer implements Mailer {
  async createMessage(data: MailgunMessageData) {
    await mailgunClient.messages.create(mailgunConfig.domain, data)
  }
}

export class DummyMailer implements Mailer {
  async createMessage(data: MailgunMessageData) {}
}
