import type { Middleware, Request, Response } from "@/types"

type Condition = (request: Request, response: Response) => boolean | Promise<boolean>

/**
 * Factory that creates a TypeScript decorator for a condition.
 *
 * Decorated methods are expected to return a middleware function;
 * the decorated function will return the same middleware that will execute
 * only if the condition evaluates true.
 *
 * If the condition evaluates false, the middleware will invoke next() and terminate.
 *
 * @param condition
 */
export function requireCondition(condition: Condition) {
  return (
    value: (this: unknown, ...rest: unknown[]) => Middleware,
    _: {
      kind: "method"
    },
  ) => {
    return function wrapped_function(this: unknown, ...args: unknown[]): Middleware {
      const middleware: Middleware = value.call(this, ...args)

      return async (request: Request, response: Response, next: () => void): Promise<void> => {
        const evaluatedCondition = await condition(request, response)
        if (!evaluatedCondition) {
          next()
          return
        }
        await middleware.call(value, request, response, next)
      }
    }
  }
}

export function userIsAtLeastOne(groups: Group[]): Condition {
  return (request: Request) => {
    if (request.userProfile?.groups == null) return false
    return request.userProfile.groups.some((userRole) => {
      return (groups as string[]).includes(userRole)
    })
  }
}

export function userIsLoggedIn(): Condition {
  return (request: Request) => request.user != null
}

/**
 * Middleware decorator that ensures that the user that initiated the request is known (i.e. not anonymous).
 * @see authenticate
 */
export function onlyKnownUsers() {
  return requireCondition(userIsLoggedIn())
}

/**
 * Middleware decorator that ensures that the user that initiated the request is known and belongs to at least one
 * of the specified Keycloak groups.
 * @see authenticate
 */
export function onlyGroups(groups: Group[]) {
  return requireCondition(userIsAtLeastOne(groups))
}

export enum Group {
  admins = "/admins",
  volunteers = "/volunteers",
  hackers = "/hackers",
}
