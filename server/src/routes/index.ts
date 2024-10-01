import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { applicationApp } from "@/routes/application"
import { authApp } from "@/routes/auth"
import { userApp } from "@/routes/user"
import { profilesApp } from "@/routes/profiles"
import type { Request, Response } from "@/types"

export const routesApp = new App<Request, Response>()

routesApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get((request, response) => {
    response.sendStatus(200)
  })

routesApp.use("/auth", authApp)
routesApp.use("/user", userApp)
routesApp.use("/application", applicationApp)
routesApp.use("/profiles/:userId", profilesApp)
