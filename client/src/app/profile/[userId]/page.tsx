"use client"

import { Checkbox } from "@durhack/web-components/ui/checkbox"
import { useToast } from "@durhack/web-components/ui/use-toast"
import React from "react"
import useSWR from "swr"

import { siteConfig } from "@/config/site"

export type UserProfile = {
  age: number
  university: string
  gradYear: string
  levelOfStudy: string
  country: string
}

type Flags = {
  [T in FlagName]?: boolean | undefined
}

const defaultFlags = {
  attendance: false,
  mlhCodeOfConduct: false,
  mlhPolicies: false,
  mlhMarketing: false,
}

type FlagName = keyof typeof defaultFlags

const profileFetcher = async (url: string): Promise<UserProfile> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) throw new Error("Failed to fetch data")
  return response.json()
}

const ProfilePage = React.memo(
  ({
    params,
  }: {
    params: { userId: string }
  }): React.ReactNode => {
    const { toast } = useToast()

    const {
      data: profileData,
      error: profileError,
      isLoading: profileIsLoading,
    } = useSWR(`${siteConfig.apiUrl}/profile/${params.userId}`, profileFetcher)

    if (profileIsLoading) {
      return <div>Loading profile data...</div>
    }

    async function setAttendance(setValue: boolean | "indeterminate") {
      if (setValue === "indeterminate") return
      try {
        const response = await fetch(`${siteConfig.apiUrl}/profile/${params.userId}/flags`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userFlags: {
              attendance: setValue,
            },
          }),
        })
        if (!response.ok) throw new Error("Something went wrong.")

        toast({
          description: "Successfully updated attendance!",
          variant: "success",
        })
      } catch (error) {
        toast({
          description: "Failed to update attendance.",
          variant: "destructive",
        })
        return
      }
    }

    return (
      <main className="flex justify-center">
        <div className="bg-muted md:w-full lg:w-1/2 my-7">
          <div className="grid space-y-6 my-5">
            <div className="grid grid-rows-2 grid-flow-col flex justify-center">
              <p className="lg:text-4xl md:text-2xl break-word">
                <b>User #{params.userId}</b>
              </p>
              <div className="flex items-center">
                <p>
                  <b>Attendance:</b>
                </p>
                <Checkbox
                  className="ml-2"
                  defaultChecked={false}
                  onCheckedChange={(checked) => void setAttendance(checked)}
                >
                  {" "}
                </Checkbox>
              </div>
            </div>

            <div className="ml-8 justify-center break-all">
              <p>
                <b>Role: </b>Hacker
              </p>
              <p className="mt-3">
                <b>University:</b> {profileData?.university}{" "}
              </p>
              <p>
                <b>Graduation year:</b> {profileData?.gradYear}{" "}
              </p>
              <p>
                <b>Level of study:</b> {profileData?.levelOfStudy}{" "}
              </p>
              <p className="mt-3">
                <b>Age:</b> {profileData?.age}{" "}
              </p>
              <p>
                <b>Country:</b> {profileData?.country}{" "}
              </p>
              <p className="mt-3">Todo: keycloak attributes</p>
            </div>
          </div>
        </div>
      </main>
    )
  },
)
ProfilePage.displayName = "ProfilePage"

export default ProfilePage
