"use client"

import * as React from "react"
import useSWR, { type KeyedMutator } from "swr"
import { UpdateIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@durhack/web-components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@durhack/web-components/ui/table"
import { useToast, type Toaster, type Toast } from "@durhack/web-components/hooks/use-toast"

import { siteConfig } from "@/config/site"
import { isLoaded } from "@/lib/is-loaded"
import { handleBadResponse } from "@/lib/handle-bad-fetch-response";

type StashItem = {
  slug: string
  name: string
  claimed: boolean
}

const stashItemFetcher = async (url: string): Promise<StashItem[]> => {
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
  return payload.data as StashItem[]
}

async function patchStashItemClaims({ userId, mutateStashItems, toast, slug, claimState }: { userId: string, mutateStashItems: KeyedMutator<StashItem[]>, toast: Toaster, slug: string, claimState: boolean }) {
  const fallbackToast: Toast = {
    description: "Failed to update stash claims",
    variant: "destructive",
  }

  let response: Response;
  try {
    response = await fetch(`${siteConfig.apiUrl}/profile/${userId}/stash`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ [slug]: claimState })
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

  await mutateStashItems((stashItems) => {
    if (stashItems == null) return undefined
    const stashItemIndex = stashItems.findIndex((item) => item.slug === slug)
    if (stashItemIndex < 0) return
    const stashItem = stashItems[stashItemIndex]
    return stashItems.toSpliced(stashItemIndex, 1, { ...stashItem, claimed: claimState })
  })
}

function StashClaimDisplay({ userId, item, mutateStashItems, toast }: { userId: string, item: StashItem, mutateStashItems: KeyedMutator<StashItem[]>, toast: Toaster }): React.ReactNode {
  const [working, setWorking] = React.useState<boolean>(false)

  async function onCheckedChange(checked: boolean | "indeterminate") {
    if (checked === "indeterminate") return
    setWorking(true)
    try {
      await patchStashItemClaims({userId, mutateStashItems, toast, slug: item.slug, claimState: checked})
    }
    finally {
      setWorking(false)
    }
  }

  return <TableRow>
    <TableCell>{item.name}</TableCell>
    <TableCell className="p-1">
      <div className="flex justify-center items-center size-full">
        <Checkbox checked="indeterminate" disabled />
      </div>
    </TableCell>
    <TableCell className="p-1">
      <div className="flex justify-center items-center size-full">
        {working
          ? <UpdateIcon className="animate-spin size-4"/>
          : <Checkbox checked={item.claimed} onCheckedChange={onCheckedChange}/>
        }
      </div>
    </TableCell>
  </TableRow>
}

export function StashClaimsDisplay({userId}: { userId: string }): React.ReactNode {
  const { toast } = useToast()
  const {
    data: stashItems,
    mutate: mutateStashItems,
    isLoading: stashItemsAreLoading,
    error: stashItemsError,
  } = useSWR(`${siteConfig.apiUrl}/profile/${userId}/stash`, stashItemFetcher)

  if (!isLoaded(stashItems, stashItemsAreLoading, stashItemsError)) {
    return <div>Loading stash claims...</div>
  }

  return (
    <div className="max-w-[20rem]">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Stash Item</TableHead>
          <TableHead className="text-center">Eligible?</TableHead>
          <TableHead className="text-center">Claimed?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stashItems.map((item) => <StashClaimDisplay
          key={item.slug}
          userId={userId}
          item={item}
          mutateStashItems={mutateStashItems}
          toast={toast}
        />)}
      </TableBody>
    </Table>
    </div>
  )
}
