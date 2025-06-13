import type * as React from "react"

export default function ExtraDetailsPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Extra Details</h2>
      {children}
    </>
  )
}
