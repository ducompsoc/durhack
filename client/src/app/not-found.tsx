import type { Metadata } from "next"
import React from "react"

import { ServerErrorPage } from "@/components/server-error"

export const metadata: Metadata = {
  title: "Not Found",
}

export default function NotFound() {
  return <ServerErrorPage statusCode="404" message="Page could not be found" />
}
