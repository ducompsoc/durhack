import { Button } from "@durhack/web-components/ui/button"
import type * as React from "react"

import { cn } from "@/lib/utils"

export function FormSubmitButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all",
        className,
      )}
      {...props}
    />
  )
}
