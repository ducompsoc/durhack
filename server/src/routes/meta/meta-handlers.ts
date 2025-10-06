import { createHash } from "node:crypto"

import { durhackConfig } from "@/config"
import type { Middleware } from "@/types"


export class MetaHandlers {
  static readonly eventTimings = {
    start: durhackConfig.currentEventStart.toISOString(),
    checkInCloses: durhackConfig.currentEventCheckInCloses.toISOString(),
    end: durhackConfig.currentEventEnd.toISOString(),
  }
  static readonly eventTimingsETagSource = JSON.stringify(MetaHandlers.eventTimings)
  static readonly eventTimingsETag = createHash("sha256").update(MetaHandlers.eventTimingsETagSource).digest("hex")

  getEventTimings(): Middleware {
    return async (request, response) => {
      response.setHeader("etag", MetaHandlers.eventTimingsETag)
      response.validatePreconditions()

      response.json({
        data: MetaHandlers.eventTimings,
      })
    }
  }
}

export const metaHandlers = new MetaHandlers()
