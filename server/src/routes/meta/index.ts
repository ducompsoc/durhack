import { App } from "@otterhttp/app"

import { origin } from "@/config"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { serveStaticJson } from "@/middleware/serve-static-json"
import { metaHandlers } from "@/routes/meta/meta-handlers"
import type { Request, Response } from "@/types"

const metaApp = new App<Request, Response>()

metaApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(
    serveStaticJson({
      event_timings_url: new URL("/meta/event-timings", origin).href,
    }),
  )

metaApp
  .route("/event-timings")
  .all(methodNotAllowed(["GET"]))
  .get(metaHandlers.getEventTimings())

export { metaApp }
