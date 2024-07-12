import { cors } from "corstisol"
import { App } from "@tinyhttp/app"
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
