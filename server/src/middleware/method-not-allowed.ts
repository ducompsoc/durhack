import type { NextFunction } from "@otterhttp/app"

import type { Middleware, Request, Response } from "@/types"
import { ClientError, HttpStatus } from "@otterhttp/errors"

type HttpVerb = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"

export function methodNotAllowed(allowedMethods: Iterable<HttpVerb>): Middleware {
  const allowedMethodArray = Array.from(allowedMethods)
  const allowHeaderValue = allowedMethodArray.join(", ")
  const allowedMethodSet: Set<string> = new Set(allowedMethods)

  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.method || !allowedMethodSet.has(req.method)) {
      res.setHeader("Allow", allowHeaderValue)
      throw new ClientError(`The request method HTTP ${req.method} is not permitted for this resource`, {
        statusCode: HttpStatus.MethodNotAllowed,
        code: "ERR_HTTP_METHOD_NOT_ALLOWED",
        exposeMessage: true,
        expected: true,
        extra: {
          allow_http_methods: allowedMethodArray,
        },
      })
    }

    next()
    return
  }
}
