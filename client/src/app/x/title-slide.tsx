import * as React from "react"

import {audiowide, electrolize, spaceGrotesk} from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

function OutlinedHeadingText({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactNode {
  return <span
    className={cn(audiowide.className, "text-transparent", className)}
    style={{WebkitTextStroke: ".04em white"}}
    {...props}
  >
    {children}
  </span>
}

function GlowingText({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactNode {
  return <span
    style={{textShadow: "0 0 20px #fff"}}
    {...props}
  >
    {children}
  </span>
}

function SubHeadingText({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactNode {
  return <span
    className={cn(electrolize.className, className)}
    {...props}
  >
    {children}
  </span>
}

function BodyText({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactNode {
  return <span
    className={cn(spaceGrotesk.className, className)}
    {...props}
  >
    {children}
  </span>
}

export function TitleSlide({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <>
      <article
        className={cn("absolute size-full flex flex-col space-y-1.5 items-center justify-center", className)}
        {...props}
      >
        <h1 className={cn(audiowide.className, "text-6xl lg:text-8xl uppercase")}>
          <GlowingText>DurHack</GlowingText> <OutlinedHeadingText>X</OutlinedHeadingText>
        </h1>
        <h1 className="text-5xl lg:text-7xl">
          <OutlinedHeadingText>Nov 2025</OutlinedHeadingText>
        </h1>
        <div className="pt-4"/>
        <p className="lg:text-3xl"><SubHeadingText>DurHack's 10<sup>th</sup> anniversary</SubHeadingText></p>
        <p className="lg:text-3xl"><SubHeadingText>Making DurHack History</SubHeadingText></p>
        <div className="pt-4"/>
        <p><BodyText><a className="hover:underline" href="mailto:sponsor@durhack.com">sponsor@durhack.com</a></BodyText></p>
        <p><BodyText><a className="hover:underline" href="tel:+447775246553">+44 7775 246553</a></BodyText></p>
      </article>
    </>
  )
}
