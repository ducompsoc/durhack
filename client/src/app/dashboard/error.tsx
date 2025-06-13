"use client"

import { Button } from "@durhack/web-components/ui/button"
import * as React from "react"

/**
 * Dashboard error boundary. This is usually only hit when an error is thrown by the
 * {@link import('./(application)/layout.tsx').default Application Layout}, which only happens
 * when an error occurs when trying to fetch the user's registration details.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[100vh] relative z-10 flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <h2>Something went wrong!</h2>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
