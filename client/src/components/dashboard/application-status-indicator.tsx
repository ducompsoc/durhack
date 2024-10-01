import { UpdateIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { Badge } from "@durhack/web-components/ui/badge"
import { cva, type VariantProps } from "class-variance-authority"

import { useApplicationContext } from "@/hooks/use-application-context";
import { isLoaded } from "@/lib/is-loaded";

const applicationStatusBadgeVariants = cva("capitalize", {
  variants: {
    applicationStatus: {
      incomplete: "bg-destructive text-destructive-foreground",
      unsubmitted: "bg-orange-600 text-white",
      submitted: "bg-success text-success-foreground",
      accepted: "bg-purple-800 text-white",
      "waiting-list": "bg-sky-600 text-white",
    },
    size: {
      default: "text-xl",
      xl: "text-3xl"
    },
  },
  defaultVariants: {
    size: "default"
  }
})
type ApplicationStatusBadgeVariantProps = VariantProps<typeof applicationStatusBadgeVariants>

type ApplicationStatusBadgeProps = {
  size?: ApplicationStatusBadgeVariantProps["size"]
} & React.ComponentProps<typeof Badge>

export function ApplicationStatusBadge({ children, size, className, ...props }: ApplicationStatusBadgeProps) {
  const { application, applicationIsLoading, applicationIsComplete } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) return children

  if (application.applicationStatus === "unsubmitted" && !applicationIsComplete) return (
    <Badge variant="outline" className={applicationStatusBadgeVariants({ className, size, applicationStatus: "incomplete" })} {...props}>
      incomplete
    </Badge>
  )

  return (
    <Badge variant="outline" className={applicationStatusBadgeVariants({ className, size, applicationStatus: application.applicationStatus })} {...props}>
      {application.applicationStatus}
    </Badge>
  )
}

export function ApplicationStatusIndicator() {
  return <article>
    <div className="min-w-[8rem] flex flex-col items-center">
      <span className="text-nowrap">your application is</span>
      <ApplicationStatusBadge className="mt-1">
        <UpdateIcon className="animate-spin h-6 w-6 m-2"/>
      </ApplicationStatusBadge>
    </div>
  </article>
}
