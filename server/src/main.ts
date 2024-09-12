import { App } from "@otterhttp/app"
import { cors } from "corstisol"
import { createServer } from "node:http"

import { Request } from "@/request"
import { Response } from "@/response"
import { frontendHostname, listenConfig } from "@/config"
import { routesApp } from "@/routes"

const app = new App<Request, Response>()

app
  .use(
    cors({
      origin: frontendHostname,
      credentials: true,
    }),
  )
  .use(routesApp)

const server = createServer<typeof Request, typeof Response>({
  IncomingMessage: Request,
  ServerResponse: Response,
})

server.on('request', app.attach)

server.listen(
  listenConfig.port,
  listenConfig.host,
  () => console.log(`Listening on http://${listenConfig.host}:${listenConfig.port}`),
)
