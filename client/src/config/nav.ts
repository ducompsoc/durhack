import type { NavItem, NavItemWithChildren } from "@/types/nav"

export type MainNavItem = NavItem

export type SidebarNavSubItem = NavItem & {}
export type SidebarNavItem = NavItemWithChildren<SidebarNavSubItem> & {}

export type NavConfig = Readonly<{
  mainNav: readonly MainNavItem[]
  sidebarNav: readonly SidebarNavItem[]
}>

export const navConfig: NavConfig = {
  mainNav: [
    {
      slug: "about",
      title: "About",
      href: "#about",
    },
    {
      slug: "sponsors",
      title: "Sponsors",
      href: "#sponsors",
    },
    {
      slug: "faqs",
      title: "FAQs",
      href: "#faqs",
    },
    {
      slug: "schedule",
      title: "Schedule",
      href: "#schedule",
    },
    {
      slug: "past-projects",
      title: "Past Projects",
      href: "#past-projects",
    },
  ],
  sidebarNav: [],
}
