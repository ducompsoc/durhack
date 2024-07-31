import { cors } from "corstisol"
import { App } from "@tinyhttp/app"
import { logger } from "@tinyhttp/logger"

import { routesApp } from "@/routes"
import { listenConfig, siteUrl } from "@/config";

const app = new App()

app
  .use(logger())
  .use(cors({
    origin: siteUrl,
  }))
  .use(routesApp)
  .listen(
    listenConfig.port,
    () => console.log(`Listening on http://${listenConfig.host}:${listenConfig.port}`),
    listenConfig.host
  )
