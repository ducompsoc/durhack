import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"

import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const registerInterestRoutesApp = new App()
