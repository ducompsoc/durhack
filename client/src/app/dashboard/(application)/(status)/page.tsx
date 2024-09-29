"use client"

import * as React from "react"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"

export default function EducationPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  /* todo: this needs instructions for people whose status is still 'unsubmitted'
      - if they have not started to fill out anything, provide a 'get started' link (to the 'personal' form)
      - tell them what they still need to do for submission to become available ('fill out X, fill out Y, ...')
      - if submission is available, tell them that, and give them a link to the 'submit' form
   */
  return (
    <>
      <h2 className="text-2xl">DurHack Application Status</h2>
      <p>The current status of your application is:</p>
      <div className="mx-auto w-64 py-16">
        {applicationIsLoading ? (
          <FormSkeleton rows={0} />
        ) : (
          <p className="text-center font-bold text-xl">{application?.applicationStatus}</p>
        )}
      </div>
    </>
  )
}
