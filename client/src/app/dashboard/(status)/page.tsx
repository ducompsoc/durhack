"use client"

import * as React from "react"

import { Skeleton } from "@/components/dashboard/skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"

export default function EducationPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  return (
    <>
      <h2 className="text-2xl">Form Status</h2>
      <p>The current status of your application is:</p>
      <div className="mx-auto w-64 py-16">
        {applicationIsLoading ? (
          <Skeleton rows={0} />
        ) : (
          <p className="text-center font-bold text-xl">{application?.applicationStatus}</p>
        )}
      </div>
    </>
  )
}
