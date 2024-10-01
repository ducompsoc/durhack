import * as React from "react"

export default function StatusPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">DurHack Application Status</h2>
      {children}
    </>
  )
}
