import type { Request, Response, NextFunction, Handler } from "@tinyhttp/app"

type HttpVerb = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"

export function methodNotAllowed(allowedMethods: Iterable<HttpVerb>): Handler {
  const allowHeaderValue = Array.from(allowedMethods).join(", ")
  const allowedMethodSet: Set<string> = new Set(allowedMethods)

  return function(req: Request, res: Response, next: NextFunction): void {
    if (!req.method || !allowedMethodSet.has(req.method)) {
      res.setHeader("Allow", allowHeaderValue)
      res.sendStatus(409)
      return;
    }

    next()
    return
  }
}
