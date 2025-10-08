import type React from "react"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

type CardDetails = {
  name: string
  team: string
  role: string
}
export function TeamCard({ name, team, role, ...props }: CardDetails & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="489" height="254" viewBox="0 0 489 254" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M77.2715 136.52H450.609V202.808H77.2715V136.52Z" fill="#BEF8F0" />
      <g filter="url(#filter0_d_1819_1222)">
        <path
          d="M27.0512 20.7461H153.265L168.114 6.42773H292.736L338.078 51.7692H483.383V163.399L464.557 182.49V241.355H250.842L235.728 226.506H31.2937L12.998 208.476V183.816L28.6422 172.68V106.126L12.998 94.9894V36.1251L27.0512 20.7461Z"
          fill="#BBF7EF"
          fillOpacity="0.53"
          shapeRendering="crispEdges"
        />
        <path
          d="M32.0889 104.349L30.6416 103.317L16.4453 93.2119V37.4619L28.5703 24.1934H154.656L155.657 23.2275L169.504 9.875H291.309L335.641 54.207L336.65 55.2158H479.936V161.985L462.103 180.07L461.109 181.077V237.908H252.253L238.144 224.047L237.138 223.06H32.707L16.4453 207.032V185.593L30.6416 175.488L32.0889 174.457V104.349Z"
          stroke="#BBF7EF"
          strokeWidth="6.89402"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_1819_1222)">
        <path d="M42.9611 6.42773H159.364L150.614 15.443H33.6807L42.9611 6.42773Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter2_d_1819_1222)">
        <path d="M233.062 232.367H35.7604L45.448 241.544H242.238L233.062 232.367Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter3_d_1819_1222)">
        <path d="M305.729 6.42773H331.449L371.223 46.7313H346.033L305.729 6.42773Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter4_d_1819_1222)">
        <path d="M343.115 6.42773H368.835L408.608 46.7313H383.419L343.115 6.42773Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter5_d_1819_1222)">
        <path d="M380.504 6.42773H406.224L445.997 46.7313H420.807L380.504 6.42773Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter6_d_1819_1222)">
        <path d="M417.89 6.42773H443.61L483.383 46.7313H458.193L417.89 6.42773Z" fill="#BBF7EF" />
      </g>
      <path d="M470.921 239.63H481.526V174.282L470.921 185.018V239.63Z" stroke="#BBF7EF" strokeWidth="3.71217" />
      <path
        d="M22.6895 168.365L15.1855 173.706V105.458L22.6895 110.816V168.365Z"
        stroke="#BBF7EF"
        strokeWidth="3.71217"
      />
      <path
        d="M33.8981 239.977L14.346 220.851L14.3463 239.976L33.8981 239.977Z"
        stroke="#BBF7EF"
        strokeWidth="3.18186"
      />
      <defs>
        <filter
          id="filter0_d_1819_1222"
          x="7.39003"
          y="0.819719"
          width="481.601"
          height="246.144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.65 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter1_d_1819_1222"
          x="28.0726"
          y="0.819719"
          width="136.9"
          height="20.2317"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.69 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter2_d_1819_1222"
          x="30.1522"
          y="226.759"
          width="217.694"
          height="20.3918"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter3_d_1819_1222"
          x="300.121"
          y="0.819719"
          width="76.7092"
          height="51.5188"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter4_d_1819_1222"
          x="337.507"
          y="0.819719"
          width="76.7092"
          height="51.5188"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter5_d_1819_1222"
          x="374.896"
          y="0.819719"
          width="76.7092"
          height="51.5188"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
        <filter
          id="filter6_d_1819_1222"
          x="412.282"
          y="0.819719"
          width="76.7092"
          height="51.5188"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.80401" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1222" result="shape" />
        </filter>
      </defs>
      <text
        className={cn(audiowide.className)}
        fill="#f7f7f7"
        fontWeight="100"
        x="56"
        y="100"
        fontSize="35.7px"
        style={{ textTransform: "uppercase" }}
      >
        {name}
      </text>
      <text
        className={cn(audiowide.className)}
        fill="#f7f7f7"
        fontWeight="100"
        x="56"
        y="125"
        fontSize="18.35"
        style={{ textTransform: "uppercase" }}
      >
        Team: {team}
      </text>
      <text
        className={cn(spaceGrotesk.className)}
        fill="#006793"
        fontWeight="100"
        x="250"
        y="180"
        textAnchor="middle"
        style={{ textTransform: "uppercase" }}
        fontSize="35.7"
      >
        {role}
      </text>
    </svg>
  )
}
