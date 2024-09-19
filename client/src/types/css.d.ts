import type * as React from "react"

declare module "react" {
  interface CSSProperties {
    [index: `--${string}`]: string | number
  }
}
