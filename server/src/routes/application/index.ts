import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { applicationHandlers } from "./application-handlers"
import { getApplicationCountryOptions } from "./country-options"
import { getApplicationInstitutionOptions } from "./institution-options"

export const applicationApp = new App<Request, Response>()

applicationApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationHandlers.getApplication())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/personal")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchPersonal())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/contact")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchContact())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/extra")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchExtraDetails())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/education")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchEducation())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/education/institution-options")
  .all(methodNotAllowed(["GET"]))
  .get(getApplicationInstitutionOptions())

applicationApp
  .route("/education/country-options")
  .all(methodNotAllowed(["GET"]))
  .get(getApplicationCountryOptions())

applicationApp
  .route("/cv")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchCv())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/pizza")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(applicationHandlers.patchPizza())
  .all(forbiddenOrUnauthorised())

applicationApp
  .route("/submit")
  .all(methodNotAllowed(["POST"]))
  .all(authenticate())
  .post(applicationHandlers.submit())
  .all(forbiddenOrUnauthorised())
