import { App } from "@otterhttp/app"

import type { Request, Response } from "@/types"
import { methodNotAllowed } from "@/middleware/method-not-allowed";
import { authenticate } from "@/middleware/authenticate";
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised";

import { applicationsHandlers } from "./applications-handlers";
import { applicationsDataExportApp } from "./data-export"

export const applicationsApp = new App<Request, Response>()

applicationsApp.use("/data-export", applicationsDataExportApp)

applicationsApp.route("/")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationsHandlers.getApplicationsSummary())
  .all(forbiddenOrUnauthorised())

applicationsApp.route("/by-institution")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationsHandlers.getApplicationsByInstitution())
  .all(forbiddenOrUnauthorised())

applicationsApp.route("/by-level-of-study")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationsHandlers.getApplicationsByLevelOfStudy())
  .all(forbiddenOrUnauthorised())

applicationsApp.route("/by-discipline-of-study")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationsHandlers.getApplicationsByDisciplineOfStudy())
  .all(forbiddenOrUnauthorised())

applicationsApp.route("/by-dietary-requirement")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(applicationsHandlers.getApplicationsByDietaryRequirement())
  .all(forbiddenOrUnauthorised())
