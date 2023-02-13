/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: ".",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.mypeoplevol.com'],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/main-main/:path*',
        destination: 'http://bpm.topkey.com.tw/main-main/:path*'
      }
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
}

module.exports = nextConfig
