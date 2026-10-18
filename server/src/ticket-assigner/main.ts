import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import { prisma } from "@/database"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { MailgunMailer } from "@/lib/mailer"
import { loadTemplate } from "@/mailer/templates"

import { AttendeeCheckingTransform } from "./attendee-checking-transform"
import { TicketAssigningWritable } from "./ticket-assigning-writable"
import { generateUserInfoByTicketAssignmentOrder } from "./ticket-order-user-info-async-generator"

const [totalAssignedTicketCount, totalAssignedExternalTicketCount, acceptedTemplate, waitingListTemplate] =
  await Promise.all([
    prisma.userInfo.count({
      where: { applicationStatus: { equals: "accepted" } },
    }),
    prisma.userInfo.count({
      where: { applicationStatus: { equals: "accepted" }, university: { not: "Durham University" } },
    }),
    loadTemplate("ticket-notification"),
    loadTemplate("waiting-list-notification"),
  ])

const mailer = new MailgunMailer()

const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(
  mailer,
  acceptedTemplate,
  waitingListTemplate,
  totalAssignedTicketCount,
  totalAssignedExternalTicketCount,
)

await pipeline(userInfoReadable, attendeeCheckingTransform, userInfoAugmentingTransform, ticketAssigningWritable)
const newlyAssignedTicketCount = ticketAssigningWritable.totalAssignedTicketCounter.get() - totalAssignedTicketCount
console.log(`Assigned ${newlyAssignedTicketCount} tickets`)
