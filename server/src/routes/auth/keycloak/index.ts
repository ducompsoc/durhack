import { App } from "@otterhttp/app"

import { origin } from "@/config"
import { authenticate } from "@/middleware/authenticate"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { serveStaticJson } from "@/middleware/serve-static-json"
import { authHandlers } from "@/routes/auth/auth-handlers"
import type { Request, Response } from "@/types"

import { keycloakHandlers } from "./keycloak-handlers"

const keycloakApp = new App<Request, Response>()

keycloakApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(
    serveStaticJson({
      login_url: new URL("/auth/keycloak/login", origin).href,
      callback_url: new URL("/auth/keycloak/callback", origin).href,
      logout_url: new URL("/auth/keycloak/logout", origin).href,
    }),
  )

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
  .all(authenticate())
  .get(keycloakHandlers.logout())

export { keycloakApp }
