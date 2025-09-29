import type React from "react"
import {cn} from "@/lib/utils";
import {audiowide, spaceGrotesk} from "@/lib/google-fonts";

type CardDetails = {
  name: string
  team: string
  role: string
}
export function LeftTeamCard({ name, team, role, ...props }: CardDetails & React.SVGProps<SVGSVGElement>) {
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

export function RightTeamCard({ name, team, role, ...props }: CardDetails & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="489" height="254" viewBox="0 0 489 254" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M62.168 136.281H435.506V202.57H62.168V136.281Z" fill="#BEF8F0" />
      <g filter="url(#filter0_d_1819_1253)">
        <path
          d="M26.645 21.0137H152.859L167.707 6.69531H292.33L337.672 52.0368L482.976 51.0496V163.667L464.15 182.758V241.622H250.436L235.322 226.774H30.8875L12.5918 208.743V184.084L28.2359 172.947V106.393L12.5918 95.257V36.3926L26.645 21.0137Z"
          fill="#BBF7EF"
          fillOpacity="0.53"
          shapeRendering="crispEdges"
        />
        <path
          d="M31.6826 104.616L30.2354 103.585L16.0391 93.4795V37.7295L28.1641 24.4609H154.25L155.251 23.4951L169.098 10.1426H290.902L335.234 54.4746L336.254 55.4932L337.695 55.4834L479.529 54.5195V162.253L461.696 180.338L460.703 181.345V238.176H251.847L237.737 224.314L236.731 223.327H32.3008L16.0391 207.3V185.86L30.2354 175.756L31.6826 174.725V104.616Z"
          stroke="#BBF7EF"
          strokeWidth="6.89402"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_1819_1253)">
        <path d="M42.8566 6.18164H159.26L150.509 15.1969H33.5762L42.8566 6.18164Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter2_d_1819_1253)">
        <path d="M232.958 232.125H35.6569L45.3444 241.302H242.135L232.958 232.125Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter3_d_1819_1253)">
        <path d="M305.624 6.18164H331.344L371.117 46.4852H345.928L305.624 6.18164Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter4_d_1819_1253)">
        <path d="M343.011 6.18164H368.731L408.504 46.4852H383.314L343.011 6.18164Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter5_d_1819_1253)">
        <path d="M380.399 6.18164H406.119L445.893 46.4852H420.703L380.399 6.18164Z" fill="#BBF7EF" />
      </g>
      <g filter="url(#filter6_d_1819_1253)">
        <path d="M417.787 6.18164H443.507L483.28 46.4852H458.091L417.787 6.18164Z" fill="#BBF7EF" />
      </g>
      <path d="M470.816 239.392H481.422V174.044L470.816 184.779V239.392Z" stroke="#BBF7EF" strokeWidth="3.71217" />
      <path
        d="M22.585 168.125L15.0811 173.466V105.218L22.585 110.576V168.125Z"
        stroke="#BBF7EF"
        strokeWidth="3.71217"
      />
      <path
        d="M33.7946 239.738L14.2424 220.613L14.2428 239.738L33.7946 239.738Z"
        stroke="#BBF7EF"
        strokeWidth="3.18186"
      />
      <defs>
        <filter
          id="filter0_d_1819_1253"
          x="6.98378"
          y="1.0873"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter1_d_1819_1253"
          x="27.9682"
          y="0.573626"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter2_d_1819_1253"
          x="30.0492"
          y="226.517"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter3_d_1819_1253"
          x="300.016"
          y="0.573626"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter4_d_1819_1253"
          x="337.403"
          y="0.573626"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter5_d_1819_1253"
          x="374.791"
          y="0.573626"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
        </filter>
        <filter
          id="filter6_d_1819_1253"
          x="412.179"
          y="0.573626"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1819_1253" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1819_1253" result="shape" />
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
