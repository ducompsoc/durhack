import path from "node:path"
import { loadConfig } from "zod-config"
import { directoryAdapter } from "zod-config/directory-adapter"

import { typescriptAdapter } from "./typescript-adapter"

import { dirname } from "@/dirname"

import { configSchema } from "./schema"
export type * from "./schema"

const config = await loadConfig({
  schema: configSchema,
  adapters: directoryAdapter({
    paths: path.resolve(dirname, "..", "config"),
    adapters: [
      {
        extensions: [".ts", ".js"],
        adapterFactory: (filePath: string) => typescriptAdapter({ path: filePath }),
      },
    ],
  }),
})

export const {
  listen: listenConfig,
  origin,
  frontendOrigin,
  session: sessionConfig,
  cookieSigning: cookieSigningConfig,
  keycloak: keycloakConfig,
  mailgun: mailgunConfig,
  durhack: durhackConfig,
} = config

export { config }
