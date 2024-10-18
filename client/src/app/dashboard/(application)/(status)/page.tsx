"use client"

import * as React from "react"
import { Button } from "@durhack/web-components/ui/button"
import { Skeleton } from "@durhack/web-components/ui/skeleton"
import Link from "next/link"

import { ApplicationStatusBadge } from "@/components/dashboard/application-status-indicator";
import { ProfileQrCode } from "@/components/profile-qr-code";
import { useApplicationContext } from "@/hooks/use-application-context"
import type { Application } from "@/hooks/use-application"
import { isLoaded } from "@/lib/is-loaded";

function InstructionsArticle({ application, applicationIsLoading }: { application: Application | undefined, applicationIsLoading: boolean }) {
  if (!isLoaded(application, applicationIsLoading)) return <Skeleton className="w-full h-[100px]" />

  const filledOutCount = [
    application.age != null,
    application.phone != null,
    application.tShirtSize != null,
    application.graduationYear != null,
    application.cvUploadChoice !== "indeterminate",
  ]
    .filter((statement) => statement)
    .length

  if (application.applicationStatus === "submitted") return <article>
    <p>Your application has been submitted! Feel free to continue to update your details, should you like.</p>
    <p>We will send you ticket assignment / waiting-list notifications via email.</p>
    <p>If your application does not show as "accepted" after 24 hours, please email <a className="underline" href="mailto:hello@durhack.com">hello@durhack.com</a></p>
  </article>

  if (application.applicationStatus === "waiting-list") return <article>
    <p>You are on the waiting list.</p>
    <p>If a place at DurHack becomes available and is assigned to you, we will notify you by email.</p>
  </article>

  if (application.applicationStatus === "accepted") return <article>
    <p>Congratulations, your place at DurHack 2024 is confirmed!</p>
    <p>Check your inbox for a confirmation email - you will need the QR code inside to check-in on the day of the event.</p>
  </article>

  if (application.applicationStatus !== "unsubmitted") return null

  if (filledOutCount === 0) {
    // provide 'get started' link
    return <article className="flex flex-col w-full justify-center items-center">
      <p>You haven&apos;t started to fill out your application yet!</p>
      <div>
        <Button variant="link" className='bg-secondary mt-2' asChild>
          <Link href="/dashboard/personal">Get started</Link>
        </Button>
      </div>
    </article>
  }

  if (filledOutCount === 5) {
    // submission is available, provide 'submit' link
    return <article className="flex flex-col w-full justify-center items-center">
      <p>Your application is ready to submit!</p>
      <div>
        <Button variant="link" className='bg-secondary mt-2' asChild>
          <Link href="/dashboard/personal">Get started</Link>
        </Button>
      </div>
    </article>
  }

  // application is partially complete - provide 'fill out X, fill out Y, ...'
  return <article>
    <p>Your application is partially complete! You still need to ...</p>
    <ul style={{ listStyleType: "\"- \"" }} className="ml-4">
      {application.age != null ? null : <li>Fill out your <Link className="underline" href="/dashboard/personal">personal details</Link></li>}
      {application.phone != null ? null : <li>Provide your <Link className="underline" href="/dashboard/contact">contact details</Link></li>}
      {application.tShirtSize != null ? null : <li>Populate some <Link className="underline" href="/dashboard/extra">extra details</Link></li>}
      {application.graduationYear != null ? null : <li>Tell us about your <Link className="underline" href="/dashboard/education">education</Link></li>}
      {application.cvUploadChoice !== "indeterminate" ? null : <li>Decide whether you would like to <Link className="underline" href="/dashboard/cv">upload your CV</Link></li>}
    </ul>
  </article>
}

function ProfileQrCodeArticle({ application, applicationIsLoading }: { application: Application | undefined, applicationIsLoading: boolean }) {
  if (!isLoaded(application, applicationIsLoading)) return <Skeleton className="w-full h-[20rem] mt-4" />
  if (application.applicationStatus === "unsubmitted") return

  return <>
    <h2 className="text-2xl mt-4">Your Profile QR Code</h2>
    <article className="bg-secondary/10 py-8 mt-2 rounded-md w-full flex flex-col justify-center items-center">
      <ProfileQrCode userId={application.keycloakUserId} className="max-w-[20rem]"/>
    </article>
  </>
}

export default function StatusPage() {
  const {application, applicationIsLoading} = useApplicationContext()

  return (
    <>
      <article className="bg-secondary/10 py-8 mt-2 rounded-md w-full flex flex-col justify-center items-center mb-4">
        <ApplicationStatusBadge size="xl">
          <Skeleton className="w-48 h-12"/>
        </ApplicationStatusBadge>
      </article>
      <InstructionsArticle application={application} applicationIsLoading={applicationIsLoading}/>
      <ProfileQrCodeArticle application={application} applicationIsLoading={applicationIsLoading}/>
    </>
  )
}
