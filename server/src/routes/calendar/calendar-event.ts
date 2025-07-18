import { createHash } from "node:crypto"
import { promisify } from "node:util"
import { createEvent as _createEvent, type EventAttributes } from "ics"

import { frontendOrigin } from "@/config"
import type { Middleware } from "@/types"

const createEvent = promisify<EventAttributes, string>(_createEvent)

export const durhackInvite = await createEvent({
  start: [2025, 11, 1, 9, 30], // "2025-11-1T09:30" in UTC time
  startInputType: "utc",
  startOutputType: "utc",

  end: [2025, 11, 2, 16, 30], // "2025-11-2T16:30" in UTC time
  endInputType: "utc",
  endOutputType: "utc",

  title: "DurHack X",
  description: "Durham University Computing Society's annual flagship hackathon",
  location: "Teaching and Learning Centre • Durham University",
  geo: { lat: 54.7672287, lon: -1.5757672 },
  url: frontendOrigin,
  status: "CONFIRMED",
  busyStatus: "BUSY",

  organizer: { name: "DurHack Team", email: "hello@durhack.com" },
})
const durhackInviteETag = createHash("sha256").update(durhackInvite).digest("hex")

/**
 * Returns a middleware that handles a GET request by responding with a `.ics` iCalendar
 * file containing a single event (DurHack).
 */
export function getCalendarEvent(): Middleware {
  return async (_request, response) => {
    response.setHeader("etag", durhackInviteETag)
    response.validatePreconditions()

    response.setHeader("content-disposition", "inline; ")
    response.setHeader("content-type", "text/calendar; method=PUBLISH")
    response.send(durhackInvite)
  }
}
