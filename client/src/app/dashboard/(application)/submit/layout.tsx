import type * as React from "react"

export default function SubmitPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Submit Application</h2>
      {children}
    </>
  )
}
