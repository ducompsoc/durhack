import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { profilesHandlers } from "./profiles-handlers"

export const profilesApp = new App<Request, Response>()

profilesApp.use(profilesHandlers.validateUserId())

profilesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(profilesHandlers.getProfile())
  .all(forbiddenOrUnauthorised())

profilesApp
  .route("/flags")
  .all(methodNotAllowed(["GET", "PATCH"]))
  .all(authenticate())
  .get(profilesHandlers.getProfileFlags())
  .patch(profilesHandlers.patchProfileFlags())
  .all(forbiddenOrUnauthorised())
