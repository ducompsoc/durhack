import * as React from "react"

export function HillBottomLeftGraphic(props: React.ComponentProps<"svg">) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 1879 433" {...props}>
      <title>a dirt path on a green hill</title>
      <defs>
        <linearGradient
          id={`${id}-hill`}
          x1="1076.15"
          x2="715.62"
          y1="-251.8"
          y2="712.11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7CAB4E" offset=".17029" />
          <stop stopColor="#A5D177" offset=".35444" />
          <stop stopColor="#88BB62" offset=".62106" />
        </linearGradient>
        <linearGradient id={`${id}-path`} x1="1343.5" x2="1313.5" y1="112.6" y2="258.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC87B" offset=".091834" />
          <stop stopColor="#CE9F5D" offset=".2041" />
          <stop stopColor="#BFA177" offset="1" />
        </linearGradient>
      </defs>
      <path
        d="m1879 278.96c0 84.098-958.46 154.04-1347.8 154.04s-473.6-205.1-473.6-289.2c0-84.099-356.58-196.83 705.01-115.95 574.06 26.765 1116.4 167 1116.4 251.1z"
        fill={`url(#${id}-hill)`}
      />
      <path
        d="m1343.5 92.448c-14.803 6.1717-69.446 29.564-114.62 56.875-46.977 28.4-120.25 83.516-175.72 131.09-48.654 41.731-130.65 128.03-137.12 134.82 88.405-4.6716 154.31-4.239 246.74-11.385l86.874-109.94s72.593-94.117 95.5-113.5c54.033-45.72 106.52-63.175 114.23-65.574-36.967-7.7617-75.69-15.259-115.88-22.394z"
        fill={`url(#${id}-path)`}
      />
    </svg>
  )
}
