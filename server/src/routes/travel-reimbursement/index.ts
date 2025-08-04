import { App } from "@otterhttp/app"
import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request } from "@/request"
import type { Response } from "@/response"
import { travelReimbursementHandlers } from "./travel-reimbursement-handlers"

export const travelReimbursementApp = new App<Request, Response>()

travelReimbursementApp
  .route("/")
  .all(methodNotAllowed(["PATCH"]))
  .all(authenticate())
  .patch(travelReimbursementHandlers.patch())
  .all(forbiddenOrUnauthorised())
