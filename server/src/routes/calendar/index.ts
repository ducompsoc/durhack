import { App } from "@otterhttp/app"

import { durhackConfig, origin } from "@/config"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { serveStaticJson } from "@/middleware/serve-static-json"
import type { Request, Response } from "@/types"

import { getCalendarEvent } from "./calendar-event"

export const calendarApp = new App<Request, Response>()

const currentEventYear = durhackConfig.currentEventStart.getFullYear()
const eventInvitePath = `/durhack-${currentEventYear}`

calendarApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(
    serveStaticJson({
      event_invite_url: new URL(`/calendar${eventInvitePath}`, origin).href,
    }),
  )

calendarApp
  .route(`/durhack-${currentEventYear}`)
  .all(methodNotAllowed(["GET"]))
  .get(getCalendarEvent())
