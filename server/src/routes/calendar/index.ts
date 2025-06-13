import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { getCalendarEvent } from "./calendar-event"

export const calendarApp = new App<Request, Response>()

calendarApp
  .route("/durhack-2025")
  .all(methodNotAllowed(["GET"]))
  .get(getCalendarEvent())
