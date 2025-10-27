import { App } from "@otterhttp/app"

import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { travelReimbursementFormHandlers } from "./travel-reimbursement-handlers"

export const reimbursementFormApp = new App<Request, Response>()

reimbursementFormApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(travelReimbursementFormHandlers.getApplication())
  .all(forbiddenOrUnauthorised())


