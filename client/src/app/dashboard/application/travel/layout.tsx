import type * as React from "react"

export default function TravelPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Travel</h2>
      {children}
    </>
  )
}
