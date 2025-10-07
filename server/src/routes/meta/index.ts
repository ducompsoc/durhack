import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { metaHandlers } from "@/routes/meta/meta-handlers"
import type { Request, Response } from "@/types"

const metaApp = new App<Request, Response>()

metaApp
  .route("/event-timings")
  .all(methodNotAllowed(["GET"]))
  .get(metaHandlers.getEventTimings())

export { metaApp }
