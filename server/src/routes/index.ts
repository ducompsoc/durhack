import { App } from "@tinyhttp/app";

import { verifiedSchoolsRoutesApp } from "@/routes/verified-schools";
import { registerInterestRoutesApp } from "@/routes/register-interest"

export const routesApp = new App()

routesApp.use("verified-schools", verifiedSchoolsRoutesApp)
routesApp.use("register-interest", registerInterestRoutesApp)
