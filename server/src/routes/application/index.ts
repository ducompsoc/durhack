import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { applicationHandlers } from "./application-handlers"

export const applicationApp = new App<Request, Response>()

applicationApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(applicationHandlers.getApplication())

applicationApp
  .route("/personal")
  .all(methodNotAllowed(["PATCH"]))
  .patch(applicationHandlers.patchPersonal())

applicationApp
  .route("/contact")
  .all(methodNotAllowed(["PATCH"]))
  .patch(applicationHandlers.patchContact())

applicationApp
  .route("/education")
  .all(methodNotAllowed(["PATCH"]))
  .patch(applicationHandlers.patchEducation())

applicationApp
  .route("/cv")
  .all(methodNotAllowed(["PATCH"]))
  .patch(applicationHandlers.patchCv())

applicationApp
  .route("/submit")
  .all(methodNotAllowed(["POST"]))
  .post(applicationHandlers.submit())
