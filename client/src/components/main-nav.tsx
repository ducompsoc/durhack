// https://github.com/shadcn-ui/ui/blob/4810f744e3b5ec23e7fcac14b8377448055e9560/apps/www/components/main-nav.tsx

"use client"

import Link from "next/link"
import type * as React from "react"

import type { MainNavItem, NavConfig } from "@/config/nav"
import { cn } from "@/lib/utils"

export function MainNav({ config, className, ...props }: { config: NavConfig } & React.ComponentProps<"nav">) {
  return (
    <nav className={cn("flex items-center", className)} {...props}>
      {config.mainNav.map((item) => (
        <MainNavLink key={item.slug} item={item} />
      ))}
    </nav>
  )
}

function MainNavLink({ item }: { item: MainNavItem; }) {
  if (item.href == null) throw Error("MainNavLink nav items require a href") // todo: AssertionError / assert
  if (item.disabled === true) return null

  return (
    <Link
      href={item.href}
      className={cn(
        "transition-colors hover:opacity-80",
      )}
    >
      {item.title}
    </Link>
  )
}
