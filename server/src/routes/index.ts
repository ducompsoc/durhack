import { App } from "@otterhttp/app"

import { origin } from "@/config"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { serveStaticJson } from "@/middleware/serve-static-json"
import { applicationApp } from "@/routes/application"
import { applicationsApp } from "@/routes/applications"
import { authApp } from "@/routes/auth"
import { calendarApp } from "@/routes/calendar"
import { registerInterestApp } from "@/routes/interest"
import { metaApp } from "@/routes/meta"
import { profileApp } from "@/routes/profile"
import { userApp } from "@/routes/user"
import type { Request, Response } from "@/types"

export const routesApp = new App<Request, Response>()

routesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(
    serveStaticJson({
      applications_url: new URL("/applications", origin).href,
      auth_url: new URL("/auth", origin).href,
      calendar_url: new URL("/calendar", origin).href,
      meta_url: new URL("/meta", origin).href,
      // profile_url: new URL("/profile", origin).href, // hidden as profile list endpoint doesn't exist
      register_interest_url: new URL("/register-interest", origin).href,
      you_url: new URL("/user", origin).href,
      your_application_url: new URL("/application", origin).href,
    }),
  )

routesApp.use("/applications", applicationsApp)
routesApp.use("/auth", authApp)
routesApp.use("/calendar", calendarApp)
routesApp.use("/meta", metaApp)
routesApp.use("/profile/:userId", profileApp)
routesApp.use("/register-interest", registerInterestApp)
routesApp.use("/user", userApp)
routesApp.use("/application", applicationApp)
