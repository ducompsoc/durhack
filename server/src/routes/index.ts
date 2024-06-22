import { App } from "@tinyhttp/app";

import { registerInterestRoutesApp } from "@/routes/register-interest"

export const routesApp = new App()

routesApp.use("register-interest", registerInterestRoutesApp)
