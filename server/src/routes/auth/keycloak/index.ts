import { App } from "@tinyhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { authHandlers } from "@/routes/auth/auth-handlers"

import { keycloakHandlers } from "./keycloak-handlers"

const keycloakApp = new App()

keycloakApp
  .route("/login")
  .all(methodNotAllowed(["GET"]))
  .get(keycloakHandlers.beginOAuth2Flow())

keycloakApp
  .route("/callback")
  .all(methodNotAllowed(["GET"]))
  .get(keycloakHandlers.oauth2FlowCallback())
  .get(authHandlers.handleLoginSuccess())

export { keycloakApp }
