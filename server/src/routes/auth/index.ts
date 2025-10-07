import { App } from "@otterhttp/app"

import { origin } from "@/config"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { serveStaticJson } from "@/middleware/serve-static-json"
import type { Request, Response } from "@/types"

import { keycloakApp } from "./keycloak"

const authApp = new App<Request, Response>()

authApp
  .route("/")
  .all(methodNotAllowed(["GET"]))
  .get(
    serveStaticJson({
      keycloak_auth_url: new URL("/auth/keycloak", origin).href,
    }),
  )

authApp.use("/keycloak", keycloakApp)

export { authApp }
