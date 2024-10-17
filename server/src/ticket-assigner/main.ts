import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import { prisma } from "@/database"

import { AttendeeCheckingTransform } from "./attendee-checking-transform";
import { TicketAssigningWritable } from "./ticket-assigning-writable"
import { generateUserInfoByTicketAssignmentOrder } from "./ticket-order-user-info-async-generator"
import { MailgunMailer } from "./mailer";

const totalAssignedTicketCount = await prisma.userInfo.count({
  where: { applicationStatus: { equals: "accepted" } },
})

const mailer = new MailgunMailer()

const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(mailer, totalAssignedTicketCount)

await pipeline(userInfoReadable, attendeeCheckingTransform, ticketAssigningWritable)
const newlyAssignedTicketCount = ticketAssigningWritable.totalAssignedTicketCount - totalAssignedTicketCount
console.log(`Assigned ${newlyAssignedTicketCount} tickets`)
