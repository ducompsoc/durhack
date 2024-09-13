import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { userHandlers } from "./user-handlers"

export const userApp = new App<Request, Response>()

userApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(userHandlers.getUser())
