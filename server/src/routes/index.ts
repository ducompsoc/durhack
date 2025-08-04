import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { applicationApp } from "@/routes/application"
import { applicationsApp } from "@/routes/applications"
import { authApp } from "@/routes/auth"
import { calendarApp } from "@/routes/calendar"
import { registerInterestApp } from "@/routes/interest"
import { profileApp } from "@/routes/profile"
import { travelReimbursementApp } from "@/routes/travel-reimbursement"
import { userApp } from "@/routes/user"
import type { Request, Response } from "@/types"

export const routesApp = new App<Request, Response>()

routesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get((_request, response) => {
    response.sendStatus(200)
  })

routesApp.use("/calendar", calendarApp)
routesApp.use("/register-interest", registerInterestApp)
routesApp.use("/auth", authApp)
routesApp.use("/user", userApp)
routesApp.use("/application", applicationApp)
routesApp.use("/applications", applicationsApp)
routesApp.use("/profile/:userId", profileApp)
routesApp.use("/travel-reimbursement", travelReimbursementApp)
