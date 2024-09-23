import { App } from "@otterhttp/app"

import type { Request, Response } from "@/types"

import { keycloakApp } from "./keycloak"

const authApp = new App<Request, Response>()

authApp.use("/keycloak", keycloakApp)

export { authApp }
