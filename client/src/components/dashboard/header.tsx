"use client"

import { HamburgerMenuIcon, UpdateIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { Badge } from "@durhack/web-components/ui/badge"
import { Button } from "@durhack/web-components/ui/button"
import { cva } from "class-variance-authority"

import { useApplicationContext } from "@/hooks/use-application-context"
import { useSidebarContext } from "@/app/dashboard/(application)/sidebar-context"
import { isLoaded } from "@/lib/is-loaded";

const applicationStatusIndicatorVariants = cva("capitalize text-xl mt-1", {
  variants: {
    applicationStatus: {
      incomplete: "bg-destructive text-destructive-foreground",
      unsubmitted: "bg-orange-600 text-white",
      submitted: "bg-success text-success-foreground",
      accepted: "bg-purple-800 text-white",
      "waiting-list": "bg-sky-600 text-white",
    }
  }
})

function ApplicationStatusIndicator() {
  const { application, applicationIsLoading, applicationIsComplete } = useApplicationContext()

  function Layout({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <article {...props}>
      <div className="min-w-[8rem] flex flex-col items-center">
        <span>your application is</span>
        {children}
      </div>
    </article>
  }

  if (!isLoaded(application, applicationIsLoading)) return (
    <Layout>
      <UpdateIcon className="animate-spin h-6 w-6 m-2"/>
    </Layout>
  )

  if (application.applicationStatus === "unsubmitted" && !applicationIsComplete) return (
    <Layout>
      <Badge variant="outline" className={applicationStatusIndicatorVariants({ applicationStatus: "incomplete" })}>
        incomplete
      </Badge>
    </Layout>
  )

  return (
    <Layout>
      <Badge variant="outline" className={applicationStatusIndicatorVariants(application)}>
        {application.applicationStatus}
      </Badge>
    </Layout>
  )
}

export function Header() {

  const {toggleIsOpen: toggleSidebar } = useSidebarContext()

  return (
    <div className="px-8 py-8 border-b-2 h-32 flex flex-row justify-between">
      {/* left-aligned header items */}
      <div className="flex flex-row h-full items-center">
        <article>
          <div className="pr-8 h-full content-center md:hidden">
            <Button className="aspect-square" onClick={() => toggleSidebar()}>
              <HamburgerMenuIcon/>
            </Button>
          </div>
          <div>
            <div className="h-full content-center">
              <h1 className="text-4xl font-semibold">Dashboard</h1>
              <p className="hidden sm:block">Edit and update information concerning your DurHack profile.</p>
            </div>
          </div>
        </article>
      </div>

      {/* right-aligned header items */}
      <div className="flex flex-row h-full items-center">
        <ApplicationStatusIndicator />
      </div>
    </div>
  )
}
