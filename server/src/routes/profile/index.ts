import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { profilesHandlers } from "./profiles-handlers"

export const profileApp = new App<Request, Response>()

profileApp.use(profilesHandlers.validateUserId())

profileApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(profilesHandlers.getProfile())
  .all(forbiddenOrUnauthorised())

profileApp
  .route("/flags")
  .all(methodNotAllowed(["GET", "PATCH"]))
  .all(authenticate())
  .get(profilesHandlers.getProfileFlags())
  .patch(profilesHandlers.patchProfileFlags())
  .all(forbiddenOrUnauthorised())
