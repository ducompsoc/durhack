// https://github.com/shadcn-ui/ui/blob/4810f744e3b5ec23e7fcac14b8377448055e9560/apps/www/components/site-header.tsx

import Link from "next/link"

import { Button } from "@durhack/web-components/ui/button"

import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import type { NavConfig } from "@/config/nav"
import {cn} from "@/lib/utils";
import {audiowide} from "@/lib/google-fonts";
import {DurHackIcon} from "@/components/icons/durhack-2025";

// todo: use these border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60

export function SiteHeader({ navConfig }: { navConfig: NavConfig }) {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="w-full flex h-20 items-center">
        {/* Left-aligned nav + mobile nav */}
        <div className="mx-4 hidden xl:flex">
           <Link href="/" className="flex items-center gap-2">
             <DurHackIcon className="h-12 w-12" />
             <span className={cn(audiowide.className, "text-4xl")}>DHX</span>
          </Link>
        </div>
        <MobileNav config={navConfig} className="hidden" />
        {/* Left-aligned nav + mobile nav end */}

        <div className="flex flex-1 items-center justify-between gap-2 lg:justify-end">
          {/* Right-aligned nav */}
          <div className="hidden w-full xl:contents xl:hidden flex-1 lg:w-auto lg:flex-none">
            <MainNav config={navConfig} className={cn(
              audiowide.className,
              "text-2xl text-[#238CBA] text-nowrap",
              "rounded-full uppercase px-8 py-4 gap-12 border border-white ",
              "bg-white/95 backdrop-blur-xl supports-backdrop-filter:bg-white/30",
              )}
            />
          </div>
          {/* Right-aligned nav end */}

          {/* Social links */}
          <nav className="flex items-center gap-0.5">

          </nav>
          {/* Social links end */}
        </div>
        {/* space for MLH banner */}
        <div className="w-[clamp(60px,10vw,100px)] mr-[50px] ml-4" />
        {/* space for MLH banner end */}
      </div>

    </header>
  )
}
