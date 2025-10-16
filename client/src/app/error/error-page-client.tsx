"use client"

import { useSearchParams } from "next/navigation"

import { ServerErrorPage } from "@/components/server-error"
import { isValidStatusCode, statusMessages } from "@/lib/status-codes"

export default function ErrorPageClient() {
  const searchParams = useSearchParams()

  const statusCode = Number(searchParams.get("status_code"))

  if (isValidStatusCode(statusCode)) {
    return <ServerErrorPage statusCode={statusCode.toString()} message={statusMessages[statusCode]} />
  }

  if (!Number.isNaN(statusCode)) {
    return <ServerErrorPage statusCode={statusCode.toString()} message="Something strange..." />
  }

  return <ServerErrorPage message="Something strange..." />
}
