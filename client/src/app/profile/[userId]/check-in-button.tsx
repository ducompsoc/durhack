import { UpdateIcon } from "@radix-ui/react-icons"
import { cva } from "class-variance-authority"
import * as React from "react"
import type { KeyedMutator } from "swr"

import type { UserProfile } from "@durhack/durhack-common/types/user-profile"
import type { Toast, Toaster } from "@durhack/web-components/hooks/use-toast"
import { Button } from "@durhack/web-components/ui/button"

import { siteConfig } from "@/config/site"
import { handleBadResponse } from "@/lib/handle-bad-fetch-response"

const checkInButtonVariants = cva("text-xl", {
  variants: {
    state: {
      undo: "bg-orange-600 text-white hover:bg-orange-600/80",
      default: "bg-success text-success-foreground hover:bg-success/80",
      "checked-in": "bg-purple-800 text-white hover:bg-purple-800/80",
    },
  },
  defaultVariants: {
    state: "default",
  },
})

const checkInButtonText: Record<"undo" | "default" | "checked-in", string> = {
  undo: "Check Out (Undo)",
  default: "Check In",
  "checked-in": "Checked In",
}

type CheckInButtonProps = {
  state: "undo" | "default" | "checked-in"
} & React.ComponentProps<typeof Button>

export function CheckInButton({ className, state, ...props }: CheckInButtonProps): React.ReactNode {
  return (
    <Button variant="outline" className={checkInButtonVariants({ state, className })} {...props}>
      {checkInButtonText[state]}
    </Button>
  )
}

type ProfileCheckInButtonProps = {
  profile: UserProfile
  mutateProfile: KeyedMutator<UserProfile>
  toast: Toaster
} & React.ComponentProps<typeof Button>

async function checkIn({
  profile,
  mutateProfile,
  toast,
}: { profile: UserProfile; mutateProfile: KeyedMutator<UserProfile>; toast: Toaster }) {
  const fallbackToast: Toast = {
    description: "Failed to check in",
    variant: "destructive",
  }

  let response: Response
  try {
    response = await fetch(`${siteConfig.apiUrl}/profile/${profile.userId}/check-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "If-Match": "false",
      },
      credentials: "include",
    })
  } catch (error) {
    toast(fallbackToast)
    console.log(error)
    return
  }

  if (!response.ok) {
    await handleBadResponse({ response, toast, fallbackToast })
    return
  }

  await mutateProfile({
    ...profile,
    checkedIn: true,
    checkedInAt: Date.now(),
  })
}

async function undoCheckIn({
  profile,
  mutateProfile,
  toast,
}: { profile: UserProfile; mutateProfile: KeyedMutator<UserProfile>; toast: Toaster }) {
  const fallbackToast: Toast = {
    description: "Failed to undo",
    variant: "destructive",
  }

  let response: Response
  try {
    response = await fetch(`${siteConfig.apiUrl}/profile/${profile.userId}/check-in?whoops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "If-Match": "true",
      },
      credentials: "include",
    })
  } catch (error) {
    toast(fallbackToast)
    return
  }

  if (!response.ok) {
    await handleBadResponse({ response, toast, fallbackToast })
    return
  }

  await mutateProfile({
    ...profile,
    checkedIn: false,
    checkedInAt: null,
  })
}

function inferState(profile: UserProfile): "undo" | "default" | "checked-in" {
  if (!profile.checkedIn || profile.checkedInAt == null) return "default"
  if (Date.now() - profile.checkedInAt < 5 * 60 * 1000) return "undo"
  return "checked-in"
}

export function ProfileCheckInButton({ profile, mutateProfile, toast, ...props }: ProfileCheckInButtonProps) {
  const [working, setWorking] = React.useState<boolean>(false)
  if (working)
    return (
      <div className="h-9 px-4 py-2 m-5">
        <UpdateIcon className="animate-spin h-4 w-6" />
      </div>
    )

  const state = inferState(profile)

  async function onClick() {
    if (state === "checked-in") return
    setWorking(true)
    try {
      if (state === "default") return await checkIn({ profile, mutateProfile, toast })
      if (state === "undo") return await undoCheckIn({ profile, mutateProfile, toast })
    } finally {
      setWorking(false)
    }
  }

  return <CheckInButton className="m-5" state={state} disabled={state === "checked-in"} onClick={onClick} {...props} />
}
