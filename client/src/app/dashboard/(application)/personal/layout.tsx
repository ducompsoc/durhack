import type * as React from "react"

export default function PersonalPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Personal Details</h2>
      {children}
    </>
  )
}
