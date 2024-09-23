import { createServer } from "node:http"
import { App } from "@otterhttp/app"
import { cors } from "corstisol"

import { frontendOrigin, listenConfig } from "@/config"
import { Request } from "@/request"
import { Response } from "@/response"
import { routesApp } from "@/routes"
import { apiErrorHandler } from "@/routes/error-handling"

const app = new App<Request, Response>({
  onError: apiErrorHandler,
})

app
  .use(
    cors({
      origin: frontendOrigin,
      credentials: true,
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
