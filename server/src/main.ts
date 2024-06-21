import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"
import { logger } from "@tinyhttp/logger"

import { routesApp } from "@/routes"
import { serverConfig } from "@/config/server";

const app = new App()

app
  .use(logger())
  .use(cors({
    origin: serverConfig.siteUrl,
  }))
  .use(routesApp)
  .listen(
    serverConfig.listen.port,
    () => console.log(`Listening on http://${serverConfig.listen.host}:${serverConfig.listen.port}`),
    serverConfig.listen.host
  )
