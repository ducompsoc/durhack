"use client"

import { siteConfig } from "@/config/site"
import * as React from "react"

export default function AuthPage() {
  const signOutUri = new URL("/auth/keycloak/logout", siteConfig.apiUrl).toString()

  return (
    <div>
      <h2 className="text-2xl">Authentication</h2>

      <div className="bg-white bg-opacity-10 py-8 px-32 rounded-md mb-8 mt-2 text-center flex flex-col gap-4">
        <a
          className={"rounded-sm p-4 my-4 cursor-pointer bg-green-400 bg-opacity-90"}
          href={siteConfig.authUrl}
          target="_blank"
          rel="noreferrer"
        >
          DurHack Auth
        </a>
        <a className={"block rounded-sm p-4 cursor-pointer bg-white bg-opacity-10"} href={signOutUri}>
          Sign Out
        </a>
      </div>
    </div>
  )
}
