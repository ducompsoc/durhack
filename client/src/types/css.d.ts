// noinspection ES6UnusedImports
// biome-ignore lint/correctness/noUnusedImports: the import is necessary to overwrite the React type
import type * as React from "react"

declare module "react" {
  interface CSSProperties {
    [index: `--${string}`]: string | number
  }
}
