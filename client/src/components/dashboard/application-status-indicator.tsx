import type { Application } from "@durhack/durhack-common/types/application"
import { Badge } from "@durhack/web-components/ui/badge"
import { UpdateIcon } from "@radix-ui/react-icons"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"

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
      xl: "text-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})
type ApplicationStatusBadgeVariantProps = VariantProps<typeof applicationStatusBadgeVariants>

type AutoApplicationStatusBadgeProps = {
  size?: ApplicationStatusBadgeVariantProps["size"]
} & React.ComponentProps<typeof Badge>

type ApplicationStatusBadgeProps = {
  applicationStatus: Application["applicationStatus"] | "incomplete"
} & AutoApplicationStatusBadgeProps

export function ApplicationStatusBadge({
  applicationStatus,
  children,
  size,
  className,
  ...props
}: ApplicationStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={applicationStatusBadgeVariants({ className, size, applicationStatus })}
      {...props}
    >
      {applicationStatus}
    </Badge>
  )
}

export function AutoApplicationStatusBadge({ children, ...props }: AutoApplicationStatusBadgeProps) {
  const { application, applicationIsLoading, applicationIsComplete } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) return children

  if (application.applicationStatus === "unsubmitted" && !applicationIsComplete)
    return <ApplicationStatusBadge applicationStatus="incomplete" {...props} />

  return <ApplicationStatusBadge applicationStatus={application.applicationStatus} {...props} />
}

export function AutoApplicationStatusIndicator() {
  return (
    <article>
      <div className="min-w-32 flex flex-col items-center">
        <span className="text-nowrap">your application is</span>
        <AutoApplicationStatusBadge className="mt-1">
          <UpdateIcon className="animate-spin h-6 w-6 m-2" />
        </AutoApplicationStatusBadge>
      </div>
    </article>
  )
}
