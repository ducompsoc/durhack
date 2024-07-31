import path from "node:path"
import { loadConfig } from "zod-config"
import { directoryAdapter } from "zod-config/directory-adapter"
import { scriptAdapter } from "zod-config/script-adapter"

import { dirname } from "@/dirname"

import { configSchema } from "./schema"
export type * from "./schema"

const config = await loadConfig({
  schema: configSchema,
  adapters: directoryAdapter({
    paths: path.join(dirname, "config"),
    adapters: [
      {
        extensions: [".ts", ".js"],
        adapterFactory: (filePath: string) => scriptAdapter({ path: filePath }),
      },
    ],
  }),
})

export const { listen: listenConfig, url, siteUrl } = config

export { config }
