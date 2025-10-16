import type * as React from "react"

export default function ContactPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Contact Information</h2>
      {children}
    </>
  )
}
