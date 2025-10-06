import { App } from "@otterhttp/app"
import { durhackConfig } from "@/config"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"
import { getCalendarEvent } from "./calendar-event"

export const calendarApp = new App<Request, Response>()

const currentEventYear = durhackConfig.currentEventStart.getFullYear()

calendarApp
  .route(`/durhack-${currentEventYear}`)
  .all(methodNotAllowed(["GET"]))
  .get(getCalendarEvent())
