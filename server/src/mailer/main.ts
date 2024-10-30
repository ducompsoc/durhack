import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import { prisma } from "@/database"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"

import { MailgunMailer } from "./mailer"

const totalAssignedTicketCount = await prisma.userInfo.count({
  where: { applicationStatus: { equals: "accepted" } },
})

const mailer = new MailgunMailer()

const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(mailer, totalAssignedTicketCount)

await pipeline(userInfoReadable, attendeeCheckingTransform, userInfoAugmentingTransform, ticketAssigningWritable)
const newlyAssignedTicketCount = ticketAssigningWritable.totalAssignedTicketCount - totalAssignedTicketCount
console.log(`Assigned ${newlyAssignedTicketCount} tickets`)
