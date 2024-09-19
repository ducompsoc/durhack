import { createServer } from "node:http"
import { App } from "@otterhttp/app"
import { cors } from "corstisol"

import { frontendHostname, listenConfig } from "@/config"
import { Request } from "@/request"
import { Response } from "@/response"
import { routesApp } from "@/routes"

const app = new App<Request, Response>()

app
  .use(
    cors({
      origin: frontendHostname,
    }),
  )
  .use(routesApp)

const server = createServer<typeof Request, typeof Response>({
  IncomingMessage: Request,
  ServerResponse: Response,
})

server.on("request", app.attach)

server.listen(listenConfig.port, listenConfig.host, () =>
  console.log(`Listening on http://${listenConfig.host}:${listenConfig.port}`),
)
