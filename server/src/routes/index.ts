import { App } from "@tinyhttp/app"

import { authApp } from "@/routes/auth"
import { registerInterestRoutesApp } from "@/routes/register-interest"

export const routesApp = new App()

routesApp.use("/auth", authApp)
routesApp.use("register-interest", registerInterestRoutesApp)
