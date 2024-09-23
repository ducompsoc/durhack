import { type NextRequest, NextResponse } from "next/server"

import { siteConfig } from "@/config/site"

type User = {
  id: string
  email: string
  preferred_names: string
  roles: string[]
  points: number
}

async function getUserProfile(request: NextRequest): Promise<User | null> {
  let userProfile: { data: User } | undefined
  const sessionCookie = request.cookies.get("durhack-session")
  if (sessionCookie != null) {
    const userProfileResponse = await fetch(new URL("/user", siteConfig.apiUrl), {
      // biome-ignore lint/style/noNonNullAssertion: we know the 'cookie' header is set because we asserted the session cookie is non-null
      headers: { cookie: request.headers.get("cookie")! },
    })
    if (userProfileResponse.ok) userProfile = await userProfileResponse.json()
  }
  return userProfile?.data ?? null
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/keycloak/login", siteConfig.apiUrl))
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const userProfile = await getUserProfile(request)
    // if the user is not logged in, go back to root
    if (!userProfile) return redirectToLogin(request)
    // continue as usual
    return
  }
}
