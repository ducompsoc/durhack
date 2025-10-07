import { createHash } from "node:crypto"
import { isValidStatusCode, type StatusCode, statusMessages } from "@otterhttp/errors"

import type { Middleware, UnknownObject } from "@/types"

export function serveStaticJson(content: UnknownObject, status: StatusCode = 200): Middleware {
  status = isValidStatusCode(content.status) ? content.status : status
  const message = content.message ?? statusMessages[status]
  delete content.status
  delete content.message

  content = {
    status,
    message,
    ...content,
  }

  const contentString = JSON.stringify(content, null, 2)
  const etag = createHash("sha256").update(contentString).digest("hex")

  return async (_request, response) => {
    response.setHeader("etag", etag)
    response.validatePreconditions()

    response.status(status)
    response.setHeader("Content-Type", "application/json")
    response.send(contentString)
  }
}
