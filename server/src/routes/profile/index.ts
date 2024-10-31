import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { profileHandlers } from "./profile-handlers"

export const profileApp = new App<Request, Response>()

profileApp.use(profileHandlers.validateUserId())

profileApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(profileHandlers.getProfile())
  .all(forbiddenOrUnauthorised())

profileApp
  .route("/flags")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(profileHandlers.getProfileFlags())
  .all(forbiddenOrUnauthorised())
