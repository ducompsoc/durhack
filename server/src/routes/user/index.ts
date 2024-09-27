import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { userHandlers } from "./user-handlers"

export const userApp = new App<Request, Response>()

userApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(userHandlers.getUser())
  .all(forbiddenOrUnauthorised())
