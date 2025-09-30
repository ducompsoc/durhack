import type * as React from "react"

import { type VariantProps, cva } from "class-variance-authority"

export const iconVariantsBaseOptions = {
  variants: {
    variant: {
      inherit: "",
    },
  },
  defaultVariants: {
    variant: "inherit",
  },
} as const

export const iconVariants = cva("icon", iconVariantsBaseOptions)

export type IconVariantProps = VariantProps<typeof iconVariants>

export type IconProps = React.HTMLAttributes<SVGElement> & IconVariantProps
