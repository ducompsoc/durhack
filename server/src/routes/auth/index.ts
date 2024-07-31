import { App } from "@tinyhttp/app"

import { keycloakApp } from "./keycloak"

const authApp = new App()

authApp.use("/keycloak", keycloakApp)

export { authApp }
