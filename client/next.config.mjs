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
        // hard-coded until next.config.ts support ships with Next 15, when we can import `siteConfig` and use that
        destination: "/",
        permanent: false,
      }
    ]
  },
}

export default nextConfig
