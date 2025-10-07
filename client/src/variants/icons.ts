import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

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
