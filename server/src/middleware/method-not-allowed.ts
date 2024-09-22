import type { NextFunction } from "@otterhttp/app"

import type { Middleware, Request, Response } from "@/types"

type HttpVerb = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"

export function methodNotAllowed(allowedMethods: Iterable<HttpVerb>): Middleware {
  const allowHeaderValue = Array.from(allowedMethods).join(", ")
  const allowedMethodSet: Set<string> = new Set(allowedMethods)

  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.method || !allowedMethodSet.has(req.method)) {
      res.setHeader("Allow", allowHeaderValue)
      res.sendStatus(405)
      return
    }

    next()
    return
  }
}
