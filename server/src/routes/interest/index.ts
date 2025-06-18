import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { registerInterestHandlers } from "@/routes/interest/interest-handlers"
import type { Request, Response } from "@/types"

export const registerInterestApp = new App<Request, Response>()

registerInterestApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .post(registerInterestHandlers.post())
