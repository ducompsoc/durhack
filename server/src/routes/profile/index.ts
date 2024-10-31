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
  .route("/stash")
  .all(methodNotAllowed(["GET", "PATCH"]))
  .all(authenticate())
  .get(profileHandlers.getStashClaims())
  .patch(profileHandlers.patchStashClaims())
  .all(forbiddenOrUnauthorised())

profileApp
  .route("/check-in")
  .all(methodNotAllowed(["POST"]))
  .all(authenticate())
  .post(profileHandlers.postCheckIn())
  .all(forbiddenOrUnauthorised())

profileApp
  .route("/guilds")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(profileHandlers.getGuildsProfile())
  .all(forbiddenOrUnauthorised())
