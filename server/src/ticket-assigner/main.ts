import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { type ParseArgsConfig, parseArgs } from "node:util"
import { z } from "zod/v4"
import { durhackConfig } from "@/config"
import { prisma } from "@/database"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { DummyMailer, MailgunMailer } from "@/lib/mailer"
import { loadTemplate } from "@/mailer/templates"
import { AttendeeCheckingTransform } from "./attendee-checking-transform"
import { TicketAssigningWritable } from "./ticket-assigning-writable"
import { generateUserInfoByTicketAssignmentOrder } from "./ticket-order-user-info-async-generator"

const programArgsConfig = {
  options: {
    "dry-run": {
      type: "boolean",
      default: false,
    },
  },
} as const satisfies ParseArgsConfig

const ticketAssignerOptionsSchema = z.object({
  "dry-run": z.boolean(),
})

type TicketAssignerOptions = z.output<typeof ticketAssignerOptionsSchema>

function parseTicketAssignerArgs(): TicketAssignerOptions {
  const result = parseArgs(programArgsConfig)
  return ticketAssignerOptionsSchema.parse(result.values)
}

const { "dry-run": dryRun } = parseTicketAssignerArgs()

if (!dryRun && !durhackConfig.ticketAssignmentActive) {
  console.log("Ticket assignment not active")
  process.exit()
}

const [
  totalAssignedTicketCount,
  totalAssignedExternalTicketCount,
  totalAssignedFriendTicketGroups,
  acceptedTemplate,
  waitingListTemplate,
] = await Promise.all([
  prisma.userInfo.count({
    where: { applicationStatus: { equals: "accepted" } },
  }),
  prisma.userInfo.count({
    where: { applicationStatus: { equals: "accepted" }, university: { not: "Durham University" } },
  }),
  prisma.userInfo.groupBy({
    by: ["university"],
    where: {
      university: { not: null },
      applicationStatus: { equals: "accepted" },
    },
    _count: { userId: true },
  }),
  loadTemplate("ticket-notification"),
  loadTemplate("waiting-list-notification"),
])

const mailer = dryRun ? new DummyMailer() : new MailgunMailer()

const totalAssignedFriendTicketCount = new Map(
  totalAssignedFriendTicketGroups.map((res) => [res.university!, res._count.userId]),
)
const userInfoReadable = Readable.from(generateUserInfoByTicketAssignmentOrder())
const attendeeCheckingTransform = new AttendeeCheckingTransform()
const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
const ticketAssigningWritable = new TicketAssigningWritable(
  mailer,
  acceptedTemplate,
  waitingListTemplate,
  totalAssignedTicketCount,
  totalAssignedExternalTicketCount,
  totalAssignedFriendTicketCount,
  dryRun,
)

await pipeline(userInfoReadable, attendeeCheckingTransform, userInfoAugmentingTransform, ticketAssigningWritable)
const totalTickets = ticketAssigningWritable.totalAssignedTicketCounter.get()
const newlyAssignedTicketCount = totalTickets - totalAssignedTicketCount

console.log(`Assigned: ${newlyAssignedTicketCount} tickets`)
console.log(`Total Assigned: ${totalTickets} tickets`)
for (const group of durhackConfig.friendInstitutionsGroups) {
  const groupCounter = ticketAssigningWritable.totalAssignedFriendUniversityTicketCounters.find(
    (groupCounter) => groupCounter.institutions === group.institutions,
  )
  console.log(`${group.institutions} Assigned: ${groupCounter?.counter.get()} total of ${group.maxTickets} tickets`)
}
console.log(`External Tickets Assigned: ${ticketAssigningWritable.totalAssignedExternalTicketCounter.get()} total of ${durhackConfig.maximumExternalTicketAssignment} tickets`)
