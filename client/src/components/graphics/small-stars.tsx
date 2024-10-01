import type * as React from "react"

import { cn } from "@/lib/utils"

type StarsGraphicProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  priority?: boolean
}

export function LeftStarsGraphic({ className, priority, ...props }: StarsGraphicProps): React.ReactElement {
  return (
    <div className={cn("relative aspect-square isolate", className)} {...props}>
      <svg width="50" height="100" viewBox="0 0 152 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Small stars</title>
        <circle cx="111.898" cy="33.2668" r="9.84665" fill="#D9D9D9" />
        <circle cx="7.08051" cy="173.606" r="6.98896" fill="#D9D9D9" />
        <circle cx="145.971" cy="273.621" r="5.74168" fill="#D9D9D9" />
        <circle cx="17.2071" cy="4.47422" r="3.13779" fill="#D9D9D9" />
        <path
          d="M83.8523 126.251C92.3523 126.251 92.6023 125.331 92.6023 114.981C92.6023 125.331 92.6023 126.251 101.352 126.251C92.6023 126.251 92.6023 127.171 92.6023 137.521C92.6023 127.171 92.3523 126.251 83.8523 126.251Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function RightStarsGraphic({ className, priority, ...props }: StarsGraphicProps): React.ReactElement {
  return (
    <div className={cn("relative aspect-square isolate", className)} {...props}>
      <svg width="100" height="150" viewBox="0 0 152 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Small stars</title>
        <circle cx="111.898" cy="33.2668" r="9.84665" fill="#D9D9D9" />
        <circle cx="7.08051" cy="173.606" r="6.98896" fill="#D9D9D9" />
        <circle cx="145.971" cy="273.621" r="5.74168" fill="#D9D9D9" />
        <circle cx="17.2071" cy="4.47422" r="3.13779" fill="#D9D9D9" />
        <path
          d="M83.8523 126.251C92.3523 126.251 92.6023 125.331 92.6023 114.981C92.6023 125.331 92.6023 126.251 101.352 126.251C92.6023 126.251 92.6023 127.171 92.6023 137.521C92.6023 127.171 92.3523 126.251 83.8523 126.251Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
