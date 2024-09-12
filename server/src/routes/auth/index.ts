import { App } from "@otterhttp/app"

import type { Request, Response } from "@/types"
import { methodNotAllowed } from "@/middleware/method-not-allowed"

import { keycloakApp } from "./keycloak"
import { authHandlers } from "./auth-handlers"

const authApp = new App<Request, Response>()

authApp.use("/keycloak", keycloakApp)

export { authApp }
