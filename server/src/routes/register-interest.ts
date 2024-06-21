import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"

import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const registerInterestRoutesApp = new App()

registerInterestRoutesApp
  .route("/")
    .all(methodNotAllowed(["OPTIONS", "POST"]))
    .options(cors())
    .post(async function (req, res): Promise<void> {
      res.sendStatus(501)
    })
