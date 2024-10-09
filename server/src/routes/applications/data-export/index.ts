import { App } from "@otterhttp/app"

import type { Request, Response } from "@/types"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"

import { dataExportHandlers } from "./data-export-handlers"

export const applicationsDataExportApp = new App<Request, Response>()

applicationsDataExportApp.route("/major-league-hacking")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(dataExportHandlers.getMajorLeagueHacking())
  .all(forbiddenOrUnauthorised())

applicationsDataExportApp.route("/hackathons-uk")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(dataExportHandlers.getHackathonsUk())
  .all(forbiddenOrUnauthorised())
