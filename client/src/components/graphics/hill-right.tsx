import * as React from "react"

export function HillRightGraphic(props: React.ComponentProps<"svg">) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 2307 837" {...props}>
      <title>a green hill</title>
      <path
        d="m2306.1 224.16c0 195.39-418.75 602.6-896.82 602.6-478.07 0-1461 114.38-1407.2-421.43 256.98-100.03 726.32-203.18 1107.1-332.36 201.35-77.101 1232.1-165.27 1196.9 151.19z"
        fill={`url(#${id}-hill)`}
      />
      <defs>
        <linearGradient
          id={`${id}-hill`}
          x1="935.91"
          x2="1016.9"
          y1="-408.5"
          y2="671.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B2E490" offset=".63054" />
          <stop stopColor="#CCE186" offset=".77382" />
        </linearGradient>
      </defs>
    </svg>
  )
}
