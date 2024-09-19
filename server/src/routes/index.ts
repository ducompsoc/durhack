import { App } from "@otterhttp/app"

import { authApp } from "@/routes/auth"
import { profileApp } from "@/routes/profile"
import { registerInterestRoutesApp } from "@/routes/register-interest"
import type { Request, Response } from "@/types"

export const routesApp = new App<Request, Response>()

routesApp.use("/auth", authApp)
routesApp.use("register-interest", registerInterestRoutesApp)
routesApp.use("profile", profileApp)
