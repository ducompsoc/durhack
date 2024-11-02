"use client"

import React from "react"
import useSWR from "swr"
import { UpdateIcon } from "@radix-ui/react-icons"

import { Checkbox } from "@durhack/web-components/ui/checkbox"
import { Label } from "@durhack/web-components/ui/label"
import { useToast } from "@durhack/web-components/hooks/use-toast"
import type { UserProfile } from "@durhack/durhack-common/types/user-profile"

import { siteConfig } from "@/config/site"
import { ApplicationStatusBadge } from "@/components/dashboard/application-status-indicator"
import { isLoaded } from "@/lib/is-loaded"

import { ProfileCheckInButton } from "./check-in-button"
import { StashClaimsDisplay } from "./stash-claims"

const profileFetcher = async (url: string): Promise<UserProfile> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) throw new Error("Failed to fetch data")
  const payload: unknown = await response.json()
  if (typeof payload !== "object" || Array.isArray(payload)) throw new Error(`Expected response type 'object', got '${typeof payload}'`)
  if (payload === null) throw new Error("Unexpected null response")
  if (!Object.hasOwn(payload, "data")) throw new Error("Response missing expected member `data`")
  return payload.data as UserProfile
}

const ProfilePage = React.memo(
  ({
    params,
  }: {
    params: { userId: string }
  }): React.ReactNode => {
    const { toast } = useToast()

    const {
      data: profile,
      mutate: mutateProfile,
      error: profileError,
      isLoading: profileIsLoading,
    } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}`, profileFetcher)

    if (!isLoaded(profile, profileIsLoading, profileError)) return (
      <main className="w-full min-h-[100vh] m-0 flex flex-col items-center justify-center">
        <UpdateIcon className="animate-spin h-6 w-6 m-5"/>
      </main>
    )

    return (
      <main className="w-full min-h-[100vh] m-0 flex flex-col space-y-1.5 items-center justify-center">
        <h1 className="text-4xl font-bold">{profile.preferredNames ?? profile.firstNames} {profile.lastNames}</h1>
        <ApplicationStatusBadge applicationStatus={profile.applicationStatus}/>
        <div className="flex space-x-3 items-center text-muted-foreground text-xs">
          <Label htmlFor="uuid">ID</Label>
          <div id="uuid"><code>{profile.userId}</code></div>
        </div>
        <div className="flex space-x-3 items-center text-muted-foreground text-xs">
          <Label htmlFor="email">Email</Label>
          <div id="email">{profile.email}</div>
        </div>
        <div>
          <ProfileCheckInButton
            profile={profile}
            mutateProfile={mutateProfile}
            toast={toast}
          />
        </div>
        <StashClaimsDisplay userId={profile.userId} />
      </main>
    )
  },
)
ProfilePage.displayName = "ProfilePage"

export default ProfilePage
