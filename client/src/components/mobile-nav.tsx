// https://github.com/shadcn-ui/ui/blob/4810f744e3b5ec23e7fcac14b8377448055e9560/apps/www/components/mobile-nav.tsx

"use client"

import { Button } from "@durhack/web-components/ui/button"
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@durhack/web-components/ui/drawer"
import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"

import type { MainNavItem, NavConfig, SidebarNavItem, SidebarNavSubItem } from "@/config/nav"
import { cn } from "@/lib/utils"

type AppRouter = ReturnType<typeof useRouter>

export function MobileNav({ config, ...props }: { config: NavConfig } & React.ComponentProps<typeof NavMenuButton>) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  const closeDrawer = React.useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <NavMenuButton {...props} />
      </DrawerTrigger>
      <DrawerTitle className="sr-only">Nav Menu</DrawerTitle>
      <DrawerContent className="max-h-[60svh] p-0">
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {config.mainNav.map((item) => (
              <MobileMainNavItem key={item.slug} item={item} router={router} closeDrawer={closeDrawer} />
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {config.sidebarNav.map((item) => (
              <MobileSidebarNavItem key={item.slug} item={item} router={router} closeDrawer={closeDrawer} />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function NavMenuButton({ variant, className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant ?? "ghost"}
      className={cn(
        "ml-6 mr-2 h-8 w-8 px-0 text-base",
        "hover:bg-transparent xl:hidden",
        "focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6!"
      >
        <title>Toggle Nav Menu</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
    </Button>
  )
}

function MobileMainNavItem({
  item,
  router,
  closeDrawer,
}: {
  item: MainNavItem
  router: AppRouter
  closeDrawer?: () => void
}) {
  if (item.href == null) return null
  return (
    <MobileNavLink key={item.slug} href={item.href} router={router} closeDrawer={closeDrawer}>
      {item.title}
    </MobileNavLink>
  )
}

function MobileSidebarNavItem({
  item,
  router,
  closeDrawer,
}: {
  item: SidebarNavItem
  router: AppRouter
  closeDrawer?: () => void
}) {
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <h4 className="font-medium">{item.title}</h4>
      <MobileSidebarNavSubItems items={item.items} router={router} closeDrawer={closeDrawer} />
    </div>
  )
}

function MobileSidebarNavSubItems({
  items,
  router,
  closeDrawer,
}: {
  items: readonly SidebarNavSubItem[]
  router: AppRouter
  closeDrawer?: () => void
}) {
  if (items.length === 0) return null
  return items.map((item) => (
    <MobileSidebarNavSubItem key={item.slug} item={item} router={router} closeDrawer={closeDrawer} />
  )) satisfies React.ReactNode
}

function MobileSidebarNavSubItem({
  item,
  router,
  closeDrawer,
}: {
  item: SidebarNavSubItem
  router: AppRouter
  closeDrawer?: () => void
}) {
  if (item.disabled === true) return null
  if (item.href == null) return <MobileNavComment>{item.title}</MobileNavComment>

  return (
    <MobileNavLink href={item.href} router={router} closeDrawer={closeDrawer} className="text-muted-foreground">
      {item.title}
    </MobileNavLink>
  )
}

interface MobileNavLinkProps extends LinkProps {
  router: AppRouter
  closeDrawer?: () => void
  children: React.ReactNode
  className?: string
}

function MobileNavLink({ router, href, closeDrawer, className, children, ...props }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        closeDrawer?.()
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  )
}

function MobileNavComment(props: React.ComponentProps<"span">) {
  return <span {...props} />
}
