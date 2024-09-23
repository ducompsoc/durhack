import { App } from "@otterhttp/app"

import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request, Response } from "@/types"

import { authHandlers } from "./auth-handlers"
import { keycloakApp } from "./keycloak"

const authApp = new App<Request, Response>()

authApp.use("/keycloak", keycloakApp)

export { authApp }
