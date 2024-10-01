import * as React from "react"

export default function EducationPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Education & Residence Information</h2>
      {children}
    </>
  )
}
