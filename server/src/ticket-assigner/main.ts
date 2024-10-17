import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import { prisma } from "@/database"

import { AttendeeCheckingTransform } from "./attendee-checking-transform";
import { TicketAssigningWritable } from "./ticket-assigning-writable"
import { generateUserInfoByTicketAssignmentOrder } from "./ticket-order-user-info-async-generator"

const totalAssignedTicketCount = await prisma.userInfo.count({
  where: { applicationStatus: { equals: "accepted" } },
})

const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(totalAssignedTicketCount)

await pipeline(userInfoReadable, attendeeCheckingTransform, ticketAssigningWritable)
const newlyAssignedTicketCount = ticketAssigningWritable.totalAssignedTicketCount - totalAssignedTicketCount
console.log(`Assigned ${newlyAssignedTicketCount} tickets`)
