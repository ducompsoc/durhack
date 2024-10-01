import * as React from "react"

export default function CvPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">CV Submission</h2>
      {children}
    </>
  )
}
