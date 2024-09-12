import { App } from "@otterhttp/app"

import type { Request, Response } from "@/types";
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { authHandlers } from "@/routes/auth/auth-handlers"

import { keycloakHandlers } from "./keycloak-handlers"

const keycloakApp = new App<Request, Response>()

keycloakApp
  .route("/login")
  .all(methodNotAllowed(["GET"]))
  .get(keycloakHandlers.beginOAuth2Flow())

keycloakApp
  .route("/callback")
  .all(methodNotAllowed(["GET"]))
  .get(keycloakHandlers.oauth2FlowCallback())
  .get(authHandlers.handleLoginSuccess())

keycloakApp
  .route("/logout")
  .all(methodNotAllowed(["GET"]))
  .get(keycloakHandlers.logout())

export { keycloakApp }
