import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { applicationApp } from "@/routes/application"
import { applicationsApp } from "@/routes/applications"
import { authApp } from "@/routes/auth"
import { profilesApp } from "@/routes/profiles"
import { userApp } from "@/routes/user"
import type { Request, Response } from "@/types"
import { calendarApp } from "src/routes/calendar"

export const routesApp = new App<Request, Response>()

routesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get((request, response) => {
    response.sendStatus(200)
  })

routesApp.use("/calendar", calendarApp)
routesApp.use("/auth", authApp)
routesApp.use("/user", userApp)
routesApp.use("/application", applicationApp)
routesApp.use("/applications", applicationsApp)
routesApp.use("/profiles/:userId", profilesApp)
