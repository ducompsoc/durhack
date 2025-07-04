/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@durhack/web-components"],
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/code-of-conduct",
        destination: "https://hackp.ac/coc",
        permanent: false,
      },
      {
        source: "/register",
        destination: "/",
        permanent: false,
      },
      {
        source: "/tickets",
        destination: "/",
        permanent: false,
      },
      {
        source: "/organise",
        destination: "https://forms.gle/E6h8ri1JWFM1BBk57",
        permanent: false,
      },
      {
        source: "/sponsor",
        destination: "/x",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
