/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/flow/:path*',
        destination: '/:path*',
      },
      {
        source: '/compound/:path*',
        destination: '/:path*',
      },
      {
        source: '/lens/:path*',
        destination: '/:path*',
      },
      {
        source: '/polkadot/:path*',
        destination: '/:path*',
      },
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)
