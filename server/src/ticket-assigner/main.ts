import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import {durhackConfig} from "@/config";
import { prisma } from "@/database"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { MailgunMailer } from "@/lib/mailer"
import { loadTemplate } from "@/mailer/templates"

import { AttendeeCheckingTransform } from "./attendee-checking-transform"
import { TicketAssigningWritable } from "./ticket-assigning-writable"
import { generateUserInfoByTicketAssignmentOrder } from "./ticket-order-user-info-async-generator"

const [totalAssignedTicketCount, totalAssignedExternalTicketCount, totalAssignedFriendTicketGroups, acceptedTemplate, waitingListTemplate] =
  await Promise.all([
    prisma.userInfo.count({
      where: { applicationStatus: { equals: "accepted" } },
    }),
    prisma.userInfo.count({
      where: { applicationStatus: { equals: "accepted" }, university: { not: "Durham University" } },
    }),
    prisma.userInfo.groupBy({
      by: "university",
      where: {applicationStatus: { equals: "accepted" }, university: { in: Object.keys(durhackConfig.friendUniversities) } },
      _count: { _all: true }
    }),
    loadTemplate("ticket-notification"),
    loadTemplate("waiting-list-notification"),
  ])

const mailer = new MailgunMailer()

const totalAssignedFriendTicketCount = Object.fromEntries(Object.entries(totalAssignedFriendTicketGroups).map(([uni, res]) => [uni, res._count._all]))
const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(
  mailer,
  acceptedTemplate,
  waitingListTemplate,
  totalAssignedTicketCount,
  totalAssignedExternalTicketCount,
  totalAssignedFriendTicketCount
)

await pipeline(userInfoReadable, attendeeCheckingTransform, userInfoAugmentingTransform, ticketAssigningWritable)
const newlyAssignedTicketCount = ticketAssigningWritable.totalAssignedTicketCounter.get() - totalAssignedTicketCount
console.log(`Assigned ${newlyAssignedTicketCount} tickets`)
