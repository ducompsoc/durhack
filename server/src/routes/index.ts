import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { applicationApp } from "@/routes/application"
import { applicationsApp } from "@/routes/applications"
import { authApp } from "@/routes/auth"
import { calendarApp } from "@/routes/calendar"
import { registerInterestApp } from "@/routes/interest"
import { profileApp } from "@/routes/profile"
import { userApp } from "@/routes/user"
import type { Request, Response } from "@/types"
import {metaApp} from "@/routes/meta";

export const routesApp = new App<Request, Response>()

routesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get((_request, response) => {
    response.sendStatus(200)
  })

routesApp.use("/applications", applicationsApp)
routesApp.use("/auth", authApp)
routesApp.use("/calendar", calendarApp)
routesApp.use("/meta", metaApp)
routesApp.use("/profile/:userId", profileApp)
routesApp.use("/register-interest", registerInterestApp)
routesApp.use("/user", userApp)
routesApp.use("/application", applicationApp)
