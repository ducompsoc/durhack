import * as React from "react"

export function HillTopLeftGraphic(props: React.ComponentProps<"svg">) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 2055.5 972.95" {...props}>
      <title>a green hill</title>
      <path
        d="m0.2162 131.13c-10.395 221.36 355.65 818.73 753.66 837.42 398.01 18.689 1317.7 4.689 1301.4-604.43-678.57 66.277-1098.8-248.98-1217.4-279.92-178.75-62.156-827.28-174.43-837.67 46.935z"
        fill={`url(#${id}-hill)`}
      />
      <defs>
        <linearGradient
          id={`${id}-hill`}
          x1="113.4"
          x2="1589.9"
          y1="-105.38"
          y2="49.435"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#96DBA8" offset="0" />
          <stop stopColor="#BACD9C" offset=".67002" />
        </linearGradient>
      </defs>
    </svg>
  )
}
