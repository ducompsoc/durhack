import { App } from "@otterhttp/app"
import { ClientError, HttpStatus } from "@otterhttp/errors"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { userHandlers } from "./user-handlers"

export const userApp = new App<Request, Response>()

userApp.use((request: Request, response: Response, next: () => void) => {
  if (!request.user) {
    throw new ClientError("", { statusCode: HttpStatus.Unauthorized })
  }

  next()
})

userApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(userHandlers.getUser())
