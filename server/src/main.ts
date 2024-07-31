import { App } from "@tinyhttp/app"
import { logger } from "@tinyhttp/logger"
import { cors } from "corstisol"

import { listenConfig, frontendHostname } from "@/config"
import { routesApp } from "@/routes"

const app = new App()

app
  .use(logger())
  .use(
    cors({
      origin: frontendHostname,
    }),
  )
  .use(routesApp)
  .listen(
    listenConfig.port,
    () => console.log(`Listening on http://${listenConfig.host}:${listenConfig.port}`),
    listenConfig.host,
  )
