import { createEvent as _createEvent, type EventAttributes } from "ics"
import { createHash } from "node:crypto"
import { promisify } from "node:util"

import { frontendOrigin } from "@/config"
import { Middleware } from "@/types"

const createEvent = promisify<EventAttributes, string>(_createEvent)

export const durhackInvite = await createEvent({
  start: [2024, 11, 2, 9, 30],  // "2024-11-2T09:30" in UTC time
  startInputType: "utc",
  startOutputType: "utc",

  end: [2024, 11, 3, 16, 30],  // "2024-11-3T16:30" in UTC time
  endInputType: "utc",
  endOutputType: "utc",

  title: "DurHack 2024",
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
  return async (request, response) => {
    response.setHeader("etag", durhackInviteETag)
    response.validatePreconditions()

    response.setHeader("content-disposition", "inline; ")
    response.setHeader("content-type", "text/calendar; method=PUBLISH")
    response.send(durhackInvite)
  }
}
