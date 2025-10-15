import * as React from "react"

export function TreeGraphic(props: React.ComponentProps<"svg">) {
  const id = React.useId()
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 217.27 234.49"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="url(#b)"
        d="M-46.75 89.545c-77.884 45.439-20.67 114.519 20.78 68.612 47.836-52.981 84.09-6.089 97.767-27.177 13.677-21.088 3.353-72.247-53.18-71.868-18.259-6.93-51.69 9.345-65.366 30.433Z"
      />
    </g>
    <path
      fill="url(#c)"
      d="M2.747 103.173c4.14 8.423 7.065 9.903 11.654 11.686 1.909 6.654 2.53 9.656 1.26 17.235-.512-4.514-2.321-6.41-5.152-9.799-1.995-1.749-4.018-3.598-6.778-7.266-2.192-4.761-2.746-7.043-2.813-10.505l-2.053 1.438c.972 2.441.753 3.925.254 6.659-2.324-1.379-3.494-2.38-5.248-4.699l-1.026 2.722c6.46 4.697 9.692 8.022 13.578 13.253 5.177 5.678 6.383 4.255 6.911 12.281-9.276-14.306-14.652-11.987-21.66-23.176l-1.087 1.905c1.187 4.259 2.585 6.352 6.588 9.451-5.789-.587-8.843-2.081-14.258-4.965l1.292 3.293c6.534 3.566 10.53 4.764 17.913 6.274l5.344 7.616-9.453-4.736-.47 2.564c.049-.813.038-1.665-.051-2.565-1.05-.226-2.62.256-4.307 1.042-1.211 8.93-5.148 16.537-5.22 2.047-1.15.748-2.082.619-2.724 1.069-1.359 8.554 4.645 13.178 1.683 14.974-.961 1.136-5.23-8.973-6.013-7.986-1.505 1.902-1.721 2.285-2.52 2.255 3.035 2.398 1.184 5.024.707 6.479-4.576 3.817-14.764 6.425-17.92 6.396-4.375 3.705-6.69 10.674-7.345 11.323 2.482-1.273 13.393-5.252 19.892-7.379 1.84-1.988 3.607-4.159 4.968-4.693 3.549-.97 2.381 1.38 7.648.8C12.146 180.554.918 186.647-1.555 194.38c0 39.12-6.347 37.244 0 72.12H31c-2.38-9.119-4.416-21.666-7.18-34.544 1.363-5.872 3.338-8.59 7.242-9.842 6.578-21.585 11.11-31.268 24.57-49.536 6.595-6.447 10.924-9.31 20.14-12.755 4.152-3.492 6.7-5.101 9.95-10.025l6.689-8.324-4.526 1.142c-4.424 5.68-6.99 8.85-12.733 14.279-4.68 2.626-7.584 3.42-12.926 4.437 1.281-4.44 1.585-6.622 6.412-13.701 4.297-1.701 6.686-2.707 10.105-6.288l-4.17-1.953c-1.46 2.627-2.351 4.082-5.117 4.328.088-1.617.245-2.544 1.436-4.361l-2.772-.39c-4.184 10.522-7.545 18.157-14.4 27.391.536-4.644 1.205-8.284 8.45-26.537l-3.836.24c-.105 5.737-3.544 8.046-3.77 13.09-.657-1.585-.854-2.564-.744-4.563.226-3.51.915-5.341 2.41-8.545l-2.772-.099c2.047-2.003 4.318-4.724 6.988-8.524l-.956-1.102c-4.982 3.646-6.637 6.026-9.486 5.197 6.773-4.767 9.423-10.029 10.329-18.407l-2.712.432c-2.077 6.726-4.705 10.712-13.615 17.373 2.518-6.265 4.184-10.026 9.337-17.595l-4.087 1.603c-5.374 6.329-8.144 9.95-10.148 16.858-.159-7.749-1.735-12.907-4.202-20.729l-3.692.604 4.343 17.085.099 6.927-4.752 9.252c-3.38 4.07-3.69 8.624-6.413 9.693-2.794 4.035-5.148 11.145-10.467 16.832.678-13.374 2.804-21.716 6.014-40.206 1.574-9.764 1.163-14.646-2.458-21.625 4.945-3.687 7.225-5.965 10.26-10.568l-2.07-1.937c-2.93 5.732-4.981 6.997-10.247 9.934-.9-4.717-1.034-6.156 1.608-9.923l-1.562-.65c-2.211 1.712-1.55 5.982-3.762 8.442.25-2.713-.056-6.134-1.128-8.213l-2.03.162c1.324 1.829 2.466 5.137.11 6.291-2.042.802-3.307-2.332-4.866-5.059l-1.146 1.082Zm49.862 37.572c-1.57 7.694-1.523 10.959-1.044 16.117-.727 5.949-1.839 8.94-4.166 14.091-6.176 10.003-9.78 15.711-13.815 24.206l-12.956 22.392-.189.281c-1.945-7.184-4.246-14.112-7.103-20.223 1.209-3.2 1.886-6.139 2.117-8.885l7.564-11.168 14.064-29.583c6.111-2.338 10.073-2.267 15.528-7.228Zm-55.41-3.862c6.27 2.334 10.99 4.527 13.197 3.822 1.111 1.05 1.469 1.549 1.685 2.295-2.047 9.083-3.447 14.233-6.15 22.204-3.56-4.305-7.771-8.74-12.029-13.804-1.8-4.999 2.051-8.741 3.296-14.517Z"
    />
    <g filter="url(#d)">
      <path
        fill="url(#e)"
        d="M-73.999 159.244c4.677 11.923 17.92 17.882 29.578 13.309 4.529-29.854 39.242-22.148 41.47-41.176-4.678-11.924-40.657-19.519-57.5-6.369-11.658 4.573-18.224 22.312-13.548 34.236Z"
      />
    </g>
    <g filter="url(#f)">
      <path
        fill="url(#g)"
        d="M66.356 120.447c-8.183 5.239-18.471 18.064-15.059 22.372 19.504-.223 33.924 13.439 42.107 8.2 8.182-5.239 10.697-21.135 1.223-25.689-3.413-4.308-20.089-10.122-28.271-4.883Z"
      />
    </g>
    <g filter="url(#h)">
      <path
        fill="url(#i)"
        d="M41.006 97.209c-12.676 8.116-18.324 20.538-12.614 27.746 31.012.661 37.762 19.606 50.438 11.49 12.676-8.116 15.642-33.916.274-41.843-5.71-7.208-25.422-5.51-38.098 2.607Z"
      />
    </g>
    <g filter="url(#j)">
      <path
        fill="url(#k)"
        d="M-29.942 108.264c-6.682 13.556-3.878 18.27 8.37 21.339 33.791-15.837 49.857-2.053 65.522-8.197 6.682-13.556-12.078-36.913-35.286-35.484-12.247-3.069-31.925 8.787-38.606 22.342Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={-14.055}
        x2={17.546}
        y1={32.291}
        y2={142.501}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.202} stopColor="#F7F6A7" />
        <stop offset={0.792} stopColor="#3C784D" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={-4.952}
        x2={53.118}
        y1={49.072}
        y2={273.902}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3D5A44" />
        <stop offset={0.358} stopColor="#4B5C42" />
        <stop offset={0.643} stopColor="#8E6635" stopOpacity={0.74} />
        <stop offset={0.971} stopColor="#8E6635" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="e"
        x1={-72.637}
        x2={-37.715}
        y1={125.988}
        y2={172.189}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CBF7C" />
        <stop offset={0.741} stopColor="#326F40" />
      </linearGradient>
      <linearGradient
        id="g"
        x1={51.041}
        x2={99.214}
        y1={5.279}
        y2={148.514}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9FC480" />
        <stop offset={0.951} stopColor="#527A4A" />
      </linearGradient>
      <linearGradient
        id="i"
        x1={52.36}
        x2={75.056}
        y1={76.749}
        y2={142.865}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A1C682" />
        <stop offset={1} stopColor="#266741" />
      </linearGradient>
      <linearGradient
        id="k"
        x1={-13.536}
        x2={5.88}
        y1={77.685}
        y2={131.527}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.253} stopColor="#A3C984" />
        <stop offset={1} stopColor="#3D653A" />
      </linearGradient>
      <filter
        id="a"
        width={165.335}
        height={118.527}
        x={-88.125}
        y={54.745}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-6.666} dy={-62.014} />
        <feGaussianBlur stdDeviation={1.374} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.033221 0 0 0 0 0.577712 0 0 0 0 0.468814 0 0 0 0.25 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2270_3461" />
      </filter>
      <filter
        id="d"
        width={74.182}
        height={57.608}
        x={-75.518}
        y={116.484}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={11.918} dy={-13.938} />
        <feGaussianBlur stdDeviation={0.808} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.310904 0 0 0 0 0.339168 0 0 0 0.25 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2270_3461" />
      </filter>
      <filter
        id="f"
        width={51.7}
        height={35.462}
        x={49.01}
        y={116.754}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-11.918} dy={-5.656} />
        <feGaussianBlur stdDeviation={0.808} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.295407 0 0 0 0 0.361722 0 0 0 0.25 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2270_3461" />
      </filter>
      <filter
        id="h"
        width={66.303}
        height={51.365}
        x={23.216}
        y={87.097}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-11.514} dy={-14.544} />
        <feGaussianBlur stdDeviation={1.475} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.349947 0 0 0 0 0.256628 0 0 0 0.25 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2270_3461" />
      </filter>
      <filter
        id="j"
        width={78.793}
        height={45.785}
        x={-33.474}
        y={83.818}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-24.442} />
        <feGaussianBlur stdDeviation={0.808} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.0261306 0 0 0 0 0.405801 0 0 0 0 0.440317 0 0 0 0.25 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2270_3461" />
      </filter>
    </defs>
  </svg>
  )
}
